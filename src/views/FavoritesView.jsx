import React from 'react';
import { CharacterCard } from '../components/CharacterCard';
import { ErrorMessage } from '../components/ErrorMessage';

export const FavoritesView = ({ favorites, onCharacterClick }) => {
  if (favorites.length === 0) {
    return (
      <div className="view active">
        <ErrorMessage message="No tienes personajes favoritos aún. ¡Agrega algunos!" />
      </div>
    );
  }

  return (
    <div className="view active">
      <div className="seccion-header">
        <h2><i className="fas fa-heart"></i> Mis Favoritos</h2>
      </div>
      
      <div className="characters-grid">
        {favorites.map(character => (
          <CharacterCard 
            key={character.id} 
            character={character} 
            onCharacterClick={onCharacterClick}
          />
        ))}
      </div>
    </div>
  );
};