import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { generateId } from "../context";

const MissionPlannerModal = ({ isOpen, onClose, mission, drones, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    site: "",
    droneId: "",
    pattern: "crosshatch",
    altitude: 50,
    overlap: 75,
    estimatedTime: 30,
  });

  useEffect(() => {
    if (mission) {
      setFormData({
        name: mission.name || "",
        site: mission.site || "",
        droneId: mission.droneId || "",
        pattern: mission.pattern || "crosshatch",
        altitude: mission.altitude || 50,
        overlap: mission.overlap || 75,
        estimatedTime: mission.estimatedTime || 30,
      });
    } else {
      setFormData({
        name: "",
        site: "",
        droneId: "",
        pattern: "crosshatch",
        altitude: 50,
        overlap: 75,
        estimatedTime: 30,
      });
    }
  }, [mission, isOpen]);

  const availableDrones = drones.filter(
    (drone) => drone.status === "available"
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const missionData = {
      ...formData,
      id: mission?.id || generateId(),
      status: "planned",
      progress: 0,
      waypoints: [],
      surveyArea: { lat: 40.7128, lng: -74.006, radius: 500 },
    };
    onSave(missionData);
  };

  const styles = {
    form: {
      padding: "1.5rem",
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "1.5rem",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
    },
    label: {
      fontSize: "0.875rem",
      fontWeight: "500",
      color: "#374151",
      marginBottom: "0.5rem",
    },
    input: {
      width: "100%",
      padding: "0.5rem 0.75rem",
      border: "1px solid #d1d5db",
      borderRadius: "0.5rem",
      fontSize: "0.875rem",
      transition: "all 0.2s",
      outline: "none",
    },
    select: {
      width: "100%",
      padding: "0.5rem 0.75rem",
      border: "1px solid #d1d5db",
      borderRadius: "0.5rem",
      fontSize: "0.875rem",
      transition: "all 0.2s",
      outline: "none",
      background: "white",
    },
    actions: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "0.75rem",
      paddingTop: "1.5rem",
      borderTop: "1px solid #e5e7eb",
    },
    button: {
      padding: "0.5rem 1rem",
      fontSize: "0.875rem",
      borderRadius: "0.5rem",
      border: "none",
      cursor: "pointer",
      transition: "all 0.2s",
    },
    cancelButton: {
      background: "#f3f4f6",
      color: "#374151",
    },
    submitButton: {
      background: "#3b82f6",
      color: "white",
    },
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mission ? "Edit Mission" : "Create New Mission"}
    >
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.grid}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Mission Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              style={styles.input}
              required
              onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
              onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Site Location</label>
            <input
              type="text"
              value={formData.site}
              onChange={(e) =>
                setFormData({ ...formData, site: e.target.value })
              }
              style={styles.input}
              required
              onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
              onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Assign Drone</label>
            <select
              value={formData.droneId}
              onChange={(e) =>
                setFormData({ ...formData, droneId: e.target.value })
              }
              style={styles.select}
            >
              <option value="">Select a drone</option>
              {availableDrones.map((drone) => (
                <option key={drone.id} value={drone.id}>
                  {drone.name} - {drone.battery}% battery
                </option>
              ))}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Survey Pattern</label>
            <select
              value={formData.pattern}
              onChange={(e) =>
                setFormData({ ...formData, pattern: e.target.value })
              }
              style={styles.select}
            >
              <option value="crosshatch">Crosshatch</option>
              <option value="perimeter">Perimeter</option>
              <option value="spiral">Spiral</option>
              <option value="linear">Linear</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Flight Altitude (m)</label>
            <input
              type="number"
              min="10"
              max="200"
              value={formData.altitude}
              onChange={(e) =>
                setFormData({ ...formData, altitude: parseInt(e.target.value) })
              }
              style={styles.input}
              onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
              onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Image Overlap (%)</label>
            <input
              type="number"
              min="30"
              max="90"
              value={formData.overlap}
              onChange={(e) =>
                setFormData({ ...formData, overlap: parseInt(e.target.value) })
              }
              style={styles.input}
              onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
              onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Estimated Duration (min)</label>
            <input
              type="number"
              min="5"
              max="120"
              value={formData.estimatedTime}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  estimatedTime: parseInt(e.target.value),
                })
              }
              style={styles.input}
              onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
              onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
            />
          </div>
        </div>

        <div style={styles.actions}>
          <button
            type="button"
            onClick={onClose}
            style={{
              ...styles.button,
              ...styles.cancelButton,
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{
              ...styles.button,
              ...styles.submitButton,
            }}
          >
            {mission ? "Update Mission" : "Create Mission"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default MissionPlannerModal;
