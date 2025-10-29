import { useState, useEffect } from "react";
import "./styles.css";

export default function InputEmail({
  label,
  name,
  value,
  onChange,
  placeholder,
  setIsValid,
  title
}) {
  const [changed, setChanged] = useState(false);
  const isEmailValid = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  const isValid = isEmailValid(value);
  setIsValid(isValid);

  useEffect(() => {
    if (value !== "") {
      setChanged(true);
    }
  }, [value]);

  return (
    <div className="container-input-email">
      <label>{label}</label>
      <input
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        className={!isValid && changed ? "invalid" : ""}
        title={title}
      />
      {!isValid && changed && (
        <p className="invalid-text" style={{ color: "red" }}>
          E-mail inválido
        </p>
      )}
    </div>
  );
}
