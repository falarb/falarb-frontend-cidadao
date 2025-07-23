import { useState } from 'react';
import './styles.css';

export default function TableHeader({ 
    col1, 
    sort1, 
    onClickSort1,

    col2,
    sort2,
    onClickSort2,

    col3, 
    sort3,
    onClickSort3,

    col4,  
    sort4,
    onClickSort4,

    col5,
    col5_status = '',
    sort5,
    onClickSort5,
 }) {

    const [activeSort1, setActiveSort1] = useState(0);
    const [activeSort2, setActiveSort2] = useState(0);
    const [activeSort3, setActiveSort3] = useState(0);
    const [activeSort4, setActiveSort4] = useState(0);
    const [activeSort5, setActiveSort5] = useState(0);

    return (
        <div className="table-five-header">
            <div className="table-header-item">
                <span>{col1}</span>
                <svg    
                    className={`${sort1} ${activeSort1 === 1 ? 'active' : 'desactive'}`} 
                    onClick={ () => {
                        onClickSort1();
                        setActiveSort1(activeSort1 === 1 ? 0 : 1);
                    }} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>
            </div>

            <div className="table-header-item">
                <span>{col2}</span>
                <svg className={`${sort2}  ${activeSort2 === 1 ? 'active' : 'desactive'}`} onClick={ () => {
                        onClickSort2();
                        setActiveSort2(activeSort2 === 1 ? 0 : 1);
                    }} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>
            </div>

            <div className="table-header-item">
                <span>{col3}</span>
                <svg className={`${sort3} ${activeSort3 === 1 ? 'active' : 'desactive'}`} onClick={ () => {
                        onClickSort3();
                        setActiveSort3(activeSort3 === 1 ? 0 : 1);
                    }} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>
            </div>

            <div className="table-header-item">
                <span>{col4}</span>
                <svg className={`${sort4} ${activeSort4 === 1 ? 'active' : 'desactive'}`} onClick={ () => {
                        onClickSort4();
                        setActiveSort4(activeSort4 === 1 ? 0 : 1);
                    }} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>
            </div>

            <div className={`table-header-item${col5_status}`} >
                <span>{col5}</span>
                <svg className={`${sort5} ${activeSort5 === 1 ? 'active' : 'desactive'}`} onClick={ () => {
                        onClickSort5();
                        setActiveSort5(activeSort5 === 1 ? 0 : 1);
                    }} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>
            </div>

        </div>
    );
}