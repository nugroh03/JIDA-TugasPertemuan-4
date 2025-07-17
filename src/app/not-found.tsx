import Link from 'next/link';
import { Anchor } from 'lucide-react';

export default function NotFound() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='text-center'>
        <div className='flex justify-center mb-6'>
          <Anchor className='h-16 w-16 text-blue-700' />
        </div>
        <h1 className='text-4xl font-bold text-gray-900 mb-4'>404</h1>
        <h2 className='text-2xl font-semibold text-gray-700 mb-4'>
          Halaman Tidak Ditemukan
        </h2>
        <p className='text-gray-600 mb-8 max-w-md mx-auto'>
          Maaf, halaman yang Anda cari tidak dapat ditemukan. Mungkin halaman
          telah dipindahkan atau tidak tersedia.
        </p>
        <Link
          href='/'
          className='bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors inline-block'
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
