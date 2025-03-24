'use client';
import { useEffect, useState } from 'react';
import { getCart, clearCart } from '../utils/cart';
import Menubar from '../components/Menu-Bar';

export default function Cart() {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const storedCart = getCart();
    setCart(storedCart);
  }, []);

  const handleRemove = (id: number) => {
    const updated = cart.filter(item => item.id !== id);
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
    document.cookie = `cart=${JSON.stringify(updated)}; path=/; max-age=604800`; // 7 días
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  if (cart.length === 0) {
    <>
     <Menubar/>
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-white min-h-screen">
      {/* Lista de productos */}
      <div className="flex-1 space-y-4">
        {cart.map((item) => (
          <div key={item.id} className="bg-white shadow-md rounded-lg flex items-center p-4 justify-between">
            <div className="flex items-center gap-4">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-contain " />
              <div>
                <h2 className="font-bold text-lg capitalize text-black">{item.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <label className='text-black'>Cantidad:</label>
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) => {
                      const newQty = parseInt(e.target.value);
                      const updatedCart = cart.map(p =>
                        p.id === item.id ? { ...p, quantity: newQty } : p
                      );
                      setCart(updatedCart);
                      localStorage.setItem('cart', JSON.stringify(updatedCart));
                      document.cookie = `cart=${JSON.stringify(updatedCart)}; path=/; max-age=604800`;
                    }}
                    className="w-16 border rounded px-2 py-1 text-black"
                  />
                  <span className="ml-4 font-semibold text-black">${item.price.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleRemove(item.id)}
              className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>

      {/* Resumen */}
      <div className="min-w-[220px] bg-white shadow-md rounded-lg p-4 h-fit text-black">
        <h2 className="text-lg font-semibold mb-2">Productos({totalItems})</h2>
        <p className="mb-4">Subtotal: <span className="font-semibold">${subtotal.toLocaleString()}</span></p>
        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Continuar compra
        </button>
      </div>
    </div>
    </>
  }

  return (
    <>
     <Menubar/>
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-white min-h-screen">
      {/* Lista de productos */}
      <div className="flex-1 space-y-4">
        {cart.map((item) => (
          <div key={item.id} className="bg-white shadow-md rounded-lg flex items-center p-4 justify-between">
            <div className="flex items-center gap-4">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-contain " />
              <div>
                <h2 className="font-bold text-lg capitalize text-black">{item.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <label className='text-black'>Cantidad:</label>
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) => {
                      const newQty = parseInt(e.target.value);
                      const updatedCart = cart.map(p =>
                        p.id === item.id ? { ...p, quantity: newQty } : p
                      );
                      setCart(updatedCart);
                      localStorage.setItem('cart', JSON.stringify(updatedCart));
                      document.cookie = `cart=${JSON.stringify(updatedCart)}; path=/; max-age=604800`;
                    }}
                    className="w-16 border rounded px-2 py-1 text-black"
                  />
                  <span className="ml-4 font-semibold text-black">${item.price.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleRemove(item.id)}
              className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>

      {/* Resumen */}
      <div className="min-w-[220px] bg-white shadow-md rounded-lg p-4 h-fit text-black">
        <h2 className="text-lg font-semibold mb-2">Productos({totalItems})</h2>
        <p className="mb-4">Subtotal: <span className="font-semibold">${subtotal.toLocaleString()}</span></p>
        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Continuar compra
        </button>
      </div>
    </div>
    </>
  );
}
