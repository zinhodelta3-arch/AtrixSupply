-- Migration: Criar tabela uprodutos
-- Data: 2026-05-28
-- Descrição: Criação de tabela para armazenar informações de produtos

USE projeto;


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