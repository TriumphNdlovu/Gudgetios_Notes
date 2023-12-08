
import { GeistSans } from 'geist/font/sans'
import './globals.css'
import { Providers } from './providers'



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <html lang="en" className='dark'>
      <body className="bg-background text-foreground">
        fghftyftyftyftyfytfytf
        <Providers>
          {children}
        </Providers>
      </body>
    </html>

  )
}
