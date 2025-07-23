import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import InputText from '../../../components/InputText';
import InputCustomMask from '../../../components/InputCustomMask';
import InputEmail from '../../../components/InputEmail';
import SelectStatus from '../../../components/SelectStatus';
import SelectCustom from '../../../components/SelectCustom';
import './styles.css';
import Erro from '../../../components/Mensagem/Erro';
import Loading from '../../../components/Loading';
import ButtonPrimary from '../../../components/Btn/BtnPrimary'
import ButtonSecundary from '../../../components/Btn/BtnSecundary'


export default function EditarCondominio() {

    //pega o id do condominio da URL
    const { id } = useParams();
    const navigate = useNavigate();

    const [condominio, setCondominio] = useState(null); 
    const [usuarios, setUsuarios] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // erros técnicos
    const [validationErrors, setValidationErrors] = useState({}); // erros de campos

  
    useEffect(() => {
          const fetchCondominios = async () => {
  
              setLoading(true);
              setError(null); // limpa erro anterior antes da nova requisição
  
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
                  setLoading(false);
              }
          };
  
          if (id) {
              fetchCondominios();
          }
    }, [id]); // id como dependência

    useEffect( () => {
        const fetchUsuarios = async () => {

            setLoading(true);
            setError(null); // limpa erro anterior antes da nova requisição
            const startTime = Date.now();

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

        fetchUsuarios();

    }, []);


    // Função para lidar com mudanças nos inputs
    const handleChange = (evento) => {
        const { name, value } = evento.target;
        setCondominio((prev) => ({
        ...prev, //recebe todos os dados do condominio
        [name]: value, //atualiza o campo específico
        }));
    };


    // Função que atualiza o banco com os novos dados
    const handleSubmit = async (evento) => {
        evento.preventDefault();
    
        setError(null);
        setValidationErrors({});
    
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/condominios/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json', // <- ESSENCIAL para forçar resposta JSON
                },
                body: JSON.stringify(condominio),
            });

            console.log(`Atualizando condomínio com ID ${id} e dados:`, condominio)
    
            if (!response.ok) {
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

            const newCondominio = await response.json();
            console.log('Resposta API após update:', newCondominio);
            setCondominio(newCondominio);
            
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

    if (!condominio) return console.log('Nenhum condominio encontrado');
    if (!usuarios) return console.log('Nenhum condominio encontrado');
  
    return (
        <div>
            {!condominio && <p>Nenhum dado encontrado.</p>}
            {!usuarios && <p>Nenhum dado encontrado.</p>}
            {loading && <Loading />}
            {error && <p style={{ color: 'red' }}>Erro: {error}</p>}

            <ButtonSecundary
                onClick={() => {
                    navigate(-1)
                }}   
            >
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#344054"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
            </ButtonSecundary>

            <h2>Editar Condomínio</h2>

            <form onSubmit={handleSubmit}>
                <InputText 
                    label="Nome do condomínio"
                    type="text"
                    name="nome"
                    placeholder="Nome do condomínio..."
                    value={condominio.nome}
                    onChange={handleChange}
                />
                {validationErrors.nome && <Erro 
                    mensagem={validationErrors.nome[0]} 
                    onClose={() => setValidationErrors((prev) => ({ ...prev, nome: null }))}    
                />}

                <InputText 
                    label="Endereço do condomínio"
                    type="text"
                    name="endereco"
                    placeholder="Endereço do condomínio..."
                    value={condominio.endereco}
                    onChange={handleChange}
                />
                {validationErrors.endereco && <Erro 
                    mensagem={validationErrors.endereco[0]}
                    onClose={() => setValidationErrors((prev) => ({ ...prev, endereco: null }))}     
                />}
                
                <InputCustomMask 
                    label="Telefone de contato"
                    mask="(99) 9 9999-9999"
                    placeholder="(99) 9 9999-9999"
                    type="text"
                    name="telefone"
                    value={condominio.telefone}
                    onChange={handleChange}
                />
                {validationErrors.telefone && <Erro 
                    mensagem={validationErrors.telefone[0]} 
                    onClose={() => setValidationErrors((prev) => ({ ...prev, telefone: null }))}
                />}

                <InputEmail
                    label="Email de contato"
                    name="email"
                    placeholder="condominio@email.com"
                    value={condominio.email}
                    onChange={handleChange}
                />
                {validationErrors.email && <Erro 
                    mensagem={validationErrors.email[0]} 
                    onClose={() => setValidationErrors((prev) => ({ ...prev, email: null }))}
                />}



                <SelectStatus
                    label="Status do condomínio"
                    name="status"
                    value={condominio.status}
                    onChange={handleChange}
                />


                <InputCustomMask 
                    label="CNPJ"
                    mask="99.999.999/9999-99"
                    placeholder="99.999.999/9999-99"
                    type="text"
                    name="cnpj"
                    value={condominio.cnpj}
                    onChange={handleChange}
                />
                {validationErrors.cnpj && <Erro 
                    mensagem={validationErrors.cnpj[0]} 
                    onClose={() => setValidationErrors((prev) => ({ ...prev, cnpj: null }))}
                />}

                <InputText 
                    label="Cidade do condomínio"
                    type="text"
                    name="cidade"
                    placeholder="Cidade do condomínio"
                    value={condominio.cidade}
                    onChange={handleChange}
                />
                {validationErrors.cidade && <Erro
                    mensagem={validationErrors.cidade[0]} 
                    onClose={() => setValidationErrors((prev) => ({ ...prev, cidade: null }))}
                />}
                
                <InputCustomMask 
                    label="Uf do condomínio"
                    mask="aa"
                    type="text"
                    placeholder="UF"
                    name="uf"
                    value={condominio.uf}
                    onChange={handleChange}
                />
                {validationErrors.uf && <Erro
                    mensagem={validationErrors.uf[0]} 
                    onClose={() => setValidationErrors((prev) => ({ ...prev, uf: null }))}
                />}

                {/*
                <label>Responsável pelo condomínio</label>
                <select value={condominio.responsavel_id}>
                    {usuarios.map((usuario) => (
                        <option key={usuario.id} value={usuario.id}>
                            #{usuario.id} {usuario.nome}
                        </option>
                    ))}
                </select>
                */}

                {console.log(usuarios)}

                <SelectCustom
                    label="Responsável pelo condomínio"
                    name="responsavel_id"
                    options={usuarios.data}
                    value={condominio.responsavel_id}
                    onChange={handleChange}
                />
                {validationErrors.responsavel_id && <Erro 
                    mensagem={validationErrors.responsavel_id[0]}
                    onClose={() => setValidationErrors((prev) => ({ ...prev, responsavel_id: null }))}    
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