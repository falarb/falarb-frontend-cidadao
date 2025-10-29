import './styles.css'

export default function InputText({ label, type, name, value, onChange, adicionalClass, placeholder, required, title }) {
    return (
        <div className="container-input">
            <label>
                {label}
                {required && <span className="required">*</span>}
            </label>
            <input
                className={`${adicionalClass} input-text`}
                type={type}
                name={name}
                title={title}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
            />
        </div>
    )
}