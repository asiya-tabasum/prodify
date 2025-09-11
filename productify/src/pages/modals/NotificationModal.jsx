import React from "react";
import "@/pages/styles/Modals.css";

export default function ConfirmModal({ 
  title, 
  onConfirm, 
}) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2 className="modal-title">{title}</h2>
        <div className="modal-actions">
          <button onClick={onConfirm}>Ok</button>
        </div>
      </div>
    </div>
  );
}
