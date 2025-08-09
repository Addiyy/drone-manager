import React, { useState } from "react";
import { Plus } from "lucide-react";
import MissionCard from "../components/MissionCard";
import MissionPlannerModal from "../components/MissionPlannerModal";

const MissionsPage = ({ missions, drones, onMissionChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMission, setEditingMission] = useState(null);

  const handleEditMission = (mission) => {
    setEditingMission(mission);
    setIsModalOpen(true);
  };

  const handleDeleteMission = (missionId) => {
    onMissionChange("delete", missionId);
  };

  const handleMissionControl = (missionId, action) => {
    onMissionChange("control", { missionId, action });
  };

  const handleSaveMission = (missionData) => {
    if (editingMission) {
      onMissionChange("update", { ...editingMission, ...missionData });
    } else {
      onMissionChange("create", missionData);
    }
    setIsModalOpen(false);
    setEditingMission(null);
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    title: {
      fontSize: "1.5rem",
      fontWeight: "700",
      color: "#1e293b",
    },
    button: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.5rem 1rem",
      background: "#3b82f6",
      color: "white",
      border: "none",
      borderRadius: "0.5rem",
      fontSize: "0.875rem",
      cursor: "pointer",
      transition: "all 0.2s",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
      gap: "1.5rem",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Mission Management</h2>
        <button
          onClick={() => {
            setEditingMission(null);
            setIsModalOpen(true);
          }}
          style={styles.button}
          onMouseOver={(e) => (e.target.style.background = "#2563eb")}
          onMouseOut={(e) => (e.target.style.background = "#3b82f6")}
        >
          <Plus size={16} />
          <span>New Mission</span>
        </button>
      </div>

      <div style={styles.grid}>
        {missions.map((mission) => (
          <MissionCard
            key={mission.id}
            mission={mission}
            drones={drones}
            onEdit={handleEditMission}
            onDelete={handleDeleteMission}
            onControl={handleMissionControl}
          />
        ))}
      </div>

      <MissionPlannerModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingMission(null);
        }}
        mission={editingMission}
        drones={drones}
        onSave={handleSaveMission}
      />
    </div>
  );
};

export default MissionsPage;
