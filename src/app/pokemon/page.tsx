'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getTypeColor } from '../utils/getTyoeColor';
import Menubar from '../components/Menu-Bar';
import Cookies from 'js-cookie';
import Image from 'next/image';

interface PokemonData {
  id: number;
  name: string;
  types: { type: { name: string } }[];
  height: number;
  weight: number;
  abilities: { ability: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  sprites: { other: { 'official-artwork': { front_default: string } } };
}

export default function PokemonDetail() {
  const searchParams = useSearchParams();
  const pokeParams = searchParams.get('id'); // Obtiene el ID desde los parámetros de búsqueda
  const [data, setData] = useState<PokemonData | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (pokeParams) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokeParams.toLowerCase()}`)
        .then((res) => res.json())
        .then(setData)
        .catch(console.error);
    }
  }, [pokeParams]);

  if (!data) return <div className="p-4 text-center">Cargando...</div>;

  const attack = data.stats.find((stat) => stat.stat.name === 'attack')?.base_stat;
  const defense = data.stats.find((stat) => stat.stat.name === 'defense')?.base_stat;

  // Función para agregar al carrito
  const addToCart = () => {
    // Obtener el carrito actual desde las cookies
    const cart = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')!) : [];

    // Verificar si el Pokémon ya está en el carrito
    const existingProductIndex = cart.findIndex((item: any) => item.id === data.id);

    if (existingProductIndex !== -1) {
      // Si ya existe, actualizar la cantidad
      cart[existingProductIndex].quantity += quantity;
    } else {
      // Si no existe, agregar un nuevo producto al carrito
      cart.push({
        id: data.id,
        name: data.name,
        image: data.sprites.other['official-artwork'].front_default,
        price: 1500, // Precio ficticio para el producto
        quantity: quantity,
      });
    }

    // Guardar el carrito actualizado en las cookies (expira en 7 días)
    Cookies.set('cart', JSON.stringify(cart), { expires: 7 });

    // Feedback al usuario (opcional)
    alert(`${data.name} ha sido agregado al carrito.`);
  };

  return (
    <div>
      <Menubar onSearch={function (value: string): void {
        throw new Error('Function not implemented.');
      } } />
      <div className="bg-white min-h-screen p-6 flex justify-center items-center">
        <div className="flex flex-col md:flex-row gap-8 shadow-xl border p-6 rounded-lg max-w-4xl bg-white">
          {/* Imagen del Pokémon */}
          <Image
  src={data.sprites.other['official-artwork'].front_default}
  alt={data.name}
  width={256} // Usando 64 * 4 para adaptarse al tamaño w-64 h-64
  height={256} // Usando 64 * 4 para adaptarse al tamaño w-64 h-64
  className="w-64 h-64 object-contain mx-auto md:mx-0"
/>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2 capitalize text-black">{data.name}</h1>
            <p className="text-lg font-semibold mb-2 text-black">${1500}</p>
            <p className="text-green-600 font-medium mb-4">✅ En stock - Entrega en 2-3 días</p>

            <div className="mb-4">
              <span className="font-semibold text-black">Tipo: </span>
              {data.types.map(({ type }) => (
                <span
                  key={type.name}
                  className={`text-white px-2 py-1 rounded-full text-sm mr-2 ${getTypeColor(type.name)}`}
                >
                  {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
                </span>
              ))}
            </div>

            <p className="text-black">
              <span className="font-semibold">Altura: </span>{data.height / 10} m
            </p>
            <p className="text-black">
              <span className="font-semibold">Peso: </span>{data.weight / 10} kg
            </p>
            <p className="text-black">
              <span className="font-semibold">Habilidad: </span>{data.abilities[0].ability.name}
            </p>
            <p className="mt-2 text-black">
              <span className="font-semibold">Estadísticas:</span> Ataque {attack} | Defensa {defense}
            </p>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center">
                <label className="font-medium mr-2 text-black">Cantidad:</label>
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-16 border rounded px-2 py-1 mr-4"
                />
              </div>
              <button
                onClick={addToCart}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
