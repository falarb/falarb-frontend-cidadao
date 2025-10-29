import { useEffect, useState, useRef } from "react";
import BtnPrimary from "../../components/Btn/BtnPrimary";
import BtnSecundary from "../../components/Btn/BtnSecundary";
import InputCode from "../../components/Input/InputCode";
import Modal from "../../components/Modal";
import ModalHelp from "../../components/Modal/Help";
import { useHelp } from "../../hooks/useHelp";
import { helpConfigs } from "../../utils/helpConfigs";
import "./styles.css";
import moment from "moment";
import axiosInstance from "../../utils/axiosInstance";
import { deslogarCidadao } from "../../utils/functions";
import Loading from "../../components/Loading";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import InputText from "../../components/Input/InputText";
import HelpIndicator from "../../components/HelpIndicator";

export default function Step003({ cidadao, step, setStep, setCidadao }) {
  const { isHelpOpen, closeHelp, openHelp } = useHelp(helpConfigs.step003);
  const [modalInfo, setModalInfo] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [token, setToken] = useState('');
  const [modalEditarEmail, setModalEditarEmail] = useState(false);
  const [email, setEmail] = useState(cidadao?.email || '');

  const enviadoRef = useRef(false);

  useEffect(() => {
    if (!cidadao.id) return;

    const enviarToken = async () => {
      try {
        setCarregando(true);

        await axiosInstance.post(`/cidadaos/envia-token/${cidadao.id}`);
        enviadoRef.current = true;
      } catch (error) {
        setModalInfo({
          type: "danger",
          title: "Erro",
          description: "Não foi possível enviar o código para o seu e-mail. Por favor, tente novamente mais tarde.",
        })
        console.error("Erro ao enviar o código:", error);
      } finally { setCarregando(false); }
    };

    if (!enviadoRef.current) {
      enviadoRef.current = true;
      enviarToken();
    }
  }, [cidadao.id, step]);

  const validarToken = async () => {
    setCarregando(true);

    try {
      await axiosInstance.post(`/cidadaos/verifica-email/${cidadao.id}`, {
        token: token,
      });

      localStorage.setItem("cidadaoId", cidadao.id);
      localStorage.setItem("cidadaoExpiracao", moment().add(1, "hour").toISOString());

      setStep(4);
    } catch (error) {
      setModalInfo({
        type: "danger",
        title: "Verifique o código digitado",
        description: "O código digitado é inválido. Por favor, verifique o código em seu e-mail e tente novamente.",
      })
      throw new Error("Erro ao validar o código");
    } finally { setCarregando(false); }
  };

  const handleChange = (event) => {
    const token_inserido = event.target.value;
    setToken(token_inserido);
  };

  const handleChangeNovoEmail = (event) => {
    const email_inserido = event.target.value;
    setEmail(email_inserido);
  };

  const reenviarToken = async () => {
    try {
      setCarregando(true);

      await axiosInstance.post(`/cidadaos/envia-token/${cidadao.id}`, { reenviar_codigo: true });
      setModalInfo({
        type: "success",
        title: "Código reenviado",
        description: "O código foi reenviado para o seu e-mail.",
        icon: faCheckCircle
      });
    } catch (error) {
      setModalInfo({
        type: "danger",
        title: "Erro",
        description: "Não foi possível reenviar o código para o seu e-mail. Por favor, tente novamente mais tarde.",
      })
      console.error("Erro ao reenviar o código:", error);
    } finally { setCarregando(false); }
  }

  const editarEmail = async () => {
    try {
      setCarregando(true);

      if (!email || email?.trim() === '') {
        setModalInfo({
          type: "warning",
          title: "Atenção",
          description: "O e-mail não pode estar vazio.",
        })
        return;
      }

      await axiosInstance.put(`/cidadaos/atualiza-email/${cidadao.id}`, { email: email.trim() });
      setCidadao((prev) => ({
        ...prev,
        email: email.trim(),
      }));

      await reenviarToken();
    } catch (error) {
      setModalInfo({
        type: "danger",
        title: "Erro",
        description: "Não foi possível alterar o e-mail. Por favor, tente novamente mais tarde.",
      })

      console.error("Erro ao editar o e-mail:", error);
    } finally {
      setModalEditarEmail(false);
      setCarregando(false);
    }
  }

  return (
    <>
      {carregando && <Loading />}
      <div className="container-step-3">
        <h2>
          Insira abaixo o código que enviamos para o seu endereço de email -{" "}
          <span className="accent-color" title="Endereço de e-mail cadastrado para receber o código">{cidadao?.email}</span>{" "}
          {"( "}
          <span
            className="accent-color"
            onClick={() => setModalEditarEmail(true)}
            style={{ cursor: 'pointer', textDecoration: 'underline' }}
            title="Clique para editar o e-mail cadastrado"
          >
            editar
          </span>
          {" )"}
        </h2>

        <form
          onSubmit={(event) => {
            event.preventDefault();

            if (token !== '' || token === null) {
              validarToken();
            } else {
              setModalInfo({
                type: "warning",
                title: "Atenção",
                description: "Por favor, insira o código enviado para o seu e-mail.",
              })
            }

          }}
        >
          <InputCode
            name="codigo_uninco"
            placeholder="1234"
            mask="9999"
            value={token}
            onChange={handleChange}
            title="Digite aqui o código de verificação recebido por e-mail"
          />

          <BtnPrimary type="submit" title="Verificar o código inserido e prosseguir">
            Verificar
          </BtnPrimary>
        </form>

        <BtnSecundary
          adicionalClass="btn-back"
          onClick={reenviarToken}
          title="Clique aqui se não recebeu o código. Um novo será enviado."
        >
          Não recebi o código
        </BtnSecundary>

        <BtnSecundary
          adicionalClass="btn-cancel"
          onClick={() => {
            setModalInfo({
              type: "warning",
              title: "Cancelar solicitação",
              description: "Tem certeza que deseja cancelar a solicitação? Os dados não serão salvos.",
              deslogar: true,
            });
          }}
          title="Cancelar o processo de verificação e sair"
        >
          Cancelar solicitação
        </BtnSecundary>

        {modalInfo && (
          <Modal
            type={modalInfo?.type}
            title={modalInfo?.title}
            description={modalInfo?.description}
            icon={modalInfo?.icon}
            onCancel={() => setModalInfo(null)}
            onConfirm={() => modalInfo?.deslogar ? deslogarCidadao() : setModalInfo(null)}
          />
        )}

        {modalEditarEmail &&
          <div className="modal">
            <div className="card">
              <div className="card-content">
                <div className="content">
                  <span className="title">Digite o novo e-mail</span>
                  <InputText
                    value={email}
                    onChange={handleChangeNovoEmail}
                    placeholder="Digite seu novo e-mail"
                    title="Digite o novo endereço de e-mail para atualizar"
                  />
                </div>
                <div className="actions">
                  <button
                    className={`desactivate button-warning`}
                    type="button"
                    onClick={editarEmail}
                    title="Confirmar a alteração do e-mail"
                  >
                    Confirmar
                  </button>
                  <button
                    className="cancel"
                    type="button"
                    onClick={() => setModalEditarEmail(false)}
                    title="Cancelar a edição do e-mail"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>}

        <ModalHelp
          title={helpConfigs.step003.title}
          content={helpConfigs.step003.content}
          isOpen={isHelpOpen}
          onClose={closeHelp}
        />

        <HelpIndicator
          onHelpOpen={openHelp}
          isOpen={!isHelpOpen}
          title="Clique para abrir as instruções de ajuda"
        />
      </div>
    </>
  );
}
