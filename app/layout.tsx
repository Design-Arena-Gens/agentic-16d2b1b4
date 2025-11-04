import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Care Agent - Your Personal Assistant',
  description: 'An AI-powered agent that can help with any need',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
