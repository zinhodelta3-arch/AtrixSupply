import jwt from 'jsonwebtoken';
import UsuarioModel from '../models/UsuarioModel.js';
import bcrypt from 'bcryptjs';
import { JWT_CONFIG } from '../config/jwt.js';

// Controller para operações de autenticação
class AuthController {
    
    // POST /auth/login - Fazer login
    static async login(req, res) {
        try {
            const { email, senha } = req.body;
            
            // Validações básicas
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

            // Validação básica de formato de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Email inválido',
                    mensagem: 'Formato de email inválido'
                });
            }

            // Verificar credenciais
            const usuario = await UsuarioModel.verificarCredenciais(email.trim(), senha);
            
            if (!usuario) {
                return res.status(401).json({
                    sucesso: false,
                    erro: 'Credenciais inválidas',
                    mensagem: 'Email ou senha incorretos'
                });
            }

            // Gerar token JWT
            const token = jwt.sign(
                { 
                    id_user: usuario.id_user, 
                    email: usuario.email,
                    tipo: usuario.tipo 
                },
                JWT_CONFIG.secret,
                { expiresIn: JWT_CONFIG.expiresIn }
            );

            // nome_user, cnpj, endereco, empresa, cargo, email, senha, tipo, cep

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

    // POST /auth/registrar - Registrar novo usuário
    static async registrar(req, res) {
        try {
            const { nome_user, cnpj, endereco, empresa, cargo, email, senha, tipo, cep } = req.body;
            
            // Validações básicas
            if (!nome_user || nome_user.trim() === '') {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Nome obrigatório',
                    mensagem: 'O nome é obrigatório'
                });
            }

            if (!cnpj || cnpj.trim() === '') {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'CNPJ obrigatória',
                    mensagem: 'A CNPJ é obrigatória'
                });
            }

            if (!endereco || endereco.trim() === '') {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Endereço obrigatório',
                    mensagem: 'O endereço é obrigatório'
                });
            }

            if (!empresa || empresa.trim() === '') {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Empresa obrigatória',
                    mensagem: 'O nome da empresa é obrigatória'
                });
            }

            if (!cargo || cargo.trim() === '') {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Cargo obrigatório',
                    mensagem: 'O seu cargo na empresa é obrigatório'
                });
            }

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

            if (!cep || cep.trim() === '') {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'CEP obrigatório',
                    mensagem: 'O CEP é obrigatório'
                });
            }

            // Validações de formato
            if (nome_user.length < 2) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Nome muito curto',
                    mensagem: 'O nome deve ter pelo menos 2 caracteres'
                });
            }

            if (nome_user.length > 255) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Nome muito longo',
                    mensagem: 'O nome deve ter no máximo 255 caracteres'
                });
            }

            if (cnpj.length != 14){
                return res.status(400).json({
                    sucesso: false,
                    erro: 'CNPJ inválida',
                    mensagem: 'A CNPJ possui caractéres incorretos'
                })
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

            if (cep.length != 9) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'CEP inválido',
                    mensagem: 'O CEP deve corresponder aos padrões de formato'
                });
            }

            // Verificar se o email já existe
            const usuarioExistente = await UsuarioModel.buscarPorEmail(email);
            if (usuarioExistente) {
                return res.status(409).json({
                    sucesso: false,
                    erro: 'Email já cadastrado',
                    mensagem: 'Este email já está sendo usado por outro usuário'
                });
            }

            const saltRounds = 10;
            const senhaHash = await bcrypt.hash(senha, saltRounds);

            // Preparar dados do usuário
            const dadosUsuario = {
                nome_user: nome_user.trim(),
                cnpj: cnpj.trim().toLowerCase(),
                endereco: endereco.trim(),
                empresa: empresa.trim(),
                cargo: cargo.trim(),
                email: email.trim().toLowerCase(),
                senha: senhaHash,
                tipo: tipo || 'comum',
                cep: cep.trim()
            };

            // Criar usuário
            const usuarioId = await UsuarioModel.criar(dadosUsuario);
            
            res.status(201).json({
                sucesso: true,
                mensagem: 'Usuário registrado com sucesso',
                dados: {
                    id_user: usuarioId,
                    nome_user: dadosUsuario.nome_user,
                    cnpj: dadosUsuario.cnpj,
                    endereco: dadosUsuario.endereco,
                    empresa: dadosUsuario.empresa,
                    cargo: dadosUsuario.cargo,
                    email: dadosUsuario.email,
                    tipo: dadosUsuario.tipo,
                    cep: dadosUsuario.cep
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

            // Remover senha dos dados retornados
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
            // Obter parâmetros de paginação da query string
            const pagina = parseInt(req.query.pagina) || 1;
            const limite = parseInt(req.query.limite) || 10;
            
            // Validações
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
            
            // Remover senha de todos os usuários
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

    // POST /usuarios - Criar novo usuário (apenas admin)
    static async criarUsuario(req, res) {
        try {
            const { nome_user, cnpj, endereco, empresa, cargo, email, senha, tipo, cep } = req.body;
            
            // Validações básicas
            if (!nome_user || nome_user.trim() === '') {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Nome obrigatório',
                    mensagem: 'O nome é obrigatório'
                });
            }

            if (!cnpj || cnpj.trim() === '') {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'CNPJ obrigatória',
                    mensagem: 'A CNPJ é obrigatória'
                });
            }

            if (!endereco || endereco.trim() === '') {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Endereço obrigatório',
                    mensagem: 'O endereço é obrigatório'
                });
            }

            if (!empresa || empresa.trim() === '') {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Empresa obrigatória',
                    mensagem: 'O nome da empresa é obrigatória'
                });
            }

            if (!cargo || cargo.trim() === '') {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Cargo obrigatório',
                    mensagem: 'O seu cargo na empresa é obrigatório'
                });
            }

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

            if (!cep || cep.trim() === '') {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'CEP obrigatório',
                    mensagem: 'O CEP é obrigatório'
                });
            }

            // Validações de formato
            if (nome_user.length < 2) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Nome muito curto',
                    mensagem: 'O nome deve ter pelo menos 2 caracteres'
                });
            }

            if (nome_user.length > 255) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Nome muito longo',
                    mensagem: 'O nome deve ter no máximo 255 caracteres'
                });
            }

            if (cnpj.length != 14){
                return res.status(400).json({
                    sucesso: false,
                    erro: 'CNPJ inválida',
                    mensagem: 'A CNPJ possui caractéres incorretos'
                })
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

            if (cep.length != 9) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'CEP inválido',
                    mensagem: 'O CEP deve corresponder aos padrões de formato'
                });
            }

            // Verificar se o email já existe
            const usuarioExistente = await UsuarioModel.buscarPorEmail(email);
            if (usuarioExistente) {
                return res.status(409).json({
                    sucesso: false,
                    erro: 'Email já cadastrado',
                    mensagem: 'Este email já está sendo usado por outro usuário'
                });
            }

            const saltRounds = 10;
            const senhaHash = await bcrypt.hash(senha, saltRounds);

            // Preparar dados do usuário
            const dadosUsuario = {
                nome_user: nome_user.trim(),
                cnpj: cnpj.trim().toLowerCase(),
                endereco: endereco.trim(),
                empresa: empresa.trim(),
                cargo: cargo.trim(),
                email: email.trim().toLowerCase(),
                senha: senhaHash,
                tipo: tipo || 'comum',
                cep: cep.trim()
            };

            // Criar usuário
            const usuarioId = await UsuarioModel.criar(dadosUsuario);
            
            res.status(201).json({
                sucesso: true,
                mensagem: 'Usuário criado com sucesso',
                dados: {
                    id_user: usuarioId,
                    nome_user: dadosUsuario.nome_user,
                    cnpj: dadosUsuario.cnpj,
                    endereco: dadosUsuario.endereco,
                    empresa: dadosUsuario.empresa,
                    cargo: dadosUsuario.cargo,
                    email: dadosUsuario.email,
                    tipo: dadosUsuario.tipo,
                    cep: dadosUsuario.cep
                }
            });
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível criar o usuário'
            });
        }
    }

    // PUT /usuarios/:id - Atualizar usuário (apenas admin)
    static async atualizarUsuario(req, res) {
        try {
            const { id_user } = req.params;
            const { nome_user, cnpj, endereco, empresa, cargo, email, senha, tipo, cep } = req.body;
            
            // Validação do ID
            if (!id_user || isNaN(id_user)) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'ID inválido',
                    mensagem: 'O ID deve ser um número válido'
                });
            }

            // Verificar se o usuário existe
            const usuarioExistente = await UsuarioModel.buscarPorId(id_user);
            if (!usuarioExistente) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Usuário não encontrado',
                    mensagem: `Usuário com ID ${id_user} não foi encontrado`
                });
            }

            

            // Preparar dados para atualização
            const dadosAtualizacao = {};
            
            if (nome_user !== undefined) {
                if (nome_user.trim() === '') {
                    return res.status(400).json({
                        sucesso: false,
                        erro: 'Nome inválido',
                        mensagem: 'O nome não pode estar vazio'
                    });
                }
                if (nome_user.length < 2) {
                    return res.status(400).json({
                        sucesso: false,
                        erro: 'Nome muito curto',
                        mensagem: 'O nome deve ter pelo menos 2 caracteres'
                    });
                }
                dadosAtualizacao.nome_user = nome_user.trim();
            }

            if (cnpj !== undefined) {
                if (cnpj.trim() === '') {
                    return res.status(400).json({
                        sucesso: false,
                        erro: 'CNPJ vazio',
                        mensagem: 'A CNPJ não pode estar vazio'
                    });
                }
                if (cnpj.length != 14) {
                    return res.status(400).json({
                        sucesso: false,
                        erro: 'CNPJ inválida',
                        mensagem: 'A CNPJ precisa ser válida'
                    });
                }
                dadosAtualizacao.cnpj = cnpj.trim();
            }

            if (endereco !== undefined) {
                const enderecoRegex = /^[a-zA-ZÀ-ÿ0-9\s,.\-\/ª°º]{5,150}$/;
                if (endereco.trim() === '') {
                    return res.status(400).json({
                        sucesso: false,
                        erro: 'Endereço vazio',
                        mensagem: 'O endereço não pode estar vazio'
                    });
                }
                if (!enderecoRegex.test(endereco)) {
                    return res.status(400).json({
                        sucesso: false,
                        erro: 'Endereço inválido',
                        mensagem: 'O endereço não deve conter caracteres especiais'
                    });
                }
                dadosAtualizacao.endereco = endereco.trim();
            }

            if (empresa !== undefined) {
                if (empresa.trim() === '') {
                    return res.status(400).json({
                        sucesso: false,
                        erro: 'Empresa vazio',
                        mensagem: 'O nome da empresa não pode estar vazio'
                    });
                }
                dadosAtualizacao.empresa = empresa.trim();
            }

            if (cargo !== undefined) {
                const cargoRegex = /^[a-zA-ZÀ-ÿ0-9\s\+\-\.#&/]{2,60}$/;
                if (cargo.trim() === '') {
                    return res.status(400).json({
                        sucesso: false,
                        erro: 'Cargo vazio',
                        mensagem: 'O cargo não pode estar vazio'
                    });
                }
                if (!cargoRegex.test(cargo)) {
                    return res.status(400).json({
                        sucesso: false,
                        erro: 'Cargo inválido',
                        mensagem: 'O cargo não deve conter caracteres especiais'
                    });
                }
                dadosAtualizacao.cargo = cargo.trim();
            }

            if (email !== undefined) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    return res.status(400).json({
                        sucesso: false,
                        erro: 'Email inválido',
                        mensagem: 'Formato de email inválido'
                    });
                }
                
                // Verificar se o email já está em uso por outro usuário
                const usuarioComEmail = await UsuarioModel.buscarPorEmail(email);
                if (usuarioComEmail && usuarioComEmail.id_user !== parseInt(id_user)) {
                    return res.status(409).json({
                        sucesso: false,
                        erro: 'Email já cadastrado',
                        mensagem: 'Este email já está sendo usado por outro usuário'
                    });
                }
                
                dadosAtualizacao.email = email.trim().toLowerCase();
            }

            const saltRounds = 10;
            const senhaHash = await bcrypt.hash(senha, saltRounds);

            if (senha !== undefined) {
                if (senha.length < 6) {
                    return res.status(400).json({
                        sucesso: false,
                        erro: 'Senha muito curta',
                        mensagem: 'A senha deve ter pelo menos 6 caracteres'
                    });
                }
                const saltRounds = 10;
                const senhaHash = await bcrypt.hash(senha, saltRounds);
                dadosAtualizacao.senha = senhaHash;
            }

            if (tipo !== undefined) {
                dadosAtualizacao.tipo = tipo;
            }

            if (cep !== undefined) {
                if (cep.trim() === '') {
                    return res.status(400).json({
                        sucesso: false,
                        erro: 'CEP vazio',
                        mensagem: 'O CEP não pode estar vazio'
                    });
                }
                if (cep.length != 9) {
                    return res.status(400).json({
                        sucesso: false,
                        erro: 'CEP inválido',
                        mensagem: 'O CEP precisa ser válido'
                    });
                }
                dadosAtualizacao.cep = cep.trim();
            }

            // Verificar se há dados para atualizar
            if (Object.keys(dadosAtualizacao).length === 0) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Nenhum dado para atualizar',
                    mensagem: 'Forneça pelo menos um campo para atualizar'
                });
            }

            // Atualizar usuário
            const resultado = await UsuarioModel.atualizar(id_user, dadosAtualizacao);
            
            res.status(200).json({
                sucesso: true,
                mensagem: 'Usuário atualizado com sucesso',
                dados: {
                    linhasAfetadas: resultado || 1
                }
            });
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível atualizar o usuário'
            });
        }
    }

    // DELETE /usuarios/:id - Excluir usuário (apenas admin)
    static async excluirUsuario(req, res) {
        try {
            const { id_user } = req.params;
            
            // Validação do ID
            if (!id_user || isNaN(id_user)) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'ID inválido',
                    mensagem: 'O ID deve ser um número válido'
                });
            }

            // Verificar se o usuário existe
            const usuarioExistente = await UsuarioModel.buscarPorId(id_user);
            if (!usuarioExistente) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Usuário não encontrado',
                    mensagem: `Usuário com ID ${id_user} não foi encontrado`
                });
            }

            // Excluir usuário
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