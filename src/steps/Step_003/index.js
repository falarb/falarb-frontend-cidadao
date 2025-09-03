import { useEffect, useState, useRef } from "react";
import BtnPrimary from "../../components/Btn/BtnPrimary";
import BtnSecundary from "../../components/Btn/BtnSecundary";
import InputCode from "../../components/Input/InputCode";
import Modal from "../../components/Modal";
import "./styles.css";

export default function Step003({ cidadao, step, setStep }) {
  const [modalCancelAberto, setModalCancelAberto] = useState(false);
  const [modalErroAberto, setModalErroAberto] = useState(false);
  const [modalIndisponivelAberto, setModalIndisponivelAberto] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const enviadoRef = useRef(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    if (!cidadao.id || step !== 3) return;

    const enviarToken = async () => {
      try {
        setCarregando(true);
        const response = await fetch(
          `http://127.0.0.1:8000/api/cidadaos/envia-token/${cidadao.id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          setModalIndisponivelAberto(true);
          throw new Error("Erro ao enviar o código.");
        }

        const data = await response.json();
        if (data) {
          enviadoRef.current = true;
        }
      } catch (error) {
        setModalIndisponivelAberto(true);
        console.error("Erro ao enviar o código:", error);
      } finally{
        setCarregando(false);
      }
    };

    if (!enviadoRef.current) {
      enviadoRef.current = true;
      enviarToken();
    }
  }, [cidadao.id, step]);

  const validarToken = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/cidadaos/verifica-email/${cidadao.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: token,
          }),
        }
      );

      const data = await response.json();
      const resposta = await response;

      if (resposta.status === 200) {
        setStep(4)
      } else if (resposta.status === 400) {
        alert("invalid");
      } else {
        setModalIndisponivelAberto(true);
        console.error("Erro ao validar o código");
        throw new Error("Erro ao validar o código");
      }
      console.log(data);
    } catch (error) {
      setModalIndisponivelAberto(true);
      console.error("Erro ao validar o código:", error);
      throw new Error("Erro ao validar o código");
    }
  };

  const handleChange = (event) => {
    const token_inserido = event.target.value;
    setToken(token_inserido);
  };

  return (
    <div className="container-step-3">
      <h2>
        Insira abaixo o código que enviamos para o seu endereço de email -{" "}
        <span className="accent-color">{cidadao.email}</span>
      </h2>

      <form
        onSubmit={(event) => {
          event.preventDefault();

          if( token !== '' ||  token === null){
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
