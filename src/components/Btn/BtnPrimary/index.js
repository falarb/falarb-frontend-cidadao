import './styles.css'

export default function BtnPrimary({ children, type, onClick, adicionalClass, disabled }) {
    return (
        <button
            className={`btn-primary ${adicionalClass} ${disabled ? 'button-disabled' : ''}`}
            disabled={disabled || false}
            type={type}
            onClick={onClick}
        >
            {children}
        </button>
    )
}