
'use client'

import Image from 'next/image'
export default function Menubar(){
    const handleClick=()=>{
        alert('Hola')
    }
    return (
        <div style={{ boxShadow: "0px 0px 25px 1px #000" }} className=" bg-[#211C84] rounded-b-[10] flex w-auto h-[100px] p-[16px_30px] justify-between items-center flex-shrink-0">
            <div className='bg-[#ffff] rounded-[10] flex items-center'>
                <input type="text" placeholder="Buscar..." className="font-bold font-mono text-black placeholder-black w-[930] h-[30] p-[10] focus:outline-none"/>
                    <Image
                          className="border-b-2 cursor-pointer"
                          src="/searchIcon.svg"
                          alt="Shoping cart icon"
                          width={40}
                          height={40}
                          priority
                    />
            </div>
            <select className='font-mono bg-white text-black rounded-[10] p-[5]'>
                <option value="option1">option1</option>
                <option value="option2">option2</option>
                <option value="option3">option3</option>
            </select>
            <button className='bg-white rounded-[10] p-[5] cursor-pointer' onClick={handleClick}>
                   <Image
                          className="border-b-2 w-auto h-auto max-w-[180px]"
                          src="/cartIcon.svg"
                          alt="Shoping cart icon"
                          width={61}
                          height={61}
                          priority
                        />
            </button>
        </div>
    )
}