-- Migration: Criar tabela pedidos
-- Data: 2026-05-28
-- Descrição: Criação de tabela para armazenar informações de pedidos

USE projeto;

CREATE TABLE pedidos (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    id_produto INT NOT NULL,
    data_pedido DATE NOT NULL,
    data_entrega DATE NULL,

    status ENUM('carrinho', 'pendente', 'processando', 'enviado', 'entregue', 'cancelado') NOT NULL DEFAULT 'pendente',

    CONSTRAINT fk_pedido_user
        FOREIGN KEY (id_user)
        REFERENCES usuarios(id_user) ON UPDATE CASCADE ON DELETE CASCADE,

    CONSTRAINT fk_pedido_produto
        FOREIGN KEY (id_produto)
        REFERENCES produtos(id_produto) ON UPDATE CASCADE ON DELETE CASCADE
);