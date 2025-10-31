import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import html2canvas from "html2canvas";
import './styles.css';

import BtnPrimary from "../../components/Btn/BtnPrimary";
import BtnSecundary from "../../components/Btn/BtnSecundary";
import ModalHelp from "../../components/Modal/Help";
import { useHelp } from "../../hooks/useHelp";
import { helpConfigs } from "../../utils/helpConfigs";
import moment from "moment";
import { formataCpf, formataTelefone, parseStatus, pegaCorStatus } from "../../utils/functions";
import axiosInstance from "../../utils/axiosInstance";
import Modal from "../../components/Modal";
import Loading from "../../components/Loading";
import HelpIndicator from "../../components/HelpIndicator";

export default function VisualizarSolicitacao() {
  const { isHelpOpen, closeHelp, openHelp } = useHelp(helpConfigs.visualizarSolicitacao);
  const navigate = useNavigate();
  const data = useParams();
  const token = data.token;

  const [solicitacao, setSolicitacao] = useState(null);
  const [modalIndisponivelAberto, setModalIndisponivelAberto] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const handleSaveAsImage = async () => {
    const element = document.getElementById("container-progress");
    const canvas = await html2canvas(element);
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "comprovante.png";
    link.click();
  };

  const buscarSolicitacao = useCallback(async () => {
    setCarregando(true);
    try {
      const { data } = await axiosInstance.get(`/solicitacoes/busca-por-token/${token}`);

      setSolicitacao(data);
    } catch (error) {
      setModalIndisponivelAberto(true);
      console.error("Erro ao buscar solicitação:", error);
    } finally { setCarregando(false); }
  }, [token]);

  useEffect(() => {
    buscarSolicitacao();
  }, [buscarSolicitacao]);

  return (
    <>
      {carregando && <Loading />}

      <div className="container-review-progress">
        <div className="container-progress" id="container-progress">
          <p>Andamento da solicitação</p>
          <h1>{solicitacao?.token_solicitacao}</h1>

          <span className="status" style={{ backgroundColor: pegaCorStatus(solicitacao?.status) }}>{parseStatus(solicitacao?.status)}</span>

          {(solicitacao?.mot_indeferimento && solicitacao?.status === "indeferida") &&
            <div className="box-info">
              <span className="info">Motivo do Indeferimento</span>
              <span className="data">{solicitacao?.mot_indeferimento}</span>
            </div>
          }

          {(solicitacao?.data_agendamento && solicitacao?.status === "agendada") &&
            <div className="box-info">
              <span className="info">Data de agendamento</span>
              <span className="data">{moment(solicitacao?.data_agendamento).format("DD/MM/YYYY")}</span>
            </div>
          }

          {(solicitacao?.data_conclusao && solicitacao?.status === "concluida") &&
            <div className="box-info">
              <span className="info">Data de conclusão</span>
              <span className="data">{moment(solicitacao?.data_conclusao).format("DD/MM/YYYY HH:mm:ss")}</span>
            </div>
          }

          <div className="box-info">
            <span className="info">Data de abertura</span>
            <span className="data">{moment(solicitacao?.created_at).format("DD/MM/YYYY HH:mm:ss")}</span>
          </div>

          <div className="box-info">
            <span className="info">Nome do solicitante</span>
            <span className="data">{solicitacao?.cidadao.nome}</span>
          </div>

          <div className="box-info">
            <span className="info">Celular do solicitante</span>
            <span className="data">{formataTelefone(solicitacao?.cidadao?.telefone)}</span>
          </div>

          <div className="box-info">
            <span className="info">CPF do solicitante</span>
            <span className="data">{formataCpf(solicitacao?.cidadao?.cpf)}</span>
          </div>

          <div className="box-info">
            <span className="info">Email do solicitante</span>
            <span className="data">{solicitacao?.cidadao.email}</span>
          </div>

          <div className="box-info">
            <span className="info">Comunidade da solicitação</span>
            <span className="data">{solicitacao?.comunidade.nome}</span>
          </div>

          {(solicitacao?.comunidade?.nome === 'Centro' && solicitacao?.additional_address) &&
            <div className="box-info">
              <span className="info">Endereço completo</span>
              <span className="data">{solicitacao?.additional_address}</span>
            </div>
          }

          <div className="box-info">
            <span className="info">Tipo da solicitação</span>
            <span className="data">{solicitacao?.categoria.nome}</span>
          </div>

          {solicitacao?.descricao &&
            <div className="box-info">
              <span className="info">Descrição da solicitação</span>
              <span className="data">{solicitacao?.descricao}</span>
            </div>
          }

          <div className="box-info-small">
            <span>Latitude inserida no mapa: {solicitacao?.latitude}</span>
            <span>Longitude inserida no mapa: {solicitacao?.longitude}</span>
          </div>
        </div>

        <BtnPrimary
          onClick={handleSaveAsImage}
          title="Botão para salvar o comprovante da solicitação"
        >
          Salvar comprovante
        </BtnPrimary>

        <BtnSecundary
          onClick={() => {
            navigate("/");
          }}
          title="Botão para voltar ao início"
        >
          Voltar ao início
        </BtnSecundary>

        {modalIndisponivelAberto && (
          <Modal
            type="warning"
            title="Solicitação indisponível"
            description="Sua solicitação não foi encontrada. Verifique o código e tente novamente."
            onCancel={() => setModalIndisponivelAberto(false)}
            onConfirm={() => setModalIndisponivelAberto(false)}
          ></Modal>
        )}

        <ModalHelp
          title={helpConfigs.visualizarSolicitacao.title}
          content={helpConfigs.visualizarSolicitacao.content}
          isOpen={isHelpOpen}
          onClose={closeHelp}
        />

        <HelpIndicator onHelpOpen={openHelp} isOpen={!isHelpOpen} />
      </div>
    </>
  );
}
