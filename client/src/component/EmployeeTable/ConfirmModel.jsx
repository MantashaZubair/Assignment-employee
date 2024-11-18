// ConfirmModal.js
import React from 'react';
import "./EmployeeTable.css";

const ConfirmModel = ({ show, onClose, onConfirm, message }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Confirm Action</h3>
        <p>{message}</p>
        <button onClick={onConfirm} className="confirm-btn">Yes</button>
        <button onClick={onClose} className="cancel-btn">No</button>
      </div>
    </div>
  );
};

export default ConfirmModel;
