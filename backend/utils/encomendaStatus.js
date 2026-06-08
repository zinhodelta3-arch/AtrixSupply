export const STATUS_ENCOMENDA = Object.freeze({
    SOLICITADA: 'solicitada',
    AGUARDANDO_ORCAMENTO: 'aguardando_orcamento',
    ORCAMENTO_RECEBIDO: 'orcamento_recebido',
    ORCAMENTO_ESCOLHIDO: 'orcamento_escolhido',
    AGUARDANDO_LOGISTICA: 'aguardando_logistica',
    LOGISTICA_DEFINIDA: 'logistica_definida',
    PREPARANDO_ENVIO: 'preparando_envio',
    EM_TRANSPORTE: 'em_transporte',
    ENTREGUE: 'entregue',
    CANCELADA: 'cancelada',
    RECUSADA: 'recusada'
});

const STATUS_LEGADOS = Object.freeze({
    pendente: STATUS_ENCOMENDA.SOLICITADA,
    em_andamento: STATUS_ENCOMENDA.EM_TRANSPORTE,
    finalizado: STATUS_ENCOMENDA.ENTREGUE,
    cancelado: STATUS_ENCOMENDA.CANCELADA,
    verificado: STATUS_ENCOMENDA.LOGISTICA_DEFINIDA,
    concluido: STATUS_ENCOMENDA.ENTREGUE
});

export const STATUS_ENCOMENDA_LABELS = Object.freeze({
    [STATUS_ENCOMENDA.SOLICITADA]: 'Solicitacao enviada',
    [STATUS_ENCOMENDA.AGUARDANDO_ORCAMENTO]: 'Aguardando orcamento',
    [STATUS_ENCOMENDA.ORCAMENTO_RECEBIDO]: 'Orcamento recebido',
    [STATUS_ENCOMENDA.ORCAMENTO_ESCOLHIDO]: 'Orcamento escolhido',
    [STATUS_ENCOMENDA.AGUARDANDO_LOGISTICA]: 'Aguardando logistica',
    [STATUS_ENCOMENDA.LOGISTICA_DEFINIDA]: 'Logistica definida',
    [STATUS_ENCOMENDA.PREPARANDO_ENVIO]: 'Preparando envio',
    [STATUS_ENCOMENDA.EM_TRANSPORTE]: 'Em transporte',
    [STATUS_ENCOMENDA.ENTREGUE]: 'Entregue',
    [STATUS_ENCOMENDA.CANCELADA]: 'Cancelada',
    [STATUS_ENCOMENDA.RECUSADA]: 'Recusada'
});

export function normalizarStatusEncomenda(status, fallback = STATUS_ENCOMENDA.SOLICITADA) {
    const valor = String(status || '').trim().toLowerCase();

    if (!valor) return fallback;
    if (STATUS_LEGADOS[valor]) return STATUS_LEGADOS[valor];
    if (Object.values(STATUS_ENCOMENDA).includes(valor)) return valor;

    return fallback;
}

export function formatarStatusEncomenda(status) {
    const statusNormalizado = normalizarStatusEncomenda(status);
    return STATUS_ENCOMENDA_LABELS[statusNormalizado] || 'Status em analise';
}

export function podeEditarDadosBasicos(status) {
    const statusNormalizado = normalizarStatusEncomenda(status);

    return [
        STATUS_ENCOMENDA.SOLICITADA,
        STATUS_ENCOMENDA.AGUARDANDO_ORCAMENTO
    ].includes(statusNormalizado);
}

export function podeDefinirLogistica(status, usuario, motivoAdmin = '') {
    const statusNormalizado = normalizarStatusEncomenda(status);
    const tipoUsuario = String(usuario?.tipo || '').trim().toLowerCase();
    const adminComMotivo = ['admin', 'administrador'].includes(tipoUsuario) && String(motivoAdmin || '').trim();

    return Boolean(adminComMotivo) || [
        STATUS_ENCOMENDA.ORCAMENTO_ESCOLHIDO,
        STATUS_ENCOMENDA.AGUARDANDO_LOGISTICA,
        STATUS_ENCOMENDA.LOGISTICA_DEFINIDA
    ].includes(statusNormalizado);
}

export function anexarStatusApresentacao(encomenda) {
    if (!encomenda) return encomenda;

    const statusNormalizado = normalizarStatusEncomenda(encomenda.status);

    return {
        ...encomenda,
        status_normalizado: statusNormalizado,
        status_label: formatarStatusEncomenda(statusNormalizado)
    };
}
