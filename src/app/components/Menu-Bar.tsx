'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface MenubarProps {
  onSearch: (value: string) => void;
}

export default function Menubar({ onSearch }: MenubarProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const pathname = usePathname(); // Obtiene el pathname actual con usePathname()

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    window.location.href = '/login'; // Cambia a la página de login
  };

  // Verificamos si estamos en la página del carrito
  const isCartPage = pathname === '/cart';

  return (
    <div className="bg-[#211C84] shadow-lg flex items-center justify-between h-[100px] px-6">
      <Link href="/">
        <div className="bg-white p-2 rounded-[10]">
          <Image src="/home.svg" alt="home icon" width={40} height={40} />
        </div>
      </Link>

      {/* Solo renderizamos el input de búsqueda si no estamos en la página de carrito */}
      {!isCartPage && (
        <div className="bg-white rounded-[10px] flex items-center px-4 py-1 w-[930px]">
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full text-black font-mono p-2 outline-none"
            onChange={(e) => onSearch(e.target.value.toLowerCase())}
          />
          <Image src="/searchIcon.svg" alt="search" width={30} height={30} />
        </div>
      )}

      <div className="flex gap-4 items-center">
        <Link href="/cart">
          <div className="bg-white p-2 rounded-[10]">
            <Image src="/cartIcon.svg" alt="cart" width={40} height={40} />
          </div>
        </Link>
        {isAuthenticated ? (
          <button onClick={handleLogout} className="bg-white p-2 rounded-[10]">
            <Image src="/logout.svg" alt="logout" width={40} height={40} />
          </button>
        ) : (
          <Link href="/login">
            <div className="bg-white p-2 rounded-[10]">
              <Image src="/iniciar_sesion.svg" alt="login" width={40} height={40} />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
