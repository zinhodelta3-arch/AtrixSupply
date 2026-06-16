-- Migration: Insert de dados de users
-- Data: 2026-06-09
-- Descricao: Dados para testes de usuários de diferentes tipos

USE projeto;

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
    'Kyle Gehrman',
    '54.987.323/0001-45',
    'Avenida Brasil, 850 - Curitiba/PR',
    'blood.png',
    'Borne Tech',
    'Gerente',
    'Especialista em organização de equipamentos industriais e logística empresarial',
    'comum',
    'kyle@bornetech.com',
    '$2a$10$buPZe1aioomTKna06bHeCeHwbXMGb0ivFQM2FjZrY4zUzE.ixPMAm',
    '80140-120'
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
    'Rua Maranhão, 357 - Maranhão/MA',
    'julio.png',
    'AtrixSupply',
    'Admin',
    'ADMIN ADMIN ADMIN',
    'administrador',
    'julio@cesartech.com',
    '$2a$10$buPZe1aioomTKna06bHeCeHwbXMGb0ivFQM2FjZrY4zUzE.ixPMAm',
    '80040-120'
);
