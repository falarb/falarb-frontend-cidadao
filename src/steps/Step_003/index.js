import { useEffect, useState, useRef } from "react";
import BtnPrimary from "../../components/Btn/BtnPrimary";
import BtnSecundary from "../../components/Btn/BtnSecundary";
import InputCode from "../../components/Input/InputCode";
import Modal from "../../components/Modal";
import "./styles.css";
import moment from "moment";
import axiosInstance from "../../utils/axiosInstance";
import { deslogarCidadao } from "../../utils/functions";
import Loading from "../../components/Loading";

export default function Step003({ cidadao, step, setStep }) {
  const [modalInfo, setModalInfo] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const enviadoRef = useRef(false);
  const [token, setToken] = useState('');

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

  const reenviarToken = async () => {
    try {
      setCarregando(true);

      await axiosInstance.post(`/cidadaos/envia-token/${cidadao.id}`);
      setModalInfo({
        type: "success",
        title: "Código reenviado",
        description: "O código foi reenviado para o seu e-mail.",
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

  return (
    <>
      {carregando && <Loading />}
      <div className="container-step-3">
        <h2>
          Insira abaixo o código que enviamos para o seu endereço de email -{" "}
          <span className="accent-color">{cidadao?.email}</span>
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
          />

          <BtnPrimary type="submit">Verificar</BtnPrimary>
        </form>

        <BtnSecundary adicionalClass="btn-back" onClick={reenviarToken}>
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
        >
          Cancelar solicitação
        </BtnSecundary>

        {modalInfo && (
          <Modal
            type={modalInfo?.type}
            title={modalInfo?.title}
            description={modalInfo?.description}
            onCancel={() => setModalInfo(null)}
            onConfirm={() => modalInfo?.deslogar ? deslogarCidadao() : setModalInfo(null)}
          />
        )}
      </div>
    </>
  );
}
