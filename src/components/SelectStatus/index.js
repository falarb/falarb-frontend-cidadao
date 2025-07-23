import './styles.css';

export default function SelectStatus({value, name, onChange }) {
    return (
        <div className="select-status-wrapper">
            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className={`select-status ${value === 'ativo' ? 'ativo' : 'inativo'}`}
            >
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
            </select>
            <div className={`tag-${value}`}></div>
        </div>
    );
}