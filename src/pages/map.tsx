import { LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

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

const fetchDataHandler = async () => {
    try {
        return await fetch("http://10.250.162.170:3000/api")
            .then((data) => data.json())
            .then((data) =>
                data.map((entry: Data) => [
                    entry.latitude - 1.85,
                    entry.longitude + 0.8,
                ])
            );
    } catch (error) {
        console.error(error);
        return;
    }
};

const Map = () => {
    const [markerData, setMarkerData] = useState<[number, number][]>();

    useEffect(() => {
        fetchDataHandler().then((markers) => setMarkerData(markers));
    }, []);

    const center: LatLngExpression =
        markerData && markerData.length > 0 ? markerData[0] : [50, 20];

    console.log(markerData);

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
                            console.log(marker);
                            return (
                                <Marker 
                                    position={[marker[0], marker[1]]}
                                    key={id}
                                />
                            );
                        })}
                </MapContainer>
            </div>
        </>
    );
};

export default Map;
