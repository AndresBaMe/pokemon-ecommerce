'use client'
import Image from "next/image";
import Link from "next/link";
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; 

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Para manejar errores de login
  const router = useRouter(); 

  const handleSubmit = async (e: any) => {
    e.preventDefault();
  
    const user = { email, password };
  
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', user, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        // Guardar el token en localStorage
        localStorage.setItem('token', response.data.token);
  
        // Redirigir al home después del login
        setTimeout(() => {
          router.push('/'); // Redirige a la página de inicio
        }, 1000);
      } else {
        alert('No se encontró al usuario');
      }
    } catch (error) {
      console.error('No se encontró el usuario:', error);
      setErrorMessage('Error al intentar iniciar sesión. Por favor, inténtalo de nuevo.');
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#211C84] text-black px-4">
      <div
        style={{ boxShadow: "0px 0px 50px 9px #000" }}
        className="bg-white rounded-[20px] w-full max-w-md sm:w-96 md:w-[462px] h-auto sm:h-[500px] flex flex-col justify-center items-center p-6"
      >
        {/* Imagen responsiva */}
        <Image
          className="border-b-2 w-auto h-auto max-w-[180px]"
          src="/image 2.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <h1 className="text-3xl font-bold mt-4">Inicia Sesión</h1>

        {/* Mostrar mensaje de error si hay alguno */}
        {errorMessage && (
          <div className="text-red-500 mb-4 text-sm">{errorMessage}</div>
        )}

        <form className="mt-4 flex flex-col justify-center items-center w-full" onSubmit={handleSubmit}>
          <input
            type="email"  // Cambié el tipo de input a email
            placeholder="Correo Electrónico"
            className="border-b-3 border-b-[#3B4CCA] p-2 w-full max-w-[350px] rounded-md focus:outline-none"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="border-b-3 border-b-[#3B4CCA] p-2 w-full max-w-[350px] rounded-md mt-5 focus:outline-none"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <button className="font-bold px-4 mt-4 border-b-3 border-b-[#3B4CCA] p-2 w-full max-w-[350px] rounded-md hover:bg-[#3B4CCA] hover:text-white transition">
            Entrar
          </button>
          <p className="m-[10] text-sm">Crear una cuenta <Link style={{color: "blue"}} href={'/sign-up'}> click aquí. </Link></p>
        </form>
      </div>
    </div>
  );
}
