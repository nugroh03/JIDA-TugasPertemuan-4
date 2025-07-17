'use client';

import React, { useState, useEffect } from 'react';
import { Search, Anchor, Waves, Fish, Sun, Loader2 } from 'lucide-react';
import { sortBoats } from '../../lib/boats';
import type {
  BoatCategory,
  Boat,
  CapacityRange,
  SortOption,
  CategoryOption,
  SelectOption,
} from '../../types';
import BoatCard from '../../components/boatcard';
import Image from 'next/image';

export default function Boats() {
  const [boats, setBoats] = useState<Boat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<BoatCategory>('all');
  const [selectedCapacity, setSelectedCapacity] =
    useState<CapacityRange>('all');
  const [sortBy, setSortBy] = useState<SortOption>('name');

  useEffect(() => {
    const fetchBoats = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('/api/v1/boats');
        if (!res.ok) {
          throw new Error('Gagal memuat data kapal dari server.');
        }
        const apiResponse = await res.json();
        if (apiResponse.statusCode !== 200) {
          throw new Error(apiResponse.message || 'Gagal memuat data.');
        }
        setBoats(apiResponse.data);
      } catch (e) {
        setError(
          e instanceof Error
            ? e.message
            : 'Terjadi kesalahan yang tidak diketahui.'
        );
      } finally {
        setLoading(false);
      }
    };
    fetchBoats();
  }, []);

  const categories: CategoryOption[] = [
    {
      value: 'all',
      label: 'Semua Kapal',
      icon: <Anchor className='h-4 w-4' />,
    },
    {
      value: 'wisata',
      label: 'Kapal Wisata',
      icon: <Sun className='h-4 w-4' />,
    },
    {
      value: 'pancing',
      label: 'Kapal Pancing',
      icon: <Fish className='h-4 w-4' />,
    },
  ];

  const capacityRanges: SelectOption[] = [
    { value: 'all', label: 'Semua Kapasitas' },
    { value: 'small', label: '1-15 orang' },
    { value: 'medium', label: '16-25 orang' },
    { value: 'large', label: '26+ orang' },
  ];

  const sortOptions: SelectOption[] = [
    { value: 'name', label: 'Nama A-Z' },
    { value: 'price-low', label: 'Harga Terendah' },
    { value: 'price-high', label: 'Harga Tertinggi' },
    { value: 'rating', label: 'Rating Tertinggi' },
    { value: 'capacity', label: 'Kapasitas Terbesar' },
  ];

  // Filter and sort boats
  let filteredBoats = boats.filter((boat) => {
    const matchesSearch =
      boat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      boat.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || boat.category === selectedCategory;
    const matchesCapacity =
      selectedCapacity === 'all' ||
      (selectedCapacity === 'small' && boat.capacity <= 15) ||
      (selectedCapacity === 'medium' &&
        boat.capacity >= 16 &&
        boat.capacity <= 25) ||
      (selectedCapacity === 'large' && boat.capacity >= 26);

    return matchesSearch && matchesCategory && matchesCapacity;
  });

  filteredBoats = sortBoats(filteredBoats, sortBy);

  return (
    <div className='py-8'>
      {/* Hero Section */}
      <section className='relative bg-gradient-to-r from-blue-900 via-teal-800 to-blue-700 text-white'>
        <div className='absolute inset-0'>
          <Image
            src='https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=1920'
            alt='Fleet'
            fill
            className='object-cover opacity-30'
            priority
          />
        </div>
        <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
          <div className='text-center'>
            <div className='flex justify-center mb-6'>
              <Waves className='h-16 w-16 text-blue-300' />
            </div>
            <h1 className='text-4xl md:text-5xl font-bold mb-6'>
              Armada Kapal Kami
            </h1>
            <p className='text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto'>
              Pilih dari koleksi kapal terbaik kami untuk pengalaman berlayar
              yang tak terlupakan
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className='py-8 bg-white border-b'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-col lg:flex-row gap-6 items-center'>
            {/* Search */}
            <div className='relative flex-grow max-w-md'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
              <input
                type='text'
                placeholder='Cari kapal...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>

            {/* Category Filter */}
            <div className='flex gap-2'>
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() =>
                    setSelectedCategory(category.value as BoatCategory)
                  }
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category.value
                      ? 'bg-blue-700 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.icon}
                  <span>{category.label}</span>
                </button>
              ))}
            </div>

            {/* Capacity Filter */}
            <select
              value={selectedCapacity}
              onChange={(e) =>
                setSelectedCapacity(e.target.value as CapacityRange)
              }
              className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              {capacityRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Results Info */}
      <section className='py-4 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <p className='text-gray-600'>
            Menampilkan {filteredBoats.length} dari {boats.length} kapal
            {searchTerm && ` untuk "${searchTerm}"`}
          </p>
        </div>
      </section>

      {/* Boats Grid */}
      <section className='py-12 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          {loading ? (
            <div className='text-center py-12'>
              <Loader2 className='h-16 w-16 text-blue-700 mx-auto mb-4 animate-spin' />
              <h3 className='text-xl font-semibold text-gray-900'>
                Memuat data kapal...
              </h3>
            </div>
          ) : error ? (
            <div className='text-center py-12 bg-red-50 border border-red-200 rounded-lg'>
              <h3 className='text-xl font-semibold text-red-800 mb-2'>
                Terjadi Kesalahan
              </h3>
              <p className='text-red-600'>{error}</p>
            </div>
          ) : filteredBoats.length === 0 ? (
            <div className='text-center py-12'>
              <Anchor className='h-16 w-16 text-gray-400 mx-auto mb-4' />
              <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                Tidak ada kapal ditemukan
              </h3>
              <p className='text-gray-600 mb-4'>
                Coba ubah filter atau kata kunci pencarian Anda
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedCapacity('all');
                }}
                className='bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors'
              >
                Reset Filter
              </button>
            </div>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
              {filteredBoats.map((boat) => (
                <BoatCard key={boat.id} boat={boat} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-16 bg-blue-700 text-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>
            Tidak Menemukan Kapal yang Cocok?
          </h2>
          <p className='text-xl mb-8 text-blue-100'>
            Hubungi kami untuk konsultasi gratis dan rekomendasi kapal terbaik
            sesuai kebutuhan Anda
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <button className='bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors'>
              Konsultasi Gratis
            </button>
            <button className='border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors'>
              Hubungi WhatsApp
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
