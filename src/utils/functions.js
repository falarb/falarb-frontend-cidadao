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

function formataCpf(cpf) {
    if (!cpf) return '--';

    cpf = cpf.replace(/\D/g, '');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return cpf;
}

function formataTelefone(telefone) {
    if (!telefone) return '--';

    telefone = telefone.replace(/\D/g, '');
    telefone = telefone.replace(/(\d{2})(\d)/, '($1) $2');
    telefone = telefone.replace(/(\d{5})(\d)/, '$1-$2');
    return telefone;
}


function limparCpf(cpf) {
    if (!cpf) return '';
    return cpf.replace(/\D/g, '');
}

function limparTelefone(telefone) {
    if (!telefone) return '';
    return telefone.replace(/\D/g, '');
}

function validarCPF(cpf) {
    cpf = limparCpf(cpf);

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false;
    }

    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) return false;

    return true;
}

export { deslogarCidadao, parseStatus, pegaCorStatus, formataCpf, formataTelefone, limparCpf, limparTelefone, validarCPF };