import { useState, useEffect } from "react";
import BtnPrimary from "../../components/Btn/BtnPrimary";
import BtnSecundary from "../../components/Btn/BtnSecundary";
import InputEmail from "../../components/Input/InputEmail";
import Modal from "../../components/Modal";
import "./styles.css";

export default function Step002({
  solicitacao,
  setSolicitacao,
  setCidadao,
  cidadao,
  step,
  setStep,
}) {
  const [modalCancelAberto, setModalCancelAberto] = useState(false);
  const [modalErroAberto, setModalErroAberto] = useState(false);
  const [modalIndisponivelAberto, setModalIndisponivelAberto] = useState(false);
  const [isValid, setIsValid] = useState("");
  const [email, setEmail] = useState();

  const handleChange = (event) => {
    setCidadao((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    setEmail(event.target.value);
  };

  const handleSubmitEmail = async () => {
    try {
      console.log("Email recebido:", email);

      // Verifica se o email já existe
      const emailResponse = await fetch(
        `http://127.0.0.1:8000/api/cidadaos/email-existe?email=${email}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!emailResponse.ok) {
        setModalIndisponivelAberto(true);
        throw new Error("Erro ao verificar email");
      }

      const data = await emailResponse.json();
      console.log("Resposta do servidor:", data);

      if (!data.id) {
        console.log("Email não cadastrado, criando novo cidadão");
        setCidadao((prev) => ({
          ...prev,
          email: email,
        }));
        setStep(6);
      } else {
        console.log("Email já cadastrado, buscando cidadão existente");
        setCidadao((prev) => ({
          ...prev,
          id: data.id,
        }));

        setSolicitacao((prev) => ({
          ...prev,
          id_cidadao: data.id,
        }));

        setStep(4);
      }
    } catch (error) {
      console.error("Erro ao enviar email:", error);
      setModalIndisponivelAberto(true);
    }
  };

  useEffect(() => {
    console.log("Cidadao atualizado:", cidadao);
  }, [cidadao]);

  return (
    <div className="container-step-2">
      <h2>
        Bem vindo ao <span className="accent-color">SolicitaAi</span>
      </h2>

      <h1>Vamos lá?</h1>

      <form
        onSubmit={async (event) => {
          event.preventDefault();
          if (isValid) {
            await handleSubmitEmail(event);
          } else {
            setModalErroAberto(true);
          }
        }}
      >
        <InputEmail
          label="Digite seu e-mail"
          name="email"
          placeholder="exemplo@email.com"
          value={cidadao.email}
          onChange={(event) => {
            handleChange(event);
          }}
          setIsValid={setIsValid}
        />

        {console.log("Estado de validade do email:", isValid)}

        <BtnPrimary type="submit">Verificar e-mail</BtnPrimary>
      </form>

      <BtnSecundary
        onClick={() => {
          setStep(1);
        }}
      >
        Voltar uma etapa
      </BtnSecundary>

      <BtnSecundary
        adicionalClassName="btn-cancel"
        onClick={() => {
          setModalCancelAberto(true);
        }}
      >
        Cancelar solicitacao
      </BtnSecundary>

      {modalErroAberto && (
        <Modal
          type="danger"
          title="Verifique o email digitado"
          description="O email digitado é inválido, por favor, verifique e tente novamente."
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

      {modalIndisponivelAberto && (
        <Modal
          type="warning"
          title="Ops... Algo errado aqui..."
          description="Estamos enfrentando dificuldades para processar sua solicitação. Em instantes tente novamente."
          onCancel={() => setModalCancelAberto(false)}
          onConfirm={() => {
            window.location.reload();
          }}
        ></Modal>
      )}
    </div>
  );
}
