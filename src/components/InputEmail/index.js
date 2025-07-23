import './styles.css'

export default function InputEmail({ label, name, value, onChange, placeholder }) {

    const isEmailValid = (value) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(value);
    };
    
    return (
        <div className='container-input-email'>
            <label>{label}</label>
            <input
                type="email"
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                style={{ borderColor: isEmailValid(value) ? "" : "red" }}
            />
            {!isEmailValid(value) && <p className='invalid-text' style={{ color: "red" }}>E-mail inválido</p>}
        </div>

    )

}