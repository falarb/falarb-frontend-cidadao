import './styles.css'

export default function SelectCustom({
    label,
    children,
    adicionalClass,
    options = [],
    value,
    name,
    onChange,
    valueKey = 'id',
    labelKey = 'nome',
    placeholder = 'Selecione uma opção...'
}) {
    return (
        <div className='container-select-custom'>
            <label>{label}</label>
            <select name={name} value={value} onChange={onChange} className={`${adicionalClass} select-custom`}>
                {children}
                <option value="">{placeholder}</option>
                {options.map((option) => (
                    <option key={option[valueKey]} value={option[valueKey]}>
                        {option[labelKey]}
                    </option>
                ))}
            </select>
        </div>

  );
}
