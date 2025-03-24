// src/utils/getTypeColor.ts

export const getTypeColor = (type: string) => {
    const typeColors: { [key: string]: string } = {
      fire: 'bg-red-500',
      water: 'bg-blue-500',
      grass: 'bg-green-500',
      electric: 'bg-yellow-500',
      bug: 'bg-lime-500',
      normal: 'bg-gray-500',
      poison: 'bg-purple-600',
      ground: 'bg-orange-500',
      fairy: 'bg-pink-400',
      fighting: 'bg-red-700',
      psychic: 'bg-purple-500',
      ice: 'bg-teal-300',
      dragon: 'bg-indigo-600',
      ghost: 'bg-indigo-500',
      steel: 'bg-gray-400',
      rock: 'bg-yellow-700',
      dark: 'bg-gray-800',
      unknown: 'bg-gray-600',
      shadow: 'bg-black',
    };
  
    return typeColors[type] || 'bg-gray-500'; // Default to gray if no match
  };
  