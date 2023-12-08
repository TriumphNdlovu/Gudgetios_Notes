'use client'
import { GeistSans } from 'geist/font/sans'
import './globals.css'
import { Providers } from './providers'
import TopNavbar from './components/TopNavbar'
import MenuComponent from './components/MenuComponent'
import LeftTab from './components/leftTab'



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <html lang="en" className='dark'>
      <body className="bg-background text-foreground">
        <MenuComponent/>
        <LeftTab/>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>

  )
}
