import './styles.css'
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import BtnPrimary from '../../components/Btn/BtnPrimary';
import BtnSecundary from '../../components/Btn/BtnSecundary';
import Modal from '../../components/Modal'

export default function Condominio() {

    //pega o id do condominio da URL
    const { id } = useParams();
    const navigate = useNavigate();

    const [condominio, setCondominio] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mostrarModalDelete, setAbrirModalDelete] = useState(false)


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null); 
            const startTime = Date.now();
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/condominios/${id}`);

                if (!response.ok) {
                    throw new Error(`Erro HTTP ${response.status}`);
                }
                const data = await response.json();
                setCondominio(data);
            } catch (err) {
                setError(err.message || "Erro desconhecido");
            } finally {
                const elapsed = Date.now() - startTime;
                const delay = 2800; // 2.1 segundos
                const remaining = delay - elapsed;
                if (remaining > 0) {
                    setTimeout(() => setLoading(false), remaining);
                } else {
                    setLoading(false);
                }
            }
        };

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
    if (!condominio) return console.log('Nenhum dado encontrado');

    return (
        <div>
            {loading && <Loading />}
            {error && `Erro: ${error}`}
            {!condominio && `Nenhum condomínio encontrado`}

            <div className="nav-tools">
                <BtnSecundary
                    onClick={ () => {
                        navigate(-1)
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#344054"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
                </BtnSecundary>

                <BtnPrimary
                    adicionalClass='warning'
                    onClick={ () => {
                        navigate(`/condominio/editar/${condominio.id}`)
                    }}
                >
                    Editar
                </BtnPrimary>

                <BtnPrimary
                    adicionalClass='danger'
                    onClick={ () => {
                        setAbrirModalDelete(true)
                    }}
                >
                    Excluir
                </BtnPrimary>

                {mostrarModalDelete && (
                    <Modal 
                        type='danger'
                        title='Excluir condomínio'
                        description={`Você solicitou excluir o seguinte condomínio: ${condominio.nome}. Essa alteração não pode ser desfeita. Você tem certeza?`}
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

            <h1>{condominio.nome}</h1>
            <p>Endereço: {condominio.endereco}</p>
            <p>Telefone: {condominio.telefone}</p>
            <p>Email: {condominio.email}</p>
            <p>Endereço: {condominio.endereco}</p>
                <p>Telefone: {condominio.telefone}</p>
                <p>Email: {condominio.email}</p>
                <p>Status: {condominio.status}</p>
                <p>CNPJ: {condominio.cnpj}</p>
                <p>Cidade: {condominio.cidade}</p>
                <p>UF: {condominio.uf}</p>
                <p>Responsável ID: {condominio.responsavel_id}</p>

    
        </div>
    );
};