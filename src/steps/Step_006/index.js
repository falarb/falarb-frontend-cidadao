import { useEffect, useState } from "react";
import BtnPrimary from "../../components/Btn/BtnPrimary";
import BtnSecundary from "../../components/Btn/BtnSecundary";
import InputText from "../../components/Input/InputText";
import InputCustomMask from "../../components/Input/InputCustomMask";
import InputCPF from "../../components/Input/InputCPF";
import Modal from "../../components/Modal";
import "./styles.css";
import Loading from "../../components/Loading";

export default function Step006({
  cidadao,
  setCidadao,
  step,
  setStep,
}) {
  const [modalCancelAberto, setModalCancelAberto] = useState(false);
  const [modalErroAberto, setModalErroAberto] = useState(false);
  const [modalIndisponivelAberto, setModalIndisponivelAberto] = useState(false);
  const [modalValidacao, setModalValidacao] = useState({
    aberto: false,
    mensagem: "",
  });
  const [cpfValido, setCpfValido] = useState(false);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    console.log(cidadao);
  }, [cidadao]);

  const handleChange = (event) => {
    setCidadao((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const cadastrarCidadao = async () => {
    if (step !== 6) {
      setStep(1);
    }

    try {
      setCarregando(true);
      const response = await fetch(`http://127.0.0.1:8000/api/cidadaos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: cidadao.nome,
          email: cidadao.email,
          telefone: cidadao.celular,
          cpf: cidadao.cpf,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("Erro ao cadastrar cidadão - Detalhes:", errorData);
        setModalValidacao([true, errorData]);
        return;
      }
      const data = await response.json();
      setCidadao((prev) => ({
        ...prev,
        id: data.id,
      }));
      setStep(3)
    } catch (error) {
      setModalIndisponivelAberto(true);
      console.error("Erro ao cadastrar cidadão:", error);
      throw new Error("Erro ao cadastrar cidadão");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="container-step-4">
      {carregando && <Loading />}
      <h1>Quase lá...</h1>

      <h2>Insira seus dados para poder registrar solicitações.</h2>

      <small>
        Essa etapa só será solicitada uma única vez, nas próximas visitas você
        será direcionado diretamente ao cadastro de solicitação.
      </small>

      <InputText
        label="Qual seu nome completo?"
        name="nome"
        value={cidadao?.nome}
        onChange={handleChange}
        placeholder="Digite seu nome completo"
      />

      <InputCustomMask
        label="Qual seu celular?"
        name="celular"
        value={cidadao?.celular}
        onChange={handleChange}
        placeholder="99999999999"
        mask="99999999999"
      />

      <InputCPF
        label="Qual o número do seu CPF?"
        name="cpf"
        value={cidadao?.cpf}
        onChange={handleChange}
        placeholder="12345678910"
        mask="99999999999"
        setCpfValido={setCpfValido}
        cpfValido={cpfValido}
      />

      {console.log("Estado de validade do CPF:", cpfValido)}

      <BtnPrimary
        onClick={() => {
          if (cidadao?.nome && cidadao?.celular && cpfValido) {
            cadastrarCidadao();
          } else {
            alert("Por favor, selecione corretamente os campos.");
          }
        }}
      >
        Próximo passo
      </BtnPrimary>

      <BtnSecundary
        adicionalClass="btn-back"
        onClick={() => {
          setStep(2);
        }}
      >
        Voltar uma etapa
      </BtnSecundary>

      <BtnSecundary
        adicionalClass="btn-cancel "
        onClick={() => {
          setModalCancelAberto(true);
        }}
      >
        Cancelar solicitação
      </BtnSecundary>

      {modalErroAberto && (
        <Modal
          type="danger"
          title="Por favor, siga as instruções da página"
          description="Permita acesso à sua localização ou marque uma localização no mapa."
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
          onCancel={() => setModalIndisponivelAberto(false)}
          onConfirm={() => {
            window.location.reload();
          }}
        ></Modal>
      )}

      {modalValidacao[0] && (
        <Modal
          type="warning"
          title="Ops... Algo errado aqui..."
          onCancel={() => setModalValidacao(false)}
          onConfirm={() => setModalValidacao(false)}
          description={Object.entries(modalValidacao[1]).map(
            ([campo, erros]) => (
              <div key={campo}>
                {erros.map((erro, i) => (
                  <p key={i}>{erro}</p>
                ))}
              </div>
            )
          )}
        ></Modal>
      )}
    </div>
  );
}
