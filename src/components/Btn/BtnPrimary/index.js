import './styles.css'

export default function BtnPrimary ( { children, type, onClick, adicionalClass } ) {
    return (
        <button
            className={`btn-primary ${adicionalClass}`}
            type={type}
            onClick={onClick}
        >
            {children}
        </button>
    )
}