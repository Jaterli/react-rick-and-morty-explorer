import React from 'react';
import { CharacterCard } from '../components/CharacterCard';
import { CharacterFilters } from '../components/CharacterFilters';
import { Pagination } from '../components/Pagination';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';

export const CharactersView = ({ 
  characters, 
  loading, 
  error, 
  filters, 
  onFilterChange,
  currentPage,
  totalPages,
  onPageChange,
  onCharacterClick,
  onRetry
}) => {
  return (
    <div className="view active">
      <div className="seccion-header">
        <h2><i className="fas fa-users"></i> Personajes</h2>
        <CharacterFilters filters={filters} onFilterChange={onFilterChange} />
      </div>

      {loading && <LoadingSpinner message="Cargando personajes..." />}
      
      {error && <ErrorMessage message={error} onRetry={onRetry} />}
      
      {!loading && !error && (
        <>
          <div className="characters-grid">
            {characters.map(character => (
              <CharacterCard 
                key={character.id} 
                character={character} 
                onCharacterClick={onCharacterClick}
              />
            ))}
          </div>
          
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </>
      )}
    </div>
  );
};