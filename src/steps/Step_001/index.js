import BtnPrimary from "../../components/Btn/BtnPrimary";
import "./styles.css";

export default function Step001({ step, setStep, onClickReviewRequest }) {
  return (
    <div className="container-step-1">

      <h2>
        Bem vindo ao <span className="accent-color">SolicitaAi</span>
      </h2>

      <p>Clique abaixo para realizar a sua solicitação</p>

      <BtnPrimary
        adicionalClass="success"
        onClick={() => { setStep(2) }}
      >
        Realizar solicitação
      </BtnPrimary>

      <p>
        Clique abaixo para acompanhar a solicitação através do seu código
        único.
      </p>

      <BtnPrimary onClick={onClickReviewRequest}>
        Acompanhar solicitação
      </BtnPrimary>
    </div >
  );
}
