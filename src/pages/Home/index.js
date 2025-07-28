import BtnPrimary from '../../components/Btn/BtnPrimary';
import './styles.css';

export default function Home() {
    return (
        <div className='container-home'>
            <h2>Bem vindo ao <span className='accent-color'>Fala Rebouças</span></h2>
            <p>Clique abaixo para realizar a sua solicitação</p>
            <BtnPrimary
                adicionalClass='success'
            >
                Realizar solicitação
            </BtnPrimary>
            <p>Clique abaixo para acompanhar sua solicitação através do seu código único.</p>
            <BtnPrimary>
                Acompanhar solicitação
            </BtnPrimary>
        </div>
    );
}