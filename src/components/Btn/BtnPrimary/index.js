import './styles.css'

export default function BtnPrimary({ children, type, onClick, adicionalClass, disabled, title }) {
    return (
        <button
            className={`btn-primary ${adicionalClass} ${disabled ? 'button-disabled' : ''}`}
            disabled={disabled || false}
            type={type}
            title={title}
            onClick={onClick}
        >
            {children}
        </button>
    )
}