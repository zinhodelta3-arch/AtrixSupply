CREATE TABLE usuarios (
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    nome_user VARCHAR(150) NOT NULL,
    cnpj VARCHAR(18) UNIQUE,
    endereco VARCHAR(255),
    foto VARCHAR(255),
    empresa VARCHAR(150),
    cargo VARCHAR(100),
    descricao TEXT,
    tipo ENUM('fornecedor','administrador', 'comum') NOT NULL DEFAULT 'comum',
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    cep VARCHAR(9) 
);

CREATE TABLE produtos (
    id_produto INT AUTO_INCREMENT PRIMARY KEY,
    nome_produto VARCHAR(150) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    descricao TEXT,
    estoque INT NOT NULL DEFAULT 0,
    imagem varchar(255),
    fornecedor varchar(150),
    categoria varchar(150)
);

CREATE TABLE logistica (
    id_logistica INT AUTO_INCREMENT PRIMARY KEY,
    id_dono INT NOT NULL,
    nome_logistica VARCHAR(150) NOT NULL,
    veiculo ENUM(
        'caminhão', 'van', 'moto', 'carro', 'bicicleta', 'não selecionado') NOT NULL DEFAULT 'não selecionado',
	disponibilidade ENUM(
        'disponivel', 'ocupado', 'manutencao') NOT NULL DEFAULT 'disponivel',
    destino VARCHAR(255) NULL,
    
	CONSTRAINT fk_logistica_dono
	FOREIGN KEY (id_dono)
	REFERENCES usuarios(id_user)
);

CREATE TABLE encomendas (
    id_encomenda INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    id_fornecedor INT NULL,
    pecas INT NOT NULL,
    descricao TEXT,
    status ENUM(
        'pendente', 'em_andamento', 'finalizado', 'cancelado') NOT NULL DEFAULT 'pendente',
    orcamento DECIMAL(10,2) NULL,
    data_com DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    data_entrega DATETIME NULL,
    id_logistica INT NULL,

    CONSTRAINT fk_encomenda_usuario
        FOREIGN KEY (id_user)
        REFERENCES usuarios(id_user),

    CONSTRAINT fk_encomenda_fornecedor
        FOREIGN KEY (id_fornecedor)
        REFERENCES usuarios(id_user),

    CONSTRAINT fk_encomenda_logistica
        FOREIGN KEY (id_logistica)
        REFERENCES logistica(id_logistica)
);

CREATE TABLE orcamentos (
    id_orcamento INT AUTO_INCREMENT PRIMARY KEY,
    id_encomenda INT NOT NULL
    nome_orcamento VARCHAR(255) NOT NULL,
    tipo_orcamento VARCHAR(255) NOT NULL,
    estimacao DECIMAL(10,2) NOT NULL,
    estado ENUM('visivel', 'invisivel', 'escolhida') NOT NULL DEFAULT 'invisivel',

    CONSTRAINT fk_orcamento_encomenda
        FOREIGN KEY (id_encomenda)
        REFERENCES encomendas(id_encomenda)
);

CREATE TABLE pedidos (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    id_produto INT NOT NULL,
    data_pedido DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    data_entrega DATE NULL,

    status ENUM('pendente', 'processando', 'enviado', 'entregue', 'cancelado') NOT NULL DEFAULT 'pendente',

    CONSTRAINT fk_pedido_user
        FOREIGN KEY (id_user)
        REFERENCES usuarios(id_user),

    CONSTRAINT fk_pedido_produto
        FOREIGN KEY (id_produto)
        REFERENCES produtos(id_produto)
);

CREATE TABLE IF NOT EXISTS logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_usuarios INT,
    rota VARCHAR(255) NOT NULL,
    metodo VARCHAR(10) NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    status_code INT,
    tempo_resposta_ms INT,
    data_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
    dados_requisicao JSON,
    dados_resposta JSON,
    FOREIGN KEY (id_usuarios) REFERENCES usuarios(id_user) ON DELETE SET NULL
    );
    
