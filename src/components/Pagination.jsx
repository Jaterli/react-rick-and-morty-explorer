import React from 'react';
import './Pagination.css';

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <button 
        className="page-btn" 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <i className="fas fa-chevron-left"></i> Anterior
      </button>
      <span className="page-info">
        Página {currentPage} de {totalPages}
      </span>
      <button 
        className="page-btn" 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Siguiente <i className="fas fa-chevron-right"></i>
      </button>
    </div>
  );
};