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
    id: "",
    status: "",
    latitude: "",
    longitude: "",
    id_cidadao: "",
    id_categoria: "",
    id_comunidade: ""
  });

  const [cidadao, setCidadao] = useState({
    id: "",
    nome: "",
    email: "",
    celular: "",
    cpf: "",
    ultimo_codigo: "",
  });

  useEffect(() => {
    if (nameInput && valueInput !== undefined) {
      setSolicitacao((prev) => ({
        ...prev,
        [nameInput]: valueInput,
      }));
    }
  }, [nameInput, valueInput]);

  const steps = {
    1: (
      <>
        {loading && <Loading />}
        <Step001
          step={step}
          setStep={setStep}
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
          cidadao={cidadao}
          setCidadao={setCidadao}
          step={step}
          setStep={setStep}
        />
      </>
    ),
    3: (
      <>
        {loading && <Loading />}
        <Step003
          solicitacao={solicitacao}
          setSolicitacao={setSolicitacao}
          cidadao={cidadao}
          setCidadao={setCidadao}
          step={step}
          setStep={setStep}
        />
      </>
    ),
    4: (
      <>
        {loading && <Loading />}
        <Step004
          solicitacao={solicitacao}
          setSolicitacao={setSolicitacao}
          cidadao={cidadao}
          setCidadao={setCidadao}
          step={step}
          setStep={setStep}
        />
      </>
    ),
    5: (
      <>
        {loading && <Loading />}
        <Step005
          solicitacao={solicitacao}
          setSolicitacao={setSolicitacao}
          cidadao={cidadao}
          setCidadao={setCidadao}
          step={step}
          setStep={setStep}
        />
      </>
    ),
    6: (
      <>
        {loading && <Loading />}
        <Step006
          solicitacao={solicitacao}
          setSolicitacao={setSolicitacao}
          cidadao={cidadao}
          setCidadao={setCidadao}
          step={step}
          setStep={setStep}
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
