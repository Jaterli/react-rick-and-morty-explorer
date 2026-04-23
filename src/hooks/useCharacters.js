import { useState, useEffect, useCallback, useRef } from 'react';
import { api } from '../services/api';

export const useCharacters = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({ name: '', status: '', species: '' });
  
  // Usar ref para evitar cargar en el primer render si no es necesario
  const isFirstRender = useRef(true);

  const loadCharacters = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await api.getCharacters(currentPage, filters);
      setCharacters(data.results || []);
      setTotalPages(data.info?.pages || 1);
    } catch (err) {
      if (filters.name || filters.status || filters.species) {
        setError('¡UPS! parece que no hay personajes que coincidan con tus filtros');
      } else {
        setError('Error al cargar los personajes: ' + err.message);
      }
      setCharacters([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, filters]);

  // Cargar personajes cuando cambien currentPage o filters
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      loadCharacters();
    } else {
      loadCharacters();
    }
  }, [currentPage, filters, loadCharacters]);

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return {
    characters,
    loading,
    error,
    currentPage,
    totalPages,
    filters,
    updateFilters,
    goToPage,
    reload: () => {
      setCurrentPage(1);
      loadCharacters();
    }
  };
};