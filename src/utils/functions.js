function deslogarCidadao() {
    localStorage.removeItem("cidadaoId");
    localStorage.removeItem("cidadaoExpiracao");
    window.location.reload();
}

function parseStatus(status) {
    switch (status?.toLowerCase()) {
        case 'analise':
            return 'Em Análise';
        case 'concluida':
            return 'Concluída';
        case 'agendada':
            return 'Agendada';
        case 'indeferida':
            return 'Indeferida';
        default:
            return 'Desconhecido';
    }
}

function pegaCorStatus(status) {
    switch (status) {
        case 'analise':
            return '#f59e0b';
        case 'concluida':
            return '#22c55e';
        case 'agendada':
            return '#f59e0b';
        case 'indeferida':
            return '#ef4444';
        default:
            return '#9ca3af';
    }
}

export { deslogarCidadao, parseStatus, pegaCorStatus };