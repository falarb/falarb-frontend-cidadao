import { useState } from 'react';
import BtnPrimary from '../../components/Btn/BtnPrimary';
import BtnSecundary from '../../components/Btn/BtnSecundary';
import InputEmail from '../../components/Input/InputEmail';
import Modal from '../../components/Modal';
import './styles.css';

export default function Step002( { solicitacao, setSolicitacao, onNext, onBack } ) {

    const [modalAberto, setModalAberto] = useState(false);
    const [validate, setValidate] = useState(false);

    const handleChange = (event) => {
        setSolicitacao(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    }

    return (
        <div className='container-step-2'>

            <h2>Bem vindo ao <span className='accent-color'>SolicitaAi</span></h2>

            <h1>Vamos lá?</h1>

            <InputEmail
                label='Digite seu e-mail'
                name='email'
                placeholder='exemplo@email.com'
                value={solicitacao.email}
                onChange={handleChange}
                validate={validate}
                setValidade={setValidate}
            />

            <BtnPrimary
                onClick={ () => {
                    if (solicitacao.email && validate === false) {
                        onNext();
                    } else {
                        alert('Por favor, insira um e-mail válido.');
                    }
                }}
            >
                Próximo passo
            </BtnPrimary>

            <BtnSecundary
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