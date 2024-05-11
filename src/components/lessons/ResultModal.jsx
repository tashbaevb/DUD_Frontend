import React from "react";
import "./ResultModal.css";

function ResultModal({ result, onClose, onNext }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <p className="result-text">Number of correct answers: {result}</p>
        <button className="next-button" onClick={onNext}>
          Next
        </button>
      </div>
    </div>
  );
}

export default ResultModal;
