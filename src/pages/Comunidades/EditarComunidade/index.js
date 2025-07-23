import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import './styles.css'
import InputText from "../../../components/InputText"
import Erro from "../../../components/Mensagem/Erro"
import BtnPrimary  from '../../../components/Btn/BtnPrimary/';
import BtnSecundary  from '../../../components/Btn/BtnSecundary/';
import Loading from '../../../components/Loading';
import TitleClipPages from '../../../components/TitleClipPages';
import Modal from '../../../components/Modal';
import SelectStatus from '../../../components/SelectStatus'

export default function EditarComunidade () {
    
    const [ comunidade, setComunidade ] = useState(null )
    const [ error, setError ] = useState( null )
    const [ loading, setLoading] = useState( null )
    const [ validationErrors, setValidationErrors ] = useState( null )
    const [ modalEditAberto, setModalEditAberto ] = useState( false )
    const { id } = useParams()
    const navigate = useNavigate();

    useEffect( () => {

        const fetchcomunidade = async () => {
            setError( null )
            setLoading( false )
    
            try {
                const response = await fetch( `http://127.0.0.1:8000/api/tipos-manutencao/${id}` )

                if( !response.ok ) {
                    setError( response.status )
                }

                const data = await response.json()
                setComunidade(data)
    
            } catch( error ) {
                setError( error )
            } finally {
                setLoading(false)
            }
        }
        
    if ( id ) {
        fetchcomunidade()
    }

    }, [id])

    const handleChange = (evento) => {
        const { name, value } = evento.target;

        setComunidade( ( prev ) => ({
            ...prev,
            [name]: value,
        }))
    }
    
    const handleSubmit = async (evento) => {
        evento.preventDefault();

        setLoading(true)
        setError(null)

        try {
            const response = await fetch ( `http://127.0.0.1:8000/api/tipos-manutencao/${ id }`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify(comunidade),
                }
            )

            if ( !response.ok ) {
                if (response.status === 422) {
                    try {
                        const data = await response.json(); // pode falhar se não for JSON
                        setValidationErrors(data.errors || {});
                    } catch (e) {
                        setError("Erro de validação, mas não foi possível interpretar a resposta.");
                    }
                    return;
                }
    
                throw new Error(`Erro HTTP ${response.status}`);
            }

            const newComunidade = await response.json()
            setComunidade(newComunidade)
        } catch( error ) {
            setError ( error ) 
        } finally { 
            setLoading(false) 
        }
    } 
    if (!comunidade) return console.log('Nenhum usuário encontrado.');

    return (
        <div>
            {loading && <Loading />}
            {error && <Erro mensagem={error + error.mensagem}/>}
            {modalEditAberto && (
                    <Modal 
                        type='warning'
                        title='Editar usuário'
                        description={`Você solicitou editar as informações desse usuário. Essa alteração não pode ser desfeita. Você tem certeza?`}
                        onConfirm={ (evento) => {
                            //handleSubmit()
                            alert('Editar')
                            setModalEditAberto(false)
                            navigate(-1)
                        }}
                        onCancel={ () => {
                            setModalEditAberto(false)
                        }}
                    />
                )}  

            <TitleClipPages
                title={`Edição de comunidade com #ID ${comunidade.id}`}
            />

            <div className="nav-tools">
                <BtnSecundary
                    adicionalClass='btn-svg'
                    onClick={() => {
                        navigate(`/comunidade/${comunidade.id}`)
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#344054"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
                </BtnSecundary>
            </div>

            {error && <p style={{ color: 'red' }}>Erro: {error}</p>}
            <h2>Editar Comunidade</h2>
            <form onSubmit={ (evento) => {
                evento.preventDefault()
                setModalEditAberto(true)
            }}>

                <SelectStatus
                    value='ativo'
                >
                    
                </SelectStatus>

                <div className="container-single-input">
                    <InputText 
                        label="Nome"
                        type="text"
                        name="nome"
                        value={comunidade.nome}
                        onChange={handleChange}
                    />
                    <div className="validation-error">
                        {validationErrors ? `${validationErrors.nome}` : ''}
                    </div>
                </div>

             <BtnPrimary 
                type="submit"
                onClick={ () => {

                }}
            >
                Salvar
            </BtnPrimary>
            </form>
        </div>
    )
}