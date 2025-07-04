import React, { useState, useMemo, useRef, useEffect } from "react";
import { ChevronDown, Menu, Users, Clock, Car, MapPin, X } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";
import IconBang from "/assets/Iconimage.png";

// Fix icon error
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const HomeScreen = () => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [activeTab, setActiveTab] = useState("cars");
  const [hoveredVehicle, setHoveredVehicle] = useState(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const mapRef = useRef();
  const navigate = useNavigate();

  // Debug selectedVehicle state
  useEffect(() => {
    console.log('selectedVehicle changed:', selectedVehicle);
  }, [selectedVehicle]);

  const vehicleData = [
    {
      id: 1,
      lat: -5.135,
      lng: 119.423,
      status: "online",
      type: "excavator",
      name: "Excavator D",
      image:
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=150&h=100&fit=crop",
      lastLocation: "Site A",
      fuelLevel: 85,
      distance: "2.5 KM",
      time: "08:30",
    },
    {
      id: 2,
      lat: -5.145,
      lng: 119.433,
      status: "online",
      type: "dump_truck",
      name: "Dump Truck C",
      image:
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=150&h=100&fit=crop",
      lastLocation: "Site B",
      fuelLevel: 92,
      distance: "1.8 KM",
      time: "09:15",
    },
    {
      id: 3,
      lat: -5.125,
      lng: 119.413,
      status: "offline",
      type: "dump_truck",
      name: "Dump Truck A",
      image:
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=150&h=100&fit=crop",
      lastLocation: "Site C",
      fuelLevel: 45,
      distance: "5.2 KM",
      time: "07:45",
    },
    {
      id: 4,
      lat: -5.155,
      lng: 119.443,
      status: "online",
      type: "car",
      name: "Vehicle 004",
      image:
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=150&h=100&fit=crop",
      lastLocation: "Site D",
      fuelLevel: 78,
      distance: "3.1 KM",
      time: "08:00",
    },
    {
      id: 5,
      lat: -5.165,
      lng: 119.453,
      status: "online",
      type: "truck",
      name: "Vehicle 005",
      image:
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=150&h=100&fit=crop",
      lastLocation: "Site E",
      fuelLevel: 67,
      distance: "4.3 KM",
      time: "08:45",
    },
  ];

  const tripHistory = [
    {
      id: 1,
      location: "Jl. GK Tanjungkaya",
      time: "Lawan Siponh",
      status: "completed",
    },
    {
      id: 2,
      location: "Jl. GK Menarangteng",
      time: "4540541",
      status: "completed",
    },
    {
      id: 3,
      location: "Jl. GK Tanjungkaya",
      time: "4540541",
      status: "completed",
    },
    {
      id: 4,
      location: "Jl. GK Tanjungkaya",
      time: "Lawan Siponh",
      status: "completed",
    },
    {
      id: 5,
      location: "Jl. GK Menarangteng",
      time: "Lawan Siponh",
      status: "completed",
    },
    {
      id: 6,
      location: "Jl. GK Tanjungkaya",
      time: "4540541",
      status: "completed",
    },
    {
      id: 7,
      location: "Jl. GK Tanjungkaya",
      time: "Lawan Siponh",
      status: "completed",
    },
    {
      id: 8,
      location: "Jl. GK Menarangteng",
      time: "4540541",
      status: "completed",
    },
  ];

  const stats = {
    total: 25,
    online: 15,
    offline: 5,
    lossCoordinate: 5,
  };

  const focusedIcon = useMemo(() => {
    return L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png',
      iconSize: [35, 56],
      iconAnchor: [17, 56],
      popupAnchor: [1, -34],
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      shadowSize: [41, 41],
      className: 'focused-marker',
    });
  }, []);

  const handleVehicleClick = (vehicle) => {
    console.log('Marker clicked:', vehicle.name);
    setSelectedVehicle(vehicle);
  };

  const handleVehicleHover = (vehicle, position) => {
    setHoveredVehicle(vehicle);
    setHoverPosition(position);
  };

  const handleVehicleLeave = () => {
    setHoveredVehicle(null);
  };

  const StatCard = ({ icon, value, label, color = "#74CD25" }) => (
    <div
      className="p-4 rounded-lg flex items-center space-x-3"
      style={{ backgroundColor: "#343538" }}
    >
      <div className="p-2 rounded">
        {icon}
      </div>
      <div>
        <div className="text-2xl font-bold text-white">{value}</div>
        <div className="text-gray-400 text-sm">{label}</div>
      </div>
    </div>
  );

  const VehicleTooltip = ({ vehicle, position }) => {
    const cardWidth = 220;
    const cardHeight = 100;
    const markerAnchorY = 41;
    return (
      <div
        className="fixed z-[1000] pointer-events-none"
        style={{
          left: position.x - cardWidth / 2,
          top: position.y - cardHeight + markerAnchorY - 100,
          width: cardWidth,
        }}
      >
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden relative pointer-events-none">
          <img
            src={vehicle.image}
            alt={vehicle.name}
            className="w-full h-[60px] object-cover rounded-t-xl bg-gray-200 pointer-events-none"
            onError={e => { e.target.onerror = null; e.target.src = '/placeholder.png'; }}
          />
          <div className="p-3 pb-6 pointer-events-none">
            <div className="font-bold text-black text-sm">{vehicle.name}</div>
            <div className="text-xs text-gray-500 mb-1">No. Plat</div>
            <span className="absolute right-3 bottom-3 px-3 py-0.5 rounded-full bg-[#74CD25] text-white font-semibold shadow text-xs pointer-events-none">
              {vehicle.status === "online" ? "Aktif" : "Offline"}
            </span>
          </div>
          {/* Arrow bawah */}
          <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-white pointer-events-none"></div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="min-h-screen text-white"
      style={{ backgroundColor: "#1E1F22" }}
    >
      {/* Header */}
      <div
        className="p-4 flex items-center justify-between border-b"
        style={{ backgroundColor: "#343538", borderColor: "#4a4a4a" }}
      >
        <div className="flex items-center space-x-4">
          <div className="w-15 h-15">
            <img src="/logo_ais.png" alt="Logo AIS" className="w-full h-full object-contain" />
          </div>
        </div>
        <div className="flex items-center space-x-3 relative">
          <div className="w-8 h-8 bg-gray-600 rounded-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="text-sm font-medium">Cha Eun-woo</div>
            <div className="text-xs text-gray-400">chaeunwoo@gmail.com</div>
          </div>
          <button onClick={() => setShowProfileDropdown(!showProfileDropdown)}>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>

          {/* Profile Dropdown */}
          {showProfileDropdown && (
            <div
              className="absolute top-full right-0 mt-2 w-48 rounded-lg shadow-lg z-50"
              style={{ backgroundColor: "#343538" }}
            >
              <div className="p-3 border-b" style={{ borderColor: "#4a4a4a" }}>
                <div className="text-sm font-medium text-white">
                  Cha Eun-woo
                </div>
                <div className="text-xs text-gray-400">chaeunwoo@gmail.com</div>
              </div>
              <div className="p-2">
                <button
                  className="w-full text-left px-3 py-2 rounded text-sm text-white hover:bg-gray-600"
                  onClick={() => navigate('/profile')}
                >
                  Profile
                </button>
                <button className="w-full text-left px-3 py-2 rounded text-sm text-red-400 hover:bg-gray-600">
                  Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 min-h-screen flex flex-col bg-transparent shadow-2xl border-r border-[#343538] py-8 px-4">
          {/* Tombol unselect */}
          {selectedVehicle && (
            <button
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#343538] hover:bg-[#ef4444] transition text-gray-300 hover:text-white shadow-lg mb-6 border border-[#343538] self-center"
              onClick={() => setSelectedVehicle(null)}
              title="Unselect"
            >
              <svg width="22" height="22" viewBox="0 0 20 20" fill="none"><path d="M6 6l8 8M14 6l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
          )}
          {/* Menu navigasi */}
          <nav className="flex flex-col gap-2 mt-2">
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#74CD25] text-white font-semibold shadow transition">
              <span><Car className="w-6 h-6" /></span>
              Dashboard
            </button>
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl bg-transparent text-white font-semibold hover:bg-[#343538] transition">
              <span><Clock className="w-6 h-6" /></span>
              History Data
            </button>
          </nav>
        </div>

        <div className="flex-1 p-6">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <StatCard
              icon={<img src={IconBang} alt="Bang" className="w-10 h-10" />}
              value={stats.total}
              label="Total"
            />
            <StatCard
              icon={<img src={IconBang} alt="Bang" className="w-10 h-10" />}
              value={stats.online}
              label="ON"
            />
            <StatCard
              icon={<img src={IconBang} alt="Bang" className="w-10 h-10" />}
              value={stats.offline}
              label="OFF"
            />
            <StatCard
              icon={<img src={IconBang} alt="Bang" className="w-10 h-10" />}
              value={stats.lossCoordinate}
              label="Loss Coordinate"
            />
          </div>

          <div className="flex gap-6">
            {/* Map */}
            <div className={selectedVehicle ? "flex-1" : "flex-1 w-full"}>
              <div
                className="rounded-lg p-4 mb-4"
                style={{ backgroundColor: "#343538" }}
              >
                <div className={selectedVehicle ? "h-[500px] rounded overflow-hidden transition-all duration-500" : "h-[500px] rounded overflow-hidden transition-all duration-500 w-full"}>
                  <MapContainer
                    ref={mapRef}
                    center={[-5.135, 119.423]}
                    zoom={13}
                    style={{ height: "100%", width: "100%" }}
                  >
                    <TileLayer
                      url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                      attribution="Fetched by Raffi Fadlika"
                    />
                    {vehicleData.map((v) => {
                      const isSelected = selectedVehicle && v.id === selectedVehicle.id;
                      return (
                        <Marker
                          key={v.id + (isSelected ? '-selected' : '-default')}
                          position={[v.lat, v.lng]}
                          {...(isSelected ? { icon: focusedIcon } : {})}
                          eventHandlers={{
                            mouseover: () => {
                              const map = mapRef.current;
                              if (map) {
                                const point = map.latLngToContainerPoint([v.lat, v.lng]);
                                const mapRect = map.getContainer().getBoundingClientRect();
                                handleVehicleHover(v, {
                                  x: point.x + mapRect.left,
                                  y: point.y + mapRect.top,
                                });
                              }
                            },
                            mouseout: handleVehicleLeave,
                            click: () => {
                              console.log('Direct marker click:', v.name);
                              handleVehicleClick(v);
                            },
                          }}
                        />
                      );
                    })}
                  </MapContainer>
                </div>
                {/* Card bawah hanya jika ada selectedVehicle */}
                {selectedVehicle && (
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="rounded-lg p-4" style={{ backgroundColor: "#343538" }}>
                      <h3 className="text-lg font-semibold mb-2">Volume Bahan Bakar Realtime</h3>
                      <div className="text-sm text-gray-400">Kamis, 29/05/2025</div>
                      <div className="mt-4 h-32 flex items-center justify-center">
                        {/* Grafik dummy SVG */}
                        <svg width="180" height="80">
                          <polyline fill="none" stroke="#74CD25" strokeWidth="3" points="0,70 30,30 60,60 90,50 120,60 150,40 180,60" />
                          <circle cx="30" cy="30" r="4" fill="#74CD25" />
                          <circle cx="60" cy="60" r="4" fill="#74CD25" />
                          <circle cx="90" cy="50" r="4" fill="#74CD25" />
                          <circle cx="120" cy="60" r="4" fill="#74CD25" />
                          <circle cx="150" cy="40" r="4" fill="#74CD25" />
                          <circle cx="180" cy="60" r="4" fill="#74CD25" />
                        </svg>
                      </div>
                      <div className="flex justify-between text-xs text-gray-400 mt-2">
                        <span>00:00</span><span>10:00</span><span>12:00</span><span>13:00</span><span>14:00</span>
                      </div>
                    </div>
                    <div className="rounded-lg p-4" style={{ backgroundColor: "#343538" }}>
                      <h3 className="text-lg font-semibold mb-2">Konsumsi Bahan Bakar</h3>
                      <div className="text-sm text-gray-400">Per Minggu</div>
                      <div className="mt-4 h-32 flex items-center justify-center">
                        {/* Grafik dummy SVG */}
                        <svg width="180" height="80">
                          <polyline fill="none" stroke="#74CD25" strokeWidth="3" points="0,60 30,40 60,70 90,50 120,60 150,30 180,50" />
                          <circle cx="30" cy="40" r="4" fill="#74CD25" />
                          <circle cx="60" cy="70" r="4" fill="#74CD25" />
                          <circle cx="90" cy="50" r="4" fill="#74CD25" />
                          <circle cx="120" cy="60" r="4" fill="#74CD25" />
                          <circle cx="150" cy="30" r="4" fill="#74CD25" />
                          <circle cx="180" cy="50" r="4" fill="#74CD25" />
                        </svg>
                      </div>
                      <div className="flex justify-between text-xs text-gray-400 mt-2">
                        <span>Sen</span><span>Sel</span><span>Rab</span><span>Kam</span><span>Jum</span><span>Sab</span><span>Min</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Sidebar kanan modern hanya jika ada selectedVehicle */}
            {selectedVehicle && (
              <div
                key={selectedVehicle.id}
                className="w-96 space-y-6 animate-fade-in-right relative"
              >
                {/* Detail Kendaraan (Cars) */}
                <div className="rounded-2xl shadow-2xl p-7 bg-gradient-to-br from-[#232526] to-[#343538] border border-[#232526] transition-all duration-500">
                  <div className="flex items-center mb-6">
                    <img src={selectedVehicle.image} alt={selectedVehicle.name} className="w-24 h-20 object-cover rounded-xl shadow-md border-2 border-[#74CD25] mr-5" />
                    <div>
                      <div className="text-2xl font-extrabold text-[#74CD25] mb-1">{selectedVehicle.name}</div>
                      <div className="text-xs text-gray-400 mb-1">{selectedVehicle.lastLocation}</div>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${selectedVehicle.status === 'online' ? 'bg-[#74CD25] text-white' : 'bg-red-500 text-white'}`}>{selectedVehicle.status === 'online' ? 'Online' : 'Offline'}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-center mb-2">
                    <div className="bg-[#232526] rounded-lg p-3 shadow text-white flex flex-col items-center">
                      <div className="text-lg font-bold">135</div>
                      <div className="text-xs text-gray-400 mt-1">KM/H</div>
                    </div>
                    <div className="bg-[#232526] rounded-lg p-3 shadow text-white flex flex-col items-center">
                      <div className="text-lg font-bold">486</div>
                      <div className="text-xs text-gray-400 mt-1">KM</div>
                    </div>
                    <div className="bg-[#232526] rounded-lg p-3 shadow text-white flex flex-col items-center">
                      <div className="text-lg font-bold">20</div>
                      <div className="text-xs text-gray-400 mt-1">L</div>
                    </div>
                  </div>
                </div>
                {/* Last Trip */}
                <div className="rounded-2xl shadow-2xl p-7 bg-gradient-to-br from-[#232526] to-[#343538] border border-[#232526] transition-all duration-500">
                  <h3 className="text-xl font-bold mb-5 text-white">Last Trip</h3>
                  <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                    {tripHistory.slice(0, 8).map((trip, idx) => (
                      <div key={trip.id + idx} className="flex items-center space-x-3 p-3 rounded-xl bg-[#232526] hover:bg-[#2e2e2e] transition">
                        <div className="w-3 h-3 rounded-full bg-[#74CD25] mr-2"></div>
                        <div className="flex-1">
                          <div className="text-base font-semibold text-white">{trip.location}</div>
                          <div className="text-xs text-gray-400">{trip.time}</div>
                        </div>
                        <div className="text-xs text-gray-400 font-bold">480KM</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Vehicle Tooltip */}
      {hoveredVehicle && (
        <VehicleTooltip vehicle={hoveredVehicle} position={hoverPosition} />
      )}

      <style>{`
        .animate-fade-in-right {
          animation: fadeInRight 0.5s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(60px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default HomeScreen;
