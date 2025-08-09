import React from "react";
import { Activity, Battery, Pause, Square } from "lucide-react";

const MonitoringPage = ({ missions, drones, onMissionControl }) => {
  const activeMissions = missions.filter((m) => m.status === "in-progress");

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem",
    },
    title: {
      fontSize: "1.5rem",
      fontWeight: "700",
      color: "#1e293b",
    },
    emptyState: {
      background: "white",
      borderRadius: "0.5rem",
      border: "1px solid #e2e8f0",
      boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
      padding: "3rem",
      textAlign: "center",
    },
    emptyTitle: {
      fontSize: "1.125rem",
      fontWeight: "500",
      color: "#1e293b",
      marginBottom: "0.5rem",
    },
    emptyText: {
      color: "#64748b",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
      gap: "1.5rem",
    },
    monitorCard: {
      background: "white",
      borderRadius: "0.5rem",
      border: "1px solid #e2e8f0",
      boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
      padding: "1.5rem",
    },
    cardHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "1rem",
    },
    missionTitle: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      fontSize: "1.125rem",
      fontWeight: "600",
      color: "#1e293b",
    },
    missionSite: {
      fontSize: "0.875rem",
      color: "#64748b",
    },
    statusBadge: {
      padding: "0.5rem 0.75rem",
      background: "#dbeafe",
      color: "#3b82f6",
      borderRadius: "9999px",
      fontSize: "0.875rem",
      fontWeight: "500",
    },
    progressSection: {
      marginBottom: "1rem",
    },
    progressHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "0.5rem",
    },
    progressLabel: {
      fontSize: "0.875rem",
      color: "#64748b",
    },
    progressValue: {
      fontSize: "0.875rem",
      fontWeight: "500",
      color: "#1e293b",
    },
    progressBar: {
      width: "100%",
      background: "#e2e8f0",
      borderRadius: "9999px",
      height: "0.75rem",
    },
    progressFill: {
      background: "#3b82f6",
      height: "100%",
      borderRadius: "9999px",
      transition: "all 1s",
    },
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "1rem",
      marginBottom: "1rem",
    },
    statItem: {
      textAlign: "left",
    },
    statLabel: {
      fontSize: "0.75rem",
      color: "#64748b",
      textTransform: "uppercase",
      letterSpacing: "0.025em",
      marginBottom: "0.25rem",
    },
    statValue: {
      fontWeight: "500",
      color: "#1e293b",
    },
    droneInfo: {
      background: "#f8fafc",
      borderRadius: "0.5rem",
      padding: "1rem",
      marginBottom: "1rem",
    },
    droneHeader: {
      fontSize: "0.75rem",
      color: "#64748b",
      textTransform: "uppercase",
      letterSpacing: "0.025em",
      marginBottom: "0.5rem",
    },
    droneDetails: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    droneName: {
      fontWeight: "500",
      color: "#1e293b",
    },
    droneStats: {
      textAlign: "right",
    },
    batteryInfo: {
      display: "flex",
      alignItems: "center",
      gap: "0.25rem",
      marginBottom: "0.25rem",
    },
    locationInfo: {
      fontSize: "0.75rem",
      color: "#64748b",
    },
    actions: {
      display: "flex",
      gap: "0.5rem",
      paddingTop: "1rem",
      borderTop: "1px solid #e2e8f0",
    },
    actionButton: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.25rem",
      padding: "0.5rem 0.75rem",
      fontSize: "0.875rem",
      borderRadius: "0.5rem",
      border: "none",
      cursor: "pointer",
      transition: "all 0.2s",
    },
  };

  if (activeMissions.length === 0) {
    return (
      <div style={styles.container}>
        <h2 style={styles.title}>Real-time Mission Monitoring</h2>

        <div style={styles.emptyState}>
          <Activity
            size={64}
            color="#9ca3af"
            style={{ margin: "0 auto 1rem" }}
          />
          <h3 style={styles.emptyTitle}>No Active Missions</h3>
          <p style={styles.emptyText}>
            All drones are currently available for new missions.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Real-time Mission Monitoring</h2>

      <div style={styles.grid}>
        {activeMissions.map((mission) => {
          const assignedDrone = drones.find((d) => d.id === mission.droneId);
          const elapsedTime = mission.startTime
            ? Math.floor(
                (Date.now() - mission.startTime.getTime()) / (1000 * 60)
              )
            : 0;

          return (
            <div key={mission.id} style={styles.monitorCard}>
              <div style={styles.cardHeader}>
                <div>
                  <h3 style={styles.missionTitle}>
                    <span>{mission.name}</span>
                    <Activity size={20} color="#3b82f6" />
                  </h3>
                  <p style={styles.missionSite}>{mission.site}</p>
                </div>
                <span style={styles.statusBadge}>In Progress</span>
              </div>

              <div style={styles.progressSection}>
                <div style={styles.progressHeader}>
                  <span style={styles.progressLabel}>Mission Progress</span>
                  <span style={styles.progressValue}>{mission.progress}%</span>
                </div>
                <div style={styles.progressBar}>
                  <div
                    style={{
                      ...styles.progressFill,
                      width: `${mission.progress}%`,
                    }}
                  />
                </div>
              </div>

              <div style={styles.statsGrid}>
                <div style={styles.statItem}>
                  <p style={styles.statLabel}>Elapsed Time</p>
                  <p style={styles.statValue}>{elapsedTime}min</p>
                </div>
                <div style={styles.statItem}>
                  <p style={styles.statLabel}>Est. Remaining</p>
                  <p style={styles.statValue}>{mission.estimatedTime}min</p>
                </div>
                <div style={styles.statItem}>
                  <p style={styles.statLabel}>Altitude</p>
                  <p style={styles.statValue}>{mission.altitude}m</p>
                </div>
                <div style={styles.statItem}>
                  <p style={styles.statLabel}>Pattern</p>
                  <p style={styles.statValue}>{mission.pattern}</p>
                </div>
              </div>

              {assignedDrone && (
                <div style={styles.droneInfo}>
                  <p style={styles.droneHeader}>Assigned Drone</p>
                  <div style={styles.droneDetails}>
                    <div>
                      <p style={styles.droneName}>{assignedDrone.name}</p>
                      <p style={styles.droneModel}>{assignedDrone.model}</p>
                    </div>
                    <div style={styles.droneStats}>
                      <div style={styles.batteryInfo}>
                        <Battery size={16} color="#10b981" />
                        <span
                          style={{ fontSize: "0.875rem", fontWeight: "500" }}
                        >
                          {assignedDrone.battery}%
                        </span>
                      </div>
                      <p style={styles.locationInfo}>
                        Location: {assignedDrone.site}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div style={styles.actions}>
                <button
                  onClick={() => onMissionControl(mission.id, "pause")}
                  style={{
                    ...styles.actionButton,
                    background: "#f59e0b",
                    color: "white",
                  }}
                >
                  <Pause size={16} />
                  <span>Pause</span>
                </button>
                <button
                  onClick={() => onMissionControl(mission.id, "abort")}
                  style={{
                    ...styles.actionButton,
                    background: "#dc2626",
                    color: "white",
                  }}
                >
                  <Square size={16} />
                  <span>Abort</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonitoringPage;
