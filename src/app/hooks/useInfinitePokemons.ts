// hooks/useInfinitePokemons.ts
import { useState, useEffect } from 'react';

export default function useInfinitePokemons() {
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);

  // Función para cargar los Pokémon desde la API
  const fetchPokemons = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=40&offset=${offset}`);
      const data = await response.json();

      const newPokemons = await Promise.all(
        data.results.map(async (pokemon: any) => {
          const pokemonDetails = await fetch(pokemon.url);
          return pokemonDetails.json();
        })
      );

      // Eliminar duplicados por ID
      setPokemons((prevPokemons) => {
        const all = [...prevPokemons, ...newPokemons];
        const unique = Array.from(new Map(all.map(p => [p.id, p])).values());
        return unique;
      });
    } catch (error) {
      console.error('Error al cargar Pokémon:', error);
    } finally {
      setLoading(false);
    }
  };

  // Detectar el scroll para cargar más Pokémon
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight;

    const reachedBottom = scrollTop + windowHeight >= fullHeight - 100; // 100px antes del final

    if (reachedBottom && !loading) {
      setOffset(prev => prev + 40);
    }
  };

  useEffect(() => {
    fetchPokemons(); // Cargar Pokémon al montar el componente o cambiar offset
  }, [offset]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]); // No dependas de offset aquí para evitar múltiples eventos

  return { pokemons, loading };
}
