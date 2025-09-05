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
  const [modalCancelAberto, setModalCancelAberto] = useState(false);
  const [modalErroAberto, setModalErroAberto] = useState(false);
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
        setModalErroAberto(true);
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
      setModalErroAberto(true);
      throw new Error("Erro ao validar o código");
    } finally { setCarregando(false); }
  };

  const handleChange = (event) => {
    const token_inserido = event.target.value;
    setToken(token_inserido);
  };

  return (
    <>
      {carregando && <Loading />}
      <div className="container-step-3">
        <h2>
          Insira abaixo o código que enviamos para o seu endereço de email -{" "}
          <span className="accent-color">{cidadao.email}</span>
        </h2>

        <form
          onSubmit={(event) => {
            event.preventDefault();

            if (token !== '' || token === null) {
              validarToken();
            } else {
              alert('Preencha o código')
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

        <BtnSecundary adicionalClass="btn-back" onClick={0}>
          Não recebi o código
        </BtnSecundary>

        <BtnSecundary
          adicionalClass="btn-cancel"
          onClick={() => {
            setModalCancelAberto(true);
          }}
        >
          Cancelar solicitação
        </BtnSecundary>

        {modalErroAberto && (
          <Modal
            type="danger"
            title="Verifique o código digitado"
            description="O código digitado é inválido. Por favor, verifique o código em seu e-mail e tente novamente."
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
            onConfirm={() => deslogarCidadao()}
          />
        )}
      </div>
    </>
  );
}
