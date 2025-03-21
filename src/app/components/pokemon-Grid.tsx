'use client'

import Image from 'next/image';
import useInfinitePokemons from '../hooks/useInfinitePokemons';

export default function PokemonGrid() {
  const { pokemons, loading } = useInfinitePokemons();

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {pokemons.map((pokemon: any) => (
          <div
            key={pokemon.id}
            className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center"
          >
            <img
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={pokemon.name}
              className="w-full h-32 object-contain"
            />
            <h3 className="text-black text-lg font-semibold mt-2">{pokemon.name}</h3>
            <p className="text-gray-500">Precio: $1500</p>
            <p className="text-blue-500 text-sm">Envío gratis</p>
            <Image
                className="border-b-2 cursor-pointer"
                src="/addCart.svg"
                alt="Shoping cart icon"
                width={25}
                height={25}
                priority
            />
          </div>
        ))}
      </div>

      {loading && <p className="text-center mt-4">Cargando...</p>}
    </div>
  );
}
