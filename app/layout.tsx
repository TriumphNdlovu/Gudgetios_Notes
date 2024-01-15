'use client'
import { GeistSans } from 'geist/font/sans'
import './globals.css'
import { Providers } from './providers'
import Myfooter from './components/myfooter'
import MenuComponent from './components/MenuComponent'
import LeftTab from './components/leftTab'
import { useState } from 'react'




export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <html lang="en" className='dark'>
      <body className="flex flex-col justify-between min-h-screen">
          <MenuComponent/>
        <div className={`transition-all duration-200 ${isOpen ? 'w-64' : 'w-16'}`}>
          <LeftTab setIsOpen={setIsOpen}/>
        </div>
        <div className={`transition-all duration-200 ${isOpen ? 'ml-64' : 'ml-16'}`}>
          <Providers>
            {children}
          </Providers>
        </div>
        <div className=''>
          <Myfooter/>
        </div>
      </body>
    </html>
  )
}
