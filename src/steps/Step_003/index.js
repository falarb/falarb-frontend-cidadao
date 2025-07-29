import { useState } from 'react';
import BtnPrimary from '../../components/Btn/BtnPrimary';
import BtnSecundary from '../../components/Btn/BtnSecundary';
import InputCustomMask from '../../components/InputCustomMask';
import Modal from '../../components/Modal';
import './styles.css';

export default function Step003( { solicitacao, setSolicitacao, onNext, onBack} ) {

    const [modalAberto, setModalAberto] = useState(false);
    const [validacao, setValidacao] = useState(false)

    const handleChange = (event) => {
        const codigo_uninco = event.target.value;
        
        if ( codigo_uninco !== '1234' ) {
            setValidacao(true);
        } else {
            setValidacao(false);
        }

        setSolicitacao(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    }

    return (
        <div className='container-step-3'>

            <h2>Insira abaixo o código que enviamos para o seu endereço de email - <span className='accent-color'>{solicitacao.email}</span></h2>

            <InputCustomMask
                name='codigo_uninco'
                placeholder='1234'
                mask='9999'
                value={solicitacao.codigo_uninco}
                onChange={handleChange}
            />

            <BtnPrimary
                onClick={ () => {
                    if (validacao) {
                        alert('Código inválido, confira o código enviado para sua caixa de e-mail.');
                        return;
                    }
                    onNext();
                }}
            >
                Verificar
            </BtnPrimary>

            <BtnSecundary
                adicionalClass='btn-back'
                onClick={onBack}
            >
                Não recebi o código
            </BtnSecundary>

            <BtnSecundary
                adicionalClass='btn-cancel'
                onClick={ () => {
                    setModalAberto(true);
                }}
            >
                Cancelar
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