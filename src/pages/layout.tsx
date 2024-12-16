import type { Metadata } from 'next'
import { Geist, Geist_Mono, Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['900', '700', '400'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}
    >
      <Navbar />
      <div className="flex justify-center">
        <div className="flex flex-col w-[732px]">{children}</div>
      </div>
    </div>
  )
}
