'use client';

import Image from 'next/image';
import Link from 'next/link';
import { addToCart, getCart } from '../utils/cart';
import { useState } from 'react';

interface PokemonCardProps {
  id: number;
  name: string;
  image: string;
}

export default function PokemonCard({ id, name, image }: PokemonCardProps) {
  const [cart, setCart] = useState<any[]>([]);

  const handleAddToCart = () => {
    const pokemon = { id, name, sprites: { other: { 'official-artwork': { front_default: image } } } };
    addToCart(pokemon);
    setCart(getCart());
    alert(`${name} agregado al carrito`);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
      <Link href={{ pathname: '/pokemon', query: { id } }}>
        <img src={image} alt={name} className="w-full h-32 object-contain" />
        <h3 className="text-lg font-semibold mt-2 text-black capitalize">{name}</h3>
        <p className="text-gray-500">Precio: $1500</p>
        <p className="text-blue-500 text-sm">Envío gratis</p>
      </Link>

      <button onClick={handleAddToCart} className="mt-4 p-2 rounded-md bg-blue-500 text-white">
        <Image src="/addCart.svg" alt="Agregar al carrito" width={24} height={24} />
      </button>
    </div>
  );
}
