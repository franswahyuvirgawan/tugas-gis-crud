import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import Routing from "../components/Routing";

export default function MapRouting() {
  const position = [51.505, -0.09];

  return (
    <div className="flex justify-center items-center py-[40px] flex-col font-martian  gap-[50px]">
      <h1 className="text-4xl font-bold text-white">Map Routing</h1>
      <MapContainer
        className="Map"
        center={{ lat: -8.60355596857304, lng: 115.25943918278261 }}
        zoom={15}
        scrollWheelZoom={true}
        style={{ height: "600px", width: "1000px", borderRadius: "0px" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Routing />
      </MapContainer>
    </div>
  );
}
