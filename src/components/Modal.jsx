import React from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  const styles = {
    overlay: {
      position: "fixed",
      inset: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 50,
    },
    modal: {
      backgroundColor: "white",
      borderRadius: "0.5rem",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      maxWidth: "42rem",
      width: "100%",
      margin: "1rem",
      maxHeight: "90vh",
      overflow: "auto",
    },
    header: {
      padding: "1.5rem",
      borderBottom: "1px solid #e2e8f0",
    },
    title: {
      fontSize: "1.25rem",
      fontWeight: "600",
      color: "#1e293b",
    },
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h2 style={styles.title}>{title}</h2>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
