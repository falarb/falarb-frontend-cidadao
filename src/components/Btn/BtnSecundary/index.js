import './styles.css'

export default function BtnSecundary ( { children, type, onClick, adicionalClass, title } ) {
    return (
        <button
            className={`btn-secundary ${adicionalClass}`}
            type={type}
            onClick={onClick}
            title={title}
        >
            {children}
        </button>
    )
}