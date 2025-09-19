import React, { useState, useEffect } from "react";
import "./AuditControl.css";

function AuditControl() {
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    // Fetch initial status from backend
    fetch("/api/audit-status")
      .then((res) => res.json())
      .then((data) => setIsRunning(data.isRunning));
  }, []);

  const handleStart = () => {
    fetch("/api/start-audit", { method: "POST" })
      .then((res) => res.json())
      .then(() => setIsRunning(true));
  };

  const handleStop = () => {
    fetch("/api/stop-audit", { method: "POST" })
      .then((res) => res.json())
      .then(() => setIsRunning(false));
  };

  return (
    <section className="audit-control">
      <h2>Audit Engine Control</h2>
      <p>Status: <strong>{isRunning ? "Running (24/7)" : "Stopped"}</strong></p>
      <button onClick={handleStart} disabled={isRunning}>
        Start Audit Engine
      </button>
      <button onClick={handleStop} disabled={!isRunning}>
        Stop Audit Engine
      </button>
      <p>{isRunning ? "The dashboard is actively scanning, analyzing, and notifying officials in real-time." : "The audit engine is paused. Click start to resume 24/7 monitoring."}</p>
    </section>
  );
}

export default AuditControl;