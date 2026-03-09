import type { Country } from '../types/country';

// Clave que usaremos para identificar nuestros favoritos en el navegador
const FAVORITES_KEY = 'country_explorer_favorites';

/**
 * Obtiene la lista de países favoritos desde localStorage
 */
export function getFavorites(): Country[] {
  const data = localStorage.getItem(FAVORITES_KEY);
  // Si no hay nada, devolvemos un array vacío. Si hay algo, lo transformamos de texto a objeto.
  return data ? JSON.parse(data) : [];
}


/**
 * Guarda o elimina un país de la lista de favoritos
 */
export function toggleFavorite(country: Country): boolean {
  const favorites = getFavorites();
  
  // Buscamos si el país ya existe en favoritos usando su código único (cca3)
  const index = favorites.findIndex(fav => fav.cca3 === country.cca3);
  let isFavorite = false;

  if (index === -1) {
    // Si no existe, lo agregamos
    favorites.push(country);
    isFavorite = true;
  } else {
    // Si ya existe, lo quitamos
    favorites.splice(index, 1);
    isFavorite = false;
  }

  // Guardamos la lista actualizada convirtiéndola a texto (JSON)
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  
  return isFavorite;
}

/**
 * Revisa si un país específico es favorito
 */
export function isCountryFavorite(cca3: string): boolean {
  const favorites = getFavorites();
  return favorites.some(fav => fav.cca3 === cca3);
}

/**
 * Borra todos los favoritos de un golpe
 */
export function clearAllFavorites(): void {
  localStorage.removeItem(FAVORITES_KEY);
}