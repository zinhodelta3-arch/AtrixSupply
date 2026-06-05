import { getConnection } from '../config/database.js';

export function calcularPrazoEntregaDias(veiculo = 'nao_selecionado') {
    const veiculoNormalizado = String(veiculo || 'nao_selecionado')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[\s-]+/g, '_');

    const prazos = {
        moto: 2,
        carro: 3,
        van: 5,
        caminhao: 8,
        bicicleta: 1,
        nao_selecionado: 7
    };

    return prazos[veiculoNormalizado] || prazos.nao_selecionado;
}

export function calcularDataEntregaEstimada(veiculo) {
    const dataEntrega = new Date();
    dataEntrega.setHours(0, 0, 0, 0);
    dataEntrega.setDate(dataEntrega.getDate() + calcularPrazoEntregaDias(veiculo));

    return dataEntrega.toISOString().split('T')[0];
}

export async function atualizarEntregasVencidas() {
    const connection = await getConnection();

    try {
        // Atualização automática segura: só avança registros já enviados/em transporte
        // e que possuem data de entrega vencida.
        await connection.execute(`
            UPDATE encomendas
            SET status = 'entregue'
            WHERE status = 'em_transporte'
              AND data_entrega IS NOT NULL
              AND data_entrega <= CURDATE()
        `);

        await connection.execute(`
            UPDATE pedidos
            SET status = 'entregue'
            WHERE status = 'enviado'
              AND data_entrega IS NOT NULL
              AND data_entrega <= CURDATE()
        `);
    } finally {
        connection.release();
    }
}
