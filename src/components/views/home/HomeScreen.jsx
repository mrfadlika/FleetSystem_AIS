import React, { useState } from "react";
import { ChevronDown, Menu, Users, Clock, Car, MapPin, X } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

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
  const [showDashboard2, setShowDashboard2] = useState(false);
  const [hoveredVehicle, setHoveredVehicle] = useState(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

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

  const handleVehicleClick = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowDashboard2(true);
  };

  const handleVehicleHover = (vehicle, event) => {
    setHoveredVehicle(vehicle);
    setHoverPosition({ x: event.clientX, y: event.clientY });
  };

  const handleVehicleLeave = () => {
    setHoveredVehicle(null);
  };

  const StatCard = ({ icon, value, label, color = "#74CD25" }) => (
    <div
      className="p-4 rounded-lg flex items-center space-x-3"
      style={{ backgroundColor: "#343538" }}
    >
      <div className="p-2 rounded" style={{ backgroundColor: color }}>
        {icon}
      </div>
      <div>
        <div className="text-2xl font-bold text-white">{value}</div>
        <div className="text-gray-400 text-sm">{label}</div>
      </div>
    </div>
  );

  const VehicleTooltip = ({ vehicle, position }) => (
    <div
      className="fixed z-50 p-3 rounded-lg shadow-lg bg-[#343538] pointer-events-none"
      style={{
        left: position.x + 10,
        top: position.y + 10,
        minWidth: "200px",
      }}
    >
      <div className="flex items-center space-x-3">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-12 h-8 object-cover rounded"
        />
        <div className="flex-1">
          <div className="text-white font-medium text-sm">{vehicle.name}</div>
          <div className="text-gray-400 text-xs">{vehicle.lastLocation}</div>
          <div className="flex items-center justify-between mt-1">
            <span
              className="px-2 py-1 rounded text-xs font-medium"
              style={{
                backgroundColor:
                  vehicle.status === "online" ? "#74CD25" : "#ef4444",
                color: "white",
              }}
            >
              {vehicle.status === "online" ? "Ready" : "Offline"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  if (showDashboard2 && selectedVehicle) {
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
            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-600 rounded flex items-center justify-center">
              <span className="text-white font-bold">F</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
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
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            >
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div
            className="w-16 border-r flex flex-col items-center py-4 space-y-4"
            style={{ backgroundColor: "#343538", borderColor: "#4a4a4a" }}
          >
            <button onClick={() => setShowDashboard2(false)}>
              <X className="w-6 h-6 text-gray-400 cursor-pointer hover:text-white" />
            </button>
            <div
              className="w-8 h-8 rounded flex items-center justify-center cursor-pointer"
              style={{ backgroundColor: "#74CD25" }}
            >
              <Car className="w-5 h-5 text-white" />
            </div>
            <Clock className="w-6 h-6 text-gray-400 cursor-pointer hover:text-white" />
            <Users className="w-6 h-6 text-gray-400 cursor-pointer hover:text-white" />
          </div>

          <div className="flex-1 p-6">
            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <StatCard
                icon={<Car className="w-6 h-6 text-white" />}
                value={stats.total}
                label="Total"
              />
              <StatCard
                icon={<Car className="w-6 h-6 text-white" />}
                value={stats.online}
                label="ON"
              />
              <StatCard
                icon={<Car className="w-6 h-6 text-white" />}
                value={stats.offline}
                label="OFF"
              />
              <StatCard
                icon={<MapPin className="w-6 h-6 text-white" />}
                value={stats.lossCoordinate}
                label="Loss Coordinate"
              />
            </div>

            <div className="flex gap-6">
              {/* Map */}
              <div className="flex-1">
                <div
                  className="rounded-lg p-4 mb-4"
                  style={{ backgroundColor: "#343538" }}
                >
                  <div className="h-[400px] rounded overflow-hidden">
                    <MapContainer
                      center={[selectedVehicle.lat, selectedVehicle.lng]}
                      zoom={15}
                      style={{ height: "50%", width: "100%" }}
                    >
                      <TileLayer
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                        attribution="Fetched by Raffi Fadlika"
                      />
                      <Marker
                        position={[selectedVehicle.lat, selectedVehicle.lng]}
                      >
                        <Popup>
                          <strong>{selectedVehicle.name}</strong>
                          <br />
                          Status: {selectedVehicle.status}
                        </Popup>
                      </Marker>
                    </MapContainer>
                  </div>
                </div>

                {/* Bottom Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div
                    className="rounded-lg p-4"
                    style={{ backgroundColor: "#343538" }}
                  >
                    <h3 className="text-lg font-semibold mb-2">
                      Volume Bahan Bakar Realtime
                    </h3>
                    <div className="text-sm text-gray-400">
                      Kamis, 29/05/2025
                    </div>
                    <div className="mt-4 h-32 flex items-center justify-center">
                      <div className="text-center">
                        <div
                          className="text-3xl font-bold"
                          style={{ color: "#74CD25" }}
                        >
                          {selectedVehicle.fuelLevel}%
                        </div>
                        <div className="text-gray-400">Fuel Level</div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="rounded-lg p-4"
                    style={{ backgroundColor: "#343538" }}
                  >
                    <h3 className="text-lg font-semibold mb-2">
                      Komunikasi Realtime
                    </h3>
                    <div className="text-sm text-gray-400">
                      Status: {selectedVehicle.status}
                    </div>
                    <div className="mt-4 h-32 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-400">
                          {selectedVehicle.type.toUpperCase()}
                        </div>
                        <div className="text-gray-400">
                          {selectedVehicle.name}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vehicle Details Sidebar */}
              <div className="w-80 space-y-4">
                {/* Vehicle Info Card */}
                <div
                  className="rounded-lg p-4"
                  style={{ backgroundColor: "#343538" }}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <img
                      src={selectedVehicle.image}
                      alt={selectedVehicle.name}
                      className="w-16 h-12 object-cover rounded"
                    />
                    <div>
                      <div className="font-medium text-white">
                        {selectedVehicle.name}
                      </div>
                      <div className="text-sm text-gray-400">
                        {selectedVehicle.lastLocation}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Distance:</span>
                      <span className="text-white">
                        {selectedVehicle.distance}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Time:</span>
                      <span className="text-white">{selectedVehicle.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status:</span>
                      <span
                        style={{
                          color:
                            selectedVehicle.status === "online"
                              ? "#74CD25"
                              : "#ef4444",
                        }}
                      >
                        {selectedVehicle.status === "online"
                          ? "Online"
                          : "Offline"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Kapasitas:</span>
                      <span className="text-white">20L</span>
                    </div>
                  </div>
                </div>

                {/* Last Trip */}
                <div
                  className="rounded-lg p-4"
                  style={{ backgroundColor: "#343538" }}
                >
                  <h3 className="text-lg font-semibold mb-4">Last Trip</h3>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {tripHistory.map((trip) => (
                      <div
                        key={trip.id}
                        className="flex items-center space-x-3 p-2 rounded hover:bg-gray-600"
                      >
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: "#74CD25" }}
                        ></div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-white">
                            {trip.location}
                          </div>
                          <div className="text-xs text-gray-400">
                            {trip.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Dropdown */}
        {showProfileDropdown && (
          <div
            className="fixed top-16 right-4 w-48 rounded-lg shadow-lg z-50"
            style={{ backgroundColor: "#343538" }}
          >
            <div className="p-3 border-b" style={{ borderColor: "#4a4a4a" }}>
              <div className="text-sm font-medium text-white">Cha Eun-woo</div>
              <div className="text-xs text-gray-400">chaeunwoo@gmail.com</div>
            </div>
            <div className="p-2">
              <button className="w-full text-left px-3 py-2 rounded text-sm text-white hover:bg-gray-600">
                Profile
              </button>
              <button className="w-full text-left px-3 py-2 rounded text-sm text-red-400 hover:bg-gray-600">
                Log Out
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

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
          <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-600 rounded flex items-center justify-center">
            <span className="text-white font-bold">F</span>
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
                <button className="w-full text-left px-3 py-2 rounded text-sm text-white hover:bg-gray-600">
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
        <div
          className="w-16 border-r flex flex-col items-center py-4 space-y-4"
          style={{ backgroundColor: "#343538", borderColor: "#4a4a4a" }}
        >
          <Menu className="w-6 h-6 text-gray-400 cursor-pointer hover:text-white" />
          <div
            className="w-8 h-8 rounded flex items-center justify-center cursor-pointer"
            style={{ backgroundColor: "#74CD25" }}
          >
            <Car className="w-5 h-5 text-white" />
          </div>
          <Clock className="w-6 h-6 text-gray-400 cursor-pointer hover:text-white" />
          <Users className="w-6 h-6 text-gray-400 cursor-pointer hover:text-white" />
        </div>

        <div className="flex-1 p-6">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <StatCard
              icon={<Car className="w-6 h-6 text-white" />}
              value={stats.total}
              label="Total"
            />
            <StatCard
              icon={<Car className="w-6 h-6 text-white" />}
              value={stats.online}
              label="ON"
            />
            <StatCard
              icon={<Car className="w-6 h-6 text-white" />}
              value={stats.offline}
              label="OFF"
            />
            <StatCard
              icon={<MapPin className="w-6 h-6 text-white" />}
              value={stats.lossCoordinate}
              label="Loss Coordinate"
            />
          </div>

          <div className="flex gap-6">
            {/* Map */}
            <div className="flex-1">
              <div
                className="rounded-lg p-4 mb-4"
                style={{ backgroundColor: "#343538" }}
              >
                <div className="h-[500px] rounded overflow-hidden">
                  <MapContainer
                    center={[-5.135, 119.423]}
                    zoom={13}
                    style={{ height: "100%", width: "100%" }}
                  >
                    <TileLayer
                      url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                      attribution="Fetched by Raffi Fadlika"
                    />
                    {vehicleData.map((v) => (
                      <Marker
                        key={v.id}
                        position={[v.lat, v.lng]}
                        eventHandlers={{
                          click: () => handleVehicleClick(v),
                          mouseover: (e) => {
                            e.target.openPopup();
                            handleVehicleHover(v, e.originalEvent);
                          },
                          mouseout: (e) => {
                            e.target.closePopup();
                            handleVehicleLeave();
                          },
                        }}
                      >
                        <Popup>
                          <div className="text-center">
                            <strong className="block">{v.name}</strong>
                            <span
                              className={`text-sm ${
                                v.status === "online"
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {v.status === "online" ? "Ready" : "Offline"}
                            </span>
                            <div className="text-xs text-gray-600 mt-1">
                              {v.lastLocation}
                            </div>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                </div>
              </div>
            </div>

            {/* Vehicle List Sidebar */}
            <div className="w-80 space-y-4">
              <div
                className="rounded-lg p-1 flex"
                style={{ backgroundColor: "#343538" }}
              >
                <button
                  className={`flex-1 py-2 px-4 rounded text-sm font-medium transition-colors ${
                    activeTab === "cars"
                      ? "text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                  style={{
                    backgroundColor:
                      activeTab === "cars" ? "#1E1F22" : "transparent",
                  }}
                  onClick={() => setActiveTab("cars")}
                >
                  Cars
                </button>
                <button
                  className={`flex-1 py-2 px-4 rounded text-sm font-medium transition-colors ${
                    activeTab === "lastTrip"
                      ? "text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                  style={{
                    backgroundColor:
                      activeTab === "lastTrip" ? "#1E1F22" : "transparent",
                  }}
                  onClick={() => setActiveTab("lastTrip")}
                >
                  Last Trip
                </button>
              </div>

              <div
                className="rounded-lg p-4 h-96"
                style={{ backgroundColor: "#343538" }}
              >
                {activeTab === "cars" ? (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Vehicle List</h3>
                    <div className="space-y-3">
                      {vehicleData.map((vehicle) => (
                        <div
                          key={vehicle.id}
                          className={`p-3 rounded cursor-pointer transition-all transform hover:scale-102 ${
                            selectedVehicle?.id === vehicle.id
                              ? "border-2 border-[#74CD25]"
                              : "hover:bg-gray-600"
                          }`}
                          style={{
                            backgroundColor:
                              selectedVehicle?.id === vehicle.id
                                ? "#1E1F22"
                                : "#4a4a4a",
                          }}
                          onClick={() => handleVehicleClick(vehicle)}
                        >
                          <div className="flex items-center space-x-3">
                            <img
                              src={vehicle.image}
                              alt={vehicle.name}
                              className="w-12 h-8 object-cover rounded"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span className="font-medium">{vehicle.name}</span>
                                <div
                                  className="w-3 h-3 rounded-full"
                                  style={{
                                    backgroundColor:
                                      vehicle.status === "online"
                                        ? "#74CD25"
                                        : "#ef4444",
                                  }}
                                ></div>
                              </div>
                              <div className="text-sm text-gray-400 mt-1">
                                {vehicle.lastLocation}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Last Trip</h3>
                    <div className="text-gray-400 text-center py-8">
                      {selectedVehicle ? (
                        <div className="space-y-2">
                          <div className="text-white font-medium">
                            {selectedVehicle.name}
                          </div>
                          <div className="text-sm">Last trip: 2 hours ago</div>
                          <div className="text-sm">Distance: 25.4 km</div>
                          <div className="text-sm">Duration: 1h 30m</div>
                        </div>
                      ) : (
                        "Select a vehicle to see trip details"
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vehicle Tooltip */}
      {hoveredVehicle && (
        <VehicleTooltip vehicle={hoveredVehicle} position={hoverPosition} />
      )}
    </div>
  );
};

export default HomeScreen;
