-- Migration: Atualizar fluxo de encomendas, orçamentos e perfil
-- Data: 2026-06-09
-- Descrição: adiciona estados do fluxo completo, fornecedor no orçamento e suporte a admin.

USE projeto;

ALTER TABLE usuarios
    MODIFY tipo ENUM('fornecedor','administrador','admin','comum') NOT NULL DEFAULT 'comum';

ALTER TABLE encomendas
    MODIFY status ENUM(
        'pendente',
        'aguardando_orcamento',
        'orcamento_recebido',
        'orcamento_escolhido',
        'em_producao',
        'aguardando_logistica',
        'em_transporte',
        'entregue',
        'finalizado',
        'cancelado'
    ) NOT NULL DEFAULT 'pendente';

ALTER TABLE orcamentos
    ADD COLUMN id_fornecedor INT NULL AFTER id_encomenda;

UPDATE orcamentos o
JOIN encomendas e ON e.id_encomenda = o.id_encomenda
SET o.id_fornecedor = e.id_fornecedor
WHERE o.id_fornecedor IS NULL
  AND e.id_fornecedor IS NOT NULL;

UPDATE orcamentos
SET id_fornecedor = (
    SELECT id_user
    FROM usuarios
    WHERE tipo = 'fornecedor'
    ORDER BY id_user
    LIMIT 1
)
WHERE id_fornecedor IS NULL;


ALTER TABLE orcamentos
    MODIFY id_fornecedor INT NOT NULL,
    MODIFY estado ENUM('visivel','invisivel','escolhida','recusado','cancelado') NOT NULL DEFAULT 'visivel';
