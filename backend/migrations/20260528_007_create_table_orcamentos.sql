-- Migration: Criar tabela orcamentos
-- Data: 2026-05-28
-- Descrição: Criação de tabela para armazenar informações de orçamentos

USE projeto;

CREATE TABLE orcamentos (
    id_orcamento INT AUTO_INCREMENT PRIMARY KEY,
    id_encomenda INT NOT NULL,
    id_fornecedor INT NOT NULL,
    nome_orcamento VARCHAR(255) NOT NULL,
    tipo_orcamento VARCHAR(255) NOT NULL,
    estimacao DECIMAL(10,2) NOT NULL,
    estado ENUM('visivel', 'invisivel', 'escolhida', 'recusado', 'cancelado') NOT NULL DEFAULT 'visivel',

    CONSTRAINT fk_orcamento_encomenda
        FOREIGN KEY (id_encomenda)
        REFERENCES encomendas(id_encomenda) ON UPDATE CASCADE ON DELETE CASCADE,

    CONSTRAINT fk_orcamento_fornecedor
        FOREIGN KEY (id_fornecedor)
        REFERENCES usuarios(id_user) ON UPDATE CASCADE ON DELETE CASCADE
);