CREATE INDEX idx_logs_id_usuario ON logs(id_usuarios);
CREATE INDEX idx_logs_data_hora ON logs(data_hora);
CREATE INDEX idx_logs_rota ON logs(rota);
CREATE INDEX idx_logs_metodo ON logs(metodo);
CREATE INDEX idx_logs_status_code ON logs(status_code);


INSERT INTO usuarios (
    nome_user,
    cnpj,
    endereco,
    foto,
    empresa,
    cargo,
    descricao,
    tipo,
    email,
    senha,
    cep
) VALUES (
    'carlos prates',
    '12.345.678/0001-90',
    'Rua das Flores, 120 - São Paulo/SP',
    'carlos.png',
    'Silva Tech',
    'Gerente',
    'Fornecedor de peças industriais',
    'fornecedor',
    'carlos@pratestech.com',
    '$2a$10$buPZe1aioomTKna06bHeCeHwbXMGb0ivFQM2FjZrY4zUzE.ixPMAm',
    '05273-120'
);

INSERT INTO usuarios (
    nome_user,
    cnpj,
    endereco,
    foto,
    empresa,
    cargo,
    descricao,
    tipo,
    email,
    senha,
    cep
) VALUES (
    'marie moreau',
    '98.765.432/0001-11',
    'Av. Paulista, 500 - São Paulo/SP',
    'marie.png',
    'Costa Imports',
    'Compradora',
    'Cliente especializado em importações',
    'comum',
    'marie@moreauimports.com',
    'senha123',
    '01310-000'
);

INSERT INTO usuarios (
    nome_user,
    cnpj,
    endereco,
    foto,
    empresa,
    cargo,
    descricao,
    tipo,
    email,
    senha,
    cep
) VALUES (
    'jorel garcia',
    '45.222.111/0001-77',
    'Rua Central, 89 - Campinas/SP',
    'jorel.png',
    'Almeida Transportes',
    'Motorista',
    'Responsável pela logística e entregas',
    'admin',
    'jorel@garciatransportes.com',
    'abc123',
    '13056-297'
);

INSERT INTO usuarios (
    nome_user,
    cnpj,
    endereco,
    foto,
    empresa,
    cargo,
    descricao,
    tipo,
    email,
    senha,
    cep
) VALUES (
    'Julio Cesar',
    '54.987.321/0001-45',
    'Avenida Brasil, 850 - Curitiba/PR',
    'julio.png',
    'Silva Tech',
    'Gerente',
    'Especialista em fornecimento de equipamentos industriais e logística empresarial',
    'fornecedor',
    'julio@cesartech.com',
    '$2a$10$buPZe1aioomTKna06bHeCeHwbXMGb0ivFQM2FjZrY4zUzE.ixPMAm',
    '80040-120'
);

INSERT INTO usuarios (
    nome_user,
    cnpj,
    endereco,
    foto,
    empresa,
    cargo,
    descricao,
    tipo,
    email,
    senha,
    cep
) VALUES (
    'Magno Abrão',
    '33.654.987/0001-22',
    'Rua XV de Novembro, 340 - Belo Horizonte/MG',
    'marie.png',
    'Costa Imports',
    'Compradora',
    'Responsável pela negociação e importação de equipamentos tecnológicos e industriais',
    'comum',
    'magno@abraoimports.com',
    'magno2026',
    '30140-080'
);

INSERT INTO usuarios (
    nome_user,
    cnpj,
    endereco,
    foto,
    empresa,
    cargo,
    descricao,
    tipo,
    email,
    senha,
    cep
) VALUES (
    'Laura Santos',
    '67.890.123/0001-54',
    'Rua José Paulino, 415 - Campinas/SP',
    'laura.png',
    'Almeida Transportes',
    'Coordenadora de Logística',
    'Especialista em gerenciamento de transporte, distribuição e controle de entregas empresariais',
    'admin',
    'laura@santostransportes.com',
    'Laura2026',
    '13013-001'
);


