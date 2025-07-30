import './styles.css'
import { useEffect, useState } from 'react';

export default function InputEmail({ label, name, value, onChange, placeholder, setValidade}) {

    const [touched, setTouched] = useState(false);

    const isEmailValid = (value) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(value);
    };

    useEffect(() => {
        if (touched) {
            setValidade(!isEmailValid(value));
        }
    }, [value, touched, setValidade]);

    const handleChange = (e) => {
        if (!touched) setTouched(true);
        onChange(e);
    };

    const showError = touched && !isEmailValid(value);

    return (
        <div className='container-input-email'>
            <label>{label}</label>
            <input
                type="email"
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={handleChange}
                style={{ borderColor: showError ? "#ffc4c4" : "" }}
            />
            { showError && <p className='invalid-text' style={{ color: "red" }}>Insira um e-mail válido</p> }
        </div>
    )
}