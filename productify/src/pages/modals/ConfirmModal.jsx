import React from "react";
import "@/pages/styles/AdminPrompt.css";

export default function ConfirmModal({ 
  title = "Confirm Delete you want to delete this product", 
  onConfirm, 
  onCancel 
}) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2 className="modal-title">{title}</h2>
        <div className="modal-actions">
          <button onClick={onConfirm}>Ok</button>
          <button  onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
