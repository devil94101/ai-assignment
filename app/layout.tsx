
import { Inter } from 'next/font/google'
import './globals.css'
import { ReactNode } from 'react';
import LayoutComp from '../components/common/layout/layout'

const fontHeading = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
})

const fontBody = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
})

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body 
        className={`
          'antialiased',
          ${fontHeading.variable},
          ${fontBody.variable}
        `}
      >
        <LayoutComp>
          {children}
        </LayoutComp>
      </body>
    </html>
  )
}