import { useState } from 'react';
import BtnPrimary from '../../components/Btn/BtnPrimary';
import BtnSecundary from '../../components/Btn/BtnSecundary';
import SelectCustom from '../../components/SelectCustom';
import TextArea from '../../components/TextArea';
import Modal from '../../components/Modal';
import './styles.css';

export default function Step004( { solicitacao, setSolicitacao, onNext, onBack } ) {

    const [modalAberto, setModalAberto] = useState(false);

    const handleChange = (event) => {
        setSolicitacao(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    }

    return (
        <div className='container-step-4'>

            <h2>Bem vindo ao <span className='accent-color'>SolicitaAi</span></h2>

            <h1>Vamos lá?</h1>

            <h2>Tudo certo e verificado, você já pode começar sua solicitação.</h2>

            <small>É extremamente importante que você siga todos os passos, inserir todos os campos abaixo solicitados e ao final clicar em “Enviar solicitação”</small>

            <SelectCustom
                label='Selecione qual a sua comunidade'
                name='comunidade'
                value={solicitacao.comunidade}
                onChange={handleChange}
            >
                <option value='comunidade_001'>Comunidade 001</option>
            </SelectCustom>

            <SelectCustom
                label='Selecione o tipo de solicitação'
                name='tipoSolicitacao'
                value={solicitacao.tipoSolicitacao}
                onChange={handleChange}
            >
                <option value='tipo_solicitacao_001'>Tipo solicitacao 001</option>
            </SelectCustom>

            <TextArea
                label='Descreva sua solicitação'
                name='descricao'
                placeholder='Descreva sua solicitação aqui...'
                value={solicitacao.descricao}
                onChange={handleChange}
            />

            <BtnPrimary
                onClick={ () => {
                    if (solicitacao.comunidade && solicitacao.tipoSolicitacao) {
                        onNext();
                    } else {
                        alert('Por favor, selecione corretamente os campos.');
                    }
                }}
            >
                Próximo passo
            </BtnPrimary>

            <BtnSecundary
                adicionalClass='btn-back'
                onClick={onBack}
            >
                Voltar uma etapa
            </BtnSecundary>

            <BtnSecundary
                adicionalClass='btn-cancel '
                onClick={ () => { 
                    setModalAberto(true);
                }}
            >
                Cancelar solicitacao
            </BtnSecundary>

            {modalAberto && 
                <Modal
                    type="warning"
                    title="Cancelar solicitação"
                    description="Tem certeza que deseja cancelar a solicitação? Os dados não serão salvos."
                    onCancel={() => setModalAberto(false)}
                    onConfirm={() => {
                        window.location.reload();
                    }}
                >
                </Modal>
            }
    </div>
    )

}