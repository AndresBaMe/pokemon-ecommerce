'use client'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Importamos useRouter de Next.js

export default function CreateUser() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter(); // Inicializamos useRouter

  // Función para manejar el envío del formulario
  const handleSubmit = async (e: any) => {
    e.preventDefault(); // Evitar que la página se recargue al enviar el formulario

    const user = { username, email, password };

    try {
      // Usar la URL completa del backend
      const response = await axios.post('https://ecommerce-backend-j9zm.onrender.com/api/users/register', user, {
        headers: {
          'Content-Type': 'application/json', // Para asegurar que la API reciba JSON
        },
      });

      if (response.status === 201) {
        setMessage('Usuario creado con éxito');
        // Redirigir al login después de crear el usuario
        setTimeout(() => {
          router.push('/login'); // Redirige a la página de login
        }, 1000); // Retrasa la redirección para mostrar el mensaje
      } else {
        setMessage('Error al crear el usuario');
      }
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      setMessage('Error al conectar con el servidor');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#211C84] text-black px-4">
      <div
        style={{ boxShadow: '0px 0px 50px 9px #000' }}
        className="bg-white rounded-[20px] w-full max-w-md sm:w-96 md:w-[462px] h-auto sm:h-[500px] flex flex-col justify-center items-center p-6"
      >
        <h1 className="text-3xl font-bold mt-4">Crear Cuenta</h1>
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col justify-center items-center w-full">
          <input
            type="text"
            placeholder="Nombre"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border-b-3 border-b-[#3B4CCA] p-2 w-full max-w-[350px] rounded-md focus:outline-none m-[20]"
          />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-b-3 border-b-[#3B4CCA] p-2 w-full max-w-[350px] rounded-md focus:outline-none m-[20]"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-b-3 border-b-[#3B4CCA] p-2 w-full max-w-[350px] rounded-md mt-5 focus:outline-none m-[20]"
          />
          <div className="flex flex-row space-x-4 flex-wrap justify-center w-full">
            <button
              type="submit"
              className="font-bold px-4 mt-4 border-b-3 border-b-[#3B4CCA] p-2 w-full max-w-[350px] rounded-md hover:bg-[#3B4CCA] hover:text-white transition"
            >
              Crear
            </button>
            <button
              type="button"
              className="font-bold px-4 mt-4 border-b-3 border-b-[#FF0000] p-2 w-full max-w-[350px] rounded-md hover:bg-[#FF0000] hover:text-white transition"
            >
              Cancelar
            </button>
          </div>
        </form>
        {message && <p className="mt-4 text-center">{message}</p>}
      </div>
    </div>
  );
}
