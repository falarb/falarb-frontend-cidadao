import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import InputText from '../../../components/InputText';
import TextArea from '../../../components/TextArea';
import Modal from '../../../components/Modal';
import SelectStatus from '../../../components/SelectStatus';
import SelectCustom from '../../../components/SelectCustom';
import './styles.css';
import Erro from '../../../components/Mensagem/Erro';
import Loading from '../../../components/Loading';
import ButtonPrimary from '../../../components/Btn/BtnPrimary';
import ButtonSecundary from '../../../components/Btn/BtnSecundary';
import TitleClipPages from '../../../components/TitleClipPages'

export default function EditarSolicitacao() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [solicitacao, setSolicitacao] = useState(null); 
    const [usuarios, setUsuarios] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 
    const [validationErrors, setValidationErrors] = useState({}); 
    const [modalEditAberto, setModalEditAberto] = useState(false)

  
    useEffect(() => {
          const fetchCondominios = async () => {
  
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
                  setLoading(false);
              }
          };
  
          if (id) {
              fetchCondominios();
          }
    }, [id]); 

    useEffect( () => {
        const fetchUsuarios = async () => {

            setLoading(true);
            setError(null); 

            try {
                const response = await fetch(`http://127.0.0.1:8000/api/usuarios`);

                if (!response.ok) {
                    throw new Error(`Erro HTTP ${response.status}`);
                }

                const data = await response.json();
                setUsuarios(data);
            } catch (error) {
                setError('Erro ao atualizar o condomínio: ' + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsuarios();

    }, []);

    const handleChange = (evento) => {
        const { name, value } = evento.target;
        setSolicitacao((prev) => ({
        ...prev,
        [name]: value,
        }));
    };

    const handleSubmit = async (evento) => {
        evento.preventDefault();
    
        setError(null);
        setValidationErrors({});
    
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/condominios/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json', 
                },
                body: JSON.stringify(solicitacao),
            });

            console.log(`Atualizando condomínio com ID ${id} e dados:`, solicitacao)
    
            if (!response.ok) {
                if (response.status === 422) {
                    try {
                        const data = await response.json();
                        setValidationErrors(data.errors || {});
                    } catch (e) {
                        setError("Erro de validação, mas não foi possível interpretar a resposta.");
                    }
                    return;
                }
    
                throw new Error(`Erro HTTP ${response.status}`);
            }

            const newSolicitacao = await response.json();
            console.log('Resposta API após update:', newSolicitacao);
            setSolicitacao(newSolicitacao);
            
            setError(null);
            alert('Condomínio atualizado com sucesso!');
            navigate(-1);
        } catch (err) {
            if (err.name === 'TypeError') {
                setError("Não foi possível conectar ao servidor. Verifique sua conexão ou tente mais tarde.");
            } else {
                setError(err.message || "Erro desconhecido ao atualizar");
            }
        }
    };

    if (!solicitacao) return console.log('Nenhum solicitacao encontrado');
    if (!usuarios) return console.log('Nenhum solicitacao encontrado');
  
    return (
        <div>
            {!solicitacao && <p>Nenhum dado encontrado.</p>}
            {!usuarios && <p>Nenhum dado encontrado.</p>}
            {loading && <Loading />}
            {error && <p style={{ color: 'red' }}>Erro: {error}</p>}
            {modalEditAberto ? 
                <>
                
                <Modal
                    type='warning'
                    title='Editar solicitação'
                    description={`Deseja salvar suas alterações na solicitação XXX`}
                    onCancel={ () => {
                        setModalEditAberto(false)
                    }}
                    onConfirm={ () => {
                        alert('Editado.')
                        navigate(-1)
                    }}
                />
                </>
            :
            ''}

            <TitleClipPages 
                title={`Solicitação ID: ${solicitacao.id}`}
            />

            <ButtonSecundary
                adicionalClass='btn-svg'
                onClick={() => {
                    navigate(-1)
                }}   
            >
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#344054"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
            </ButtonSecundary>

            <h2>Editar Solicitação</h2>

            <form onSubmit={ (evento) => {
                evento.preventDefault()
                setModalEditAberto(true)
            }}>

                <SelectStatus
                    label="Status do condomínio"
                    name="status"
                    value={solicitacao.status}
                    onChange={handleChange}
                />
        
                <SelectCustom
                    label="Tipo da solicitacao"
                    name="responsavel_id"
                    options={usuarios.data}
                    value={solicitacao.responsavel_id}
                    onChange={handleChange}
                />
                {validationErrors.responsavel_id && <Erro 
                    mensagem={validationErrors.responsavel_id[0]}
                    onClose={() => setValidationErrors((prev) => ({ ...prev, responsavel_id: null }))}    
                />}

                <InputText 
                    label="Latitude"
                    type="text"
                    name="nome"
                    placeholder="Latitude..."
                    value={solicitacao.nome}
                    onChange={handleChange}
                />
                {validationErrors.nome && <Erro 
                    mensagem={validationErrors.nome[0]} 
                    onClose={() => setValidationErrors((prev) => ({ ...prev, nome: null }))}    
                />}

                <InputText 
                    label="Longitude"
                    type="text"
                    name="nome"
                    placeholder="Latitude..."
                    value={solicitacao.nome}
                    onChange={handleChange}
                />
                {validationErrors.nome && <Erro 
                    mensagem={validationErrors.nome[0]} 
                    onClose={() => setValidationErrors((prev) => ({ ...prev, nome: null }))}    
                />}

                <TextArea 
                    label="Nota da solicitação"
                    type="text"
                    name="cidade"
                    placeholder="Nota da solicitação..."
                    value={solicitacao.cidade}
                    onChange={handleChange}
                />
                {validationErrors.cidade && <Erro
                    mensagem={validationErrors.cidade[0]} 
                    onClose={() => setValidationErrors((prev) => ({ ...prev, cidade: null }))}
                />}
                
                <ButtonPrimary 
                    type="submit"
                >
                    Salvar
                </ButtonPrimary>
            </form>               
          </div>
      );
}