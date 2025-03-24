'use client';

import { useState } from 'react';
import Menubar from './components/Menu-Bar';
import PokemonGrid from './components/pokemon-Grid'; // Asegúrate que el nombre y ruta coincidan

export default function Home() {
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <div className="min-h-screen bg-[#ffff]">
      <Menubar onSearch={setSearchQuery} />
      <div className="container mx-auto p-4">
        <PokemonGrid searchQuery={searchQuery} />
      </div>
    </div>
  );
}
