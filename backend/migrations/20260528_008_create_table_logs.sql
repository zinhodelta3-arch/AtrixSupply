-- Migration: Criar tabela logs
-- Data: 2026-05-28
-- Descrição: Criação de tabela para armazenar informações de requisições passadas

USE projeto;

CREATE TABLE IF NOT EXISTS logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_usuarios INT,
    rota VARCHAR(255) NOT NULL,
    metodo VARCHAR(10) NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    status_code INT,
    tempo_resposta_ms INT,
    data_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
    dados_requisicao JSON,
    dados_resposta JSON,
    FOREIGN KEY (id_usuarios) REFERENCES usuarios(id_user) ON DELETE SET NULL
    );
    
CREATE INDEX idx_logs_id_usuario ON logs(id_usuarios);
CREATE INDEX idx_logs_data_hora ON logs(data_hora);
CREATE INDEX idx_logs_rota ON logs(rota);
CREATE INDEX idx_logs_metodo ON logs(metodo);
CREATE INDEX idx_logs_status_code ON logs(status_code);