'use client';

import Image from 'next/image';
import Link from 'next/link';
import { addToCart } from '../utils/cart';

interface PokemonCardProps {
  id: number;
  name: string;
  image: string;
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

export default function PokemonCard({ id, name, image }: PokemonCardProps) {
  const handleAddToCart = () => {
    const pokemon: Pokemon = { 
      id, 
      name, 
      sprites: { 
        other: { 
          'official-artwork': { front_default: image } 
        } 
      } 
    };
    addToCart(pokemon);
    alert(`${name} agregado al carrito`);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
      <Link href={{ pathname: '/pokemon', query: { id } }}>
        <Image 
          src={image}
          alt={name}
          width={500}
          height={128}
          className="w-full h-32 object-contain w-auto h-auto"
        />
        <h3 className="text-lg font-semibold mt-2 text-black capitalize">{name}</h3>
        <p className="text-gray-500">Precio: $1500</p>
        <p className="text-blue-500 text-sm">Envío gratis</p>
      </Link>

      <button onClick={handleAddToCart} className="mt-4 p-2 rounded-md bg-blue-500 text-white">
        <Image src="/addCart.svg" alt="Agregar al carrito" width={24} height={24} className='h-auto w-auto'/>
      </button>
    </div>
  );
}
