import { Link } from 'react-router-dom';
import './styles.css';

export default function TableItem({ height, id, link_view, status, col1, col2, col3, col4 ,tipo, onClickView, onClickEdit, onClickDelete}) {
    
    function truncate(text, maxLength) {
        if (!text) return '';
        return text.length > maxLength ? text.substring(0, maxLength) + '…' : text;
    }

    return (
        <div className={`table-item ${height}`}>
            <div className="table-item-id" >ID #{id}</div>
            <div className={tipo}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className={`table-item-status ${status}`} to="/"></div>
                <div className="table-item-column">
                    <Link to={link_view}>{truncate(col1,60)}</Link>
                </div>

                <div className="table-item-column">
                    <span>{truncate(col2, 40)}</span>
                </div>

                <div className="table-item-column">
                    <span>{truncate(col3,60)}</span>
                </div>

                <div className="table-item-column">
                    <span>{truncate(col4,60)}</span>
                </div>

                <div className="table-item-action">
                    <button className="button-action view" onClick={onClickView}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/></svg>
                    </button>
                    <button className="button-action edit" onClick={onClickEdit}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
                    </button>
                    <button className="button-action delete" onClick={onClickDelete}> 
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                    </button>
                </div>
        </div>
    );
}