import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-200`}>
        {/* outer wrapper */}
        <div className="container mx-auto flex flex-col min-h-screen">
          <header className="h-24 border-b border-gray-600 flex justify-between items-center p-2 md:p-4 lg:p-6">
            <a className="text-xl font-medium hover:underline" href="#">
              LookUp
            </a>
            <nav className="">
              <ul className="flex gap-3">
                <li>
                  <a className='hover:underline' href="#">create</a>
                </li>
                <li>
                  <a className='hover:underline' href="#">find</a>
                </li>
                <li>
                  <a className='hover:underline' href="#">login</a>
                </li>
              </ul>
            </nav>
          </header>
          <section className="flex-grow p-2 md:p-4 lg:p-6">{children}</section>
          <footer className="h-24 border-t border-gray-600 flex justify-start items-center p-2 md:p-4 lg:p-6">
            <p className='text-sm hover:underline underline-offset-4'>all rights reserved 2024</p>
          </footer>
        </div>
      </body>
    </html>
  )
}
