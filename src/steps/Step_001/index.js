import BtnPrimary from "../../components/Btn/BtnPrimary";
import ModalHelp from "../../components/Modal/Help";
import HelpIndicator from "../../components/HelpIndicator";
import { useHelp } from "../../hooks/useHelp";
import { helpConfigs } from "../../utils/helpConfigs";
import "./styles.css";

export default function Step001({ step, setStep, onClickReviewRequest }) {
  const { isHelpOpen, closeHelp, openHelp } = useHelp(helpConfigs.step001);

  return (
    <div className="container-step-1">

      <h2>
        Bem vindo ao <span className="accent-color">SolicitaAi</span>
      </h2>

      <p>Clique abaixo para realizar a sua solicitação</p>

      <BtnPrimary
        adicionalClass="success"
        onClick={() => { setStep(2) }}
        title="Clique para entrar no fluxo de criar solicitação"
      >
        Realizar solicitação
      </BtnPrimary>

      <p>
        Clique abaixo para acompanhar a solicitação através do seu código
        único.
      </p>

      <BtnPrimary
        onClick={onClickReviewRequest}
        title="Clique para acompanhar as atualizações da sua solicitação"
      >
        Acompanhar solicitação
      </BtnPrimary>

      <ModalHelp
        title={helpConfigs.step001.title}
        content={helpConfigs.step001.content}
        isOpen={isHelpOpen}
        onClose={closeHelp}
      />

      <HelpIndicator onHelpOpen={openHelp} isOpen={!isHelpOpen} />
    </div >
  );
}
