import './styles.css';

export default function SelectBool({ label, value, name, onChange }) {


    return (
        <div className="campo">
            <label htmlFor="status">{label}</label>
            <select
                name={name}
                id="status"
                value={value}
                onChange={onChange}
                className="select-status"
            >
                <option value="">Selecione o status</option>
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
            </select>
        </div>
    );
}