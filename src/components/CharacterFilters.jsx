import React from 'react';
import './CharacterFilters.css';

export const CharacterFilters = ({ filters, onFilterChange }) => {
  const handleInputChange = (e) => {
    onFilterChange({ [e.target.name]: e.target.value });
  };

  return (
    <div className="filters-section">
      <div className="search-box">
        <i className="fas fa-search"></i>
        <input
          type="text"
          name="name"
          placeholder="Buscar personaje..."
          value={filters.name}
          onChange={handleInputChange}
        />
      </div>
      <div className="filter-group">
        <select name="status" value={filters.status} onChange={handleInputChange}>
          <option value="">Todos los estados</option>
          <option value="alive">Vivo</option>
          <option value="dead">Muerto</option>
          <option value="unknown">Desconocido</option>
        </select>
        <select name="species" value={filters.species} onChange={handleInputChange}>
          <option value="">Todas las especies</option>
          <option value="human">Humano</option>
          <option value="alien">Alienígena</option>
          <option value="humanoid">Humanoide</option>
          <option value="mythological">Mitológico</option>
          <option value="animal">Animal</option>
          <option value="robot">Robot</option>
          <option value="cronenberg">Cronenberg</option>
          <option value="disease">Enfermedad</option>
          <option value="poopybutthole">Poopybutthole</option>
          <option value="unknown">Desconocida</option>
        </select>
      </div>
    </div>
  );
};