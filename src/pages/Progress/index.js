import './styles.css';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import BtnPrimary from '../../components/Btn/BtnPrimary';
import html2canvas from 'html2canvas';

export default function Progress( { solicitacao } ) {
 
    const position = [solicitacao.latitude, solicitacao.longitude];

    const handleSaveAsImage = async () => {
        const element = document.getElementById('container-progress');
        const canvas = await html2canvas(element);
        const dataUrl = canvas.toDataURL('image/png');
    
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'comprovante.png';
        link.click();
      };

    return (
        <>
                <div className="container-progress" id="container-progress">

                    <p>Andamento da solicitação</p>

                    <h1>ay703</h1>

                    <span className='status'>
                        Em análise
                    </span>

                    <div className='box-info'>
                        <span className='info'>Data de abertura</span>
                        <span className='data'>15/10/2023 14:56</span>
                    </div>

                    <div className='box-info'>
                        <span className='info'>Nome do solicitante</span>
                        <span className='data'>{solicitacao.nome_cidadao}</span>
                    </div>

                    <div className='box-info'>
                        <span className='info'>Celular do solicitante</span>
                        <span className='data'>{solicitacao.celular_cidadao}</span>
                    </div>

                    <div className='box-info'>
                        <span className='info'>CPF do solicitante</span>
                        <span className='data'>{solicitacao.cpf_cidadao}</span>
                    </div>

                    <div className='box-info'>
                        <span className='info'>Email do solicitante</span>
                        <span className='data'>{solicitacao.email}</span>
                    </div>

                    <div className='box-info'>
                        <span className='info'>Comunidade da solicitação</span>
                        <span className='data'>{solicitacao.comunidade}</span>
                    </div>

                    <div className='box-info'>
                        <span className='info'>Tipo da solicitação</span>
                        <span className='data'>{solicitacao.tipoSolicitacao}</span>
                    </div>

                    <div className='box-info'>
                        <span className='info'>Descrição da solicitação</span>
                        <span className='data'>{solicitacao.descricao}</span>
                    </div>
                    
                    <div className="box-info-small">
                        <span>Latitude inserida no mapa: {solicitacao.latitude}</span>
                        <span>Longitude inserida no mapa: {solicitacao.longitude}</span>
                    </div>
                </div>

                <div className="map-wrapper" style={{ height: '400px', margin: '20px 0'}}>
                        <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={position} />
                        </MapContainer>
                </div>

                <BtnPrimary 
                        onClick={handleSaveAsImage}
                    >
                        Salvar comprovante
                    </BtnPrimary>
            
        </>
    )
}