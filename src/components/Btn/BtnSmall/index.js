import './styles.css'

export default function BtnSmallSecundary ( { children, type, onClick, adicionalClass } ) {
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