import React from "react";
import "./ResultModal.css";

function ResultModal({ result, onClose, onNext }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <p className="result-text">Anzahl der richtigen Antworten: {result}</p>
        <button className="next-button" onClick={onNext}>
          Weiter
        </button>
      </div>
    </div>
  );
}

export default ResultModal;
