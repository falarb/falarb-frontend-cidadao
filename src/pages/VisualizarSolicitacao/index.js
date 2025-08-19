import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import html2canvas from "html2canvas";

import BtnPrimary from "../../components/Btn/BtnPrimary";
import BtnSecundary from "../../components/Btn/BtnSecundary";

export default function VisualizarSolicitacao() {
  const navigate = useNavigate();
  const data = useParams();
  const token = data.token;

  const [solicitacao, setSolicitacao] = useState(null);
  const [modalErroAberto, setModalErroAberto] = useState(false);

  const handleSaveAsImage = async () => {
    const element = document.getElementById("container-progress");
    const canvas = await html2canvas(element);
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "comprovante.png";
    link.click();
  };

  const buscarSolicitacao = async () => {
    try {
      const fetchSolicitacao = await fetch(
        `http://127.0.0.1:8000/api/solicitacoes/busca-por-token/${token}`
      );

      if (!fetchSolicitacao.ok) {
        return 0
      }

      const dadoRecebido = await fetchSolicitacao.json();
      if (dadoRecebido.error) {
        setModalErroAberto(true);
        alert("solicitacao não encontrada");
        console.log(dadoRecebido);
      } else {
        setSolicitacao(dadoRecebido);
        console.log(dadoRecebido);
      }
    } catch (error) {
      return 0
    }
  };

  useEffect(() => {
    buscarSolicitacao();
  }, []);

  if (!solicitacao) return <p>Carregando...</p>;

  return (
    
    <div className="container-review-progress">
      <div className="container-progress" id="container-progress">
        <p>Andamento da solicitação</p>
        <h1>{solicitacao?.token_solicitacao}</h1>

        <span className="status">{solicitacao?.status}</span>

        <div className="box-info">
          <span className="info">Data de abertura</span>
          
        </div>

        <div className="box-info">
          <span className="info">Nome do solicitante</span>
          <span className="data">{solicitacao?.cidadao.nome}</span>
        </div>

        <div className="box-info">
          <span className="info">Celular do solicitante</span>
          <span className="data">{solicitacao?.cidadao.telefone}</span>
        </div>

        <div className="box-info">
          <span className="info">CPF do solicitante</span>
          <span className="data">{solicitacao?.cidadao.cpf}</span>
        </div>

        <div className="box-info">
          <span className="info">Email do solicitante</span>
          <span className="data">{solicitacao?.cidadao.email}</span>
        </div>

        <div className="box-info">
          <span className="info">Comunidade da solicitação</span>
          <span className="data">{solicitacao?.comunidade.nome}</span>
        </div>

        <div className="box-info">
          <span className="info">Tipo da solicitação</span>
          <span className="data">{solicitacao?.categoria.nome}</span>
        </div>

        <div className="box-info">
          <span className="info">Descrição da solicitação</span>
          <span className="data">{solicitacao?.descricao}</span>
        </div>

        <div className="box-info-small">
          <span>Latitude inserida no mapa: {solicitacao?.latitude}</span>
          <span>Longitude inserida no mapa: {solicitacao?.longitude}</span>
        </div>
      </div>

      <BtnPrimary onClick={handleSaveAsImage}>Salvar comprovante</BtnPrimary>

      <BtnSecundary
        onClick={() => {
          navigate("/");
        }}
      >
        Voltar ao início
      </BtnSecundary>
    </div>
  );
}
