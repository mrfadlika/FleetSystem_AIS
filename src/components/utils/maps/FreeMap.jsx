// components/FreeMap.jsx
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const FreeMap = ({ vehicles }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) return;

    const map = L.map("map", {
      zoomControl: true,
    }).setView([-5.14, 119.43], 13);

    // SATELLITE LAYER - Esri World Imagery
    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      {
        attribution:
          "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX",
        maxZoom: 18,
      }
    ).addTo(map);

    // Tambah marker dari kendaraan
    vehicles.forEach((v) => {
      const marker = L.marker([v.lat, v.lng]).addTo(map);
      marker.bindPopup(`<b>${v.name}</b><br>Status: ${v.status}`);
    });

    mapRef.current = map;
  }, [vehicles]);

  return <div id="map" className="w-full h-[500px] rounded-lg" />;
};

export default FreeMap;