import jwt from 'jsonwebtoken';
import UsuarioModel from '../models/UsuarioModel.js';
import bcrypt from 'bcryptjs';
import { JWT_CONFIG } from '../config/jwt.js';

function normalizarTipoUsuario(tipo) {
    return String(tipo || '').trim().toLowerCase();
}

function usuarioEhAdmin(usuario) {
    return ['admin', 'administrador'].includes(normalizarTipoUsuario(usuario?.tipo));
}

// Controller para operações de autenticação e gerenciamento de usuários
class AuthController {

      static async validarDuplicatasUsuario({ email, cnpjLimpo, cepLimpo, ignorarIdUser = null }) {
        const resultado = await UsuarioModel.listarTodos(1, 100000);
        const usuarios = resultado.usuarios || [];

        const idIgnorado = ignorarIdUser ? parseInt(ignorarIdUser) : null;

        const usuarioComEmail = usuarios.find((usuario) => {
            return (
                usuario.email?.toLowerCase() === email?.trim().toLowerCase() &&
                usuario.id_user !== idIgnorado
            );
        });

        if (usuarioComEmail) {
            return {
                status: 409,
                resposta: {
                    sucesso: false,
                    erro: 'Email já cadastrado',
                    mensagem: 'Este email já está sendo usado por outro usuário'
                }
            };
        }

        const usuarioComCnpj = usuarios.find((usuario) => {
            const cnpjUsuario = String(usuario.cnpj || '').replace(/\D/g, '');

            return (
                cnpjUsuario === cnpjLimpo &&
                usuario.id_user !== idIgnorado
            );
        });

        if (usuarioComCnpj) {
            return {
                status: 409,
                resposta: {
                    sucesso: false,
                    erro: 'CNPJ já cadastrado',
                    mensagem: 'Este CNPJ já está sendo usado por outro usuário'
                }
            };
        }

        const usuarioComCep = usuarios.find((usuario) => {
            const cepUsuario = String(usuario.cep || '').replace(/\D/g, '');

            return (
                cepUsuario === cepLimpo &&
                usuario.id_user !== idIgnorado
            );
        });

        if (usuarioComCep) {
            return {
                status: 409,
                resposta: {
                    sucesso: false,
                    erro: 'CEP já cadastrado',
                    mensagem: 'Este CEP já está sendo usado por outro usuário'
                }
            };
        }

        return null;
    }
    
    // POST /auth/login - Fazer login
    static async login(req, res) {
        try {
            const { email, senha } = req.body;
            
            if (!email || email.trim() === '') {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Email obrigatório',
                    mensagem: 'O email é obrigatório'
                });
            }

