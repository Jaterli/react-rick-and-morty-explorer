import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import './CharacterCard.css';

export const CharacterCard = ({ character, onCharacterClick }) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(character);
  };

  return (
    <div className="character-card" onClick={() => onCharacterClick(character.id)}>
      <button 
        className={`fav-btn ${isFavorite(character.id) ? 'active' : ''}`}
        onClick={handleFavoriteClick}
      >
        <i className="fas fa-heart"></i>
      </button>
      <img 
        className="character-img" 
        src={character.image} 
        alt={character.name} 
        loading="lazy"
      />
      <div className="character-info">
        <div className="character-name">
          {character.name}
        </div>
        <div className="character-status">
          <span className={`status-badge status-${character.status.toLowerCase()}`}></span>
          {character.status} - {character.species}
        </div>
      </div>
    </div>
  );
};