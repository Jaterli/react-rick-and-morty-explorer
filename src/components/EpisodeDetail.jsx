import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import './EpisodeDetail.css';

export const EpisodeDetail = ({ episodeId, onCharacterClick }) => {
  const [episode, setEpisode] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEpisodeDetail = async () => {
      try {
        const epData = await api.getEpisodeById(episodeId);
        setEpisode(epData);
        
        const characterIds = epData.characters.map(url => {
          const parts = url.split('/');
          return parseInt(parts[parts.length - 1]);
        });
        
        const charactersData = await api.getMultipleCharacters(characterIds);
        setCharacters(charactersData);
      } catch (error) {
        console.error('Error loading episode detail:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEpisodeDetail();
  }, [episodeId]);

  if (loading) {
    return <div className="loading-detail">Cargando detalles del episodio...</div>;
  }

  if (!episode) {
    return <div className="error-detail">No se pudo cargar el episodio</div>;
  }

  return (
    <div className="episode-detail">
      <h2>{episode.name}</h2>
      <div className="detail-info">
        <p><strong>Episodio:</strong> {episode.episode}</p>
        <p><strong>Fecha de emisión:</strong> {episode.air_date}</p>
        <p><strong>Personajes ({characters.length}):</strong></p>
        <div className="characters-list">
          {characters.map(char => (
            <div 
              key={char.id}
              className="character-link"
              onClick={() => onCharacterClick(char.id)}
            >
              <img src={char.image} alt={char.name} />
              <span>{char.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};