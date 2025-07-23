import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../../components/Modal";
import BtnPrimary from "../../components/Btn/BtnPrimary";
import BtnSecundary from "../../components/Btn/BtnSecundary";
import './styles.css'


export default function Usuario () {

    const [usuario, setUsuario] = useState(null)
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null)
    const [modalEditAberto, setModalEditAberto] = useState(false)
    const [modalDeleteAberto, setModalDeleteAberto] = useState(false)
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUsuarios = async () => {
            setLoading(true)
            setError(null)

            try {
                const response = await fetch(`http://127.0.0.1:8000/api/usuarios/${id}`);
                
                if (!response.ok) {
                    setError(`Erro HTTP: ${response.status}`)
                }   

                const data = await response.json();
                setUsuario(data)
            } catch(error) {
                setError(error.mensage)
            } finally {
                setLoading(false);
            }
        }

        if(id){
            fetchUsuarios()
        }
    }, [id])

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro: {error}</p>;
    if (!usuario) return <p>Nenhum dado encontrado.</p>;

    console.log(usuario)

    return (
        <div>
            <div className="nav-tools">
                <BtnSecundary 
                    onClick={() => {
                        navigate('/usuarios')
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#344054"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
                </BtnSecundary>

                <BtnPrimary 
                    adicionalClass='warning'
                    onClick={() => {
                        setModalEditAberto(true)
                }}>
                    Editar
                </BtnPrimary>

                <BtnPrimary 
                    adicionalClass='danger'
                    onClick={() => {
                        setModalDeleteAberto(true)
                }}>
                    Excluir
                </BtnPrimary>
            </div>
           

            {modalEditAberto && <Modal
                type='warning'
                title="Editar usuário"
                description={`Tem certeza que deseja editar os dados do usuário ${usuario.nome}? Essa alteração pode não ser desfeita.`}
                onConfirm={ () => {
                    navigate(`/usuario/editar/${usuario.id}`)
                    setModalEditAberto(false) 
                    }
                }
                onCancel={ () => {
                    setModalEditAberto(false)}
                }
            />}

            {modalDeleteAberto && <Modal
                type='danger'
                title="Editar usuário"
                description={`Tem certeza que deseja excluir o usuário ${usuario.nome}? Essa alteração não pode ser desfeita.`}
                onConfirm={ () => {
                    alert('excuir')
                    setModalDeleteAberto(false) 
                    }
                }
                onCancel={ () => {
                    setModalDeleteAberto(false)}
                }
            />}

            <div className="container-info-user">

                <h2>
                    {usuario.nome}
                </h2>

                <div className="info-system">
                    <div className="id">
                        ID #{usuario.id}
                    </div>
                    
                    <div className="tipo-usuario">
                        {usuario.tipo === 'sindico_condominio' 
                            ? 
                            <>
                                <div className="info_sindico_condominio">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div>Síndico ― Condomínio</div>
                                </div>
                            </> 
                            : usuario.tipo === 'sindico_bloco' 
                                ? 
                                <>
                                    <div className="info_sindico_bloco">
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div>Síndico ― Condomínio</div>
                                    </div>
                                </> 
                                : usuario.tipo === 'ocupante_ap' 
                                    ? 
                                    <>
                                        <div className="info_ocupante_ap">
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                            <div>Ocupante ― Apartamento</div>
                                        </div>
                                    </>
                                    : ''
                        }
                    </div>
                </div>
                
                <div className="single-info">
                    <label>Email:</label>
                    <span>{usuario.email}</span>
                </div>
                
                <div className="single-info">
                    <label>CPF</label>
                    <span>{usuario.cpf}</span>
                </div>
                
                <div className="single-info">
                    <label>Idade</label>
                    {usuario.idade} anos
                </div>
                
                {usuario.observacao? <>
                    <div className="single-info">
                        <label>Observações</label>
                        <span>{usuario.observacao}</span>
                    </div>
                </> : ''}

                {usuario.condominios_sindico?.length > 0 && (
                    <div className="single-info">
                        <label>Síndico do condomínio</label>
                        <span>{usuario.condominios_sindico[0]?.nome}</span>
                    </div>
                )}

                {usuario.blocos_sindico?.length > 0 && (
                    <div className="single-info">
                        <label>Síndico do bloco</label>
                        <span>{usuario.blocos_sindico[0]?.nome}</span>
                    </div>
                )}
                
            </div>
            
    
        </div>
    )
} 
