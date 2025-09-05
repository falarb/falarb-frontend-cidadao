import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import BtnPrimary from "../../components/Btn/BtnPrimary";
import BtnSecundary from "../../components/Btn/BtnSecundary";
import InputEmail from "../../components/Input/InputEmail";
import Modal from "../../components/Modal";
import "./styles.css";
import Loading from "../../components/Loading";

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
  const [carregando, setCarregando] = useState(false);

  const handleChange = (event) => {
    setCidadao((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    setEmail(event.target.value);
  };

  const handleSubmitEmail = async () => {
    setCarregando(true);
    try {
      const { data } = await axiosInstance.get(`/cidadaos/email-existe?email=${email}`);

      if (!data.id) {
        setCidadao((prev) => ({
          ...prev,
          email: email,
        }));

        setStep(6);
      } else {
        setCidadao((prev) => ({
          ...prev,
          id: data.id,
        }));

        setSolicitacao((prev) => ({
          ...prev,
          id_cidadao: data.id,
        }));

        setStep(3);
      }
    } catch (error) {
      console.error("Erro ao enviar email:", error);
      setModalIndisponivelAberto(true);
    } finally { setCarregando(false); }
  };

  return (
    <>
      {carregando && <Loading />}
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
          Cancelar solicitação
        </BtnSecundary>

        {modalErroAberto && (
          <Modal
            type="danger"
            title="Verifique o email digitado"
            description="O email digitado é inválido, por favor, verifique e tente novamente."
            onCancel={() => setModalErroAberto(false)}
            onConfirm={() => setModalErroAberto(false)}
          />
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
          />
        )}

        {modalIndisponivelAberto && (
          <Modal
            type="warning"
            title="Ops... Algo errado aqui..."
            description="Estamos enfrentando dificuldades para processar sua solicitação. Em instantes tente novamente."
            onCancel={() => setModalIndisponivelAberto(false)}
            onConfirm={() => {
              window.location.reload();
            }}
          ></Modal>
        )}
      </div>
    </>
  );
}
