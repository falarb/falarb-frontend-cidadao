import { useState } from 'react';
import BtnPrimary from '../../components/Btn/BtnPrimary';
import BtnSecundary from '../../components/Btn/BtnSecundary';
import SelectCustom from '../../components/SelectCustom';
import TextArea from '../../components/TextArea';
import Modal from '../../components/Modal';
import './styles.css';

export default function Step005( { solicitacao, setSolicitacao, onNext, onBack } ) {

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