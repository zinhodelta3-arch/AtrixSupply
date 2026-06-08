-- Migration: Permitir aliases de administrador no tipo de usuario
-- Data: 2026-06-07
-- Descricao: Alinha o ENUM com os tipos aceitos pela API e frontend.

USE projeto;

ALTER TABLE usuarios
    MODIFY tipo ENUM('fornecedor', 'administrador', 'admin', 'comum') NOT NULL DEFAULT 'comum';
