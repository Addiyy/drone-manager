
import React from "react";
import { Drone, Home, Navigation, Monitor, BarChart3 } from "lucide-react";

const Header = ({ currentPage, setCurrentPage }) => {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "missions", label: "Missions", icon: Navigation },
    { id: "fleet", label: "Fleet", icon: Drone },
    { id: "monitoring", label: "Monitoring", icon: Monitor },
    { id: "reports", label: "Reports", icon: BarChart3 },
  ];

  const styles = {
    header: {
      background: "white",
      borderBottom: "1px solid #e2e8f0",
      boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
      position: "sticky",
      top: 0,
      zIndex: 50,
    },
    headerContent: {
      maxWidth: "1280px",
      margin: "0 auto",
      padding: "0 1.5rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: "4rem",
    },
    logo: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      fontSize: "1.25rem",
      fontWeight: "700",
      color: "#1e293b",
    },
    nav: {
      display: "flex",
      gap: "0.25rem",
    },
    navButton: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.5rem 1rem",
      borderRadius: "0.5rem",
      fontSize: "0.875rem",
      fontWeight: "500",
      transition: "all 0.2s",
      background: "none",
      border: "none",
      cursor: "pointer",
    },
  };

  return (
    <header style={styles.header}>
      <div style={styles.headerContent}>
        <div style={styles.logo}>
          <Drone size={32} color="#3b82f6" />
          <span>DroneOps</span>
        </div>
        <nav style={styles.nav}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              style={{
                ...styles.navButton,
                background: currentPage === item.id ? "#3b82f6" : "transparent",
                color: currentPage === item.id ? "white" : "#64748b",
              }}
            >
              <item.icon size={16} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
