import Image from "next/image";

export default function Login() {
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

        <form className="mt-4 flex flex-col justify-center items-center w-full">
          <input
            type="text"
            placeholder="Usuario"
            className="border-b-3 border-b-[#3B4CCA] p-2 w-full max-w-[350px] rounded-md focus:outline-none"
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="border-b-3 border-b-[#3B4CCA] p-2 w-full max-w-[350px] rounded-md mt-5 focus:outline-none"
          />
          <button className="font-bold px-4 mt-4 border-b-3 border-b-[#3B4CCA] p-2 w-full max-w-[350px] rounded-md hover:bg-[#3B4CCA] hover:text-white transition">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
