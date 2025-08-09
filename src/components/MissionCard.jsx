import React from "react";
import {
  Play,
  Trash2,
  Edit,
  Pause,
  Square,
  Battery,
  CheckCircle,
  Activity,
  XCircle,
  Clock,
  AlertTriangle,
} from "lucide-react";

const MissionCard = ({ mission, drones, onEdit, onDelete, onControl }) => {
  const getStatusIcon = (status) => {
    const iconProps = { size: 16 };
    switch (status) {
      case "completed":
        return <CheckCircle {...iconProps} color="#10b981" />;
      case "in-progress":
        return <Activity {...iconProps} color="#3b82f6" />;
      case "aborted":
        return <XCircle {...iconProps} color="#ef4444" />;
      case "planned":
        return <Clock {...iconProps} color="#f59e0b" />;
      default:
        return <AlertTriangle {...iconProps} color="#64748b" />;
    }
  };

  const assignedDrone = drones.find((d) => d.id === mission.droneId);

  const styles = {
    card: {
      background: "white",
      borderRadius: "0.5rem",
      border: "1px solid #e2e8f0",
      boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
      padding: "1.5rem",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "1rem",
    },
    title: {
      fontSize: "1.125rem",
      fontWeight: "600",
      color: "#1e293b",
      marginBottom: "0.25rem",
    },
    subtitle: {
      fontSize: "0.875rem",
      color: "#64748b",
    },
    statusBadge: {
      display: "flex",
      alignItems: "center",
      gap: "0.25rem",
      fontSize: "0.875rem",
      fontWeight: "500",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "1rem",
      marginBottom: "1rem",
    },
    gridItem: {
      fontSize: "0.75rem",
      color: "#64748b",
      textTransform: "uppercase",
      letterSpacing: "0.025em",
      marginBottom: "0.25rem",
    },
    gridValue: {
      fontWeight: "500",
      color: "#1e293b",
    },
    progressContainer: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    progressBar: {
      flex: 1,
      background: "#e2e8f0",
      borderRadius: "9999px",
      height: "0.5rem",
    },
    progressFill: {
      background: "#3b82f6",
      height: "100%",
      borderRadius: "9999px",
      transition: "all 0.5s",
    },
    droneInfo: {
      background: "#f8fafc",
      borderRadius: "0.5rem",
      padding: "0.75rem",
      marginBottom: "1rem",
    },
    actions: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    actionGroup: {
      display: "flex",
      gap: "0.5rem",
    },
    iconButton: {
      padding: "0.5rem",
      background: "none",
      border: "none",
      borderRadius: "0.5rem",
      cursor: "pointer",
      transition: "all 0.2s",
    },
    button: {
      display: "flex",
      alignItems: "center",
      gap: "0.25rem",
      padding: "0.375rem 0.75rem",
      fontSize: "0.875rem",
      borderRadius: "0.5rem",
      border: "none",
      cursor: "pointer",
      transition: "all 0.2s",
    },
  };

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div>
          <h3 style={styles.title}>{mission.name}</h3>
          <p style={styles.subtitle}>{mission.site}</p>
        </div>
        <div style={styles.statusBadge}>
          {getStatusIcon(mission.status)}
          <span style={{ textTransform: "capitalize" }}>{mission.status}</span>
        </div>
      </div>

      <div style={styles.grid}>
        <div>
          <p style={styles.gridItem}>Pattern</p>
          <p style={styles.gridValue}>{mission.pattern}</p>
        </div>
        <div>
          <p style={styles.gridItem}>Altitude</p>
          <p style={styles.gridValue}>{mission.altitude}m</p>
        </div>
        <div>
          <p style={styles.gridItem}>Progress</p>
          <div style={styles.progressContainer}>
            <div style={styles.progressBar}>
              <div
                style={{
                  ...styles.progressFill,
                  width: `${mission.progress}%`,
                }}
              />
            </div>
            <span style={{ fontSize: "0.875rem", fontWeight: "500" }}>
              {mission.progress}%
            </span>
          </div>
        </div>
        <div>
          <p style={styles.gridItem}>ETA</p>
          <p style={styles.gridValue}>{mission.estimatedTime}min</p>
        </div>
      </div>

      {assignedDrone && (
        <div style={styles.droneInfo}>
          <p style={styles.gridItem}>Assigned Drone</p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={styles.gridValue}>{assignedDrone.name}</span>
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}
            >
              <Battery size={16} color="#10b981" />
              <span style={{ fontSize: "0.875rem" }}>
                {assignedDrone.battery}%
              </span>
            </div>
          </div>
        </div>
      )}

      <div style={styles.actions}>
        <div style={styles.actionGroup}>
          <button
            onClick={() => onEdit(mission)}
            style={{
              ...styles.iconButton,
              color: "#64748b",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#dbeafe";
              e.target.style.color = "#3b82f6";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = "#64748b";
            }}
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete(mission.id)}
            style={{
              ...styles.iconButton,
              color: "#64748b",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#fee2e2";
              e.target.style.color = "#dc2626";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = "#64748b";
            }}
          >
            <Trash2 size={16} />
          </button>
        </div>

        {mission.status === "in-progress" && (
          <div style={styles.actionGroup}>
            <button
              onClick={() => onControl(mission.id, "pause")}
              style={{
                ...styles.button,
                background: "#f59e0b",
                color: "white",
              }}
            >
              <Pause size={12} />
              <span>Pause</span>
            </button>
            <button
              onClick={() => onControl(mission.id, "abort")}
              style={{
                ...styles.button,
                background: "#dc2626",
                color: "white",
              }}
            >
              <Square size={12} />
              <span>Abort</span>
            </button>
          </div>
        )}

        {mission.status === "planned" && (
          <button
            onClick={() => onControl(mission.id, "start")}
            style={{
              ...styles.button,
              background: "#10b981",
              color: "white",
            }}
          >
            <Play size={12} />
            <span>Start</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default MissionCard;
