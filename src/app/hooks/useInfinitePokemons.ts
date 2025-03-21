// hooks/useInfinitePokemons.ts
import { useState, useEffect } from 'react';

export default function useInfinitePokemons() {
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);

  // Función para cargar los Pokémon desde la API
  const fetchPokemons = async () => {
    setLoading(true);
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=40&offset=${offset}`);
    const data = await response.json();
    const newPokemons = await Promise.all(
      data.results.map(async (pokemon: any) => {
        const pokemonDetails = await fetch(pokemon.url);
        return pokemonDetails.json();
      })
    );
    setPokemons((prevPokemons) => [...prevPokemons, ...newPokemons]);
    setLoading(false);
  };

  // Detectar el scroll para cargar más Pokémon
  const handleScroll = () => {
    const bottom = window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight;
    if (bottom && !loading) {
      setOffset(offset + 40); // Actualizar el offset para cargar los siguientes 40 Pokémon
    }
  };

  useEffect(() => {
    fetchPokemons(); // Cargar Pokémon al montar el componente
  }, [offset]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll); // Escuchar el evento de scroll
    return () => window.removeEventListener('scroll', handleScroll); // Limpiar el evento cuando el componente se desmonte
  }, [loading]);

  return { pokemons, loading };
}
