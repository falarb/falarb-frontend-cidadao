import BtnPrimary from '../../components/Btn/BtnPrimary';
import './styles.css'
import { useNavigate } from "react-router-dom";

export default function Page404() {
    const navigate = useNavigate();

    return (
        <div className="container404">
            <h1>404</h1>
            <h2>Página não encontrada</h2>
            <p>Desculpe, a página que você está procurando não existe.</p>
            <BtnPrimary
                onClick={ () => {
                    navigate('/')
                }}
            >
                Voltar ao Início
            </BtnPrimary>
        </div>
    );
}