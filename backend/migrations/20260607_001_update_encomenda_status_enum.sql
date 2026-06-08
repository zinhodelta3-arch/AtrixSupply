-- Migration: Normalizar status de encomendas
-- Data: 2026-06-07
-- Descricao: amplia o ENUM para a maquina de estados de encomenda sem quebrar dados legados.

USE projeto;

ALTER TABLE encomendas
    MODIFY status ENUM(
        'pendente',
        'em_andamento',
        'finalizado',
        'cancelado',
        'verificado',
        'concluido',
        'solicitada',
        'aguardando_orcamento',
        'orcamento_recebido',
        'orcamento_escolhido',
        'aguardando_logistica',
        'logistica_definida',
        'preparando_envio',
        'em_transporte',
        'entregue',
        'cancelada',
        'recusada'
    ) NOT NULL DEFAULT 'solicitada';

UPDATE encomendas SET status = 'solicitada' WHERE status = 'pendente';
UPDATE encomendas SET status = 'em_transporte' WHERE status = 'em_andamento';
UPDATE encomendas SET status = 'entregue' WHERE status IN ('finalizado', 'concluido');
UPDATE encomendas SET status = 'cancelada' WHERE status = 'cancelado';
UPDATE encomendas SET status = 'logistica_definida' WHERE status = 'verificado';
