import "./styles.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Step001 from "../../steps/Step_001";
import Step002 from "../../steps/Step_002";
import Step003 from "../../steps/Step_003";
import Step004 from "../../steps/Step_004";
import Step005 from "../../steps/Step_005";
import Step006 from "../../steps/Step_006";

export default function Home({ nameInput, valueInput }) {
  const [step, setStep] = useState(1);
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
    const storedCidadaoId = localStorage.getItem("cidadaoId");
    const storedCidadaoExpiracao = localStorage.getItem("cidadaoExpiracao");

    if (storedCidadaoId && storedCidadaoExpiracao) {
      const expiracao = new Date(storedCidadaoExpiracao);
      const agora = new Date();

      if (agora < expiracao) {
        setCidadao((prev) => ({
          ...prev,
          id: storedCidadaoId,
        }));

        setSolicitacao((prev) => ({
          ...prev,
          id_cidadao: storedCidadaoId,
        }));

        setStep(4);
      } else {
        localStorage.removeItem("cidadaoId");
        localStorage.removeItem("cidadaoExpiracao");
      }
    }
  }, []);

  const steps = {
    1: (
      <Step001
        step={step}
        setStep={setStep}
        onClickReviewRequest={() => navigate("/acompanhar-solicitacao")}
      />
    ),
    2: (
      <Step002
        solicitacao={solicitacao}
        setSolicitacao={setSolicitacao}
        cidadao={cidadao}
        setCidadao={setCidadao}
        step={step}
        setStep={setStep}
      />
    ),
    3: (
      <Step003
        solicitacao={solicitacao}
        setSolicitacao={setSolicitacao}
        cidadao={cidadao}
        setCidadao={setCidadao}
        step={step}
        setStep={setStep}
      />
    ),
    4: (
      <Step004
        solicitacao={solicitacao}
        setSolicitacao={setSolicitacao}
        cidadao={cidadao}
        setCidadao={setCidadao}
        step={step}
        setStep={setStep}
      />
    ),
    5: (
      <Step005
        solicitacao={solicitacao}
        setSolicitacao={setSolicitacao}
        setStep={setStep}
      />
    ),
    6: (
      <Step006
        cidadao={cidadao}
        setCidadao={setCidadao}
        step={step}
        setStep={setStep}
      />
    )
  };

  return (
    <div className="step-container">
      {steps[step] || <p>Etapa não encontrada</p>}
    </div>
  );
}
