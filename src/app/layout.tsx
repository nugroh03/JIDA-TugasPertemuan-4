import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/hooks/useAuth';
import LayoutClient from '@/components/layoutclient';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Marina Boat - Sewa Kapal Pancing dan Wisata',
  description:
    'Penyedia jasa sewa kapal pancing dan wisata terpercaya dengan pengalaman lebih dari 10 tahun. Nikmati pengalaman berlayar yang tak terlupakan di perairan Indonesia.',
  keywords: 'sewa kapal, kapal pancing, wisata laut, marina boat, indonesia',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='id'>
      <AuthProvider>
        <body className={inter.className}>
          <LayoutClient>{children}</LayoutClient>
        </body>
      </AuthProvider>
    </html>
  );
}
