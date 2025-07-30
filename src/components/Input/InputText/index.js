import './styles.css'

export default function InputText ( { label, type, name, value, onChange, adicionalClass, placeholder, required} ) {
    return ( 
        <div className="container-input">
            <label>{label}</label>
            <input 
                className={`${adicionalClass} input-text`}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
            />
        </div>
    )
}