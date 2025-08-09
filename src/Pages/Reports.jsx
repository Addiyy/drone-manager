import React from "react";
import { BarChart3, CheckCircle, Map, Clock } from "lucide-react";
import StatsCard from "../components/StatsCard";

const ReportsPage = ({ missions, drones }) => {
  const completedMissions = missions.filter((m) => m.status === "completed");
  const totalSurveyArea = missions.reduce(
    (sum, mission) => sum + (mission.surveyArea?.radius || 0),
    0
  );
  const avgMissionDuration =
    completedMissions.length > 0
      ? completedMissions.reduce(
          (sum, mission) => sum + mission.estimatedTime,
          0
        ) / completedMissions.length
      : 0;

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
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "1.5rem",
    },
    contentGrid: {
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
      padding: "1rem",
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
      marginBottom: "0.5rem",
    },
    missionDetails: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      fontSize: "0.75rem",
      color: "#64748b",
    },
    missionStatus: {
      textAlign: "right",
    },
    statusBadge: {
      padding: "0.25rem 0.5rem",
      borderRadius: "9999px",
      fontSize: "0.75rem",
      fontWeight: "500",
    },
    statusDetails: {
      fontSize: "0.75rem",
      color: "#64748b",
      marginTop: "0.25rem",
    },
    droneUtilization: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
    droneUtilItem: {
      padding: "1rem",
      background: "#f8fafc",
      borderRadius: "0.5rem",
    },
    droneUtilHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "0.5rem",
    },
    droneUtilName: {
      fontWeight: "500",
      color: "#1e293b",
    },
    droneUtilRate: {
      fontSize: "0.875rem",
      fontWeight: "500",
      color: "#3b82f6",
    },
    droneUtilGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "1rem",
      fontSize: "0.875rem",
    },
    droneUtilItem: {
      padding: "1rem",
      background: "#f8fafc",
      borderRadius: "0.5rem",
    },
    droneUtilLabel: {
      color: "#64748b",
      marginBottom: "0.25rem",
    },
    droneUtilValue: {
      fontWeight: "500",
      color: "#1e293b",
    },
    table: {
      width: "100%",
      fontSize: "0.875rem",
    },
    tableHeader: {
      borderBottom: "1px solid #e2e8f0",
    },
    tableHeaderCell: {
      textAlign: "left",
      padding: "0.75rem 0",
      fontWeight: "500",
      color: "#1e293b",
    },
    tableRow: {
      borderBottom: "1px solid #f1f5f9",
    },
    tableCell: {
      padding: "0.75rem 0",
      color: "#64748b",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Survey Reporting & Analytics</h2>

      <div style={styles.statsGrid}>
        <StatsCard
          title="Total Surveys"
          value={missions.length}
          icon={BarChart3}
          color="blue"
          trend="All time"
        />
        <StatsCard
          title="Completed Surveys"
          value={completedMissions.length}
          icon={CheckCircle}
          color="green"
          trend={`${Math.round(
            (completedMissions.length / missions.length) * 100
          )}% success rate`}
        />
        <StatsCard
          title="Total Coverage"
          value={`${(totalSurveyArea / 1000).toFixed(1)}km`}
          icon={Map}
          color="purple"
          trend="Area surveyed"
        />
        <StatsCard
          title="Avg Duration"
          value={`${avgMissionDuration.toFixed(0)}min`}
          icon={Clock}
          color="orange"
          trend="Per mission"
        />
      </div>

      <div style={styles.contentGrid}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Mission Performance</h3>
          <div style={styles.missionList}>
            {missions.map((mission) => (
              <div key={mission.id} style={styles.missionItem}>
                <div style={styles.missionInfo}>
                  <h4 style={styles.missionName}>{mission.name}</h4>
                  <p style={styles.missionSite}>{mission.site}</p>
                  <div style={styles.missionDetails}>
                    <span>Pattern: {mission.pattern}</span>
                    <span>Altitude: {mission.altitude}m</span>
                    <span>Overlap: {mission.overlap}%</span>
                  </div>
                </div>
                <div style={styles.missionStatus}>
                  <span
                    style={{
                      ...styles.statusBadge,
                      background:
                        mission.status === "completed"
                          ? "#dcfce7"
                          : mission.status === "in-progress"
                          ? "#dbeafe"
                          : mission.status === "aborted"
                          ? "#fee2e2"
                          : "#f1f5f9",
                      color:
                        mission.status === "completed"
                          ? "#166534"
                          : mission.status === "in-progress"
                          ? "#1e40af"
                          : mission.status === "aborted"
                          ? "#dc2626"
                          : "#64748b",
                    }}
                  >
                    {mission.status}
                  </span>
                  {mission.status === "completed" && (
                    <p style={styles.statusDetails}>
                      Duration: {mission.estimatedTime}min
                    </p>
                  )}
                  {mission.status === "in-progress" && (
                    <p style={styles.statusDetails}>
                      Progress: {mission.progress}%
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Fleet Utilization</h3>
          <div style={styles.droneUtilization}>
            {drones.map((drone) => {
              const droneCompletedMissions = completedMissions.filter(
                (m) => m.droneId === drone.id
              );
              const utilizationRate =
                completedMissions.length > 0
                  ? (
                      (droneCompletedMissions.length /
                        completedMissions.length) *
                      100
                    ).toFixed(1)
                  : 0;

              return (
                <div key={drone.id} style={styles.droneUtilItem}>
                  <div style={styles.droneUtilHeader}>
                    <h4 style={styles.droneUtilName}>{drone.name}</h4>
                    <span style={styles.droneUtilRate}>{utilizationRate}%</span>
                  </div>
                  <div style={styles.droneUtilGrid}>
                    <div>
                      <p style={styles.droneUtilLabel}>Missions Completed</p>
                      <p style={styles.droneUtilValue}>
                        {droneCompletedMissions.length}
                      </p>
                    </div>
                    <div>
                      <p style={styles.droneUtilLabel}>Total Flight Hours</p>
                      <p style={styles.droneUtilValue}>{drone.flightHours}h</p>
                    </div>
                    <div>
                      <p style={styles.droneUtilLabel}>Current Status</p>
                      <p style={styles.droneUtilValue}>{drone.status}</p>
                    </div>
                    <div>
                      <p style={styles.droneUtilLabel}>Battery Level</p>
                      <p style={styles.droneUtilValue}>{drone.battery}%</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Site Coverage Summary</h3>
        <div style={{ overflowX: "auto" }}>
          <table style={styles.table}>
            <thead style={styles.tableHeader}>
              <tr>
                <th style={styles.tableHeaderCell}>Site</th>
                <th style={styles.tableHeaderCell}>Total Missions</th>
                <th style={styles.tableHeaderCell}>Completed</th>
                <th style={styles.tableHeaderCell}>In Progress</th>
                <th style={styles.tableHeaderCell}>Success Rate</th>
                <th style={styles.tableHeaderCell}>Last Survey</th>
              </tr>
            </thead>
            <tbody>
              {[...new Set(missions.map((m) => m.site))].map((site) => {
                const siteMissions = missions.filter((m) => m.site === site);
                const siteCompleted = siteMissions.filter(
                  (m) => m.status === "completed"
                );
                const siteInProgress = siteMissions.filter(
                  (m) => m.status === "in-progress"
                );
                const successRate =
                  siteMissions.length > 0
                    ? (
                        (siteCompleted.length / siteMissions.length) *
                        100
                      ).toFixed(1)
                    : 0;
                const lastSurvey = siteMissions
                  .filter((m) => m.status === "completed")
                  .sort(
                    (a, b) => new Date(b.startTime) - new Date(a.startTime)
                  )[0];

                return (
                  <tr key={site} style={styles.tableRow}>
                    <td
                      style={{
                        ...styles.tableCell,
                        fontWeight: "500",
                        color: "#1e293b",
                      }}
                    >
                      {site}
                    </td>
                    <td style={styles.tableCell}>{siteMissions.length}</td>
                    <td style={styles.tableCell}>{siteCompleted.length}</td>
                    <td style={styles.tableCell}>{siteInProgress.length}</td>
                    <td style={styles.tableCell}>
                      <span
                        style={{
                          padding: "0.25rem 0.5rem",
                          borderRadius: "9999px",
                          fontSize: "0.75rem",
                          fontWeight: "500",
                          background:
                            parseFloat(successRate) >= 80
                              ? "#dcfce7"
                              : parseFloat(successRate) >= 60
                              ? "#fef3c7"
                              : "#fee2e2",
                          color:
                            parseFloat(successRate) >= 80
                              ? "#166534"
                              : parseFloat(successRate) >= 60
                              ? "#92400e"
                              : "#dc2626",
                        }}
                      >
                        {successRate}%
                      </span>
                    </td>
                    <td style={styles.tableCell}>
                      {lastSurvey
                        ? new Date(lastSurvey.startTime).toLocaleDateString()
                        : "Never"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
