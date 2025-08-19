import { useState, useEffect } from "react";
import "./styles.css";

export default function InputEmail({
  label,
  name,
  value,
  onChange,
  placeholder,
  setIsValid,
}) {
  const [changed, setChanged] = useState(false);
  const isEmailValid = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  const isValid = isEmailValid(value);

  useEffect(() => {
    if (value !== "") {
      setChanged(true);
    }
  }, [value]);

  useEffect(() => {
    setIsValid(isValid); // Passa o estado de validade pro pai
  }, [isValid]);

  return (
    <div className="container-input-email">
      <label>{label}</label>
      <input
        type="email"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        className={!isValid && changed ? "invalid" : ""}
      />
      {!isValid && changed && (
        <p className="invalid-text" style={{ color: "red" }}>
          E-mail inválido
        </p>
      )}
    </div>
  );
}
