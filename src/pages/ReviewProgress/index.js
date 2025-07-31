import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import html2canvas from 'html2canvas';

import BtnPrimary from '../../components/Btn/BtnPrimary';
import BtnSecundary from '../../components/Btn/BtnSecundary';
import InputCodeUnic from '../../components/Input/InputCodeUnic';
import './styles.css';

export default function ReviewProgress() {
    const [codigoUnico, setCodigoUnico] = useState('');
    const [validCode, setValidCode] = useState(false);
    const navigate = useNavigate();

    const solicitacao = {
        nome_cidadao: 'João da Silva',
        celular_cidadao: '(11) 91234-5678',
        cpf_cidadao: '123.456.789-00',
        email: 'email@email.com',
        comunidade: 'Comunidade Exemplo',
        tipoSolicitacao: 'Reclamação',
        descricao: 'Descrição da solicitação de exemplo.',
        latitude: -23.5505,
        longitude: -46.6333
    };

    const handleSaveAsImage = async () => {
        const element = document.getElementById('container-progress');
        const canvas = await html2canvas(element);
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'comprovante.png';
        link.click();
    };

    const handleChange = (event) => {
        setCodigoUnico(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (codigoUnico === 'ab123') {
            setValidCode(true);
        } else {
            setValidCode(false);
            alert('Código inválido, confira o código único da sua solicitação.');
        }
    };

    return (
        <div className='container-review-progress'>

            {!validCode && (
                <>
                    <h2>Insira abaixo o <span className='accent-color'>código único</span> da sua solicitação</h2>

                    <form onSubmit={handleSubmit}>
                        <InputCodeUnic
                            name='codigo'
                            value={codigoUnico}
                            onChange={handleChange}
                        />
                        <BtnPrimary type='submit'>Verificar</BtnPrimary>
                    </form>

                    <BtnSecundary 
                        adicionalClass='btn-back' 
                        onClick={ () => {
                            navigate('/')
                        }}
                    >        
                        Voltar
                    </BtnSecundary>
                </>
            )}

            {validCode && (
                <>
                    <div className="container-progress" id="container-progress">
                        <p>Andamento da solicitação</p>
                        <h1>ay703</h1>

                        <span className='status'>Em análise</span>

                        <div className='box-info'>
                            <span className='info'>Data de abertura</span>
                            <span className='data'>15/10/2023 14:56</span>
                        </div>

                        <div className='box-info'>
                            <span className='info'>Nome do solicitante</span>
                            <span className='data'>{solicitacao.nome_cidadao}</span>
                        </div>

                        <div className='box-info'>
                            <span className='info'>Celular do solicitante</span>
                            <span className='data'>{solicitacao.celular_cidadao}</span>
                        </div>

                        <div className='box-info'>
                            <span className='info'>CPF do solicitante</span>
                            <span className='data'>{solicitacao.cpf_cidadao}</span>
                        </div>

                        <div className='box-info'>
                            <span className='info'>Email do solicitante</span>
                            <span className='data'>{solicitacao.email}</span>
                        </div>

                        <div className='box-info'>
                            <span className='info'>Comunidade da solicitação</span>
                            <span className='data'>{solicitacao.comunidade}</span>
                        </div>

                        <div className='box-info'>
                            <span className='info'>Tipo da solicitação</span>
                            <span className='data'>{solicitacao.tipoSolicitacao}</span>
                        </div>

                        <div className='box-info'>
                            <span className='info'>Descrição da solicitação</span>
                            <span className='data'>{solicitacao.descricao}</span>
                        </div>

                        <div className="box-info-small">
                            <span>Latitude inserida no mapa: {solicitacao.latitude}</span>
                            <span>Longitude inserida no mapa: {solicitacao.longitude}</span>
                        </div>
                    </div>

                    <BtnPrimary onClick={handleSaveAsImage}>
                        Salvar comprovante
                    </BtnPrimary>

                    <BtnSecundary onClick={() => {
                        navigate('/')
                    }}>
                        Voltar ao início
                    </BtnSecundary>
                </>
            )}
        </div>
    );
}
