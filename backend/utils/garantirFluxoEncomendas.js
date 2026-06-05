import { getConnection } from '../config/database.js';

const ENUM_TIPO_USUARIO = "ENUM('fornecedor','administrador','admin','comum') NOT NULL DEFAULT 'comum'";
const ENUM_STATUS_ENCOMENDA = `
    ENUM(
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
    ) NOT NULL DEFAULT 'pendente'
`;
const ENUM_ESTADO_ORCAMENTO =
    "ENUM('visivel','invisivel','escolhida','recusado','cancelado') NOT NULL DEFAULT 'visivel'";

async function colunaExiste(connection, tabela, coluna) {
    const [rows] = await connection.query(
        `
            SELECT COUNT(*) AS total
            FROM INFORMATION_SCHEMA.COLUMNS
            WHERE TABLE_SCHEMA = DATABASE()
              AND TABLE_NAME = ?
              AND COLUMN_NAME = ?
        `,
        [tabela, coluna]
    );

    return Number(rows[0]?.total || 0) > 0;
}

async function constraintExiste(connection, tabela, constraint) {
    const [rows] = await connection.query(
        `
            SELECT COUNT(*) AS total
            FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS
            WHERE TABLE_SCHEMA = DATABASE()
              AND TABLE_NAME = ?
              AND CONSTRAINT_NAME = ?
        `,
        [tabela, constraint]
    );

    return Number(rows[0]?.total || 0) > 0;
}

export async function garantirFluxoEncomendas() {
    let connection;

    try {
        connection = await getConnection();

        await connection.query(`ALTER TABLE usuarios MODIFY tipo ${ENUM_TIPO_USUARIO}`);
        await connection.query(`ALTER TABLE encomendas MODIFY status ${ENUM_STATUS_ENCOMENDA}`);

        const temFornecedorNoOrcamento = await colunaExiste(
            connection,
            'orcamentos',
            'id_fornecedor'
        );

        if (!temFornecedorNoOrcamento) {
            await connection.query(
                'ALTER TABLE orcamentos ADD COLUMN id_fornecedor INT NULL AFTER id_encomenda'
            );
        }

        await connection.query(`ALTER TABLE orcamentos MODIFY estado ${ENUM_ESTADO_ORCAMENTO}`);

        await connection.query(`
            UPDATE orcamentos o
            JOIN encomendas e ON e.id_encomenda = o.id_encomenda
            SET o.id_fornecedor = e.id_fornecedor
            WHERE o.id_fornecedor IS NULL
              AND e.id_fornecedor IS NOT NULL
        `);

        await connection.query(`
            UPDATE orcamentos
            SET id_fornecedor = (
                SELECT id_user
                FROM usuarios
                WHERE tipo = 'fornecedor'
                ORDER BY id_user
                LIMIT 1
            )
            WHERE id_fornecedor IS NULL
              AND EXISTS (
                SELECT 1
                FROM usuarios
                WHERE tipo = 'fornecedor'
                LIMIT 1
              )
        `);

        const temFkFornecedor = await constraintExiste(
            connection,
            'orcamentos',
            'fk_orcamento_fornecedor'
        );

        if (!temFkFornecedor) {
            await connection.query(`
                ALTER TABLE orcamentos
                ADD CONSTRAINT fk_orcamento_fornecedor
                    FOREIGN KEY (id_fornecedor)
                    REFERENCES usuarios(id_user)
                    ON UPDATE CASCADE
                    ON DELETE CASCADE
            `);
        }
    } catch (error) {
        console.error('Não foi possível preparar o fluxo de encomendas:', error.message);
    } finally {
        if (connection) {
            connection.release();
        }
    }
}
