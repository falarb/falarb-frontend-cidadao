import { useEffect, useState } from "react";
import TableFiveColuns from "../../components/TableFive";
import TableHeader from "../../components/TableFive/TableHeader";
import TableItem from "../../components/TableFive/TableItem";
import TableItemEmpty from "../../components/TableFive/TableItemEmpty"
import TableFooter from "../../components/TableFive/TableFooter";
import Erro from "../../components/Mensagem/Erro";
import Modal from "../../components/Modal";
import Filtros from "../../components/Filtros";
import Loading from "../../components/Loading"
import SelectCustom from "../../components/SelectCustom";
import InputSearch from "../../components/InputSearch";
import BtnPrimary from "../../components/Btn/BtnPrimary"
import BtnSecundary from "../../components/Btn/BtnSecundary";
import { useNavigate } from "react-router-dom";
import './styles.css';

export default function Solicitacoes() {
    
    const [solicitacoes, setSolicitacoes] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 
    const [mostrarModalDelete, setAbrirModalDelete] = useState(true);
    const [solicitacaoSelecionada, setSolicitacaoSelecionada] = useState(null);
    const [totalPages, setTotalPages] = useState(null)
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState(search);
    const [status, setStatus] = useState('');
    const [tipo_pedido, setTipoPedido] = useState('');
    const [comunidade, setComunidade] = useState('');
    const [sort_by, setOrderBy] = useState('');
    const [sort_order, setSortOrder] = useState();
    let navigate = useNavigate();

    useEffect( () => {

        const handler = setTimeout(() => {
            setDebouncedSearch(search);
        }, 700);

        return () => {
            clearTimeout(handler); 
        };

    }, [search]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null); 

            try {
                const response = await fetch(`http://127.0.0.1:8000/api/condominios/?page=${page}&status=${status}&search=${debouncedSearch}&sort_by=${sort_by}&sort_order=${sort_order}&tipo_pedido=${tipo_pedido}&comunidade=${comunidade}`);

                if (!response.ok) {
                    throw new Error(`Erro HTTP ${response.status}`);
                }

                const data = await response.json();
                setTotalPages(data.last_page); 

                if (data && Array.isArray(data.data)) {
                    setSolicitacoes(data.data);
                } else {
                    setSolicitacoes([]);
                    setError("Formato de resposta inesperado da API");
                }

            } catch (err) {
                setError(err.message || "Erro desconhecido");
                setSolicitacoes([]);
            }  finally {
                setLoading(false)
            }
        };

        fetchData();
    }, [page, status, debouncedSearch, sort_by, sort_order, tipo_pedido, comunidade]);

    const handleDeleteSolicitacao = async () => {

        try{
            setError(null)

            const response = await fetch (`http://127.0.0.1:8000/api/usuarios/${solicitacaoSelecionada.id}`,
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
        {error && <Erro mensagem={error} onClose={null} />}
        {loading && <Loading />}
        {mostrarModalDelete && solicitacaoSelecionada && (<Modal 
                type='danger'
                title='Excluir solicitação'
                description={`Você solicitou excluir o seguinte condomínio: ${solicitacaoSelecionada.nome}. Essa alteração não pode ser desfeita. Você tem certeza?`}
                onConfirm={ () => {
                    //handleDeleteSolicitacao()
                    alert('delete')
                    setAbrirModalDelete(false)
                    window.location.reload()
                }}
                onCancel={ () => {
                    setAbrirModalDelete(false)
                }}
            />)}   

        <div className="navTools">
            <BtnSecundary
                adicionalClass='btn-svg'
                onClick={ () => {
                    navigate('/')
                }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#344054"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
            </BtnSecundary>
            <BtnPrimary
                onClick={ () => {
                    navigate('/')
                }}
            >
                Cadastrar
            </BtnPrimary>
        </div>

        <h2>Listagem de Solicitações</h2>

        <Filtros>
  
            <SelectCustom
                label='Status'
                value={status} 
                onChange={(event) => {
                setStatus(event.target.value)
            }}>
                <option value=''>Todos</option>
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
            </SelectCustom>

            <SelectCustom
                label='Tipo de pedido'
                value={status} 
                onChange={(event) => {
                setTipoPedido(event.target.value)
            }}>
                
            </SelectCustom>

            <SelectCustom
                label='Comunidade'
                value={status} 
                onChange={(event) => {
                setComunidade(event.target.value)
            }}>
                
            </SelectCustom>

             <InputSearch
                label='Busque por solicitações'
                value={search} 
                placeholder='Busque por solicitações...' 
                onChange={ (event) => {
                setSearch(event.target.value)
            }}>
            </InputSearch>
            
        </Filtros>
        
        <TableFiveColuns>
            <TableHeader
                col1="Data de criação"
                sort1={true}
                onClickSort1={ () => {
                    setOrderBy('nome');
                    setSortOrder(sort_order === 'asc' ? 'desc' : 'asc');
                }}

                col2="Cidadão"
                sort2={true}

                col3="Tipo de pedido"
                sort3={false}

                col4="Comunidade"
                sort4={false}

                col5="Status"
                sort5={false}
                col5_status="true"
            />
            {solicitacoes.length > 0 ? (solicitacoes.map((solicitacao) => (
                <TableItem
                    key={solicitacao.id}
                    id={solicitacao.id}
                    status={solicitacao.status}
                    col1={solicitacao.nome}
                    col2={solicitacao.telefone +' '+ solicitacao.email}
                    col3={solicitacao.endereco}
                    col4={solicitacao.sindico.nome}
                    col5={solicitacao.status}
                    classNameCol5={solicitacao.status}

                    link_view={`/solicitacao/${solicitacao.id}`}
                    
                    onClickView={ () => {
                        navigate(`/solicitacao/${solicitacao.id}`)
                    }}
                    
                    onClickEdit={ () => {
                        navigate(`/solicitacao/editar/${solicitacao.id}`)
                    }}
                    
                    onClickDelete={ () => {
                        setSolicitacaoSelecionada(solicitacao)
                        setAbrirModalDelete(true)
                    }}
                />                
            ))) : <TableItemEmpty>Ops... Não encontramos nada aqui.</TableItemEmpty>
           } 

            <TableFooter
                totalPages={totalPages}
                atualPage={page}
                onPageChange={(newPage) => setPage(newPage)}
            />
        </TableFiveColuns>
        </>
        )
  
}
