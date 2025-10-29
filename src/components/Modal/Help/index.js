import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function ModalHelp({ title, content, isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-help-overlay" onClick={onClose}>
      <div className="modal-help" onClick={(e) => e.stopPropagation()}>
        <div className="modal-help-header">
          <div className="modal-help-title">
            <FontAwesomeIcon icon={faQuestionCircle} className="help-icon" />
            <h3>{title}</h3>
          </div>
          <button className="modal-help-close" onClick={onClose} title="Botão para fechar a ajuda">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <div className="modal-help-content">
          <div className="help-content">
            {typeof content === 'string' ? (
              <p>{content}</p>
            ) : (
              content
            )}
          </div>

          <div className="help-footer">
            <small>💡 Pressione F1 a qualquer momento para ver esta ajuda</small>
          </div>
        </div>
      </div>
    </div>
  );
}