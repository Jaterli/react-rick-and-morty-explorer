// src/hooks/useEpisodes.js
import { useState, useEffect, useCallback, useRef } from 'react';
import { api } from '../services/api';

export const useEpisodes = (shouldLoad = true) => {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  
  const isFirstRender = useRef(true);

  const loadEpisodes = useCallback(async () => {
    if (!shouldLoad) return;
    
    console.log('loadEpisodes called:', { currentPage, search });
    setLoading(true);
    setError(null);
    
    try {
      const data = await api.getEpisodes(currentPage, search);
      console.log('API response:', data);
      setEpisodes(data.results || []);
      setTotalPages(data.info?.pages || 1);
    } catch (err) {
      console.error('Error loading episodes:', err);
      setError('Error al cargar los episodios');
      setEpisodes([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, search, shouldLoad]);

  useEffect(() => {
    if (shouldLoad) {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        loadEpisodes();
      } else {
        loadEpisodes();
      }
    }
  }, [currentPage, search, loadEpisodes, shouldLoad]);

  const updateSearch = (newSearch) => {
    setSearch(newSearch);
    setCurrentPage(1);
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const reload = useCallback(() => {
    setCurrentPage(1);
    loadEpisodes();
  }, [loadEpisodes]);

  return {
    episodes,
    loading,
    error,
    currentPage,
    totalPages,
    search,
    updateSearch,
    goToPage,
    reload
  };
};