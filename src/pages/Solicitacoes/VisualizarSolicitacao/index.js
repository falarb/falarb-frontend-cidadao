import './styles.css'
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../../../components/Loading";
import BtnPrimary from '../../../components/Btn/BtnPrimary';
import BtnSecundary from '../../../components/Btn/BtnSecundary';
import Modal from '../../../components/Modal'
import TitleClipPages from '../../../components/TitleClipPages'
import SelectStatus from '../../../components/SelectStatus';


export default function VisualizarSolicitacao() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [solicitacao, setSolicitacao] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mostrarModalDelete, setAbrirModalDelete] = useState(false)


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null); 
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/condominios/${id}`);

                if (!response.ok) {
                    throw new Error(`Erro HTTP ${response.status}`);
                }
                const data = await response.json();
                setSolicitacao(data);
            } catch (err) {
                setError(err.message || "Erro desconhecido");
            } finally {
                setLoading(false)
            }
            }
    
        if (id) {
            fetchData();
        }
    }, [id]); // id como dependência

    const fetchDelete = async () => {
        setError(null)
        setLoading(true)

        try{

            const response = await fetch (`http://127.0.0.1:8000/api/condominios/${id}`,
                {
                    method: 'DELETE',
                    headers:{
                        'Accept': 'application/json',
                    },
                }
            )

            if ( !response.ok ) {
                setError(response.status)
            }

            alert('Excluido com sucesso.');
            navigate('/condominios');
        } catch (error) {
            setError(error.mensagem)
        }
    }

    if (error) return console.log({error});
    if (!solicitacao) return console.log('Nenhum dado encontrado');

    return (
        <div>
            {loading && <Loading />}
            {error && `Erro: ${error}`}
            {!solicitacao && `Nenhum condomínio encontrado`}

            <TitleClipPages 
                title={`Solicitação ID: ${solicitacao.id}`}
            />

            <div className="nav-tools">
                <BtnSecundary
                    adicionalClass='btn-svg'
                    onClick={ () => {
                        navigate(-1)
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#344054"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
                </BtnSecundary>

                <BtnPrimary
                    adicionalClass='btn-svg'
                    onClick={ () => {
                        alert('imprimeeeeee')
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/></svg>
                </BtnPrimary>

                <BtnPrimary
                    adicionalClass='warning btn-svg'
                    onClick={ () => {
                        navigate(`/solicitacao/editar/${solicitacao.id}`)
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"/></svg>
                </BtnPrimary>

                <BtnPrimary
                    adicionalClass='danger btn-svg'
                    onClick={ () => {
                        setAbrirModalDelete(true)
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                </BtnPrimary>

                <SelectStatus
                    value='ativo'
                >
                    
                </SelectStatus>

                {mostrarModalDelete && (
                    <Modal 
                        type='danger'
                        title='Excluir solicitação'
                        description={`Você solicitou excluir essa solicitação. Essa alteração não pode ser desfeita. Você tem certeza?`}
                        onConfirm={ () => {
                            fetchDelete()
                            setAbrirModalDelete(false)
                        }}
                        onCancel={ () => {
                            setAbrirModalDelete(false)
                        }}
                    />
                )}  
            </div>

            <div  className='box-info'>
                <p className='font-size-m'>{solicitacao.create_at}</p>
            </div>

            <div  className='box-info'>
                <span className='font-size-p'>Solicitação</span>
                <p className='font-size-m'>{solicitacao.endereco}</p>
            </div>

            <div  className='box-info'>
                <span className='font-size-p'>Solicitante</span>
                <p className='font-size-m'>{solicitacao.nome}</p>
            </div>

            <div  className='box-info'>
                <span className='font-size-p'>CPF</span>
                <p className='font-size-m'>{solicitacao.cnpj}</p>
            </div>

            <div  className='box-info'>
                <span className='font-size-p'>Email</span>
                <p className='font-size-m'>{solicitacao.email}</p>
            </div>
            
            <div  className='box-info'>
                <span className='font-size-p'>Celular</span>
                <p className='font-size-m'>{solicitacao.telefone}</p>
            </div>

            <div  className='box-info'>
                <span className='font-size-p'>Descrição da solicitacao</span>
                <p className='font-size-m'>{solicitacao.endereco}</p>
            </div>

            <div  className='box-info'>
                <span className='font-size-p'>Nota da solicitacao</span>
                <p className='font-size-m'>{solicitacao.endereco}</p>
            </div>

            <div  className='box-info'>
                <span className='font-size-p'>Geolocalização do local da solicitação</span>

            </div>

            <div className='box-geolocalizacao'>
                <div  className='box-info'>
                    <span className='font-size-p'>Latitude</span>
                    <p className='font-size-m'>{solicitacao.telefone}</p>
                </div>
                <div  className='box-info'>
                    <span className='font-size-p'>Longitude</span>
                <p className='font-size-m'>{solicitacao.telefone}</p>
            </div>
            </div>

            <BtnPrimary onClick={() => {
                alert(`${solicitacao.telefone}`)
            }}>
                Ir para o Google Maps <svg xmlns="http://www.w3.org/2000/svg" className='svg-map' height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m600-120-240-84-186 72q-20 8-37-4.5T120-170v-560q0-13 7.5-23t20.5-15l212-72 240 84 186-72q20-8 37 4.5t17 33.5v560q0 13-7.5 23T812-192l-212 72Zm-40-98v-468l-160-56v468l160 56Zm80 0 120-40v-474l-120 46v468Zm-440-10 120-46v-468l-120 40v474Zm440-458v468-468Zm-320-56v468-468Z"/></svg>
            </BtnPrimary>
        
        </div>
    );
};