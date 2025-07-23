import './styles.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../../components/TableFour';
import TableHeader from '../../components/TableFour/TableHeader';
import TableItem from '../../components/TableFour/TableItem';
import TableItemEmpty from '../../components/TableFour/TableItemEmpty';
import TableFooter from '../../components/TableFour/TableFooter';
import Erro from '../../components/Mensagem/Erro';
import Modal from '../../components/Modal';
import Loading from '../../components/Loading';
import BtnPrimary from '../../components/Btn/BtnPrimary';
import BtnSecundary from '../../components/Btn/BtnSecundary';
import Filtros from '../../components/Filtros'
import InputSearch from '../../components/InputSearch'
import SelectCustom from '../../components/SelectCustom'

export default function Usuarios() {

    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mostrarModalDelete, setMostrarModalDelete] = useState(false);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [search, setSearch] = useState('');
    const [sort_by, setSortBy] = useState('');
    const [sort_order, setSortOrder] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState(search);
    const [comunidade, setComunidade] = useState('');

    const navigate = useNavigate();

    useEffect( () => {

        const handler = setTimeout(() => {
            setDebouncedSearch(search);
        }, 700);

        return () => {
            clearTimeout(handler); 
        };

    }, [search]);

    useEffect(() => {
        const fetchUsers = async () => {
            setError(null); 
            setLoading(true);
    
            try {
                const response = await fetch (`http://127.0.0.1:8000/api/usuarios/?page=${page}&comunidade=${comunidade}&search=${debouncedSearch}&sort_by=${sort_by}&sort_order=${sort_order}`)

                if (!response.ok) {
                    throw new Error(`Erro HTTP ${response.status}`);
                }
                
                const data = await response.json();

                if (data) {
                    setUsuarios(data.data);
                    setTotalPages(data.last_page)
                } else {
                    setError("Formato de resposta inesperado da API");
                }
    
            } catch (error) {
                setError(error.message || "Erro desconhecido");
            } finally {
                setLoading(false);
            }
        }

        fetchUsers();

    }, [page, debouncedSearch, sort_by, sort_order, comunidade]);

    const handleDeleteUser = async () => {

        try{
            setError(null)

            const response = await fetch (`http://127.0.0.1:8000/api/usuarios/${usuarioSelecionado.id}`,
                {
                    method: 'DELETE',
                    headers:{
                        'Accept': 'application/json',
                    },
                }
            )
            if(!response.ok) {
                setError(response.status)
            }

            alert('Excluido com sucesso.');
            window.location.reload();
        
        } catch(error) {
            setError(error.mensagem);
        }
    }

    return (
        <>
            {loading && <Loading/>}
            {error && <Erro 
                mensagem={error}
            />}

            <div className="nav-tools">
                <BtnSecundary
                    adicionalClass='btn-svg'
                    onClick={ () => {
                        navigate('/')
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#344054"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
                </BtnSecundary>
                <BtnPrimary
                    type="button"
                    onClick={ () => {
                        navigate(`/tipo-manutencao/cadastrar/`)
                    }}
                >
                    Cadastrar
                </BtnPrimary>
            </div>

            <h2>Listagem de Usuários</h2>

            <Filtros>
                    <InputSearch
                        label='Buscar por usuário'
                        placeholder='Nome, cpf, email...'
                        value={search}
                        onChange={ (event) => {
                            setSearch(event.target.value)
                        }}
                    />

                    <SelectCustom
                        label='Comunidade'
                        value={comunidade}
                        onChange={ (event) => {
                            setComunidade(event.target.value)
                        }}
                    >   
                        <option value=''>Todos</option>
                        <option value='sindico_condominio'>Síndico Condomínio</option>
                        <option value='sindico_bloco'>Síndico Bloco</option>
                        <option value='ocupante_ap'>Ocupante Ap</option>
                    </SelectCustom>
            </Filtros>
            
            <Table>
                <TableHeader
                    col1="Nome"
                    sort1={true}
                    onClickSort1={ () => {
                        setSortBy('nome')
                        setSortOrder( sort_order === 'asc' ? 'desc' : 'asc')
                    }}

                    col2="CPF"
                    sort2={false}

                    col3="Comunidade"
                    sort3={false}

                    col4="Nº de Solicitações"
                    sort4={true}
                    onClickSort4={ () => {
                        setSortBy('cpf')
                        setSortOrder( sort_order === 'asc' ? 'desc' : 'asc')
                    }}
                />

                {usuarios.length > 0 ? 
                    usuarios.map((usuario) => (
                        <TableItem
                            key={usuario.id}
                            id={usuario.id}
                            status={usuario.status}
                            col1={usuario.nome}
                            col2={usuario.cpf}
                            col3={usuario.email}
                            col4={usuario.cpf}
                            tipo={usuario.tipo}
                            link_view={`/usuario/${usuario.id}`}
                            onClickView={() => {
                                navigate(`/usuario/${usuario.id}`)    
                            }}
                            onClickEdit={() => {
                                navigate(`/usuario/editar/${usuario.id}`)
                            }}
                            onClickDelete={() => {
                                setMostrarModalDelete(true)
                                setUsuarioSelecionado(usuario)
                            }}
                        />
                    ))
                : 
                <>
                <TableItemEmpty>
                    Ops... Não encontramos nada aqui.
                </TableItemEmpty>
                </>
                }

                {mostrarModalDelete && usuarioSelecionado && (<Modal 
                    type='danger'
                    title='Excluir usuário'
                    description={`Você solicitou excluir o seguinte usuário: ${usuarioSelecionado.nome}. Essa alteração não pode ser desfeita. Você tem certeza?`}
                    onConfirm={ () => {
                        //handleDeleteUser()
                        alert('Delete')
                        setMostrarModalDelete(false)
                    }}
                    onCancel={ () => {
                        setMostrarModalDelete(false)
                    }}
                />)}   

            <TableFooter
                totalPages={totalPages}
                atualPage={page}
                onPageChange={(newPage) => {
                    setPage(newPage)
                }}
            />
            </Table>
        </>
    )
    
}