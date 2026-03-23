import React from 'react'
import './styles.css'
import Link from 'next/link'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <>
        <nav>
          <Link href='/'>Home</Link>
          <Link href='/blog'>Blogs</Link>
        </nav>
        </>
        <main>{children}</main>
      </body>
    </html>
  )
}
