import './styles.css'

export default function BtnSecundary({ children, type, onClick, adicionalClass, title }) {
    return (
        <button
            className={`btn-secundary ${adicionalClass}`}
            type={type}
            title={title}
            onClick={onClick}
        >
            {children}
        </button>
    )
}