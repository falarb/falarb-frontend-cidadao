import "./styles.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Step001 from "../../steps/Step_001";
import Step002 from "../../steps/Step_002";
import Step003 from "../../steps/Step_003";
import Step004 from "../../steps/Step_004";
import Step005 from "../../steps/Step_005";
import Step006 from "../../steps/Step_006";
import Progress from "../../pages/Progress";
import Loading from "../../components/Loading";

export default function Home({ nameInput, valueInput }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [solicitacao, setSolicitacao] = useState({
    email: "",
    codigoUnico: "",
    comunidade: "",
    tipoSolicitacao: "",
  });

  useEffect(() => {
    if (nameInput && valueInput !== undefined) {
      setSolicitacao((prev) => ({
        ...prev,
        [nameInput]: valueInput,
      }));
    }
  }, [nameInput, valueInput]);

  const nextStep = () => {
    setLoading(true);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setStep((prev) => prev + 1);
      setLoading(false);
    }, 2000);
  };
  
  const prevStep = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setStep((prev) => prev - 1);
  };

  const steps = {
    1: (
      <>
        {loading && <Loading />}
        <Step001
          onNext={nextStep}
          onClickReviewRequest={() => navigate("/acompanhar-solicitacao")}
        />
      </>
    ),
    2: (
      <>
        {loading && <Loading />}
        <Step002
          solicitacao={solicitacao}
          setSolicitacao={setSolicitacao}
          onNext={nextStep}
          onBack={prevStep}
        />
      </>
    ),
    3: (
      <>
        {loading && <Loading />}
        <Step003
          solicitacao={solicitacao}
          setSolicitacao={setSolicitacao}
          onNext={nextStep}
          onBack={prevStep}
        />
      </>
    ),
    4: (
      <>
        {loading && <Loading />}
        <Step004
          solicitacao={solicitacao}
          setSolicitacao={setSolicitacao}
          onNext={nextStep}
          onBack={prevStep}
        />
      </>
    ),
    5: (
      <>
        {loading && <Loading />}
        <Step005
          solicitacao={solicitacao}
          setSolicitacao={setSolicitacao}
          onNext={nextStep}
          onBack={prevStep}
        />
      </>
    ),
    6: (
      <>
        {loading && <Loading />}
        <Step006
          solicitacao={solicitacao}
          setSolicitacao={setSolicitacao}
          onNext={nextStep}
          onBack={prevStep}
        />
      </>
    ),
    7: (
      <>
        {loading && <Loading />}
        <Progress solicitacao={solicitacao} />
      </>
    ),
  };

  return (
    <div className="step-container">
      {steps[step] || <p>Etapa não encontrada</p>}
    </div>
  );
}
