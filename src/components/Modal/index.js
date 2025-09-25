import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

export default function Modal({
  title,
  description,
  onConfirm,
  onCancel,
  type,
}) {
  return (
    <div className="modal">
      <div className="card">
        <div className="card-content">
          <div className={`image ${type}-image`}>
            {type === 'success'
              ? <FontAwesomeIcon icon={faCheckCircle} />
              : <FontAwesomeIcon icon={faExclamationTriangle} />
            }
          </div>
          <div className="content">
            <span className="title">{title}</span>
            <p className="message">{description}</p>
          </div>
          <div className="actions">
            <button
              className={`desactivate button-${type}`}
              type="button"
              onClick={onConfirm}
            >
              Confimar
            </button>
            <button className="cancel" type="button" onClick={onCancel}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
