const StatsCard = ({ title, value, icon: Icon, color = "blue", trend }) => {
  const styles = {
    card: {
      background: "white",
      borderRadius: "0.75rem",
      padding: "1.5rem",
      border: "1px solid #e2e8f0",
      boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
    },
    content: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    textContent: {
      flex: 1,
    },
    title: {
      fontSize: "0.875rem",
      fontWeight: "500",
      color: "#64748b",
      marginBottom: "0.25rem",
    },
    value: {
      fontSize: "1.5rem",
      fontWeight: "700",
      color: "#1e293b",
    },
    trend: {
      fontSize: "0.75rem",
      color: "#64748b",
      marginTop: "0.25rem",
    },
    iconContainer: {
      padding: "0.75rem",
      borderRadius: "50%",
      background:
        color === "blue"
          ? "#dbeafe"
          : color === "green"
          ? "#dcfce7"
          : color === "purple"
          ? "#f3e8ff"
          : color === "orange"
          ? "#fed7aa"
          : "#f1f5f9",
    },
  };

  const iconColor =
    color === "blue"
      ? "#3b82f6"
      : color === "green"
      ? "#10b981"
      : color === "purple"
      ? "#8b5cf6"
      : color === "orange"
      ? "#f97316"
      : "#64748b";

  return (
    <div style={styles.card}>
      <div style={styles.content}>
        <div style={styles.textContent}>
          <p style={styles.title}>{title}</p>
          <p style={styles.value}>{value}</p>
          {trend && <p style={styles.trend}>{trend}</p>}
        </div>
        <div style={styles.iconContainer}>
          <Icon size={24} color={iconColor} />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
