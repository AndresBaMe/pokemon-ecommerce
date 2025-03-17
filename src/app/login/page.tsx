import Image from "next/image"
export default function login(){
    return(
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#211C84] text-black ">
                <div style={{ boxShadow: '0px 0px 50px 9px #000' }} className="bg-white rounded-[20] w-[462] h-[500] flex flex-col justify-center items-center ">
                <Image
                          className="border-b-2"
                          src="/image 2.svg"
                          alt="Next.js logo"
                          width={180}
                          height={38}
                          priority
                        />
                <h1 className="text-3x1 font-bold ">Inicias Sesion</h1>
                <form className="mt-4 flex flex-col justify-center items-center">
                    <input type="text"placeholder="Usuario" className="border-b-3 border-b-[#3B4CCA]  p-2 w-full rounded-[5]  focus:outline-none " />
                    <input type="password" placeholder="Contraseña" className="border-b-3 border-b-[#3B4CCA]  p-2 w-full rounded-[5] m-5 focus:outline-none " />
                    <button className=" font-bold px-4 mt-4 border-b-3 border-b-[#3B4CCA]  p-2 w-full rounded-[5] hover:bg-[#3B4CCA]">Entrar</button>
                </form>
                </div>
            </div>
    )
}