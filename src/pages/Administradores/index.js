import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './styles.css'
import Loading from '../../components/Loading';
import Modal from '../../components/Modal';
import Table from '../../components/TableFour';
import TableHeader from '../../components/TableFour/TableHeader';
import TableItem from '../../components/TableFour/TableItem';
import TableItemEmpty from '../../components/TableFour/TableItemEmpty';
import TableFooter from '../../components/TableFour/TableFooter';
import Success from '../../components/Modal/Success';
import Erro from '../../components/Mensagem/Erro'
import BtnPrimary from '../../components/Btn/BtnPrimary';
import BtnSecundary from '../../components/Btn/BtnSecundary';
import Filtros from '../../components/Filtros';
import SelectCustom from '../../components/SelectCustom';
import InputSearch from '../../components/InputSearch'
import InputDate from '../../components/InputDate';

export default function Administradores () {
    
    const [administradores, setAdministradores] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [mostrarModalDelete, setMostrarModalDelet] = useState(false);
    const [mostrarModalSuccess, setMostrarModalSuccess] = useState(false);
    const [administradorSelecionado, setAdministradorSelecionado] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState(search);
    const [date, setDate] = useState('');
    const [status, setStatus] = useState('');
    const [sort_by, setOrderBy] = useState('');
    const [sort_order, setSortOrder] = useState();
    const navigate = useNavigate();

    useEffect( () => {

        const handler = setTimeout(() => {
            setDebouncedSearch(search);
        }, 700);

        return () => {
            clearTimeout(handler); 
        };

    }, [search]);

    useEffect( () => {
        const fetchManutencoes = async () => {

            try{
                setError(null)
                setLoading(true)

                const response = await fetch (`http://127.0.0.1:8000/api/usuarios/?page=${page}&status=${status}&search=${debouncedSearch}&sort_by=${sort_by}&sort_order=${sort_order}`);

                if ( !response.ok ) {
                    throw new Error(`Erro ${response.status}`);
                }

                const data = await response.json();
                console.log(data)
                setAdministradores(data.data);
                setTotalPages(data.last_page);
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }

        }

        fetchManutencoes();
    }, [page, status, debouncedSearch, sort_by, sort_order])

const handleDelete = async (id) => {
    try {
        setError(null);
        setLoading(true);

        const response = await fetch(`http://127.0.0.1:8000/api/usuarios/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json', 
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            let errorMessage = `Erro ${response.status}`;
            try {
                const data = await response.json();
                if (data?.message) errorMessage = data.message;
            } catch (_) {}

            throw new Error(errorMessage);
        }

        console.log('Deletado com sucesso');
    } catch (error) {
        console.error('Erro ao deletar:', error);
        setError(error.message); 
    } finally {
        setLoading(false);
    }
};

    return (
        <div>
            {error && <Erro mensagem={error.message || error}/>}
            {loading ? <Loading/> : ''}
            
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
                        navigate(`/administrador/cadastrar/`)
                    }}
                >
                    Cadastrar
                </BtnPrimary>
            </div>

            <h2>Listagem de Administradores</h2>
            
            <Filtros>

                <SelectCustom
                    label='Filtre por status'
                    value={status} 
                    onChange={(event) => {
                    setStatus(event.target.value)
                }}>
                    <option value=''>Todos</option>
    
                </SelectCustom>

                <InputSearch
                    label='Buscar usuário'
                    value={search} 
                    placeholder='Buscar usuário...' 
                    onChange={ (event) => {
                    setSearch(event.target.value)
                }}>
                </InputSearch>
                
                
            </Filtros>

            <Table>
                <TableHeader
                    col1='Nome'
                    sort1={true}
                    onClickSort1={ () => {
                        setOrderBy('nome');
                        setSortOrder(sort_order === 'asc' ? 'desc' : 'asc');
                    }}

                    col2='Email'
                    sort2={false}
                    
                    col3='CPF'
                    sort3={false}

                    col4='Status'
                    sort4={false}
                />

                {loading ?
                    <TableItemEmpty>
                        Carregando...
                    </TableItemEmpty>
                : 
                ''    
                }
                    
                {administradores ? 
                    (administradores.map( (administrador) => (
                        <TableItem
                            key={administrador.id}
                            id={administrador.id}
                            link_view={`/administrador/${administrador.id}`}
                            status={administrador.status}
                            col1={administrador.nome}
                            col2={administrador.email}
                            col3={administrador.cpf}
                            col4={
                                <>
                                <span className={`col-status col-status-${administrador.status}`}>{administrador.status}</span>
                                </>
                            }
                            onClickView={ () => {
                                    navigate(`/administrador/${administrador.id}`)
                                }
                            }
                            onClickEdit={ () => {
                                    navigate(`/administrador/editar/${administrador.id}`)
                                }
                            }
                            onClickDelete={ () => {
                                    setMostrarModalDelet(true);
                                    setAdministradorSelecionado(administrador);
                                }
                            }
                        />
                    ))) : <TableItemEmpty>Ops... Não encontramos nada aqui.</TableItemEmpty>
                }
                <TableFooter
                    atualPage={page}
                    totalPages={totalPages}
                    onPageChange={ (newPage) => {
                        setPage(newPage)
                    }}
                />
            </Table>

            {mostrarModalDelete ? (
                <Modal
                    type='danger'
                    title='Deletar administrador'
                    description={`Tem certeza que deseja deletar o administrador ${administradorSelecionado.nome}?`}
                    onConfirm={ () => {
                            alert('Excluiu')
                            //handleDelete(administradorSelecionado.id);
                            setMostrarModalDelet(false);
                            setMostrarModalSuccess(true);
                        }
                    }
                    onCancel={ () => {
                        setMostrarModalDelet(false); 
                    }}
                />
            ) : '' }

            {mostrarModalSuccess ? (
                <Success
                    type='success'
                    title='Sucesso'
                    description='Sua solicitação foi atendida com sucesso.'
                    onConfirm={ () => {
                        setMostrarModalDelet(false);
                        window.location.reload();
                    }
                }
                />
            ) : '' }

        </div>
    )
}