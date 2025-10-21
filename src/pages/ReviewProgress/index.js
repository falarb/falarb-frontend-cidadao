import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import BtnPrimary from "../../components/Btn/BtnPrimary";
import BtnSecundary from "../../components/Btn/BtnSecundary";
import InputCodeUnic from "../../components/Input/InputCodeUnic";
import ModalHelp from "../../components/Modal/Help";
import { useHelp } from "../../hooks/useHelp";
import { helpConfigs } from "../../utils/helpConfigs";
import "./styles.css";
import HelpIndicator from "../../components/HelpIndicator";
import Modal from "../../components/Modal";
import axiosInstance from "../../utils/axiosInstance";
import { Constants } from "../../utils/constants";

export default function ReviewProgress() {
  const { isHelpOpen, closeHelp, openHelp } = useHelp(helpConfigs.reviewProgress);
  const [codigoUnico, setCodigoUnico] = useState("");
  const [modalErroAberto, setModalErroAberto] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    let valorRecebido = event.target.value;
    valorRecebido.toUpperCase();
    setCodigoUnico(valorRecebido);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (codigoUnico === null || codigoUnico === '') {
      setCodigoUnico('indefinido');
    }
    try {
      const { data } = await axiosInstance.get(`${Constants.baseUrl}/solicitacoes/busca-por-token/${codigoUnico}`);


      navigate(`/visualizar-solicitacao/${data?.token_solicitacao}`)

    } catch (error) {
      console.error("Erro ao buscar solicitação: ", error);
      setModalErroAberto(true);
    }

  };

  return (
    <div className="container-review-progress">
      <>
        <h2>
          Insira abaixo o <span className="accent-color">código único</span>{" "}
          da sua solicitação
        </h2>

        <form onSubmit={handleSubmit}>
          <InputCodeUnic
            name="codigo"
            value={codigoUnico}
            onChange={handleChange}
          />
          <BtnPrimary type="submit">Verificar</BtnPrimary>
        </form>

        <BtnSecundary
          adicionalClass="btn-back"
          onClick={() => {
            navigate("/");
          }}
        >
          Voltar
        </BtnSecundary>
      </>

      {modalErroAberto &&
        <Modal
          type={'warning'}
          title="Erro"
          description="Solicitação não encontrada"
          onCancel={() => setModalErroAberto(false)}
          onConfirm={() => setModalErroAberto(false)}
        />
      }

      <ModalHelp
        title={helpConfigs.reviewProgress.title}
        content={helpConfigs.reviewProgress.content}
        isOpen={isHelpOpen}
        onClose={closeHelp}
      />

      <HelpIndicator onHelpOpen={openHelp} isOpen={!isHelpOpen} />
    </div>
  );
}
