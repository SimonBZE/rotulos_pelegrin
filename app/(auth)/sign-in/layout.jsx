import Image from 'next/image'
import '../../globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <main>
            <div className='flex flex-col items-center justify-center bg-black pt-20 px-5'>
                <Image src="./assets/Pelegrin_Design.svg" alt="Pelegrin Design" width={200} height={200} />
                <div className='rounded-full bg-white p-6 mt-10 -mb-16 shadow-md z-10'>
                    <Image className='w-28 h-28 object-contain' src="./assets/Logo.svg" alt="Pelegrin Design" width={200} height={200} />
                </div>
            </div>
            <svg className="-mt-12" width="100%" height="100" viewBox="0 0 500 80" preserveAspectRatio="none">
                <path d="M0,0 L0,40 Q250,90 500,40 L500,0 Z" fill="black" />
            </svg>
            {children}
        </main>
        </body>
    </html>
  )
}
