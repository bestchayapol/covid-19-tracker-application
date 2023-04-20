import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { showDataOnMap } from "./util";

import "../styles/Map.css";

function Map({ countries, casesType, center, zoom }) {
  return (
    <div className="map">
      <MapContainer center={center} zoom={zoom}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Loop through countries and draw circles on the screen */}
        {showDataOnMap(countries, casesType)}
      </MapContainer>
    </div>
  );
}

export default Map;
