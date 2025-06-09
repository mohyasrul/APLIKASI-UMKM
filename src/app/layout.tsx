import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'UMKM Management - Aplikasi Manajemen Bisnis',
  description:
    'Aplikasi lengkap untuk manajemen UMKM dengan fitur POS, inventory, customer management, dan reporting',
  manifest: '/manifest.json',
  keywords: [
    'UMKM',
    'POS',
    'Point of Sale',
    'Inventory',
    'Customer Management',
    'Business Management',
  ],
  authors: [{ name: 'mohyasrul' }],
  creator: 'mohyasrul',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
