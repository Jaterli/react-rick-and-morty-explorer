import React from 'react';
import './Footer.css';

export const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <p className="footer-credit">
          Creado con <i className="fas fa-heart" style={{ color: 'var(--favorite)' }}></i> por&nbsp;
          <a 
            href="https://www.jaterli.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="creator-link"
          > 
            Jaterli
          </a>
        </p>
        <p className="footer-copyright">
          <i className="far fa-copyright"></i> 2026 - Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
};