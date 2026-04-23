import React from 'react';
import { EpisodeCard } from '../components/EpisodeCard';
import { Pagination } from '../components/Pagination';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';

export const EpisodesView = ({ 
  episodes, 
  loading, 
  error, 
  search,
  onSearchChange,
  currentPage,
  totalPages,
  onPageChange,
  onEpisodeClick,
  onRetry
}) => {

  if (loading) {
    return <LoadingSpinner message="Cargando episodios..." />;
  }
  
  if (error) {
    return <ErrorMessage message={error} onRetry={onRetry} />;
  }
  
  if (!episodes || episodes.length === 0) {
    return <div className="error-message">No se encontraron episodios</div>;
  }

  return (
    <div className="view active">
      <div className="seccion-header">
        <h2><i className="fas fa-tv"></i> Episodios</h2>
        <div className="episodes-search">
          <div className="search-box">
            <i className="fas fa-search"></i>
            <input 
              type="text" 
              placeholder="Buscar episodio..."
              value={search || ''}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="episodes-grid">
        {episodes.map(episode => {
          return (
            <EpisodeCard 
              key={episode.id} 
              episode={episode} 
              onEpisodeClick={onEpisodeClick}
            />
          );
        })}
      </div>
      
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};