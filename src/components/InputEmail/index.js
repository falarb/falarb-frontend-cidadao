import './styles.css'
import { useEffect } from 'react';

export default function InputEmail({ label, name, value, onChange, placeholder, setValidade}) {

    const isEmailValid = (value) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(value);
    };
    useEffect(() => {
        setValidade(!isEmailValid(value));
    }, [value, setValidade]); // dispara toda vez que value muda


    return (
        <div className='container-input-email'>
            <label>{label}</label>
            <input
                type="email"
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                style={{ borderColor: isEmailValid(value) ? "" : "#ffc4c4" }}
            />
            { !isEmailValid(value) && <p className='invalid-text' style={{ color: "red" }}>Insira um e-mail inválido</p> }
        </div>

    )

}