import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './styles.css'
import Loading from '../../components/Loading';
import Modal from '../../components/Modal';
import Table from '../../components/Table';
import TableHeader from '../../components/Table/TableHeader';
import TableItem from '../../components/Table/TableItem';
import TableItemEmpty from '../../components/Table/TableItemEmpty';
import TableFooter from '../../components/Table/TableFooter';
import Success from '../../components/Modal/Success';
import Erro from '../../components/Mensagem/Erro'
import BtnPrimary from '../../components/Btn/BtnPrimary';
import BtnSecundary from '../../components/Btn/BtnSecundary';
import Filtros from '../../components/Filtros';
import SelectCustom from '../../components/SelectCustom';
import InputSearch from '../../components/InputSearch'
import InputDate from '../../components/InputDate';

export default function Manutencoes () {
    
    const [manutencoes, setManutencoes] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [mostrarModalDelete, setMostrarModalDelet] = useState(false);
    const [mostrarModalSuccess, setMostrarModalSuccess] = useState(false);
    const [manutencaoSelecionada, setManutencaoSelecionada] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [nome, setNome] = useState('');
    const [date, setDate] = useState('');
    const [debouncedNome, setDebouncedNome] = useState(nome);
    const [status, setStatus] = useState('');
    const [sort_by, setOrderBy] = useState('');
    const [sort_order, setSortOrder] = useState();
    const navigate = useNavigate();

    useEffect( () => {

        const handler = setTimeout(() => {
            setDebouncedNome(nome);
        }, 700);

        return () => {
            clearTimeout(handler); 
        };

    }, [nome]);

    useEffect( () => {
        const fetchManutencoes = async () => {

            try{
                setError(null)
                setLoading(true)

                const response = await fetch (`http://127.0.0.1:8000/api/manutencaos/?page=${page}&data_agendada=${date}&status=${status}&nome=${debouncedNome}&sort_by=${sort_by}&sort_order=${sort_order}`);

                if ( !response.ok ) {
                    throw new Error(`Erro ${response.status}`);
                }

                const data = await response.json();
                setManutencoes(data.data);
                setTotalPages(data.last_page);
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }

        }

        fetchManutencoes();
    }, [page, status, debouncedNome, sort_by, sort_order, date])

const handleDelete = async (id) => {
    try {
        setError(null);
        setLoading(true);

        const response = await fetch(`http://127.0.0.1:8000/api/manutencaos/${id}`, {
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

            <h2>Listagem de Manutenções</h2>
            
            <Filtros>

                <InputDate
                    label='Filtre por data'
                    value={date}  
                    onChange={ (event) => {
                    setDate(event.target.value)
                }}>
                </InputDate>

                <SelectCustom
                    label='Filtre por status'
                    value={status} 
                    onChange={(event) => {
                    setStatus(event.target.value)
                }}>
                    <option value=''>Todos</option>
                    <option value="concluido">Concluido</option>
                    <option value="agendado">Agendado</option>
                </SelectCustom>

                <div className="info-status-div">
                    <div>
                        <div className="info-concluido"></div>
                        Concluido
                    </div>
                    <div>
                        <div className="info-agendado"></div>
                        Agendado
                    </div>
                </div>

                <InputSearch
                    label='Buscar por condomínio'
                    value={nome} 
                    placeholder='Buscar condomínio...' 
                    onChange={ (event) => {
                    setNome(event.target.value)
                }}>
                </InputSearch>
                
                
            </Filtros>

            <Table>
                <TableHeader
                    col1='Tipo da manutenção'
                    sort1={false}

                    col2='Condomínio/Bloco/Ap'
                    sort2={false}
                    
                    col3='Agendado para'
                    sort3={true}
                    onClickSort3={ () => {
                        setOrderBy('data_agendada');
                        setSortOrder(sort_order === 'asc' ? 'desc' : 'asc');
                    }}

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
                    
                { manutencoes ? 
                    (manutencoes.map( (manutencao) => (
                        <TableItem
                            key={manutencao.id}
                            id={manutencao.id}
                            link_view={`/manutencao/${manutencao.id}`}
                            status={manutencao.status}
                            col1={manutencao.tipo.nome}
                            col2={
                                <>
                                    {manutencao.condominio?.nome} <br />
                                    {manutencao.bloco?.nome && (
                                        <>
                                        Bloco: {manutencao.bloco.nome} <br />
                                        </>
                                    )}
                                    {manutencao.apartamento?.numero && (
                                        <>Apto: {manutencao.apartamento.numero}</>
                                    )}
                                </>
                            }
                            col3={manutencao.data_agendada}
                            col4={
                                <>
                                <span className={`col-status col-status-${manutencao.status}`}>{manutencao.status}</span>
                                </>
                            }
                            onClickView={ () => {
                                    navigate(`/manutencao/${manutencao.id}`)
                                }
                            }
                            onClickEdit={ () => {
                                    navigate(`/manutencao/editar/${manutencao.id}`)
                                }
                            }
                            onClickDelete={ () => {
                                    setMostrarModalDelet(true);
                                    setManutencaoSelecionada(manutencao);
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
                    title='Deletar manutenção'
                    description={`Tem certeza que deseja deletar a manutenção ${manutencaoSelecionada.tipo.nome} do dia ${manutencaoSelecionada.data_agendada} no ${manutencaoSelecionada.condominio.nome}?`}
                    onConfirm={ () => {
                            handleDelete(manutencaoSelecionada.id);
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