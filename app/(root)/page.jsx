'use client'

import Image from 'next/image'
import Link from 'next/link'


const menu = [
  {
    nombre: 'Presupuesto',
    imagen: './assets/Presupuestos.svg',
    color: '#2fa7ff',
    link: '/presupuesto'
  },
{
    nombre: 'Nuevo Proyecto',
    imagen: './assets/Nuevo_proyecto.svg',
    color: '#6e5fff',
    link: '/nuevo-proyecto'
},
{
    nombre: 'Proyectos en curso',
    imagen: './assets/Proyectos-en-curso.svg',
    color: '#ff5f5f',
    link: '/en-curso'
},
{
    nombre: 'Calendario',
    imagen: './assets/Calendario.svg',
    color: '#16dae4',
    link: '/calendario'
},
{
    nombre: 'Stock',
    imagen: './assets/Stock.svg',
    color: '#cb83ff',
    link: '/stock-levels'
},
{
    nombre: 'Empleados',
    imagen: './assets/Empleados.svg',
    color: '#ffa008',
    link: '/empleados'
},
]

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center p-5">
     <Image src="./assets/pelegrin-design.svg" alt="Pelegrin Design" width={300} height={22} />
     <div className='grid grid-cols-3 gap-5 mt-10'>
      {menu.map( ({nombre, imagen, color, link}) => (
        <Link key={nombre} href={link}>        
          <div className='text-center'>
            <div className="p-7 rounded-3xl flex justify-center" style={{backgroundColor: color+"20"}}>
              <Image src={imagen} alt="presupuestos" width={100} height={100} className='w-10 h-10 sm:w-15 sm:h-15' />
            </div>
            <p className=' text-black mt-2 text-sm font-bold'>{nombre}</p>
          </div>
        </Link>        
      )
      )}
      
     </div>
    </main>
  )
}
