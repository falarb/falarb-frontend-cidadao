import { useState } from "react";
import InputMask from "react-input-mask";
import "./styles.css";
import { validarCPF } from "../../../utils/functions";

export default function InputCPF({
  label,
  mask,
  type,
  name,
  value,
  onChange,
  placeholder,
  setCpfValido,
}) {
  const [mensagemErro, setMensagemErro] = useState(null);

  const handleChange = (evento) => {
    let cpf = evento.target.value;

    const valido = validarCPF(cpf);
    setCpfValido(valido);

    if (!valido) {
      setMensagemErro("CPF inválido");
    } else {
      setMensagemErro(null);
    }

    onChange(evento);
  };

  return (
    <div className="custom-input-mask">
      <label>{label}</label>
      <InputMask
        className={mensagemErro ? "input-mask error" : "input-mask"}
        mask={mask || "(99) 99999-9999"}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={(evento) => handleChange(evento)}
        mensagemErro={mensagemErro}
      >
        {(inputProps) => <input type={type} {...inputProps} />}
      </InputMask>
    </div>
  );
}
