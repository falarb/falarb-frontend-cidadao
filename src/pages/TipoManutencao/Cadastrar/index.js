import './styles.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import InputText from '../../../components/InputText'
import BtnPrimary from '../../../components/Btn/BtnPrimary'
import BtnSecundary from '../../../components/Btn/BtnSecundary'

export default function CadastrarTipoManutencao () {
    
    const [novoTipoManutencao, setNovoTipoManutencao] = useState({
        nome: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(null);
    const navigate = useNavigate();


    const handleChange = (evento) => {
        const { name, value } = evento.target;
        setNovoTipoManutencao({
            ...novoTipoManutencao,
            [name]: value,
        })
    } 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('');
        setError('');
        setLoading(true);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/tipos-manutencao', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(novoTipoManutencao),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Erro do servidor:', errorData);
                throw new Error(errorData.message || 'Erro ao cadastrar');
            }

            const data = await response.json();
            console.log('Sucesso:', data);
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
        finally {
                    setLoading(true);
                }
  };

    return (
        <div>
            <BtnSecundary
                onClick={ () => {
                    navigate('/tipos-manutencoes')
                }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#344054"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
            </BtnSecundary>

            <h2>
                Cadastrar novo tipo de manutenção
            </h2>

            <form onSubmit={handleSubmit}>
                <InputText
                    label='Nome do tipo de manutenção'
                    placeholder='Insira o nome...'
                    name='nome'
                    value={novoTipoManutencao.nome}
                    onChange={handleChange}
                    required={true}
                >
                </InputText>
                <BtnPrimary
                    type='submit'
                >
                    Cadastrar
                </BtnPrimary>
            </form>

        </div>
    ) 
}