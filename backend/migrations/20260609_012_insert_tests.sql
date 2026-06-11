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


