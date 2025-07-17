import React from 'react';
import Link from 'next/link';
import {
  Anchor,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className='bg-gray-900 text-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          <div className='col-span-1 md:col-span-2'>
            <div className='flex items-center space-x-2 mb-4'>
              <Anchor className='h-8 w-8 text-blue-400' />
              <span className='text-xl font-bold'>Marina Boat</span>
            </div>
            <p className='text-gray-400 mb-4'>
              Penyedia jasa sewa kapal pancing dan wisata terpercaya dengan
              pengalaman lebih dari 10 tahun. Kami menawarkan pengalaman
              berlayar yang tak terlupakan di perairan Indonesia.
            </p>
            <div className='flex space-x-4'>
              <Facebook className='h-6 w-6 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors' />
              <Instagram className='h-6 w-6 text-gray-400 hover:text-pink-400 cursor-pointer transition-colors' />
              <Twitter className='h-6 w-6 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors' />
            </div>
          </div>

          <div>
            <h3 className='text-lg font-semibold mb-4'>Layanan</h3>
            <ul className='space-y-2 text-gray-400'>
              <li>
                <Link
                  href='/boats'
                  className='hover:text-white transition-colors'
                >
                  Sewa Kapal Pancing
                </Link>
              </li>
              <li>
                <Link
                  href='/boats'
                  className='hover:text-white transition-colors'
                >
                  Wisata Laut
                </Link>
              </li>
              <li>
                <Link
                  href='/boats'
                  className='hover:text-white transition-colors'
                >
                  Diving & Snorkeling
                </Link>
              </li>
              <li>
                <Link
                  href='/boats'
                  className='hover:text-white transition-colors'
                >
                  Island Hopping
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className='text-lg font-semibold mb-4'>Kontak</h3>
            <div className='space-y-3 text-gray-400'>
              <div className='flex items-center space-x-2'>
                <Phone className='h-5 w-5' />
                <span>+62 812-3456-7890</span>
              </div>
              <div className='flex items-center space-x-2'>
                <Mail className='h-5 w-5' />
                <span>info@marinaboat.com</span>
              </div>
              <div className='flex items-center space-x-2'>
                <MapPin className='h-5 w-5' />
                <span>Jl. Pantai Indah No. 123, Bali</span>
              </div>
            </div>
          </div>
        </div>

        <div className='border-t border-gray-800 mt-8 pt-8 text-center text-gray-400'>
          <p>&copy; 2024 Marina Boat. Semua hak dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}
