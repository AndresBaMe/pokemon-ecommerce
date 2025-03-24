'use client';

import { useEffect, useState } from 'react';
import useInfinitePokemons from '../hooks/useInfinitePokemons';
import useAllPokemonNames from '../hooks/useAllPokemonNames';
import PokemonCard from './PokemonCard';

interface PokemonGridProps {
  searchQuery: string;
}

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

export default function PokemonGrid({ searchQuery }: PokemonGridProps) {
  const { pokemons, loading } = useInfinitePokemons();
  const { allPokemons } = useAllPokemonNames();
  const [searchResult, setSearchResult] = useState<{ id: number; name: string; sprite: string } | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      const match = allPokemons.find(p => p.name === searchQuery);
      if (match) {
        const id = Number(match.url.split('/')[6]);
        try {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
          const data = await res.json();
          const sprite = data.sprites.other['official-artwork'].front_default;
          setSearchResult({ id, name: data.name, sprite });
        } catch (err) {
          console.error('Error fetching searched Pokémon:', err);
        }
      } else {
        setSearchResult(null);
      }
    };

    if (searchQuery) {
      fetchPokemon();
    } else {
      setSearchResult(null);
    }
  }, [searchQuery, allPokemons]);

  const filteredPokemons = pokemons.filter((p: Pokemon) =>
    p.name.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {searchResult && !filteredPokemons.some(p => p.id === searchResult.id) && (
        <PokemonCard
          key={`search-${searchResult.id}`}
          id={searchResult.id}
          name={searchResult.name}
          image={searchResult.sprite}
        />
      )}

      {filteredPokemons.map((p: Pokemon, index: number) => (
        <PokemonCard
          key={`pokemon-${p.id}-${index}`}
          id={p.id}
          name={p.name}
          image={p.sprites.other['official-artwork'].front_default}
        />
      ))}

      {loading && <p className="col-span-full text-center">Cargando...</p>}
    </div>
  );
}
