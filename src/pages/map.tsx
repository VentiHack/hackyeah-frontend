import { LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

type Data = {
  id: number;
  img: string;
  animalSpecies: string;
  knownAnimalSpecies: boolean;
  latitude: number;
  longitude: number;
  additionalInfo: string;
  createdAt: Date;
};

type MarkerData = {
  x: number;
  y: number;
  animalSpecies: string;
};

const fetchDataHandler = async () => {
  try {
    return await fetch("http://10.250.162.30:3000/api")
      .then((data) => data.json())
      .then((data) =>
        data.map((entry: Data) => ({
          x: entry.latitude - 1.85,
          y: entry.longitude + 0.8,
          animalSpecies: entry.animalSpecies,
        }))
      );
  } catch (error) {
    console.error(error);
    return;
  }
};

const Map = () => {
  const [markerData, setMarkerData] = useState<MarkerData[]>();

  useEffect(() => {
    fetchDataHandler().then((markers) => setMarkerData(markers));
  }, []);

  const center: LatLngExpression =
    markerData && markerData.length > 0
      ? [markerData[0].x, markerData[0].y]
      : [50, 20];

  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet/dist/leaflet.css"
      />
      <div className="h-[80svh]">
        <MapContainer center={center} zoom={10} zoomControl={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markerData &&
            markerData.map((marker, id) => {
              return (
                <Marker position={[marker.x, marker.y]} key={id}>
                  <Popup>{marker.animalSpecies}</Popup>
                </Marker>
              );
            })}
        </MapContainer>
      </div>
    </>
  );
};

export default Map;
