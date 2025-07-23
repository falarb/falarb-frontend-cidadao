import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from '../../components/TableFive';
import TableHeader from '../../components/TableFive/TableHeader';
import TableItem from '../../components/TableFive/TableItem';
import Loading from "../../components/Loading";
import TableItemEmpty from "../../components/TableFive/TableItemEmpty";
import TableFooter from "../../components/TableFive/TableFooter";
import BtnPrimary from "../../components/Btn/BtnPrimary"
import BtnSecundary from "../../components/Btn/BtnSecundary"
import Erro from "../../components/Mensagem/Erro";
import Filtros from "../../components/Filtros";
import Modal from '../../components/Modal'
import InputSearch from "../../components/InputSearch";

export default function Comunidades() {
    const [comunidades, setComunidades] = useState([]);
    const [mostrarModalDelete, setAbrirModalDelete] = useState(true);
    const [comunidadeSelecionada, setComunidadeSelecionada] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
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

    useEffect(() => {
        const fetchComunidades = async () => {
            setError(null)
            setLoading(true)

            try {
                const response = await fetch (`http://127.0.0.1:8000/api/tipos-manutencao/?page=${page}&search=${debouncedSearch}&sort_by=${sort_by}&sort_order=${sort_order}`); 
                
                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Erro do servidor:', errorData);
                    throw new Error(errorData.message || 'Erro ao cadastrar');
                }

                const data = await response.json()
                setComunidades(data.data)
                setTotalPages(data.last_page)
                console.log(data)
            } catch (error) {
                console.error("Erro ao buscar tipos de manutenção:", error);
                setError(error);
            } finally {
                setLoading(false)
            }
        }

        fetchComunidades();
    }, [page, debouncedSearch, sort_order, sort_by]);

    const handleDeleteComunidade = async () => {
        try{
            setError(null)

            const response = await fetch (`http://127.0.0.1:8000/api/usuarios/${comunidadeSelecionada.id}`,
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
        <div>
            {loading && <Loading />}
            {error && <Erro mensagem={error.message || "Erro desconhecido"} />}
            {mostrarModalDelete && comunidadeSelecionada && (<Modal 
                type='danger'
                title='Excluir comunidade'
                description={`Você solicitou excluir a seguinte comunidade: ${comunidadeSelecionada.nome}. Essa alteração não pode ser desfeita. Você tem certeza?`}
                onConfirm={ () => {
                    //handleDeleteComunidade()
                    alert('delete')
                    setAbrirModalDelete(false)
                    window.location.reload()
                }}
                onCancel={ () => {
                    setAbrirModalDelete(false)
                }}
            />)}   
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

            <h2>Listagem de Comunidades</h2>

            <Filtros>
                <InputSearch
                    label='Busque por solicitações'
                    value={search} 
                    placeholder='Busque por solicitações...' 
                    onChange={ (event) => {
                    setSearch(event.target.value)
                }}>
                </InputSearch>
            </Filtros>

            <Table>
                <TableHeader
                    col1="Nome"
                    sort1={true}
                    onClickSort1={ () => {
                        setOrderBy('nome');
                        setSortOrder(sort_order === 'asc' ? 'desc' : 'asc');
                    }}

                    col2='Total de pedidos'
                    col3='Nº de concluídos'
                    col4='Nº de agendados'
                    col5='Nº em espera'
                />

                {loading ? (
                <TableItemEmpty>Carregando...</TableItemEmpty>
                ) : error ? (
                <TableItemEmpty>Ops... Não encontramos nada aqui.</TableItemEmpty>
                ) : comunidades.length > 0 ? (
                    comunidades.map((comunidade) => (
                        <TableItem
                            key={comunidade.id}
                            id={comunidade.id}
                            col1={comunidade.nome}
                            col2='99'
                            col3='99'
                            col4='99'
                            col5='99'
                            link_view={`/comunidade/${comunidade.id}`}
                            onClickView={() => {
                                navigate(`/comunidade/${comunidade.id}`)
                            }}
                            onClickEdit={() => {
                                navigate(`/comunidade/editar/${comunidade.id}`)
                            }}
                            onClickDelete={ () => {
                                setComunidadeSelecionada(comunidade)
                                setAbrirModalDelete(true)
                            }}
                    />
                ))
                ) : (
                <TableItemEmpty>Nenhum tipo de manutenção encontrado.</TableItemEmpty>
                )}

            <TableFooter
                totalPages={totalPages}
                atualPage={page}
                onPageChange={ (newPage) => {
                    setPage(newPage)
                }}
            />
            </Table>
        </div>
    );
}
