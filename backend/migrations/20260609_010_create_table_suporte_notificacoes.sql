-- Migration: Criar suporte e notificacoes
-- Data: 2026-06-09
-- Descricao: Tickets de suporte e notificacoes por usuario.

USE projeto;

CREATE TABLE IF NOT EXISTS suporte_tickets (
    id_ticket INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    assunto VARCHAR(150) NOT NULL,
    categoria VARCHAR(80) DEFAULT 'geral',
    mensagem TEXT NOT NULL,
    status ENUM('aberto', 'em_atendimento', 'respondido', 'fechado') NOT NULL DEFAULT 'aberto',
    resposta_admin TEXT,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES usuarios(id_user) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS notificacoes (
    id_notificacao INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    titulo VARCHAR(150) NOT NULL,
    mensagem TEXT NOT NULL,
    tipo VARCHAR(50) DEFAULT 'sistema',
    lida TINYINT(1) NOT NULL DEFAULT 0,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES usuarios(id_user) ON DELETE CASCADE
);

CREATE INDEX idx_suporte_tickets_id_user ON suporte_tickets(id_user);
CREATE INDEX idx_suporte_tickets_status ON suporte_tickets(status);
CREATE INDEX idx_notificacoes_id_user_lida ON notificacoes(id_user, lida);
