-- Migration: Criar tabela usuarios
-- Data: 2026-05-28
-- Descrição: Criação de tabela para armazenar informações de usuários

USE projeto;

CREATE TABLE usuarios (
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    nome_user VARCHAR(150) NOT NULL,
    cnpj VARCHAR(18) UNIQUE,
    endereco VARCHAR(255),
    foto VARCHAR(255),
    empresa VARCHAR(150),
    cargo VARCHAR(100),
    descricao TEXT,
    tipo ENUM('fornecedor','administrador', 'admin', 'comum') NOT NULL DEFAULT 'comum',
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    cep VARCHAR(9) 
);
