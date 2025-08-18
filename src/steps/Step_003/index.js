import { useState } from "react";
import BtnPrimary from "../../components/Btn/BtnPrimary";
import BtnSecundary from "../../components/Btn/BtnSecundary";
import InputCode from "../../components/Input/InputCode";
import Modal from "../../components/Modal";
import "./styles.css";

export default function Step003({
  solicitacao,
  setSolicitacao,
  cidadao,
  setCidadao,
  step,
  setStep
}) {
  const [modalCancelAberto, setModalCancelAberto] = useState(false);
  const [modalErroAberto, setModalErroAberto] = useState(false);
  const [validacao, setValidacao] = useState(false);

  const receberCodigo = async () => {
    if (step !== 3) {
      setStep(1);
    }

    try {
      const response = await fetch(`http://localhost:3000/api/cidadaos/envia-token/${cidadao.id}`);
      if (!response.ok) {
        throw new Error("Erro ao receber o código");  
      }
      const data = await response.json();
      console.log(data)
    } catch (error) {
      console.error("Erro ao receber o código:", error);
      throw new Error("Erro ao receber o código");
    }

  }

  receberCodigo();

  const handleChange = (event) => {
    const codigo_uninco = event.target.value;

    if (codigo_uninco !== "1234") {
      setValidacao(true);
    } else {
      setValidacao(false);
    }

    setSolicitacao((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className="container-step-3">
      <h2>
        Insira abaixo o código que enviamos para o seu endereço de email -{" "}
        <span className="accent-color">{solicitacao.email}</span>
      </h2>

      <InputCode
        name="codigo_uninco"
        placeholder="1234"
        mask="9999"
        value={solicitacao.codigo_uninco}
        onChange={handleChange}
      />

      <BtnPrimary
        onClick={() => {
          if (validacao) {
            setModalErroAberto(true);
            return;
          }
          
        }}
      >
        Verificar
      </BtnPrimary>

      <BtnSecundary adicionalClass="btn-back" onClick={0}>
        Não recebi o código
      </BtnSecundary>

      <BtnSecundary
        adicionalClass="btn-cancel"
        onClick={() => {
          setModalCancelAberto(true);
        }}
      >
        Cancelar
      </BtnSecundary>

      {modalErroAberto && (
        <Modal
          type="danger"
          title="Verifique o código digitado"
          description="O código digitado é inválido, por favor, verifique o código em seu e-mail e tente novamente."
          onCancel={() => setModalErroAberto(false)}
          onConfirm={() => setModalErroAberto(false)}
        ></Modal>
      )}

      {modalCancelAberto && (
        <Modal
          type="warning"
          title="Cancelar solicitação"
          description="Tem certeza que deseja cancelar a solicitação? Os dados não serão salvos."
          onCancel={() => setModalCancelAberto(false)}
          onConfirm={() => {
            window.location.reload();
          }}
        ></Modal>
      )}
    </div>
  );
}
