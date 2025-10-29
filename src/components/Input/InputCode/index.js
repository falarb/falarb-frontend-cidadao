import { useRef } from 'react';
import './styles.css';

export default function InputCode({ label, name, onChange, title }) {
  const inputsRef = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const handleInput = (e, index) => {
    const value = e.target.value;
    if (/^\d$/.test(value) && index < 3) {
      inputsRef[index + 1].current.focus();
    }

    if (onChange) {
      const code = inputsRef.map(ref => ref.current.value).join('');
      onChange({ target: { name, value: code } });
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      inputsRef[index - 1].current.focus();
    }
  };

  return (
    <div className="custom-code-input">
      {label && <label>{label}</label>}
      <div className="code-input-wrapper">
        {inputsRef.map((ref, i) => (
          <input
            key={i}
            ref={ref}
            title={title}
            type="text"
            maxLength={1}
            className="code-box"
            onChange={(e) => handleInput(e, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
          />
        ))}
      </div>
    </div>
  );
}