            if (!senha || senha.trim() === '') {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Senha obrigatória',
                    mensagem: 'A senha é obrigatória'
                });
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Email inválido',
                    mensagem: 'Formato de email inválido'
                });
            }

            const usuario = await UsuarioModel.verificarCredenciais(email.trim(), senha);
            
            if (!usuario) {
                return res.status(401).json({
                    sucesso: false,
                    erro: 'Credenciais inválidas',
                    mensagem: 'Email ou senha incorretos'
                });
            }

            const token = jwt.sign(
                { 
                    id_user: usuario.id_user, 
                    email: usuario.email,
                    tipo: usuario.tipo 
                },
                JWT_CONFIG.secret,
                { expiresIn: JWT_CONFIG.expiresIn }
            );

            res.status(200).json({
                sucesso: true,
                mensagem: 'Login realizado com sucesso',
                dados: {
                    token,
                    usuario: {
                        id_user: usuario.id_user,
                        nome_user: usuario.nome_user,
                        cnpj: usuario.cnpj,
                        endereco: usuario.endereco,
                        empresa: usuario.empresa,
                        cargo: usuario.cargo,
                        email: usuario.email,
                        tipo: usuario.tipo,
                        cep: usuario.cep
                    }
                }
            });
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível processar o login'
            });
        }
    }

    // POST /auth/registrar - Registrar novo usuário (Autocadastro público)
    static async registrar(req, res) {
        try {
            const { nome_user, cnpj, endereco, empresa, cargo, email, senha, tipo, cep } = req.body;
            
            // Validações de presença
            const campos = { nome_user, cnpj, endereco, empresa, cargo, email, senha, tipo, cep };
            for (const [campo, valor] of Object.entries(campos)) {
                if (!valor || valor.trim() === '') {
                    return res.status(400).json({
                        sucesso: false,
                        erro: `Campo obrigatório`,
                        mensagem: `O campo ${campo} é obrigatório`
                    });
                }
            }

            // Validações de formato
            if (nome_user.length < 2 || nome_user.length > 255) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Nome inválido',
                    mensagem: 'O nome deve ter entre 2 e 255 caracteres'
                });
            }

            const cnpjLimpo = cnpj.replace(/\D/g, '');
            if (cnpjLimpo.length !== 14){
                return res.status(400).json({
                    sucesso: false,
                    erro: 'CNPJ inválido',
                    mensagem: 'O CNPJ deve conter exatamente 14 dígitos numéricos'
                });
            }

            const enderecoRegex = /^[a-zA-ZÀ-ÿ0-9\s,.\-\/ª°º]{5,150}$/;
            if (!enderecoRegex.test(endereco)) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Endereço inválido',
                    mensagem: 'Formato de endereço inválido'
                });
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Email inválido',
                    mensagem: 'Formato de email inválido'
                });
            }

            const cargoRegex = /^[a-zA-ZÀ-ÿ0-9\s\+\-\.#&/]{2,60}$/;
            if (!cargoRegex.test(cargo)) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Cargo inválido',
                    mensagem: 'Formato de cargo inválido'
                });
            }

            if (senha.length < 6) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Senha muito curta',
                    mensagem: 'A senha deve ter pelo menos 6 caracteres'
                });
            }

            // CORREÇÃO CRÍTICA: Mudança de || para && para evitar bloqueio total
            if (tipo !== 'comum' && tipo !== 'fornecedor') {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Tipo inválido',
                    mensagem: 'No cadastro público, o usuário deve ser comum ou fornecedor'
                });
            }

            const cepLimpo = cep.replace(/\D/g, '');
            if (cepLimpo.length !== 8) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'CEP inválido',
                    mensagem: 'O CEP deve conter 8 dígitos numéricos'
                });
            }

            const duplicata = await AuthController.validarDuplicatasUsuario({
                email,
                cnpjLimpo,
                cepLimpo
            });

            if (duplicata) {
                return res.status(duplicata.status).json(duplicata.resposta);
            }

            const dadosUsuario = {
                nome_user: nome_user.trim(),
                cnpj: cnpjLimpo,
                endereco: endereco.trim(),
                empresa: empresa.trim(),
                cargo: cargo.trim(),
                email: email.trim().toLowerCase(),
                senha: senha,
                tipo: tipo,
                cep: cepLimpo
            };

            const usuarioId = await UsuarioModel.criar(dadosUsuario);
            
            res.status(201).json({
                sucesso: true,
                mensagem: 'Usuário registrado com sucesso',
                dados: {
                    id_user: usuarioId,
                    ...dadosUsuario,
                    senha: undefined // Remove a senha do retorno por segurança
                }
            });
        } catch (error) {
            console.error('Erro ao registrar usuário:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível registrar o usuário'
            });
        }
    }

    // GET /auth/perfil - Obter perfil do usuário logado
    static async obterPerfil(req, res) {
        try {
            const usuario = await UsuarioModel.buscarPorId(req.usuario.id_user);
            
            if (!usuario) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Usuário não encontrado',
                    mensagem: 'Usuário não foi encontrado'
                });
            }

            const { senha, ...usuarioSemSenha } = usuario;

            res.status(200).json({
                sucesso: true,
                dados: usuarioSemSenha
            });
        } catch (error) {
            console.error('Erro ao obter perfil:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível obter o perfil'
            });
        }
    }

    // GET /auth/:id_user - Obter perfil de um usuário específico
    static async buscarUsuarioPorId(req, res) {
        try {
            const { id_user } = req.params;
            const usuario = await UsuarioModel.buscarPorId(id_user);
            
            if (!usuario) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Usuário não encontrado',
                    mensagem: 'Usuário não foi encontrado'
                });
            }

            const { senha, ...usuarioSemSenha } = usuario;

            res.status(200).json({
                sucesso: true,
                dados: usuarioSemSenha
            });
        } catch (error) {
            console.error('Erro ao obter perfil:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível obter o perfil'
            });
        }
    }

    // GET /usuarios - Listar todos os usuários (apenas admin, com paginação)
    static async listarUsuarios(req, res) {
        try {
            const pagina = parseInt(req.query.pagina) || 1;
            const limite = parseInt(req.query.limite) || 10;
            
            if (pagina < 1) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Página inválida',
                    mensagem: 'A página deve ser um número maior que zero'
                });
            }
            
            const limiteMaximo = parseInt(process.env.PAGINACAO_LIMITE_MAXIMO) || 100;
            if (limite < 1 || limite > limiteMaximo) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Limite inválido',
                    mensagem: `O limite deve ser um número entre 1 e ${limiteMaximo}`
                });
            }
            
            const resultado = await UsuarioModel.listarTodos(pagina, limite);
            const usuariosSemSenha = resultado.usuarios.map(({ senha, ...usuario }) => usuario);

            res.status(200).json({
                sucesso: true,
                dados: usuariosSemSenha,
                paginacao: {
                    pagina: resultado.pagina,
                    limite: resultado.limite,
                    total: resultado.total,
                    totalPaginas: resultado.totalPaginas
                }
            });
        } catch (error) {
            console.error('Erro ao listar usuários:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível listar os usuários'
            });
        }
    }

    // POST /usuarios - Criar novo usuário (Apenas Admin - Permite criar outros Admins)
    static async criarUsuario(req, res) {
        try {
            const { nome_user, cnpj, endereco, empresa, cargo, email, senha, tipo, cep } = req.body;
            
            // Validações de presença
            const campos = { nome_user, cnpj, endereco, empresa, cargo, email, senha, tipo, cep };
            for (const [campo, valor] of Object.entries(campos)) {
                if (!valor || valor.trim() === '') {
                    return res.status(400).json({
                        sucesso: false,
                        erro: `Campo obrigatório`,
                        mensagem: `O campo ${campo} é obrigatório.`
                    });
                }
            }

            // Validações de formato e tamanho
            if (nome_user.length < 2 || nome_user.length > 255) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Nome inválido',
                    mensagem: 'O nome deve ter entre 2 e 255 caracteres'
                });
            }

            const cnpjLimpo = cnpj.replace(/\D/g, '');
            if (cnpjLimpo.length !== 14){
                return res.status(400).json({
                    sucesso: false,
                    erro: 'CNPJ inválido',
                    mensagem: 'O CNPJ deve conter exatamente 14 dígitos numéricos'
                });
            }

            const enderecoRegex = /^[a-zA-ZÀ-ÿ0-9\s,.\-\/ª°º]{5,150}$/;
            if (!enderecoRegex.test(endereco)) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Endereço inválido',
                    mensagem: 'Formato de endereço inválido'
                });
            }

            const cargoRegex = /^[a-zA-ZÀ-ÿ0-9\s\+\-\.#&/]{2,60}$/;
            if (!cargoRegex.test(cargo)) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Cargo inválido',
                    mensagem: 'Formato de cargo inválido'
                });
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Email inválido',
                    mensagem: 'Formato de email inválido'
                });
            }

            if (senha.length < 6) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Senha muito curta',
                    mensagem: 'A senha deve ter pelo menos 6 caracteres'
                });
            }

            const cepLimpo = cep.replace(/\D/g, '');
            if (cepLimpo.length !== 8) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'CEP inválido',
                    mensagem: 'O CEP deve conter 8 dígitos numéricos'
                });
            }

            const tipoNormalizado = normalizarTipoUsuario(tipo);
            const tiposValidos = ['comum', 'fornecedor', 'admin', 'administrador'];
            if (!tiposValidos.includes(tipoNormalizado)) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Tipo inválido',
                    mensagem: 'O tipo do usuário deve ser: comum, fornecedor, administrador ou admin'
                });
            }

            const duplicata = await AuthController.validarDuplicatasUsuario({
                email,
                cnpjLimpo,
                cepLimpo
            });

            if (duplicata) {
                return res.status(duplicata.status).json(duplicata.resposta);
            };

            const dadosUsuario = {
                nome_user: nome_user.trim(),
                cnpj: cnpjLimpo,
                endereco: endereco.trim(),
                empresa: empresa.trim(),
                cargo: cargo.trim(),
                email: email.trim().toLowerCase(),
                senha: senha,
                tipo: tipoNormalizado,
                cep: cepLimpo
            };

            const usuarioId = await UsuarioModel.criar(dadosUsuario);
            
            res.status(201).json({
                sucesso: true,
                mensagem: 'Usuário criado com sucesso pelo Administrador',
                dados: {
                    id_user: usuarioId,
                    ...dadosUsuario,
                    senha: undefined
                }
            });
        } catch (error) {
            console.error('Erro ao criar usuário via Admin:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível criar o usuário'
            });
        }
    }

    // PUT /usuarios/:id - Atualizar usuário (Apenas Admin)
    static async atualizarUsuario(req, res) {
        try {
            const { id_user } = req.params;
            const { nome_user, cnpj, endereco, empresa, cargo, email, senha, cep, tipo } = req.body;
            
            if (!id_user || isNaN(id_user)) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'ID inválido',
                    mensagem: 'O ID deve ser um número válido'
                });
            }

            const usuarioExistente = await UsuarioModel.buscarPorId(id_user);
            if (!usuarioExistente) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Usuário não encontrado',
                    mensagem: `Usuário com ID ${id_user} não foi encontrado`
                });
            }

            const dadosAtualizacao = {};
            let cnpjLimpoAtualizado = null;
            let cepLimpoAtualizado = null;
            let emailAtualizado = null;
            
            if (nome_user !== undefined) {
                if (nome_user.trim() === '' || nome_user.length < 2) {
                    return res.status(400).json({
                        sucesso: false,
                        erro: 'Nome inválido',
                        mensagem: 'O nome não pode ser vazio e deve ter ao menos 2 caracteres'
                    });
                }
                dadosAtualizacao.nome_user = nome_user.trim();
            }

            if (cnpj !== undefined) {
                cnpjLimpoAtualizado = cnpj.replace(/\D/g, '');
                if (cnpjLimpoAtualizado.length !== 14) {
                    return res.status(400).json({
                        sucesso: false,
                        erro: 'CNPJ inválido',
                        mensagem: 'O CNPJ precisa conter 14 dígitos válidos'
                    });
                }
                dadosAtualizacao.cnpj = cnpjLimpoAtualizado;
            }

            if (endereco !== undefined) {
                const enderecoRegex = /^[a-zA-ZÀ-ÿ0-9\s,.\-\/ª°º]{5,150}$/;
                if (endereco.trim() === '' || !enderecoRegex.test(endereco)) {
                    return res.status(400).json({
                        sucesso: false,
                        erro: 'Endereço inválido',
                        mensagem: 'O endereço informado possui caracteres inválidos ou tamanho incorreto'
                    });
                }
                dadosAtualizacao.endereco = endereco.trim();
            }

            if (empresa !== undefined) {
                if (empresa.trim() === '') {
                    return res.status(400).json({
                        sucesso: false,
                        erro: 'Empresa vazia',
                        mensagem: 'O nome da empresa não pode estar vazio'
                    });
                }
                dadosAtualizacao.empresa = empresa.trim();
            }

            if (cargo !== undefined) {
                const cargoRegex = /^[a-zA-ZÀ-ÿ0-9\s\+\-\.#&/]{2,60}$/;
                if (cargo.trim() === '' || !cargoRegex.test(cargo)) {
                    return res.status(400).json({
                        sucesso: false,
                        erro: 'Cargo inválido',
                        mensagem: 'O cargo informado é inválido'
                    });
                }
                dadosAtualizacao.cargo = cargo.trim();
            }

            if (email !== undefined) {
                emailAtualizado = email.trim().toLowerCase();
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailAtualizado)) {
                    return res.status(400).json({
                        sucesso: false,
                        erro: 'Email inválido',
                        mensagem: 'Formato de email inválido'
                    });
                }
                
                const usuarioComEmail = await UsuarioModel.buscarPorEmail(emailAtualizado);
                if (usuarioComEmail && usuarioComEmail.id_user !== parseInt(id_user)) {
                    return res.status(409).json({
                        sucesso: false,
                        erro: 'Email já cadastrado',
                        mensagem: 'Este email já está sendo usado por outro usuário'
                    });
                }
                dadosAtualizacao.email = emailAtualizado;
            }

            if (senha !== undefined) {
                if (senha.length < 6) {
                    return res.status(400).json({
                        sucesso: false,
                        erro: 'Senha muito curta',
                        mensagem: 'A senha deve ter pelo menos 6 caracteres'
                    });
                }
                dadosAtualizacao.senha = senha;
            }

            if (cep !== undefined) {
                cepLimpoAtualizado = cep.replace(/\D/g, '');
                if (cepLimpoAtualizado.length !== 8) {
                    return res.status(400).json({
                        sucesso: false,
                        erro: 'CEP inválido',
                        mensagem: 'O CEP precisa ser válido e conter 8 dígitos'
                    });
                }
                dadosAtualizacao.cep = cepLimpoAtualizado;
            }

            if (tipo !== undefined) {
                if (!usuarioEhAdmin(req.usuario)) {
                    return res.status(403).json({
                        sucesso: false,
                        erro: 'Acesso negado',
                        mensagem: 'Você não tem permissão para alterar o tipo do usuário'
                    });
                }

                const tipoNormalizado = normalizarTipoUsuario(tipo);
                const tiposValidos = ['comum', 'fornecedor', 'admin', 'administrador'];
                if (!tiposValidos.includes(tipoNormalizado)) {
                    return res.status(400).json({
                        sucesso: false,
                        erro: 'Tipo inválido',
                        mensagem: 'O tipo deve ser alterado para comum, fornecedor, administrador ou admin'
                    });
                }
                dadosAtualizacao.tipo = tipoNormalizado;
            }

            if (req.file) {
                dadosAtualizacao.foto = req.file.filename;
            }

            if (Object.keys(dadosAtualizacao).length === 0) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Nenhum dado para atualizar',
                    mensagem: 'Forneça pelo menos um campo para atualizar'
                });
            }

            const duplicata = await AuthController.validarDuplicatasUsuario({
                email: emailAtualizado,
                cnpjLimpo: cnpjLimpoAtualizado,
                cepLimpo: cepLimpoAtualizado,
                ignorarIdUser: id_user
            });

            if (duplicata) {
                return res.status(duplicata.status).json(duplicata.resposta);
            }

            const resultado = await UsuarioModel.atualizar(id_user, dadosAtualizacao);
            
            res.status(200).json({
                sucesso: true,
                mensagem: 'Usuário atualizado com sucesso pelo Admin',
                dados: {
                    linhasAfetadas: resultado || 1
                }
            });
        } catch (error) {
            console.error('Erro ao atualizar usuário via Admin:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível atualizar o usuário'
            });
        }
    }

    // DELETE /usuarios/:id - Excluir usuário (Apenas Admin)
    static async excluirUsuario(req, res) {
        try {
            const { id_user } = req.params;
            
            if (!id_user || isNaN(id_user)) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'ID inválido',
                    mensagem: 'O ID deve ser um número válido'
                });
            }

            const usuarioExistente = await UsuarioModel.buscarPorId(id_user);
            if (!usuarioExistente) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Usuário não encontrado',
                    mensagem: `Usuário com ID ${id_user} não foi encontrado`
                });
            }

            const resultado = await UsuarioModel.excluir(id_user);
            
            res.status(200).json({
                sucesso: true,
                mensagem: 'Usuário excluído com sucesso',
                dados: {
                    linhasAfetadas: resultado || 1
                }
            });
        } catch (error) {
            console.error('Erro ao excluir usuário:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível excluir o usuário'
            });
        }
    }
}

export default AuthController;
