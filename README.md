# 🧪 Rick and Morty Explorer - React + API REST

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![React Router](https://img.shields.io/badge/React_Router-6.8.0-CA4245?logo=react-router&logoColor=white)](https://reactrouter.com/)
[![Axios](https://img.shields.io/badge/Axios-1.4.0-5A29E4?logo=axios&logoColor=white)](https://axios-http.com/)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/es/docs/Web/CSS)

Aplicación web **Single Page Application (SPA)** desarrollada con **React** que consume la [API oficial de Rick and Morty](https://rickandmortyapi.com/). Permite explorar personajes y episodios de la serie con funcionalidades completas de búsqueda, filtrado, paginación, vista detallada y un sistema de favoritos con persistencia en **LocalStorage**.

> 🎓 Proyecto realizado como parte del **Módulo de React** del **Máster en Desarrollo Web Full Stack**.

---

## 📸 Vista Previa

| Personajes | Episodios | Detalle Modal |
|------------|-----------|----------------|
| Grid de personajes con filtros | Listado de episodios búsqueda | Modal con info completa |

---

## ✨ Características Principales

### 🎭 Personajes
- **Listado paginado** con grid responsive
- **Búsqueda en tiempo real** por nombre
- **Filtros combinados**: Estado (Vivo/Muerto/Desconocido) + Especie (Humano, Alienígena, Robot, etc.)
- **Tarjetas interactivas** con imagen, nombre, estado y especie
- **Sistema de favoritos** con corazón animado y persistencia

### 📺 Episodios
- **Listado paginado** de episodios
- **Búsqueda por nombre** del episodio
- Información: nombre, fecha de emisión y código (ej: S01E01)

### 🔍 Detalles Avanzados
- **Modal** con información completa de personajes y episodios
- **Navegación bidireccional**: Desde episodio → personaje y viceversa
- **Lista de episodios** en detalle de personaje (limitada a 10 por rendimiento)
- **Lista de personajes** en detalle de episodio

### ❤️ Sistema de Favoritos
- **Marcar/desmarcar** desde tarjeta o modal
- **Persistencia automática** con LocalStorage
- **Contador dinámico** en el header
- **Vista independiente** de favoritos

### ⚡ Optimizaciones
- **Sistema de caché** con `Map()` para reducir peticiones a la API
- **Lazy loading** de imágenes
- **Loading states** con spinner animado
- **Error handling** con mensajes contextuales y botón de reintento

---

## 🛠️ Tecnologías Utilizadas

### Core
- **React 18** - Componentes funcionales y Hooks
- **JavaScript ES6+** - async/await, destructuring, spread operator

### Estado y Efectos
- **useState** - Estado local de componentes
- **useEffect** - Efectos secundarios y sincronización
- **useCallback** - Memoización de funciones
- **useRef** - Referencias mutables (primer render)
- **Context API** - Estado global de favoritos

### Estilos
- **CSS3** - Variables CSS, Grid, Flexbox, animaciones
- **Diseño responsive** - Mobile-first con media queries
- **Scrollbar personalizada** y efectos hover

### Networking
- **Axios** - Cliente HTTP con interceptor de caché
- **API REST** - Rick and Morty API

### Persistencia
- **LocalStorage** - Almacenamiento de favoritos

---

## 📁 Estructura del Proyecto

```
src/
├── assets/                      # Imágenes estáticas
├── components/
│   ├── CharacterCard/          # Tarjeta de personaje
│   ├── CharacterDetail/        # Modal detalle personaje
│   ├── CharacterFilters/       # Filtros de búsqueda
│   ├── EpisodeCard/            # Tarjeta de episodio
│   ├── EpisodeDetail/          # Modal detalle episodio
│   ├── ErrorMessage/           # Componente de error
│   ├── Footer/                 # Pie de página
│   ├── Header/                 # Cabecera con navegación
│   ├── LoadingSpinner/         # Spinner de carga
│   ├── Modal/                  # Modal reutilizable
│   └── Pagination/             # Control de paginación
├── context/
│   ├── FavoritesContext.js     # Contexto y hook personalizado
│   └── FavoritesProvider.jsx   # Provider de favoritos
├── hooks/
│   ├── useCharacters.js        # Custom hook para personajes
│   └── useEpisodes.js          # Custom hook para episodios
├── services/
│   └── api.js                  # Cliente API con caché
├── styles/
│   └── global.css              # Variables y estilos globales
├── views/
│   ├── CharactersView.jsx      # Vista de personajes
│   ├── EpisodesView.jsx        # Vista de episodios
│   └── FavoritesView.jsx       # Vista de favoritos
├── App.jsx                     # Componente principal con routing
├── App.css                     # Estilos específicos de vistas
└── main.jsx                    # Punto de entrada
```

---

## 🏗️ Arquitectura y Patrones

### Separación por Capas

| Capa | Responsabilidad | Archivos |
|------|-----------------|----------|
| **Vistas** | Renderizado de pantallas completas | `views/*.jsx` |
| **Componentes** | UI reutilizable | `components/**/*.jsx` |
| **Hooks** | Lógica de negocio y estado | `hooks/*.js` |
| **Context** | Estado global | `context/*.js` |
| **Servicios** | Comunicación con API | `services/api.js` |

### Custom Hooks Implementados

#### `useCharacters` - Gestión de personajes
```javascript
const charactersHook = useCharacters();
// Retorna: characters, loading, error, filters, currentPage, 
//          totalPages, updateFilters, goToPage, reload
```

#### `useEpisodes` - Gestión de episodios
```javascript
const episodesHook = useEpisodes(shouldLoad);
// Retorna: episodes, loading, error, search, currentPage,
//          totalPages, updateSearch, goToPage, reload
```

### Sistema de Caché con Map()

```javascript
class RickMortyAPI {
  constructor() {
    this.cache = new Map();
  }

  async fetchWithCache(url) {
    if (this.cache.has(url)) {
      return this.cache.get(url);  // Retorna desde caché
    }
    const response = await axios.get(url);
    this.cache.set(url, response.data);
    return response.data;
  }
}
```

### Context API para Favoritos

```javascript
// FavoritesProvider.jsx
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(loadFavoritesFromStorage);
  
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  // isFavorite, addFavorite, removeFavorite, toggleFavorite, getFavoritesCount
  
  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
```

---

## 🚀 Instalación y Ejecución

1. **Clona el repositorio**
```bash
git clone https://github.com/tu-usuario/react-rick-and-morty-explorer.git
cd react-rick-and-morty-explorer
```

2. **Instala las dependencias**
```bash
npm install
```

3. **Ejecuta en modo desarrollo**
```bash
npm run dev
```

4. **Abre en tu navegador**
```
http://localhost:5173
```

### Variables de Entorno (opcional)
```env
VITE_API_URL=https://rickandmortyapi.com/api
```

---

## 📱 Responsive Design

| Breakpoint | Pantalla | Grid Personajes | Grid Episodios |
|------------|----------|-----------------|----------------|
| Base | Móvil (<768px) | 1-2 columnas | 1 columna |
| 768px+ | Tablet | 2-3 columnas | 2 columnas |
| 1024px+ | Desktop | 4 columnas | 2-3 columnas |

### Características Responsive

- **Header adaptable**: Cambia de vertical a horizontal
- **Filtros responsive**: En móvil se apilan, en desktop se ponen en paralelo
- **Modal responsive**: Ocupa toda la pantalla en móvil, tiene tamaño fijo en desktop
- **Fuentes adaptables**: Tamaños relativos con `rem`

---

## ♿ Accesibilidad

- **Atributos ARIA** en botones y elementos interactivos
- **Estructura semántica** con `header`, `nav`, `main`, `footer`
- **Contraste de colores** según WCAG
- **Focus visible** en elementos interactivos
- **Tecla Escape** para cerrar modales
- **`loading="lazy"`** en imágenes para rendimiento

---

## 🧪 Funcionalidades en Detalle

### Búsqueda y Filtros en Tiempo Real

```jsx
// CharacterFilters.jsx
const handleInputChange = (e) => {
  onFilterChange({ [e.target.name]: e.target.value });
};
```

### Navegación Bidireccional

Desde el detalle de episodio se puede abrir el detalle de un personaje:

```jsx
// EpisodeDetail.jsx
<div className="character-link" onClick={() => onCharacterClick(char.id)}>
  <img src={char.image} alt={char.name} />
  <span>{char.name}</span>
</div>
```

### Prevención de Re-renderizados Innecesarios

Uso de `useCallback` y `useRef` para evitar cargas duplicadas:

```javascript
// useCharacters.js
const isFirstRender = useRef(true);

useEffect(() => {
  if (isFirstRender.current) {
    isFirstRender.current = false;
    loadCharacters();
  } else {
    loadCharacters();
  }
}, [currentPage, filters, loadCharacters]);
```

---

## 📊 Rendimiento

| Métrica | Valor |
|---------|-------|
| **Peticiones a API** | Reducidas por caché |
| **Imágenes** | Lazy loading nativo |
| **Bundle size** | Optimizado por Vite |
| **Re-renderizados** | Controlados con hooks y Context |

---

## 🔧 Posibles Mejoras Futuras

- [ ] Testing unitario con Jest + React Testing Library
- [ ] Modo oscuro/claro
- [ ] Infinite scroll en lugar de paginación
- [ ] Compartir favoritos vía URL
- [ ] PWA para instalación en dispositivos
- [ ] Soporte offline con Service Workers

---

## 📄 Licencia

Todos los derechos reservados &copy; 2026

---

## 👨‍💻 Autor

Creado con ❤️ por **Jaterli**

🌐 [jaterli.com](https://www.jaterli.com)
