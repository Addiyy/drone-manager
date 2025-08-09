import React from "react";
import { Battery, MapPin } from "lucide-react";

const DroneCard = ({ drone, onSelect, isSelected }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return { bg: "#dcfce7", text: "#166534" };
      case "in-mission":
        return { bg: "#dbeafe", text: "#1e40af" };
      case "maintenance":
        return { bg: "#fee2e2", text: "#dc2626" };
      default:
        return { bg: "#f1f5f9", text: "#64748b" };
    }
  };

  const getBatteryColor = (level) => {
    if (level > 60) return "#10b981";
    if (level > 30) return "#f59e0b";
    return "#ef4444";
  };

  const statusColors = getStatusColor(drone.status);

  const styles = {
    card: {
      padding: "1rem",
      borderRadius: "0.5rem",
      border: isSelected ? "2px solid #3b82f6" : "2px solid #e2e8f0",
      background: isSelected ? "#f8faff" : "white",
      cursor: "pointer",
      transition: "all 0.2s",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "0.75rem",
    },
    title: {
      fontWeight: "600",
      color: "#1e293b",
      marginBottom: "0.25rem",
    },
    subtitle: {
      fontSize: "0.875rem",
      color: "#64748b",
    },
    status: {
      padding: "0.25rem 0.5rem",
      borderRadius: "9999px",
      fontSize: "0.75rem",
      fontWeight: "500",
      background: statusColors.bg,
      color: statusColors.text,
    },
    details: {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
    },
    row: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    batteryInfo: {
      display: "flex",
      alignItems: "center",
      gap: "0.25rem",
    },
    locationInfo: {
      display: "flex",
      alignItems: "center",
      gap: "0.25rem",
    },
    smallText: {
      fontSize: "0.75rem",
      color: "#64748b",
    },
  };

  return (
    <div style={styles.card} onClick={() => onSelect(drone)}>
      <div style={styles.header}>
        <div>
          <h3 style={styles.title}>{drone.name}</h3>
          <p style={styles.subtitle}>{drone.model}</p>
        </div>
        <span style={styles.status}>{drone.status}</span>
      </div>

      <div style={styles.details}>
        <div style={styles.row}>
          <div style={styles.batteryInfo}>
            <Battery size={16} color={getBatteryColor(drone.battery)} />
            <span style={styles.smallText}>{drone.battery}%</span>
          </div>
          <div style={styles.locationInfo}>
            <MapPin size={16} color="#64748b" />
            <span style={styles.smallText}>{drone.site}</span>
          </div>
        </div>

        <div style={styles.smallText}>
          Flight Hours: {drone.flightHours}h | Last Maintenance:{" "}
          {drone.lastMaintenance}
        </div>
      </div>
    </div>
  );
};

export default DroneCard;
