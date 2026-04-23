import React, { useState } from 'react';
import { FavoritesProvider } from './context/FavoritesProvider';
import { useFavorites } from './context/FavoritesContext';
import { useCharacters } from './hooks/useCharacters';
import { useEpisodes } from './hooks/useEpisodes';
import { Header } from './components/Header';
import { CharactersView } from './views/CharactersView';
import { EpisodesView } from './views/EpisodesView';
import { FavoritesView } from './views/FavoritesView';
import { Modal } from './components/Modal';
import { CharacterDetail } from './components/CharacterDetail';
import { EpisodeDetail } from './components/EpisodeDetail';
import { Footer } from './components/Footer';
import './App.css';

const AppContent = () => {
  const [currentView, setCurrentView] = useState('characters');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCharacterId, setSelectedCharacterId] = useState(null);
  const [selectedEpisodeId, setSelectedEpisodeId] = useState(null);
  
  const { favorites, getFavoritesCount } = useFavorites();
  const charactersHook = useCharacters();
  const episodesHook = useEpisodes(currentView === 'episodes');

  const handleCharacterClick = (characterId) => {
    setSelectedCharacterId(characterId);
    setSelectedEpisodeId(null);
    setModalOpen(true);
  };

  const handleEpisodeClick = (episodeId) => {
    setSelectedEpisodeId(episodeId);
    setSelectedCharacterId(null);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCharacterId(null);
    setSelectedEpisodeId(null);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'characters':
        return (
          <CharactersView
            characters={charactersHook.characters}
            loading={charactersHook.loading}
            error={charactersHook.error}
            filters={charactersHook.filters}
            onFilterChange={charactersHook.updateFilters}
            currentPage={charactersHook.currentPage}
            totalPages={charactersHook.totalPages}
            onPageChange={charactersHook.goToPage}
            onCharacterClick={handleCharacterClick}
            onRetry={charactersHook.reload}
          />
        );
      case 'episodes':
        return (
          <EpisodesView
            episodes={episodesHook.episodes}
            loading={episodesHook.loading}
            error={episodesHook.error}
            search={episodesHook.search}
            onSearchChange={episodesHook.updateSearch}
            currentPage={episodesHook.currentPage}
            totalPages={episodesHook.totalPages}
            onPageChange={episodesHook.goToPage}
            onEpisodeClick={handleEpisodeClick}
            onRetry={episodesHook.reload}
          />
        );
      case 'favorites':
        return (
          <FavoritesView
            favorites={favorites}
            onCharacterClick={handleCharacterClick}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      <Header 
        onViewChange={setCurrentView}
        activeView={currentView}
        favoritesCount={getFavoritesCount()}
      />
      
      <main>
        {renderContent()}
      </main>

      <Modal isOpen={modalOpen} onClose={handleCloseModal}>
        {selectedCharacterId && (
          <CharacterDetail 
            characterId={selectedCharacterId} 
            onClose={handleCloseModal}
          />
        )}
        {selectedEpisodeId && (
          <EpisodeDetail 
            episodeId={selectedEpisodeId}
            onCharacterClick={(charId) => {
              setSelectedCharacterId(charId);
              setSelectedEpisodeId(null);
            }}
          />
        )}
      </Modal>

      <Footer />
    </div>
  );
};

function App() {
  return (
    <FavoritesProvider>
      <AppContent />
    </FavoritesProvider>
  );
}

export default App;