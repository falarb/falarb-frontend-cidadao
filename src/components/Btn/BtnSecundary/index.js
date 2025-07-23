import './styles.css'

export default function BtnSecundary ( { children, type, onClick, adicionalClass } ) {
    return (
        <button
            className={`btn-secundary ${adicionalClass}`}
            type={type}
            onClick={onClick}
        >
            {children}
        </button>
    )
}