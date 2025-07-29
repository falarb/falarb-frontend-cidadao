import './styles.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Step001 from '../../steps/Step_001';
import Step002 from '../../steps/Step_002';
import Step003 from '../../steps/Step_003';
import Step004 from '../../steps/Step_004';
import Step005 from '../../steps/Step_005';

export default function Home({ nameInput, valueInput }) {
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    const [solicitacao, setSolicitacao] = useState({
        email: '',
        codigoUnico: '',
        comunidade: '',
        tipoSolicitacao: '',
    });

    useEffect(() => {
        if (nameInput && valueInput !== undefined) {
            setSolicitacao(prev => ({
                ...prev,
                [nameInput]: valueInput
            }));
        }
    }, [nameInput, valueInput]);

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const steps = {
        1: (
            <Step001
                onNext={nextStep}
                onClickReviewRequest={() => navigate('/acompanhar-solicitacao')}
            />
        ),
        2: (
            <Step002
                solicitacao={solicitacao}
                setSolicitacao={setSolicitacao}
                onNext={nextStep}
                onBack={prevStep}
            />
        ),
        3: (
            <Step003
                solicitacao={solicitacao}
                setSolicitacao={setSolicitacao}
                onNext={nextStep}
                onBack={prevStep}
            />
        ),
        4: (
            <Step004
                solicitacao={solicitacao}
                setSolicitacao={setSolicitacao}
                onNext={nextStep}
                onBack={prevStep}
            />
        ),
        5: (
            <Step005
                solicitacao={solicitacao}
                setSolicitacao={setSolicitacao}
                onNext={nextStep}
                onBack={prevStep}
            />
        ),

    };

    return (
        <div className="step-container">
            {steps[step] || <p>Etapa não encontrada</p>}
        </div>
    );
}
