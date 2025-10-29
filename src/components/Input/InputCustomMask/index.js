import InputMask from 'react-input-mask';
import './styles.css';

export default function InputCustomMask({ label, mask, type, name, value, onChange, placeholder, mensagemErro, required, title }) {
    return (
        <div className='custom-input-mask'>
            <label>
                {label}
                {required
                    ? <span className="required">*</span>
                    : <span className='optional'>{" ("}opcional{")"}</span>}
            </label>

            <InputMask
                className={`input-mask ${mensagemErro ? 'error' : ''}`}
                mask={mask}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                title={title}
            >
                {(inputProps) => <input type={type} {...inputProps} />}
            </InputMask>

            {mensagemErro && <span className='error-message'>{mensagemErro}</span>}
        </div>
    );
} 