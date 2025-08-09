import React, { createContext, useContext, useState } from "react";

const DroneContext = createContext();

export const useDroneContext = () => useContext(DroneContext);

const generateId = () => Math.random().toString(36).substr(2, 9);

const initialDrones = [
  {
    id: "drone-001",
    name: "Surveyor Alpha",
    model: "DJI Matrice 300",
    status: "available",
    battery: 95,
    location: { lat: 40.7128, lng: -74.006 },
    site: "New York HQ",
    lastMaintenance: "2024-01-15",
    flightHours: 127.5,
  },
  {
    id: "drone-002",
    name: "Scout Beta",
    model: "DJI Phantom 4",
    status: "in-mission",
    battery: 67,
    location: { lat: 34.0522, lng: -118.2437 },
    site: "LA Operations",
    lastMaintenance: "2024-01-10",
    flightHours: 89.2,
    currentMission: "mission-001",
  },
  {
    id: "drone-003",
    name: "Mapper Gamma",
    model: "Autel Evo II",
    status: "maintenance",
    battery: 0,
    location: { lat: 41.8781, lng: -87.6298 },
    site: "Chicago Facility",
    lastMaintenance: "2024-01-20",
    flightHours: 203.8,
  },
];

const initialMissions = [
  {
    id: "mission-001",
    name: "Warehouse Inspection A",
    site: "LA Operations",
    droneId: "drone-002",
    status: "in-progress",
    progress: 45,
    estimatedTime: 25,
    startTime: new Date(Date.now() - 30 * 60 * 1000),
    surveyArea: { lat: 34.0522, lng: -118.2437, radius: 500 },
    pattern: "crosshatch",
    altitude: 50,
    overlap: 75,
    waypoints: [
      { lat: 34.0522, lng: -118.2437 },
      { lat: 34.0525, lng: -118.244 },
      { lat: 34.0528, lng: -118.2437 },
    ],
  },
  {
    id: "mission-002",
    name: "Perimeter Security Check",
    site: "New York HQ",
    droneId: null,
    status: "planned",
    progress: 0,
    estimatedTime: 40,
    surveyArea: { lat: 40.7128, lng: -74.006, radius: 800 },
    pattern: "perimeter",
    altitude: 75,
    overlap: 60,
    waypoints: [],
  },
];

export const DroneProvider = ({ children }) => {
  const [drones, setDrones] = useState(initialDrones);
  const [missions, setMissions] = useState(initialMissions);

  return (
    <DroneContext.Provider value={{ drones, missions, setDrones, setMissions }}>
      {children}
    </DroneContext.Provider>
  );
};

export { generateId, initialDrones, initialMissions };
