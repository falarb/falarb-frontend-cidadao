export const helpConfigs = {
    step001: {
        title: "Tela Inicial",
        content: (
            <div>
                <p><strong>Bem-vindo ao SolicitaAi!</strong></p>
                <p>Esta é a tela inicial do sistema onde você pode:</p>
                <ul>
                    <li><strong>Realizar solicitação:</strong> Inicia o processo de criação de uma nova solicitação</li>
                    <li><strong>Acompanhar solicitação:</strong> Permite verificar o status de uma solicitação já criada usando seu código único</li>
                </ul>
                <h4>Como usar:</h4>
                <ul>
                    <li>Clique em "Realizar solicitação" se você deseja criar uma nova demanda</li>
                    <li>Clique em "Acompanhar solicitação" se você já tem um código de acompanhamento</li>
                </ul>
            </div>
        )
    },

    step002: {
        title: "Inserção do e-mail",
        content: (
            <div>
                <p><strong>Nessa etapa você deve inserir seu e-mail</strong></p>
                <p><strong>Caso você já tenha criado outra(s) solicitação(ões)</strong>, utilize o mesmo e-mail para facilitar a identificação. Será enviado um novo código de identificação para este e-mail.</p>
                <p><strong>Caso seja seu primeiro acesso</strong>, utilize um e-mail válido e você será redirecionado para uma tela onde irá inserir suas informações pessoais para criação de conta.</p>
            </div>
        )
    },

    step003: {
        title: "Validação do código",
        content: (
            <div>
                <p><strong>Nessa etapa será verificado o código enviado para seu e-mail</strong></p>
                <p>Para garantirmos a segurança da sua solicitação, precisamos validar o código que foi enviado para o seu e-mail.</p>
                <p>Por favor, verifique sua caixa de entrada e insira o código</p>
            </div>
        )
    },

    step004: {
        title: "Detalhamento da Solicitação",
        content: (
            <div>
                <p><strong>Aqui você deverá especificar sua solicitação</strong></p>
                <p>Forneça o máximo de informações possível sobre sua demanda:</p>
                <h4>Informações a incluir:</h4>
                <ul>
                    <li><strong>Comunidade (obrigatório):</strong> Escolha a comunidade onde o serviço será realizado</li>
                    <li><strong>Categoria (obrigatório):</strong> Selecione a categoria que melhor descreve o tipo de problema ou solicitação</li>
                    <li><strong>Descrição (opcional):</strong> Descreva sua solicitação de forma clara e objetiva</li>
                </ul>
                <h4>Sobre a descrição:</h4>
                <ul>
                    <li>Caso sejam identificados termos ofensivos, sua solicitação não será processada</li>
                    <li>Seja claro e objetivo</li>
                    <li>Use linguagem simples e direta</li>
                    <li>Inclua informações que possam ajudar a encontrar o local</li>
                </ul>
            </div>
        )
    },

    step005: {
        title: "Localização no Mapa",
        content: (
            <div>
                <p><strong>Marque o local exato da sua solicitação</strong></p>
                <p>Use o mapa para indicar precisamente o local em que o serviço será realizado.</p>
                <h4>Como usar o mapa:</h4>
                <ul>
                    <li><strong>Localização automática:</strong> Clique em "Ir para localização atual" para centralizar o mapa no seu ponto atual</li>
                    <li><strong>Navegação:</strong> Use o mouse para navegar pelo mapa</li>
                    <li><strong>Marcação:</strong> Clique no local exato para colocar o marcador</li>
                    <li><strong>Ajuste:</strong> Você pode mover o marcador clicando em outro ponto</li>
                </ul>
                <h4>Dicas importantes:</h4>
                <ul>
                    <li>Seja o mais preciso possível na localização</li>
                    <li>Use pontos de referência para se orientar</li>
                    <li>A localização precisa acelera o atendimento</li>
                    <li>Locais fora do município de Rebouças não serão aceitos</li>
                </ul>

                <p>Ao clicar em finalizar, sua solicitação será enviada para análise. Também enviaremos para você um e-mail com o código unico da sua solicitação para futuras consultas.</p>
            </div>
        )
    },

    step006: {
        title: "Cadastro do cidadão",
        content: (
            <div>
                <p><strong>Aqui você deve adicionar alguns dados pessoais</strong></p>
                <p>Para realizarmos o seu cadastro, precisamos que você preencha as informações abaixo:</p>
                <ul>
                    <li>Nome (informação obrigatória)</li>
                    <li>CPF (informação obrigatória)</li>
                    <li>Telefone (informação opcional)</li>
                </ul>
                <p>Após clicar em "Próximo passo", será realizado o seu cadastro na plataforma e enviaremos um código único para o seu e-mail.</p>
            </div>
        )
    },

    // Pages
    progress: {
        title: "Acompanhar Solicitação",
        content: (
            <div>
                <p><strong>Consulte o status da sua solicitação</strong></p>
                <p>Use esta tela para verificar o andamento da sua demanda:</p>
                <h4>Como usar:</h4>
                <ul>
                    <li><strong>Código único:</strong> Digite o código que você recebeu após criar a solicitação</li>
                    <li><strong>Consultar:</strong> Clique em consultar para ver o status atual</li>
                    <li><strong>Histórico:</strong> Veja todas as atualizações da solicitação</li>
                </ul>
                <h4>Status possíveis:</h4>
                <ul>
                    <li><strong>Recebida:</strong> Solicitação foi registrada no sistema</li>
                    <li><strong>Em análise:</strong> Está sendo analisada pela equipe responsável</li>
                    <li><strong>Em andamento:</strong> Ações estão sendo tomadas</li>
                    <li><strong>Concluída:</strong> Problema foi resolvido</li>
                    <li><strong>Cancelada:</strong> Solicitação foi cancelada</li>
                </ul>
            </div>
        )
    },

    reviewProgress: {
        title: "Código da solicitação",
        content: (
            <div>
                <p><strong>Digite o código único da sua solicitação</strong></p>
                <p>Ao criar a solicitação, foi enviado um código único de 6 dígitos para o seu e-mail.</p>
                <p>Digitando esse código você será direcionado para uma área onde será possível visualizar detalhes e o andamento da sua solicitação.</p>
            </div>
        )
    },

    visualizarSolicitacao: {
        title: "Visualizar Solicitação",
        content: (
            <div>
                <p><strong>Visualização completa da solicitação</strong></p>
                <p>Aqui você poderá acompanhar todos os status e atualizações da sua solicitação.</p>
                <h4>Seções disponíveis:</h4>
                <ul>
                    <li><strong>Informações gerais:</strong> Código, data, status atual</li>
                    <li><strong>Dados do solicitante:</strong> Suas informações de contato</li>
                    <li><strong>Detalhes da solicitação:</strong> Categoria, comunidade e descrição completa</li>
                    <li><strong>Localização:</strong> É exibido a latitude e longitude inseridas no mapa</li>
                </ul>
                <h4>Funcionalidades:</h4>
                <ul>
                    <li><strong>Salvar comprovante: </strong> É realizado o download do comprovante em PNG</li>
                    <li><strong>Voltar ao início:</strong> Você será redirecionado para a tela inicial da plataforma</li>
                </ul>
            </div>
        )
    },

    page404: {
        title: "Página Não Encontrada",
        content: (
            <div>
                <p><strong>Página não encontrada - Erro 404</strong></p>
                <p>A página que você está tentando acessar não existe ou foi movida.</p>
                <h4>O que fazer:</h4>
                <ul>
                    <li><strong>Verificar o endereço:</strong> Confira se a URL está correta</li>
                    <li><strong>Voltar ao início:</strong> Use o botão para retornar à página inicial</li>
                    <li><strong>Usar a navegação:</strong> Use o menu principal para encontrar o que procura</li>
                </ul>
                <h4>Possíveis causas:</h4>
                <ul>
                    <li>Link quebrado ou desatualizado</li>
                    <li>Página foi removida ou renomeada</li>
                    <li>Erro de digitação na URL</li>
                </ul>
            </div>
        )
    }
};