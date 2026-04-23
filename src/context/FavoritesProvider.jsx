import React, { useState, useCallback, useEffect } from 'react';
import { FavoritesContext } from './FavoritesContext';

const STORAGE_KEY = 'rickmorty_favorites';

// Función para cargar favoritos desde localStorage (fuera del componente)
const loadFavoritesFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading favorites from storage:', error);
    return [];
  }
};

export const FavoritesProvider = ({ children }) => {
  // Inicializar estado con función lazy para evitar efecto innecesario
  const [favorites, setFavorites] = useState(loadFavoritesFromStorage);

  // Guardar en localStorage cuando cambien los favoritos
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = useCallback((id) => {
    return favorites.some(fav => fav.id === id);
  }, [favorites]);

  const addFavorite = useCallback((character) => {
    if (!isFavorite(character.id)) {
      setFavorites(prev => [...prev, {
        id: character.id,
        name: character.name,
        image: character.image,
        status: character.status,
        species: character.species
      }]);
      return true;
    }
    return false;
  }, [isFavorite]);

  const removeFavorite = useCallback((id) => {
    setFavorites(prev => prev.filter(fav => fav.id !== id));
    return true;
  }, []);

  const toggleFavorite = useCallback((character) => {
    if (isFavorite(character.id)) {
      removeFavorite(character.id);
      return false;
    } else {
      addFavorite(character);
      return true;
    }
  }, [isFavorite, addFavorite, removeFavorite]);

  const getFavoritesCount = useCallback(() => favorites.length, [favorites]);

  const value = {
    favorites,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    getFavoritesCount
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};