'use client';

import { useState, useEffect } from 'react';

interface Pokemon {
  id: number;
  name: string;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
}

export default function useInfinitePokemons() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);

  const fetchPokemons = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=40&offset=${offset}`);
      const data = await response.json();

      const newPokemons = await Promise.all(
        data.results.map(async (pokemon: { url: string }) => {
          const pokemonDetails = await fetch(pokemon.url);
          return pokemonDetails.json();
        })
      );

      setPokemons((prevPokemons) => {
        const all = [...prevPokemons, ...newPokemons];
        const unique = Array.from(new Map(all.map((p: Pokemon) => [p.id, p])).values());
        return unique;
      });
    } catch (error) {
      console.error('Error al cargar Pokémon:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight;

    const reachedBottom = scrollTop + windowHeight >= fullHeight - 100;

    if (reachedBottom && !loading) {
      setOffset(prev => prev + 40);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, [offset, fetchPokemons]); // Agrega fetchPokemons y offset a las dependencias

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, handleScroll]); // Agrega handleScroll a las dependencias

  return { pokemons, loading };
}