INSERT INTO produtos (
    nome_produto,
    preco,
    descricao,
    estoque,
    imagem,
    fornecedor,
    categoria
) VALUES (
    'Motor Elétrico Industrial',
    2500.00,
    'Motor elétrico trifásico de alta potência',
    15,
    'motor_eletrico.png',
    'Silva Tech',
    'motores'
);

INSERT INTO produtos (
    nome_produto,
    preco,
    descricao,
    estoque,
    imagem,
    fornecedor,
    categoria
) VALUES (
    'Parafuso de Aço Inox',
    1.50,
    'Parafuso resistente à corrosão para uso industrial',
    500,
    'parafuso_inox.png',
    'Silva Tech',
    'ferragens'
);

INSERT INTO produtos (
    nome_produto,
    preco,
    descricao,
    estoque,
    imagem,
    fornecedor,
    categoria
) VALUES (
    'Painel Solar 550W',
    1899.99,
    'Painel solar monocristalino de alta eficiência',
    30,
    'painel_solar.png',
    'Silva Tech',
    'energia solar'
);


INSERT INTO logistica (
    id_dono,
    nome_logistica,
    veiculo,
    disponibilidade,
    destino
) VALUES (
    1,
    'Silva Transportes',
    'caminhao',
    'disponivel',
    'Campinas/SP'
);

INSERT INTO logistica (
    id_dono,
    nome_logistica,
    veiculo,
    disponibilidade,
    destino
) VALUES (
    3,
    'Almeida Express',
    'van',
    'ocupado',
    'Santos/SP'
);

INSERT INTO logistica (
    id_dono,
    nome_logistica,
    veiculo,
    disponibilidade,
    destino
) VALUES (
    1,
    'Entrega Rápida SP',
    'moto',
    'manutencao',
    NULL
);


INSERT INTO encomendas (
    id_user,
    id_fornecedor,
    pecas,
    descricao,
    status,
    orcamento,
    data_com,
    data_entrega,
    id_logistica
) VALUES (
    2,
    1,
    50,
    'Encomenda de motores elétricos industriais',
    'em_andamento',
    125000.00,
    '2026-05-10 09:30:00',
    '2026-05-25 18:00:00',
    1
);

INSERT INTO encomendas (
    id_user,
    id_fornecedor,
    pecas,
    descricao,
    status,
    orcamento,
    data_com,
    data_entrega,
    id_logistica
) VALUES (
    2,
    3,
    200,
    'Pedido de parafusos de aço inox',
    'pendente',
    300.00,
    '2026-05-15 14:00:00',
    NULL,
    2
);

INSERT INTO encomendas (
    id_user,
    id_fornecedor,
    pecas,
    descricao,
    status,
    orcamento,
    data_com,
    data_entrega,
    id_logistica
) VALUES (
    1,
    NULL,
    10,
    'Solicitação de orçamento para painéis solares',
    'finalizado',
    18999.90,
    '2026-04-20 11:15:00',
    '2026-05-01 16:00:00',
    3
);


INSERT INTO pedidos (
    id_user,
    id_produto,
    data_pedido,
    data_entrega,
    status
) VALUES (
    2,
    1,
    '2026-05-11 10:00:00',
    '2026-05-20 15:30:00',
    'enviado'
);

INSERT INTO pedidos (
    id_user,
    id_produto,
    data_pedido,
    data_entrega,
    status
) VALUES (
    1,
    3,
    '2026-05-14 09:45:00',
    NULL,
    'processando'
);

INSERT INTO pedidos (
    id_user,
    id_produto,
    data_pedido,
    data_entrega,
    status
) VALUES (
    3,
    2,
    '2026-05-18 13:20:00',
    '2026-05-19 17:00:00',
    'entregue'
);