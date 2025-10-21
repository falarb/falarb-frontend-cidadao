import { useEffect, useState } from "react";
import BtnPrimary from "../../components/Btn/BtnPrimary";
import BtnSecundary from "../../components/Btn/BtnSecundary";
import InputText from "../../components/Input/InputText";
import InputCustomMask from "../../components/Input/InputCustomMask";
import Modal from "../../components/Modal";
import ModalHelp from "../../components/Modal/Help";
import { useHelp } from "../../hooks/useHelp";
import { helpConfigs } from "../../utils/helpConfigs";
import "./styles.css";
import Loading from "../../components/Loading";
import axiosInstance from "../../utils/axiosInstance";
import { limparCpf, limparTelefone, validarCPF } from "../../utils/functions";
import HelpIndicator from "../../components/HelpIndicator";

export default function Step006({
  cidadao,
  setCidadao,
  step,
  setStep,
}) {
  const { isHelpOpen, closeHelp, openHelp } = useHelp(helpConfigs.step006);
  const [modalCancelAberto, setModalCancelAberto] = useState(false);
  const [modalErroAberto, setModalErroAberto] = useState(false);
  const [modalIndisponivelAberto, setModalIndisponivelAberto] = useState(false);
  const [modalValidacao, setModalValidacao] = useState({
    aberto: false,
    mensagem: "",
  });
  const [cpfValido, setCpfValido] = useState(false);
  const [telefoneValido, setTelefoneValido] = useState(false);
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
      const { data } = await axiosInstance.post(`/cidadaos`, {
        nome: cidadao.nome,
        email: cidadao.email,
        telefone: limparTelefone(cidadao.celular),
        cpf: limparCpf(cidadao?.cpf),
      });

      setCidadao((prev) => ({
        ...prev,
        id: data.id,
      }));

      setStep(3);
    } catch (error) {
      setModalIndisponivelAberto(true);
      console.error("Erro ao cadastrar cidadão:", error);
      throw new Error("Erro ao cadastrar cidadão");
    } finally {
      setCarregando(false);
    }
  };

  const verificaTelefone = (telefone) => {
    if (!telefone) {
      setTelefoneValido(false);
      return;
    }

    const telefoneLimpo = limparTelefone(telefone);
    const telefoneRegex = /^\d{11}$/; // Aceita 11 dígitos

    const valido = telefoneRegex.test(telefoneLimpo);
    setTelefoneValido(valido);
  }

  const verificaCpf = (evento) => {
    if (!evento.target.value) {
      setCpfValido(false);
      return;
    }

    let cpf = evento.target.value;

    const valido = validarCPF(cpf);
    setCpfValido(valido);
  };

  const handleDisableBtn = () => {
    if (!cidadao?.nome || !cpfValido) {
      return true;
    } else if (limparTelefone(cidadao?.celular) !== '' && !telefoneValido) {
      return true;
    }

    return false;
  }

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
        required={true}
        name="nome"
        value={cidadao?.nome}
        onChange={handleChange}
        placeholder="Digite seu nome completo"
      />

      <InputCustomMask
        label="Qual o número do seu CPF?"
        name="cpf"
        value={cidadao?.cpf}
        onChange={e => {
          handleChange(e);
          verificaCpf(e);
        }}
        placeholder="000.000.000-00"
        mask="999.999.999-99"
        mensagemErro={limparCpf(cidadao?.cpf) !== '' && !cpfValido ? "CPF inválido" : null}
        required={true}
      />

      <InputCustomMask
        label="Qual seu celular?"
        name="celular"
        value={cidadao?.celular}
        onChange={e => {
          handleChange(e);
          verificaTelefone(e.target.value);
        }}
        placeholder="(99) 99999-9999"
        mask="(99) 99999-9999"
        mensagemErro={limparTelefone(cidadao?.celular) !== '' && !telefoneValido ? "Número de celular inválido" : null}
      />

      <BtnPrimary
        disabled={handleDisableBtn()}
        onClick={() => { cadastrarCidadao() }}
      >
        Próximo passo
      </BtnPrimary>

      <BtnSecundary
        adicionalClass="btn-back"
        onClick={() => { setStep(2) }}
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

      <ModalHelp
        title={helpConfigs.step006.title}
        content={helpConfigs.step006.content}
        isOpen={isHelpOpen}
        onClose={closeHelp}
      />

      <HelpIndicator onHelpOpen={openHelp} isOpen={!isHelpOpen} />

    </div>
  );
}
