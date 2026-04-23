import React from 'react';
import './EpisodeCard.css';

export const EpisodeCard = ({ episode, onEpisodeClick }) => {
  return (
    <div className="episode-card" onClick={() => onEpisodeClick(episode.id)}>
      <div className="episode-name">{episode.name}</div>
      <div className="episode-info">
        <span><i className="fas fa-calendar"></i> {episode.air_date}</span>
        <span><i className="fas fa-hashtag"></i> {episode.episode}</span>
      </div>
    </div>
  );
};