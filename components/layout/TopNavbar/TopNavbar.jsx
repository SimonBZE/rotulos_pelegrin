'use client'
import {useContext, useEffect} from 'react'
import Image from "next/image"
import { MenuContext } from '@/context/MenuContext'

export const TopNavbar = () => {
  const { isOpen, setIsOpen, closeMenu } = useContext(MenuContext);
  console.log(isOpen)
  return (
    <div className="flex justify-between bg-black text-white py-5 px-5 gap-3 fixed w-full z-30">
        {/* Menú hamburguesa */}
      <button onClick={setIsOpen(isOpen)} className="relative group md:hidden">
        <div className="relative flex overflow-hidden items-center justify-center rounded-xl w-[50px] h-[50px] transform transition-all bg-slate-800 ring-0 ring-gray-300 hover:ring-8 group-focus:ring-4 ring-opacity-30 duration-200 shadow-md">
          <div className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden">
            <div className="bg-white h-[2px] w-7 transform transition-all duration-300 origin-left group-focus:rotate-[42deg]"></div>
            <div className="bg-white h-[2px] w-1/2 rounded transform transition-all duration-300 group-focus:-translate-x-10"></div>
            <div className="bg-white h-[2px] w-7 transform transition-all duration-300 origin-left group-focus:-rotate-[42deg]"></div>
          </div>
        </div>
      </button>

      <Image src='./assets/logo-oraculo.svg' alt="Logo" width={200} height={100}/>
      
      <button className="relative group md:hidden">
        <div className="relative flex overflow-hidden items-center justify-center rounded-xl w-[50px] h-[50px] transform transition-all bg-slate-800 ring-0 ring-gray-300 hover:ring-8 group-focus:ring-4 ring-opacity-30 duration-200 shadow-md">
            <Image src="./assets/search-icon.svg" alt="Search" width={16} height={16} />
        </div>
      </button>

    </div>
  )
}
