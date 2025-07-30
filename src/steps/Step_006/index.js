import { useState } from 'react';
import BtnPrimary from '../../components/Btn/BtnPrimary';
import BtnSecundary from '../../components/Btn/BtnSecundary';
import InputText from '../../components/Input/InputText';
import InputCustomMask from '../../components/Input/InputCustomMask';
import Modal from '../../components/Modal';
import './styles.css';

export default function Step006( { solicitacao, setSolicitacao, onNext, onBack } ) {

    const [modalAberto, setModalAberto] = useState(false);

    const handleChange = (event) => {
        setSolicitacao(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    }

    return (
        <div className='container-step-4'>
            <h1>Quase lá...</h1>

            <h2>Insira seus dados para poder registrar solicitações.</h2>

            <small>Essa etapa só será solicitada uma única vez, nas próximas visitas você será direcionado diretamente ao cadastro de solicitação.</small>

            <InputText
                label='Qual seu nome completo?'
                name='nome_cidadao'
                value={solicitacao.nome_cidadao}
                onChange={handleChange}
                placeholder='Digite seu nome completo'
            />

            <InputCustomMask
                label='Qual seu CPF?'
                name='cpf_cidadao'
                value={solicitacao.cpf_cidadao}
                onChange={handleChange}
                placeholder='999.999.999-99'
                mask='999.999.999-99'
            />

            <InputCustomMask
                label='Qual o número do seu celular?'
                name='celular_cidadao'
                value={solicitacao.celular_cidadao}
                onChange={handleChange}
                placeholder='(12) 3 4567-8910'
                mask='(99) 9 9999-9999'
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