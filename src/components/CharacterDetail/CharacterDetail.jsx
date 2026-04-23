import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useFavorites } from '../../context/FavoritesContext';
import './CharacterDetail.css';

export const CharacterDetail = ({ characterId }) => {
  const [character, setCharacter] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    const loadCharacterDetail = async () => {
      try {
        const charData = await api.getCharacterById(characterId);
        setCharacter(charData);
        
        const episodeUrls = charData.episode || [];
        const episodesData = await Promise.all(
          episodeUrls.slice(0, 10).map(url => fetch(url).then(r => r.json()))
        );
        setEpisodes(episodesData);
      } catch (error) {
        console.error('Error loading character detail:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCharacterDetail();
  }, [characterId]);

  if (loading) {
    return <div className="loading-detail">Cargando detalles...</div>;
  }

  if (!character) {
    return <div className="error-detail">No se pudo cargar el personaje</div>;
  }

  return (
    <div className="character-detail">
      <img className="character-detail-img" src={character.image} alt={character.name} />
      <div className="detail-header">
        <h2>{character.name}</h2>
        <button 
          className={`fav-btn ${isFavorite(character.id) ? 'active' : ''}`}
          onClick={() => toggleFavorite(character)}
        >
          <i className="fas fa-heart"></i>
        </button>
      </div>

      <div className="detail-info">
        <p><strong>Estado:</strong> {character.status}</p>
        <p><strong>Especie:</strong> {character.species}</p>
        <p><strong>Tipo:</strong> {character.type || 'Ninguno'}</p>
        <p><strong>Género:</strong> {character.gender}</p>
        <p><strong>Origen:</strong> {character.origin?.name || 'Desconocido'}</p>
        <p><strong>Ubicación:</strong> {character.location?.name || 'Desconocida'}</p>
        <p><strong>Episodios ({episodes.length}):</strong></p>
        <div className="episodes-list">
          {episodes.map(ep => (
            <span key={ep.id} className="episode-tag">
              {ep.episode} - {ep.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};