import './styles.css'

export default function InputDate ( { label, name, value, onChange, adicionalClass, placeholder, required} ) {
    return ( 
        <div className="container-input-date">
            <label>{label}</label>
            <input 
                className={`${adicionalClass} input-date`}
                type='date'
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
            />
            
        </div>
    )
}