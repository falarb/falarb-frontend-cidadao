import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import BtnPrimary from "../../components/Btn/BtnPrimary";
import BtnSecundary from "../../components/Btn/BtnSecundary";
import InputEmail from "../../components/Input/InputEmail";
import Modal from "../../components/Modal";
import ModalHelp from "../../components/Modal/Help";
import { useHelp } from "../../hooks/useHelp";
import { helpConfigs } from "../../utils/helpConfigs";
import "./styles.css";
import Loading from "../../components/Loading";
import HelpIndicator from "../../components/HelpIndicator";

export default function Step002({
  setSolicitacao,
  setCidadao,
  cidadao,
  setStep,
}) {
  const { isHelpOpen, closeHelp, openHelp } = useHelp(helpConfigs.step002);
  const [modalCancelAberto, setModalCancelAberto] = useState(false);
  const [modalErroAberto, setModalErroAberto] = useState(false);
  const [modalIndisponivelAberto, setModalIndisponivelAberto] = useState(false);
  const [isValid, setIsValid] = useState("");
  const [email, setEmail] = useState();
  const [carregando, setCarregando] = useState(false);
  const [mensagemModal, setMensagemModal] = useState({});

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
      console.error("Erro ao verificar email:", error);
      if (error?.response?.data?.error === "max_solicitacoes_abertas") {
        setMensagemModal({
          titulo: "Limite de solicitações atingido",
          descricao: "Você atingiu o limite máximo de 5 solicitações abertas. Por favor, aguarde a resolução das solicitações existentes antes de criar uma nova.",
        });
      } else if (error?.response?.data?.error === "cidadao_bloqueado") {
        setMensagemModal({
          titulo: "Acesso bloqueado",
          descricao: "Seu acesso ao sistema está bloqueado. Por favor, entre em contato com o suporte para mais informações.",
        });
      } else if (error?.response?.data?.error === "cidadao_inativo") {
        setMensagemModal({
          titulo: "Acesso inativo",
          descricao: "Seu acesso ao sistema está desativado. Por favor, entre em contato com o suporte para mais informações.",
        });
      }

      setModalIndisponivelAberto(true);
    } finally { setCarregando(false); }
  };

  return (
    <>
      {carregando && <Loading />}
      <div className="container-step-2">
        <h2 className="welcome-text">
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

          <BtnPrimary
            type="submit"
            disabled={!(cidadao.email && isValid)}
          >
            Verificar e-mail
          </BtnPrimary>
        </form>

        <BtnSecundary onClick={() => setStep(1)}>
          Voltar uma etapa
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
            title={mensagemModal?.titulo || "Ops... Algo errado aqui..."}
            description={mensagemModal?.descricao || "Estamos enfrentando dificuldades para processar sua solicitação. Em instantes tente novamente."}
            onCancel={() => setModalIndisponivelAberto(false)}
            onConfirm={() => setModalIndisponivelAberto(false)}
          ></Modal>
        )}

        <ModalHelp
          title={helpConfigs.step002.title}
          content={helpConfigs.step002.content}
          isOpen={isHelpOpen}
          onClose={closeHelp}
        />

        <HelpIndicator onHelpOpen={openHelp} isOpen={!isHelpOpen} />
      </div>
    </>
  );
}
