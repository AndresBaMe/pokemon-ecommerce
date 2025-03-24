import { useEffect, useState } from 'react';

interface SimplePokemon {
  name: string;
  url: string;
}

export default function useAllPokemonNames() {
  const [allPokemons, setAllPokemons] = useState<SimplePokemon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllPokemonNames = async () => {
      try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10000');
        const data = await res.json();
        setAllPokemons(data.results);
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPokemonNames();
  }, []);

  return { allPokemons, loading };
}
