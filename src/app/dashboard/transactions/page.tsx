'use client';

import { CreditCard } from 'lucide-react';

export default function TransactionsPage() {
  return (
    <div className='p-8'>
      <div className='mb-8'>
        <h2 className='text-2xl font-bold text-gray-900 mb-2'>
          Manajemen Transaksi
        </h2>
        <p className='text-gray-600'>Lihat dan kelola semua transaksi.</p>
      </div>
      <div className='bg-white rounded-lg shadow-sm p-8 text-center'>
        <CreditCard className='h-12 w-12 text-gray-400 mx-auto mb-4' />
        <h3 className='text-xl font-semibold text-gray-800'>
          Halaman Transaksi
        </h3>
        <p className='text-gray-500 mt-2'>
          Fungsionalitas untuk halaman ini akan segera hadir.
        </p>
      </div>
    </div>
  );
}
