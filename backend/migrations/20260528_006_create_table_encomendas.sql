-- Migration: Criar tabela encomendas
-- Data: 2026-05-28
-- Descrição: Criação de tabela para armazenar informações de encomendas

USE projeto;

CREATE TABLE encomendas (
    id_encomenda INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    id_fornecedor INT NULL,
    pecas VARCHAR(255) NOT NULL,
    descricao TEXT,
    status ENUM(
        'pendente', 'em_andamento', 'finalizado', 'cancelado') NOT NULL DEFAULT 'pendente',
    orcamento DECIMAL(10,2) NULL,
    data_com DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    data_entrega DATE NULL,
    id_logistica INT NULL,

    CONSTRAINT fk_encomenda_usuario
        FOREIGN KEY (id_user)
        REFERENCES usuarios(id_user) ON UPDATE CASCADE ON DELETE CASCADE,

    CONSTRAINT fk_encomenda_fornecedor
        FOREIGN KEY (id_fornecedor)
        REFERENCES usuarios(id_user) ON UPDATE CASCADE ON DELETE CASCADE,

    CONSTRAINT fk_encomenda_logistica
        FOREIGN KEY (id_logistica)
        REFERENCES logistica(id_logistica) ON UPDATE CASCADE ON DELETE CASCADE
);