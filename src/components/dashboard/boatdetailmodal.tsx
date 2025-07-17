'use client';

import React from 'react';
import Image from 'next/image';
import { X, Star, Users, DollarSign, Tag, Ship, Info } from 'lucide-react';
import type { Boat } from '../../types';

interface BoatDetailModalProps {
  boat: Boat | null;
  onClose: () => void;
}

const DetailRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) => (
  <div className='flex items-start py-2'>
    <div className='flex-shrink-0 w-6 text-gray-500'>{icon}</div>
    <div className='flex-grow'>
      <p className='text-sm font-medium text-gray-500'>{label}</p>
      <p className='text-md text-gray-900'>{value}</p>
    </div>
  </div>
);

export default function BoatDetailModal({
  boat,
  onClose,
}: BoatDetailModalProps) {
  if (!boat) return null;

  return (
    <div
      className='fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4'
      onClick={onClose}
    >
      <div
        className='bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='p-4 border-b flex justify-between items-center'>
          <h3 className='text-xl font-bold text-gray-900'>{boat.name}</h3>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-gray-600'
          >
            <X className='h-6 w-6' />
          </button>
        </div>

        <div className='flex-grow overflow-y-auto p-6'>
          <div className='relative h-64 w-full mb-6 rounded-lg overflow-hidden'>
            {/* <Image
              src={boat.imageUrl}
              alt={boat.name}
              fill
              className='object-cover'
            /> */}
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4'>
            <DetailRow
              icon={<Ship size={18} />}
              label='Tipe Kapal'
              value={boat.type}
            />
            <DetailRow
              icon={<Tag size={18} />}
              label='Kategori'
              value={<span className='capitalize'>{boat.category}</span>}
            />
            <DetailRow
              icon={<Users size={18} />}
              label='Kapasitas'
              value={`${boat.capacity} orang`}
            />
            <DetailRow
              icon={<DollarSign size={18} />}
              label='Harga per Hari'
              //   value={`Rp ${boat.price.toLocaleString('id-ID')}`}
              value={`Rp 1`}
            />
            <DetailRow
              icon={<Star size={18} />}
              label='Rating'
              value={
                <div className='flex items-center'>
                  <span className='mr-1'>{boat.rating}</span>
                  <Star className='h-4 w-4 text-yellow-400 fill-current' />
                </div>
              }
            />
          </div>

          <div className='mt-6'>
            <DetailRow
              icon={<Info size={18} />}
              label='Deskripsi'
              value={
                <p className='text-gray-700 leading-relaxed'>
                  {boat.description}
                </p>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
