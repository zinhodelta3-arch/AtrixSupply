-- Migration: Criar tabela logistica
-- Data: 2026-05-28
-- Descrição: Criação de tabela para armazenar informações de logísticas

USE projeto;

CREATE TABLE logistica (
    id_logistica INT AUTO_INCREMENT PRIMARY KEY,
    id_dono INT NOT NULL,
    nome_logistica VARCHAR(150) NOT NULL,
    veiculo ENUM(
        'caminhao', 'van', 'moto', 'carro', 'bicicleta', 'nao_selecionado') NOT NULL DEFAULT 'nao_selecionado',
	disponibilidade ENUM(
        'disponivel', 'ocupado', 'manutencao') NOT NULL DEFAULT 'disponivel',
    destino VARCHAR(255) NULL,
    
	CONSTRAINT fk_logistica_dono
	FOREIGN KEY (id_dono)
	REFERENCES usuarios(id_user) ON UPDATE CASCADE ON DELETE CASCADE
);