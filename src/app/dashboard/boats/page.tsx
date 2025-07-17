'use client';

import React, { useState, useEffect } from 'react';
import {
  Ship,
  Loader2,
  ServerCrash,
  PlusCircle,
  Users,
  Anchor,
} from 'lucide-react';
import type { Boat } from '../../../types';
import BoatDetailModal from '@/components/dashboard/boatdetailmodal';
import Link from 'next/link';

export default function ManageBoatsPage() {
  const [boats, setBoats] = useState<Boat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBoat, setSelectedBoat] = useState<Boat | null>(null);

  const totalCapacity = boats.reduce((sum, boat) => sum + boat.capacity, 0);
  const uniqueCategories = [...new Set(boats.map((boat) => boat.category))]
    .length;

  useEffect(() => {
    const fetchBoats = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/v1/boats');
        if (!response.ok) {
          throw new Error('Gagal mengambil data kapal');
        }
        const result = await response.json();
        if (result.statusCode !== 200) {
          throw new Error(result.message || 'Terjadi kesalahan pada server');
        }
        setBoats(result.data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Terjadi kesalahan yang tidak diketahui'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBoats();
  }, []);

  return (
    <>
      <div className='p-4 md:p-8 bg-gray-50 min-h-screen'>
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8'>
          <div>
            <h1 className='text-3xl font-bold text-gray-800'>Kelola Kapal</h1>
            <p className='text-gray-600'>
              Tambah, edit, atau hapus data kapal dari armada Anda.
            </p>
          </div>
          <button className='mt-4 md:mt-0 flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg'>
            <PlusCircle className='h-5 w-5 mr-2' />
            Tambah Kapal
          </button>
        </div>

        {/* Stat Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
          <div className='bg-white p-6 rounded-lg shadow-md flex items-center'>
            <div className='bg-blue-100 p-3 rounded-full mr-4'>
              <Ship className='h-6 w-6 text-blue-600' />
            </div>
            <div>
              <p className='text-sm text-gray-500'>Total Kapal</p>
              <p className='text-2xl font-bold text-gray-800'>{boats.length}</p>
            </div>
          </div>
          <div className='bg-white p-6 rounded-lg shadow-md flex items-center'>
            <div className='bg-green-100 p-3 rounded-full mr-4'>
              <Users className='h-6 w-6 text-green-600' />
            </div>
            <div>
              <p className='text-sm text-gray-500'>Total Kapasitas</p>
              <p className='text-2xl font-bold text-gray-800'>
                {totalCapacity.toLocaleString()} Orang
              </p>
            </div>
          </div>
          <div className='bg-white p-6 rounded-lg shadow-md flex items-center'>
            <div className='bg-yellow-100 p-3 rounded-full mr-4'>
              <Anchor className='h-6 w-6 text-yellow-600' />
            </div>
            <div>
              <p className='text-sm text-gray-500'>Jumlah Kategori</p>
              <p className='text-2xl font-bold text-gray-800'>
                {uniqueCategories}
              </p>
            </div>
          </div>
        </div>

        {loading && (
          <div className='text-center py-12'>
            <Loader2 className='h-12 w-12 text-blue-700 mx-auto animate-spin' />
            <p className='mt-4 text-gray-600'>Memuat data kapal...</p>
          </div>
        )}

        {error && (
          <div className='bg-red-50 border-l-4 border-red-400 p-4 text-center'>
            <ServerCrash className='h-8 w-8 text-red-600 mx-auto mb-2' />
            <p className='font-bold text-red-800'>Terjadi Kesalahan</p>
            <p className='text-red-700'>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {boats.map((boat) => (
              <div
                key={boat.id}
                className='bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col'
              >
                <div className='p-6 flex-grow'>
                  <div className='flex items-center mb-4'>
                    <div className='bg-gray-100 p-2 rounded-full mr-3'>
                      <Ship className='w-5 h-5 text-gray-600' />
                    </div>
                    <h3 className='font-bold text-lg text-gray-800 truncate'>
                      {boat.name}
                    </h3>
                  </div>
                  <div className='text-sm text-gray-600 space-y-2'>
                    <p>
                      <span className='font-semibold'>Tipe:</span> {boat.type}
                    </p>
                    <p>
                      <span className='font-semibold'>Kategori:</span>{' '}
                      <span className='capitalize'>{boat.category}</span>
                    </p>
                    <p>
                      <span className='font-semibold'>Kapasitas:</span>{' '}
                      {boat.capacity} orang
                    </p>
                  </div>
                </div>
                <div className='bg-gray-50 px-6 py-3 border-t border-gray-200'>
                  <Link href={`/dashboard/boats/${boat.id}`}>
                    <div className='w-full text-center text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors'>
                      Lihat Detail
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
