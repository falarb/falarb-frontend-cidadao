import { useEffect, useState } from "react";
import Table from '../../components/Table';
import TableHeader from '../../components/Table/TableHeader';
import TableItem from '../../components/Table/TableItem';
import Loading from "../../components/Loading";
import TableItemEmpty from "../../components/Table/TableItemEmpty";
import TableFooter from "../../components/Table/TableFooter";
import BtnPrimary from "../../components/Btn/BtnPrimary"
import BtnSecundary from "../../components/Btn/BtnSecundary"
import Erro from "../../components/Mensagem/Erro"
import { useNavigate } from "react-router-dom";


export default function TiposManutencoes() {
    const [tipo_manutencao, setTipoManutencoes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTipoManutencoes = async () => {
            setError(null)
            setLoading(true)

            try {
                const response = await fetch (`http://127.0.0.1:8000/api/tipos-manutencao/?page=${page}`); 
                
                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Erro do servidor:', errorData);
                    throw new Error(errorData.message || 'Erro ao cadastrar');
                }

                const data = await response.json()
                setTipoManutencoes(data.data)
                setTotalPages(data.last_page)
                console.log(data)
            } catch (error) {
                console.error("Erro ao buscar tipos de manutenção:", error);
                setError(error);
            } finally {
                setLoading(false)
            }
        }

        fetchTipoManutencoes();
    }, [page]);

    return (
        <div>
            {loading && <Loading />}
            {error && <Erro mensagem={error.message || "Erro desconhecido"} />}

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

            <h2>Tipos de Manutenções</h2>
            <Table>
                <TableHeader
                    col1="Nome"
                />

                {loading ? (
                <TableItemEmpty>Carregando...</TableItemEmpty>
                ) : error ? (
                <TableItemEmpty>Erro ao carregar dados</TableItemEmpty>
                ) : tipo_manutencao.length > 0 ? (
                tipo_manutencao.map((item) => (
                    <TableItem
                    key={item.id}
                    height="sm"
                    id={item.id}
                    col1={item.nome}
                    link_view={`/tipo-manutencao/${item.id}`}
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
