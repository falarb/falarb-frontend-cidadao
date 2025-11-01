import { useState, useEffect, useCallback } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import BtnPrimary from "../../components/Btn/BtnPrimary";
import BtnSecundary from "../../components/Btn/BtnSecundary";
import Modal from "../../components/Modal";
import ModalHelp from "../../components/Modal/Help";
import { useHelp } from "../../hooks/useHelp";
import { helpConfigs } from "../../utils/helpConfigs";
import "leaflet/dist/leaflet.css";
import "./styles.css";
import L from "leaflet";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import axiosInstance from "../../utils/axiosInstance";
import { deslogarCidadao } from "../../utils/functions";
import HelpIndicator from "../../components/HelpIndicator";

// Corrige o ícone padrão do Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

export default function Step005({
  solicitacao,
  setSolicitacao,
  setStep
}) {
  const { isHelpOpen, closeHelp, openHelp } = useHelp(helpConfigs.step005);
  const [modalCancelAberto, setModalCancelAberto] = useState(false);
  const [modalErroAberto, setModalErroAberto] = useState(false);
  const [modalIndisponivelAberto, setModalIndisponivelAberto] = useState(false);
  const [marker, setMarker] = useState(null);
  const [mapCenter, setMapCenter] = useState([-25.6196203, -50.6926748]);
  const [carregando, setCarregando] = useState(false);
  const [localizacaoPermitida, setLocalizacaoPermitida] = useState(false);
  const [messageModal, setMessageModal] = useState({ titulo: "", descricao: "" });

  let navigate = useNavigate();

  const handleGeolocate = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMapCenter([latitude, longitude]);
          setMarker([latitude, longitude]);
          setSolicitacao((prev) => ({
            ...prev,
            latitude,
            longitude,
          }));
        },
        setLocalizacaoPermitida(true),
        (error) => {
          alert("Não foi possível obter sua localização.");
          console.error(error);
          setLocalizacaoPermitida(false);
        }
      );
    } else {
      alert("Seu navegador não suporta geolocalização.");
      setLocalizacaoPermitida(false);
    }
  }, [setSolicitacao]);

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setMarker([lat, lng]);
        setMapCenter([lat, lng]);
        setSolicitacao((prev) => ({
          ...prev,
          latitude: lat,
          longitude: lng,
        }));
      },
    });
    return null;
  };

  const MapCenterUpdater = ({ center }) => {
    const map = useMapEvents({});
    useEffect(() => {
      if (center) {
        map.setView(center);
      }
    }, [center, map]);
    return null;
  };

  useEffect(() => {
    if (!localizacaoPermitida) {
      handleGeolocate();
    }
  }, [localizacaoPermitida, handleGeolocate]);


  const verificarMunicipio = async (latitude, longitude) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
      const data = await response.json();
      const cidade = data?.address?.city || data?.address?.town || data?.address?.village || data?.address?.municipality;

      if (cidade && cidade?.toLowerCase().includes("rebouças")) {
        return true;
      }

      return false;
    } catch (error) {
      throw new Error("Erro ao verificar município", error);
    }
  }

  const criarsolicitação = async () => {
    try {
      setCarregando(true);

      const isInReboucas = await verificarMunicipio(solicitacao.latitude, solicitacao.longitude);

      if (!isInReboucas) {
        setMessageModal({
          titulo: "Localização fora do município",
          descricao: "A localização selecionada não está dentro dos limites do município de Rebouças. Por favor, escolha uma localização válida dentro do município para prosseguir com a solicitação."
        });

        setModalErroAberto(true);
        return;
      }

      const { data } = await axiosInstance.post("/solicitacoes", {
        descricao: solicitacao.descricao,
        id_categoria: solicitacao.id_categoria,
        id_cidadao: solicitacao.id_cidadao,
        id_comunidade: solicitacao.id_comunidade,
        longitude: solicitacao.longitude,
        latitude: solicitacao.latitude,
        additional_address: solicitacao?.additional_address || null,
      });

      setSolicitacao(data);
      localStorage.removeItem("cidadaoId");

      navigate(`/visualizar-solicitacao/${data?.token_solicitacao}`);
    } catch (error) {
      if (error?.response?.data?.tipo === "texto ofensivo") {
        setMessageModal({
          titulo: "Texto ofensivo detectado",
          descricao: "Sua solicitação contém palavras que não são permitidas em nossa plataforma. Por favor, revise o texto e tente novamente sem utilizar termos ofensivos."
        });

        setModalErroAberto(true);
      } else {
        setModalIndisponivelAberto(true);
      }

      throw new Error("Erro ao criar solicitação");
    } finally { setCarregando(false); }
  };

  return (
    <>
      {carregando && <Loading />}

      <div className="container-step-5">
        <h2>
          Agora precisamos que nos informe sobre o{" "}
          <span className="accent-color">local exato</span> da solicitação.
        </h2>

        <p className="opacity">
          Por exemplo, se você solicitou o reparo de uma estrada de chão, você
          deve inserir a localização do local desse reparo.
        </p>

        <div className="container-info-box">
          <div className="title-info-box">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#3051ff"
            >
              <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
            </svg>
            <span>Importante</span>
          </div>
          <p className="description-info-box">
            Você pode usar o botão para permitir que o navegador detecte sua
            localização atual, ou clicar no mapa no local desejado.
          </p>
        </div>

        <BtnPrimary
          onClick={handleGeolocate}
          title="Botão para permitir acesso à localização atual"
        >
          {localizacaoPermitida ? "Ir para localização atual" : "Permitir acesso à localização atual"}
        </BtnPrimary>

        <div
          className="map-wrapper"
          style={{ height: "400px", borderRadius: "30px" }}
        >
          <MapContainer
            center={mapCenter}
            zoom={16}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapCenterUpdater center={mapCenter} />
            <MapClickHandler />
            {marker && <Marker position={marker} />}
          </MapContainer>
        </div>

        <BtnPrimary
          adicionalClass="success"
          title="Botão para criar a solicitação"
          onClick={() => {
            if (solicitacao.latitude && solicitacao.longitude) {
              criarsolicitação();
            } else {
              setModalErroAberto(true);
            }
          }}
        >
          Criar solicitação
        </BtnPrimary>

        <BtnSecundary
          adicionalClass="btn-back"
          onClick={() => setStep(4)}
          title="Botão para voltar à etapa anterior"
        >
          Voltar uma etapa
        </BtnSecundary>

        <BtnSecundary
          adicionalClass="btn-cancel"
          onClick={() => setModalCancelAberto(true)}
          title="Botão para cancelar a solicitação"
        >
          Cancelar solicitação
        </BtnSecundary>

        {modalErroAberto && (
          <Modal
            type="danger"
            title={messageModal?.titulo || "Por favor, siga as instruções da página"}
            description={messageModal?.descricao || "Permita acesso à sua localização ou marque uma localização no mapa."}
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
            onConfirm={() => deslogarCidadao()}
          ></Modal>
        )}

        {modalIndisponivelAberto && (
          <Modal
            type="warning"
            title="Ops... Algo errado aqui..."
            description="Estamos enfrentando dificuldades para processar sua solicitação. Em instantes tente novamente."
            onCancel={() => setModalIndisponivelAberto(false)}
            onConfirm={() => setModalIndisponivelAberto(false)}
          ></Modal>
        )}

        <ModalHelp
          title={helpConfigs.step005.title}
          content={helpConfigs.step005.content}
          isOpen={isHelpOpen}
          onClose={closeHelp}
        />

        <HelpIndicator onHelpOpen={openHelp} isOpen={!isHelpOpen} />
      </div>
    </>);
}
