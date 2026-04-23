import React from 'react';
import './LoadingSpinner.css';

export const LoadingSpinner = ({ message = "Cargando..." }) => {
  return (
    <div className="loading-indicator">
      <div className="spinner"></div>
      <p>{message}</p>
    </div>
  );
};