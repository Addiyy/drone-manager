import React from "react";
import DroneComp from "./DroneComp.jsx";

function App() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        width: "100%",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <DroneComp />
      </div>
    </div>
  );
}

export default App;
