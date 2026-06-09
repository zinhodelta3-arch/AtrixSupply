-- Migration: Insert de dados de teste
-- Data: 2026-06-09
-- Descricao: Dados para testes de dados iniciais

USE projeto;

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
    'Motor GW-3300T Wired Conections Yoga Limited',
    'Encomenda de motores elétricos industriais',
    'pendente',
    null,
    '2026-05-10',
    '2026-05-25',
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
    '2026-05-15',
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
    '2026-04-20 ',
    '2026-05-01',
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
    '2026-05-11',
    '2026-05-20',
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
    '2026-05-14',
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
    '2026-05-18',
    '2026-05-19',
    'entregue'
);

INSERT INTO orcamentos (
    id_encomenda, 
    nome_orcamento, 
    tipo_orcamento, 
    estimacao, 
    estado) 
VALUES (
    3,
    "básico",
    "versão barata, mas menos eficiente",
    8000.00,
    "invisivel"
);