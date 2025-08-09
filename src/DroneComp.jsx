import React, { useState, useEffect } from "react";
import { DroneProvider, initialDrones, initialMissions } from "./context";
import Header from "./components/Header";
import Dashboard from "./Pages/Dashboard";
import MissionsPage from "./Pages/Mission";
import Fleet from "./Pages/Fleet";
import MonitoringPage from "./Pages/Monitoring";
import ReportsPage from "./Pages/Reports";

export default function DroneManagementSystem() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [drones, setDrones] = useState(initialDrones);
  const [missions, setMissions] = useState(initialMissions);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMissions((prevMissions) =>
        prevMissions.map((mission) => {
          if (mission.status === "in-progress") {
            const newProgress = Math.min(
              mission.progress + Math.random() * 3,
              100
            );
            const newEstimatedTime = Math.max(mission.estimatedTime - 1, 0);

            return {
              ...mission,
              progress: Math.round(newProgress),
              estimatedTime: newEstimatedTime,
              status: newProgress >= 100 ? "completed" : "in-progress",
            };
          }
          return mission;
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleMissionChange = (action, data) => {
    switch (action) {
      case "create":
        setMissions((prev) => [...prev, data]);
        break;
      case "update":
        setMissions((prev) => prev.map((m) => (m.id === data.id ? data : m)));
        break;
      case "delete":
        setMissions((prev) => prev.filter((m) => m.id !== data));
        break;
      case "control":
        const { missionId, action: controlAction } = data;
        setMissions((prevMissions) =>
          prevMissions.map((mission) => {
            if (mission.id === missionId) {
              switch (controlAction) {
                case "start":
                  return { ...mission, status: "in-progress" };
                case "pause":
                  return { ...mission, status: "paused" };
                case "resume":
                  return { ...mission, status: "in-progress" };
                case "abort":
                  return { ...mission, status: "aborted", progress: 0 };
                default:
                  return mission;
              }
            }
            return mission;
          })
        );

        // Update drone status
        const mission = missions.find((m) => m.id === missionId);
        if (mission?.droneId) {
          setDrones((prevDrones) =>
            prevDrones.map((drone) => {
              if (drone.id === mission.droneId) {
                switch (controlAction) {
                  case "start":
                    return {
                      ...drone,
                      status: "in-mission",
                      currentMission: missionId,
                    };
                  case "abort":
                    return {
                      ...drone,
                      status: "available",
                      currentMission: null,
                    };
                  default:
                    return drone;
                }
              }
              return drone;
            })
          );
        }
        break;
    }
  };

  const handleMissionControl = (missionId, action) => {
    handleMissionChange("control", { missionId, action });
  };

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard drones={drones} missions={missions} />;
      case "missions":
        return (
          <MissionsPage
            missions={missions}
            drones={drones}
            onMissionChange={handleMissionChange}
          />
        );
      case "fleet":
        return <Fleet drones={drones} />;
      case "monitoring":
        return (
          <MonitoringPage
            missions={missions}
            drones={drones}
            onMissionControl={handleMissionControl}
          />
        );
      case "reports":
        return <ReportsPage missions={missions} drones={drones} />;
      default:
        return <Dashboard drones={drones} missions={missions} />;
    }
  };

  const styles = {
    app: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#f8fafc",
      fontFamily:
        "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    },
    main: {
      flex: 1,
      maxWidth: "1280px",
      margin: "0 auto",
      padding: "2rem 1.5rem",
      width: "100%",
    },
  };

  return (
    <DroneProvider>
      <div style={styles.app}>
        <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <main style={styles.main}>{renderPage()}</main>
      </div>
    </DroneProvider>
  );
}
