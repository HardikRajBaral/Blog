import React from 'react'
import './styles.css'
import Link from 'next/link'
import Image from 'next/image'
export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <div className='flex justify-around item-center px-8 py-4'>
          <Link href='/'><Image src="https://imgs.search.brave.com/K38Qx0t00_yfk_eYPBH3ayt2oSFmNm2ODF4y72uEugI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMzAv/OTE5LzYzNS9zbWFs/bC9ibG9nLWljb24t/ZGVzaWduLXZlY3Rv/ci5qcGc" alt="logo" width={50} height={50} className='rounded-full'/></Link>
          
            <h4 className='text-2xl font-bold'>My Blog Page</h4>
          <nav className='flex gap-4'>
            <Link href='/'className="hover:text-gray-500 transition">Home</Link>
            <Link href='/blog'className="hover:text-gray-500 transition">Blogs</Link>
            <Link href="/about" className="hover:text-gray-500 transition">About</Link>
            <Link href="/contact" className="hover:text-gray-500 transition">Contact</Link> 
          </nav>
          
        </div>
        <main>{children}</main>
      </body>
    </html>
  )
}
