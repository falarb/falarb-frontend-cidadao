import BtnPrimary from '../../components/Btn/BtnPrimary'
import BtnSecundary from '../../components/Btn/BtnSecundary'
import SelectCustom from '../../components/SelectCustom';

export default function Dashboard() {
    return (
        <div>
            <h1>Dashboard</h1>
            <p>Bem-vindo ao painel de controle!</p>
            <p>Componentes:</p>

            <BtnPrimary
                type="submit"
                onClick={0}
            >
                Botão Primário
            </BtnPrimary>    

            <hr></hr>

            <BtnSecundary
                type="submit"
                onClick={0}
            >
                Botão Secundário
            </BtnSecundary>    

            <hr></hr>

            <SelectCustom>
                
            </SelectCustom>
        </div>
    );
}