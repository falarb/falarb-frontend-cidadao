import { useEffect, useState } from "react";
import BtnPrimary from "../../components/Btn/BtnPrimary";
import BtnSecundary from "../../components/Btn/BtnSecundary";
import TextArea from "../../components/TextArea";
import Modal from "../../components/Modal";
import ModalHelp from "../../components/Modal/Help";
import { useHelp } from "../../hooks/useHelp";
import { helpConfigs } from "../../utils/helpConfigs";
import "./styles.css";
import axiosInstance from "../../utils/axiosInstance";
import Loading from "../../components/Loading";
import { deslogarCidadao } from "../../utils/functions";
import AutoCompleteCustom from "../../components/AutoCompleteCustom";
import HelpIndicator from "../../components/HelpIndicator";

export default function Step004({
  solicitacao,
  setSolicitacao,
  cidadao,
  setStep,
}) {
  const { isHelpOpen, closeHelp, openHelp } = useHelp(helpConfigs.step004);
  const [modalCancelAberto, setModalCancelAberto] = useState(false);
  const [modalErroAberto, setModalErroAberto] = useState(false);
  const [modalIndisponivelAberto, setModalIndisponivelAberto] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [comunidades, setComunidades] = useState([]);
  const [carregando, setCarregando] = useState(false);

  const handleChange = (event) => {
    setSolicitacao((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {
    setSolicitacao((prev) => ({
      ...prev,
      id_cidadao: cidadao.id,
    }));

    async function buscaDados() {
      setCarregando(true);

      try {
        const listarCategorias = await axiosInstance.get("/categorias?ordenar_por=nome&ordenar_direcao=asc");
        setCategorias(listarCategorias?.data?.dados || []);

        const listarComunidades = await axiosInstance.get("/comunidades?ordenar_por=nome&ordenar_direcao=asc");
        setComunidades(listarComunidades?.data?.dados || []);
      } catch (error) {
        setModalIndisponivelAberto(true);

        throw new Error("Erro ao buscar dados", error);
      } finally { setCarregando(false); }
    }

    buscaDados();
  }, [cidadao.id, setSolicitacao]);

  return (
    <>
      {carregando
        ? <Loading />
        : <div className="container-step-4">
          <h2>
            Bem vindo ao <span className="accent-color">SolicitaAi</span>
          </h2>

          <h1>Vamos lá?</h1>

          <h2>Tudo certo e verificado, você já pode começar sua solicitação.</h2>

          <small>
            É extremamente importante que você siga todos os passos, inserir todos
            os campos abaixo solicitados e ao final clicar em “Enviar solicitação”
          </small>

          <AutoCompleteCustom
            name="id_comunidade"
            required
            title="Seleção da comunidade para a solicitação"
            options={comunidades}
            onChange={(newValue) => {
              setSolicitacao((prev) => ({
                ...prev,
                id_comunidade: newValue ? newValue.id : "",
              }));
            }}
            solicitacao={solicitacao}
            label="Selecione a comunidade da sua solicitação"
          />

          <AutoCompleteCustom
            name="id_categoria"
            options={categorias}
            onChange={(newValue) => {
              setSolicitacao((prev) => ({
                ...prev,
                id_categoria: newValue ? newValue.id : "",
              }));
            }}
            solicitacao={solicitacao}
            label="Selecione a categoria da sua solicitação"
            required
            title="Seleção da categoria para a solicitação"
          />

          <div style={{ position: 'relative' }}>
            <TextArea
              label="Descreva sua solicitação"
              name="descricao"
              placeholder="Descreva sua solicitação aqui..."
              value={solicitacao?.descricao}
              onChange={handleChange}
              maxLength={256}
              title="Campo para descrever a solicitação"
            />
            <span className="contador-letras" style={{ color: solicitacao?.descricao?.length > 246 ? 'red' : '#888' }}>
              {256 - (solicitacao?.descricao?.length || 0)}
            </span>
          </div>

          <BtnPrimary
            onClick={() => {
              if (
                solicitacao?.id_comunidade !== "" &&
                solicitacao?.id_categoria !== "" &&
                solicitacao?.id_cidadao !== ""
              ) {
                setStep(5);
              } else {
                setModalErroAberto(true);
              }
            }}
            title="Botão para avançar para o próximo passo do formulário"
          >
            Próximo passo
          </BtnPrimary>

          <BtnSecundary
            adicionalClass="btn-cancel "
            onClick={() => { setModalCancelAberto(true) }}
            title="Botão para cancelar a solicitação"
          >
            Cancelar solicitação
          </BtnSecundary>

          {modalErroAberto && (
            <Modal
              type="danger"
              title="Preencha todos os campos"
              description="Por favor, preencha todos os campos obrigatórios antes de prosseguir."
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

          {modalIndisponivelAberto && (
            <Modal
              type="warning"
              title="Ops... Algo errado aqui..."
              description="Estamos enfrentando dificuldades para processar sua solicitação. Em instantes tente novamente."
              onCancel={() => setModalCancelAberto(false)}
              onConfirm={() => { window.location.reload() }}
            />
          )}

          <ModalHelp
            title={helpConfigs.step004.title}
            content={helpConfigs.step004.content}
            isOpen={isHelpOpen}
            onClose={closeHelp}
          />

          <HelpIndicator onHelpOpen={openHelp} isOpen={!isHelpOpen} />
        </div>
      }
    </>
  );
}
