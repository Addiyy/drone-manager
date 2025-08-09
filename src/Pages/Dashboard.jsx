import React, { useState } from "react";

import DroneCard from "../components/DroneCard";
import Header from "../components/Header";
import { Activity, Drone, CheckCircle, Clock } from "lucide-react";
import StatsCard from "../components/StatsCard";

const Dashboard = ({ drones, missions }) => {
  const [selectedDrone, setSelectedDrone] = useState(null);

  const stats = {
    totalDrones: drones.length,
    activeMissions: missions.filter((m) => m.status === "in-progress").length,
    completedToday: missions.filter((m) => m.status === "completed").length,
    totalFlightHours: drones.reduce((sum, drone) => sum + drone.flightHours, 0),
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "1.5rem",
    },
    twoColumnGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
      gap: "1.5rem",
    },
    card: {
      background: "white",
      borderRadius: "0.5rem",
      border: "1px solid #e2e8f0",
      boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
      padding: "1.5rem",
    },
    cardTitle: {
      fontSize: "1.125rem",
      fontWeight: "600",
      color: "#1e293b",
      marginBottom: "1rem",
    },
    missionList: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
    missionItem: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0.75rem",
      background: "#f8fafc",
      borderRadius: "0.5rem",
    },
    missionInfo: {
      flex: 1,
    },
    missionName: {
      fontWeight: "500",
      color: "#1e293b",
      marginBottom: "0.25rem",
    },
    missionSite: {
      fontSize: "0.875rem",
      color: "#64748b",
    },
    missionStatus: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.grid}>
        <StatsCard
          title="Total Drones"
          value={stats.totalDrones}
          icon={Drone}
          color="blue"
          trend="+2 this month"
        />
        <StatsCard
          title="Active Missions"
          value={stats.activeMissions}
          icon={Activity}
          color="green"
          trend="Real-time"
        />
        <StatsCard
          title="Completed Today"
          value={stats.completedToday}
          icon={CheckCircle}
          color="purple"
          trend="+3 from yesterday"
        />
        <StatsCard
          title="Flight Hours"
          value={`${stats.totalFlightHours.toFixed(1)}h`}
          icon={Clock}
          color="orange"
          trend="This month"
        />
      </div>

      <div style={styles.twoColumnGrid}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Fleet Status</h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {drones.map((drone) => (
              <DroneCard
                key={drone.id}
                drone={drone}
                onSelect={setSelectedDrone}
                isSelected={selectedDrone?.id === drone.id}
              />
            ))}
          </div>
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Recent Missions</h3>
          <div style={styles.missionList}>
            {missions.slice(0, 3).map((mission) => (
              <div key={mission.id} style={styles.missionItem}>
                <div style={styles.missionInfo}>
                  <p style={styles.missionName}>{mission.name}</p>
                  <p style={styles.missionSite}>{mission.site}</p>
                </div>
                <div style={styles.missionStatus}>
                  {mission.status === "in-progress" && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                      }}
                    >
                      <Activity size={16} color="#3b82f6" />
                      <span style={{ fontSize: "0.875rem" }}>
                        {mission.progress}%
                      </span>
                    </div>
                  )}
                  <span
                    style={{
                      padding: "0.25rem 0.5rem",
                      borderRadius: "9999px",
                      fontSize: "0.75rem",
                      fontWeight: "500",
                      background:
                        mission.status === "completed"
                          ? "#dcfce7"
                          : mission.status === "in-progress"
                          ? "#dbeafe"
                          : "#f1f5f9",
                      color:
                        mission.status === "completed"
                          ? "#166534"
                          : mission.status === "in-progress"
                          ? "#1e40af"
                          : "#64748b",
                    }}
                  >
                    {mission.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
