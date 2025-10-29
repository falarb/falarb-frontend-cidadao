import { useRef } from "react";
import "./styles.css";

export default function InputCodeUnic({ label, name, onChange }) {
  const inputsRef = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const handleInput = (e, index) => {
    const value = e.target.value;
    if (value && index < 5) {
      inputsRef[index + 1].current.focus();
    }

    if (onChange) {
      const code = inputsRef.map((ref) => ref.current.value).join("");
      onChange({ target: { name, value: code } });
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputsRef[index - 1].current.focus();
    }
  };


  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").slice(0, 6); // só 6 dígitos
    paste.split("").forEach((char, i) => {
      if (inputsRef[i]?.current) {
        inputsRef[i].current.value = char;
      }
    });

    // foca no último preenchido
    const lastIndex = paste.length - 1;
    if (inputsRef[lastIndex]?.current) {
      inputsRef[lastIndex].current.focus();
    }

    triggerOnChange();
  };

  const triggerOnChange = () => {
    if (onChange) {
      const code = inputsRef.map((ref) => ref.current.value).join("");
      onChange({ target: { name, value: code } });
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
            type="text"
            maxLength={1}
            className="input-codigo-unico code-box"
            onChange={(e) => handleInput(e, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            onPaste={handlePaste}
          />
        ))}
      </div>
    </div>
  );
}
