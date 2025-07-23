import './styles.css'

export default function TextArea ( { label, type, name, value, onChange, adicionalClass, placeholder, required} ) {
    return ( 
        <div className="container-text-area">
            <label>{label}</label>
            <textarea 
                className={`${adicionalClass} text-area`}
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