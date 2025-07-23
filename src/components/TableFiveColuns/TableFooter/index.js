import './styles.css';

export default function TableFooter({ children, totalPages, atualPage, onPageChange}) {

    if(!totalPages) {
        totalPages = 1;
    }

    if(!atualPage) {
        atualPage = 1;
    }


    return (
        <tfoot className="table-footer-five">
            <button 
                className='btn-footer'
                disabled={atualPage <= 1}
                onClick={() => onPageChange(atualPage - 1)}
            >
                Página anterior
            </button>
            
            Página {atualPage} de {totalPages}
           
            <button 
                className='btn-footer'
                disabled={atualPage >= totalPages}
                onClick={() => onPageChange(atualPage + 1)}
            >
                Próxima página
            </button>
        </tfoot>
    );
}
