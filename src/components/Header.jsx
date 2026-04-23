import React from 'react';
import './Header.css';

export const Header = ({ onViewChange, activeView, favoritesCount }) => {
  return (
    <header className="header">
      <div className="header-content">
        <h1>
          <i className="fas fa-circle-notch"></i>&nbsp; 
          Rick and Morty <span>Explorer</span>
        </h1>

        <nav className="main-nav">
          <div className="view-buttons">
            <button 
              className={`nav-btn ${activeView === 'characters' ? 'active' : ''}`}
              onClick={() => onViewChange('characters')}
            >
              <i className="fas fa-users"></i> Personajes
            </button>
            <button 
              className={`nav-btn ${activeView === 'episodes' ? 'active' : ''}`}
              onClick={() => onViewChange('episodes')}
            >
              <i className="fas fa-tv"></i> Episodios
            </button>
          </div>
          <button 
            className={`nav-btn favorites-nav-btn ${activeView === 'favorites' ? 'active' : ''}`}
            onClick={() => onViewChange('favorites')}
          >
            <i className="fas fa-heart"></i>
            <span>Favoritos</span>
            <span className="favorites-count">{favoritesCount}</span>
          </button>
        </nav>
      </div>
    </header>
  );
};