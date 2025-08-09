import React from "react";
import { Eye, Settings } from "lucide-react";

const Fleet = ({ drones }) => {
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
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
      gap: "1.5rem",
    },
    droneCard: {
      background: "white",
      borderRadius: "0.5rem",
      border: "1px solid #e2e8f0",
      boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
      padding: "1.5rem",
    },
    droneHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "1rem",
    },
    droneTitle: {
      fontSize: "1.125rem",
      fontWeight: "600",
      color: "#1e293b",
      marginBottom: "0.25rem",
    },
    droneModel: {
      fontSize: "0.875rem",
      color: "#64748b",
    },
    statusBadge: {
      padding: "0.25rem 0.5rem",
      borderRadius: "9999px",
      fontSize: "0.75rem",
      fontWeight: "500",
    },
    detailsGrid: {
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem",
    },
    detailRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    detailLabel: {
      fontSize: "0.875rem",
      color: "#64748b",
    },
    detailValue: {
      fontSize: "0.875rem",
      fontWeight: "500",
      color: "#1e293b",
    },
    batteryContainer: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    batteryBar: {
      width: "4rem",
      background: "#e2e8f0",
      borderRadius: "9999px",
      height: "0.5rem",
    },
    batteryFill: {
      height: "100%",
      borderRadius: "9999px",
    },
    missionBadge: {
      background: "#dbeafe",
      borderRadius: "0.5rem",
      padding: "0.75rem",
      marginTop: "0.75rem",
    },
    missionLabel: {
      fontSize: "0.75rem",
      color: "#3b82f6",
      textTransform: "uppercase",
      letterSpacing: "0.025em",
      marginBottom: "0.25rem",
    },
    missionName: {
      fontSize: "0.875rem",
      fontWeight: "500",
      color: "#1e40af",
    },
    actions: {
      display: "flex",
      gap: "0.5rem",
      marginTop: "1rem",
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

  const getStatusStyle = (status) => {
    switch (status) {
      case "available":
        return { background: "#dcfce7", color: "#166534" };
      case "in-mission":
        return { background: "#dbeafe", color: "#1e40af" };
      case "maintenance":
        return { background: "#fee2e2", color: "#dc2626" };
      default:
        return { background: "#f1f5f9", color: "#64748b" };
    }
  };

  const getBatteryStyle = (level) => {
    if (level > 60) return "#10b981";
    if (level > 30) return "#f59e0b";
    return "#ef4444";
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Fleet Management</h2>

      <div style={styles.grid}>
        {drones.map((drone) => (
          <div key={drone.id} style={styles.droneCard}>
            <div style={styles.droneHeader}>
              <div>
                <h3 style={styles.droneTitle}>{drone.name}</h3>
                <p style={styles.droneModel}>{drone.model}</p>
              </div>
              <span
                style={{
                  ...styles.statusBadge,
                  ...getStatusStyle(drone.status),
                }}
              >
                {drone.status}
              </span>
            </div>

            <div style={styles.detailsGrid}>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Battery Level</span>
                <div style={styles.batteryContainer}>
                  <div style={styles.batteryBar}>
                    <div
                      style={{
                        ...styles.batteryFill,
                        width: `${drone.battery}%`,
                        backgroundColor: getBatteryStyle(drone.battery),
                      }}
                    />
                  </div>
                  <span style={styles.detailValue}>{drone.battery}%</span>
                </div>
              </div>

              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Location</span>
                <span style={styles.detailValue}>{drone.site}</span>
              </div>

              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Flight Hours</span>
                <span style={styles.detailValue}>{drone.flightHours}h</span>
              </div>

              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Last Maintenance</span>
                <span style={styles.detailValue}>{drone.lastMaintenance}</span>
              </div>

              {drone.currentMission && (
                <div style={styles.missionBadge}>
                  <p style={styles.missionLabel}>Current Mission</p>
                  <p style={styles.missionName}>Mission Active</p>
                </div>
              )}
            </div>

            <div style={styles.actions}>
              <button
                style={{
                  ...styles.actionButton,
                  background: "#f1f5f9",
                  color: "#64748b",
                }}
              >
                <Settings size={16} />
                <span>Configure</span>
              </button>
              <button
                style={{
                  ...styles.actionButton,
                  background: "#3b82f6",
                  color: "white",
                }}
              >
                <Eye size={16} />
                <span>Monitor</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fleet;
