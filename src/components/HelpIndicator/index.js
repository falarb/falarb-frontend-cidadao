import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import "./styles.css";

export default function HelpIndicator({ onHelpOpen, isOpen }) {
    const handleClick = () => {
        onHelpOpen();
    };

    if (!isOpen) return null;

    return (
        <div className="help-indicator" onClick={handleClick}>
            <div className="help-indicator-content">
                <FontAwesomeIcon icon={faQuestionCircle} className="help-indicator-icon" />
            </div>
        </div>
    );
}