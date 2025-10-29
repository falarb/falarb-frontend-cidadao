import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

export default function Modal({
  title,
  description,
  onConfirm,
  onCancel,
  type,
  icon
}) {
  return (
    <div className="modal">
      <div className="card">
        <div className="card-content">
          <div className={`image ${type}-image`}>
            <FontAwesomeIcon icon={icon || faExclamationTriangle} />
          </div>
          <div className="content">
            <span className="title">{title}</span>
            <p className="message">{description}</p>
          </div>
          <div className="actions">
            <button
              className={`desactivate button-${type}`}
              type="button"
              title="Botão para confirmar a ação descrita"
              onClick={onConfirm}
            >
              Confirmar
            </button>
            <button
              className="cancel"
              type="button"
              onClick={onCancel}
              title="Botão para cancelar a ação descrita"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
