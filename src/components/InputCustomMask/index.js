import InputMask from 'react-input-mask';
import './styles.css';

export default function InputCustomMask ( { label, mask, type, name, value, onChange, placeholder} ) {
    return (
        <div className='custom-input-mask'>
            <label>{label}</label>
            <InputMask
                className='input-mask'
                mask={mask || "(99) 99999-9999"}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
            >
            {(inputProps) => <input type={type} {...inputProps} />}
        </InputMask>
    </div>
    );
} 