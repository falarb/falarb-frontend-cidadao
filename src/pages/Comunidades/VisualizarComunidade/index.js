import './styles.css'
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../../../components/Loading";
import BtnPrimary from '../../../components/Btn/BtnPrimary';
import BtnSecundary from '../../../components/Btn/BtnSecundary';
import Modal from '../../../components/Modal'
import TitleClipPages from '../../../components/TitleClipPages'
import SelectStatus from '../../../components/SelectStatus';
import MiniDashboardUser from '../../../components/MiniDashboardUser';


export default function VisualizarComunidade () {

    const { id } = useParams();
    const navigate = useNavigate();

    const [comunidade, setComunidade] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mostrarModalDelete, setAbrirModalDelete] = useState(false)


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null); 
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/tipos-manutencao/${id}`);

                if (!response.ok) {
                    throw new Error(`Erro HTTP ${response.status}`);
                }
                const data = await response.json();
                setComunidade(data);
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
    if (!comunidade) return console.log('Nenhum dado encontrado');

    return (
        <div>
            {loading && <Loading />}
            {error && `Erro: ${error}`}
            {!comunidade && `Nenhum condomínio encontrado`}

            <TitleClipPages 
                title={`Comunidade ID: ${comunidade.id}`}
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
                        navigate(`/comunidade/editar/${comunidade.id}`)
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

                <div className="container-mini-dashboard-user">
                    <MiniDashboardUser
                        total='23'
                        concluidas='10'
                        agendadas='6'
                        em_aberto='7'
                    />
                </div>

                {mostrarModalDelete && (
                    <Modal 
                        type='danger'
                        title='Excluir solicitação'
                        description={`Você solicitou excluir essa solicitação. Essa alteração não pode ser desfeita. Você tem certeza?`}
                        onConfirm={ () => {
                            //fetchDelete()
                            alert('Delete')
                            setAbrirModalDelete(false)
                            navigate(-1)
                        }}
                        onCancel={ () => {
                            setAbrirModalDelete(false)
                        }}
                    />
                )}  
            </div>


            <div  className='box-info'>
                <span className='font-size-p'>Nome</span>
                <p className='font-size-m'>{comunidade.nome}</p>
            </div>
        </div>
    );
};