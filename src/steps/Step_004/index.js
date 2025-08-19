import { useState } from "react";
import BtnPrimary from "../../components/Btn/BtnPrimary";
import BtnSecundary from "../../components/Btn/BtnSecundary";
import SelectCustom from "../../components/SelectCustom";
import TextArea from "../../components/TextArea";
import Modal from "../../components/Modal";
import "./styles.css";

export default function Step004({
  solicitacao,
  setSolicitacao,
  cidadao,
  setStep,
}) {
  const [modalCancelAberto, setModalCancelAberto] = useState(false);
  const [modalErroAberto, setModalErroAberto] = useState(false);
  const [modalIndisponivelAberto, setModalIndisponivelAberto] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [comunidades, setComunidades] = useState([]);

  const handleChange = (event) => {
    setSolicitacao((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    console.log(solicitacao);
  };

  useState(async () => {
    setSolicitacao((prev) => ({
      ...prev,
      id_cidadao: cidadao.id,
    }));

    try {
      const listarCategorias = await fetch(
        "http://127.0.0.1:8000/api/categorias"
      );

      if (!listarCategorias.ok) {
        setModalIndisponivelAberto(true);
        const errorData = await listarCategorias.json().catch(() => null);
        console.error("Erro ao listar categorias - Detalhes:", errorData);
        throw new Error("Erro ao listar categorias");
      }

      const data = await listarCategorias.json();
      setCategorias(data);
    } catch (error) {
      setModalIndisponivelAberto(true);
      throw new Error("Erro ao listar categorias");
    }

    try {
      const listarComunidades = await fetch(
        "http://127.0.0.1:8000/api/comunidades"
      );

      if (!listarComunidades.ok) {
        const errorData = await listarComunidades.json().catch(() => null);
        console.error("Erro ao listar categorias - Detalhes:", errorData);
        throw new Error("Erro ao listar categorias");
      }

      const data = await listarComunidades.json();
      setComunidades(data);
    } catch (error) {
      setModalIndisponivelAberto(true);
      throw new Error("Erro ao listar categorias");
    }
  }, []);

  console.log(cidadao);
  console.log(solicitacao);
  return (
    <div className="container-step-4">
      <h2>
        Bem vindo ao <span className="accent-color">SolicitaAi</span>
      </h2>

      <h1>Vamos lá?</h1>

      <h2>Tudo certo e verificado, você já pode começar sua solicitação.</h2>

      <small>
        É extremamente importante que você siga todos os passos, inserir todos
        os campos abaixo solicitados e ao final clicar em “Enviar solicitação”
      </small>

      <SelectCustom
        label="Selecione qual a sua comunidade"
        name="id_comunidade"
        value={solicitacao.id_comunidade}
        onChange={handleChange}
      >
        {comunidades?.map((comunidade) => (
          <option key={comunidade.id} value={comunidade.id}>
            {comunidade.nome}
          </option>
        ))}
      </SelectCustom>

      <SelectCustom
        label="Selecione o tipo de solicitação"
        name="id_categoria"
        value={solicitacao.id_categoria}
        onChange={handleChange}
      >
        {categorias?.map((categoria) => (
          <option key={categoria.id} value={categoria.id}>
            {categoria.nome}
          </option>
        ))}
      </SelectCustom>

      <TextArea
        label="Descreva sua solicitação"
        name="descricao"
        placeholder="Descreva sua solicitação aqui..."
        value={solicitacao.descricao}
        onChange={handleChange}
      />

      <BtnPrimary
        onClick={() => {
          if (
            solicitacao.id_comunidade !== "" &&
            solicitacao.id_categoria !== "" &&
            solicitacao.id_cidadao !== ""
          ) {
            setStep(5);
          } else {
            setModalErroAberto(true);
          }
        }}
      >
        Próximo passo
      </BtnPrimary>

      <BtnSecundary adicionalClass="btn-back" onClick={null}>
        Voltar uma etapa
      </BtnSecundary>

      <BtnSecundary
        adicionalClass="btn-cancel "
        onClick={() => {
          setModalCancelAberto(true);
        }}
      >
        Cancelar solicitacao
      </BtnSecundary>

      {modalErroAberto && (
        <Modal
          type="danger"
          title="Preencha todos os campos"
          description="Por favor, preencha todos os campos obrigatórios antes de prosseguir."
          onCancel={() => setModalErroAberto(false)}
          onConfirm={() => setModalErroAberto(false)}
        ></Modal>
      )}

      {modalCancelAberto && (
        <Modal
          type="warning"
          title="Cancelar solicitação"
          description="Tem certeza que deseja cancelar a solicitação? Os dados não serão salvos."
          onCancel={() => setModalCancelAberto(false)}
          onConfirm={() => {
            window.location.reload();
          }}
        ></Modal>
      )}

      {modalIndisponivelAberto && (
        <Modal
          type="warning"
          title="Ops... Algo errado aqui..."
          description="Estamos enfrentando dificuldades para processar sua solicitação. Em instantes tente novamente."
          onCancel={() => setModalCancelAberto(false)}
          onConfirm={() => {
            window.location.reload();
          }}
        ></Modal>
      )}
    </div>
  );
}
