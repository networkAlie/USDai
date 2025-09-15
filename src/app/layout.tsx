import type { Metadata } from 'next';
import type { Viewport } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'USD AI — UML Preview | Interactive Diagram Viewer',
  description: 'Professional interactive UML diagram viewer with zoom, export, and real-time rendering capabilities. Built for Alie Network.',
  keywords: 'UML, Mermaid, diagrams, interactive, viewer, AI, USD AI, Alie Network, visualization',
  authors: [{ name: 'Alie Network' }],
  creator: 'Alie Network',
  publisher: 'Alie Network',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'USD AI — UML Preview',
    description: 'Professional interactive UML diagram viewer with advanced features',
    type: 'website',
    locale: 'en_US',
    siteName: 'USD AI UML Preview',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'USD AI — UML Preview',
    description: 'Professional interactive UML diagram viewer',
    creator: '@alie_network',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#3b82f6" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}