import React from 'react';
import './ErrorMessage.css';

export const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="error-message">
      <i className="fas fa-exclamation-triangle"></i>
      <p>{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="retry-btn">
          Reintentar
        </button>
      )}
    </div>
  );
};