import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Shield, Users } from 'lucide-react';
import { getFeaturedBoats } from '../lib/boats';
import type { Feature } from '../types';
import BoatCard from '../components/boatcard';

export default function Home() {
  const boats = getFeaturedBoats(3);

  const features: Feature[] = [
    {
      icon: <Shield className='h-8 w-8 text-blue-700' />,
      title: 'Keamanan Terjamin',
      description:
        'Semua kapal dilengkapi dengan peralatan keselamatan standar internasional',
    },
    {
      icon: <Users className='h-8 w-8 text-blue-700' />,
      title: 'Crew Berpengalaman',
      description:
        'Tim profesional dengan sertifikasi dan pengalaman lebih dari 10 tahun',
    },
    {
      icon: <Clock className='h-8 w-8 text-blue-700' />,
      title: 'Layanan 24/7',
      description:
        'Siap melayani Anda kapan saja dengan respons cepat dan pelayanan prima',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className='relative bg-gradient-to-r from-blue-900 to-blue-700 text-white'>
        <div className='absolute inset-0'>
          <Image
            src='/boats/ocean_explore.png'
            alt='Ocean'
            fill
            className='object-cover opacity-30'
            priority
          />
        </div>
        <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24'>
          <div className='text-center'>
            <h1 className='text-4xl md:text-6xl font-bold mb-6'>
              Jelajahi Keindahan Laut Indonesia
            </h1>
            <p className='text-xl md:text-2xl mb-8 text-blue-100'>
              Nikmati pengalaman berlayar yang tak terlupakan dengan armada
              kapal terbaik kami
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <button className='bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors'>
                Sewa Sekarang
              </button>
              <Link
                href='/boats'
                className='border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors inline-block text-center'
              >
                Lihat Katalog
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-16 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
              Mengapa Memilih Marina Boat?
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Kami berkomitmen memberikan pengalaman terbaik dengan standar
              keamanan tinggi dan pelayanan prima
            </p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {features.map((feature, index) => (
              <div
                key={index}
                className='text-center p-6 rounded-lg hover:shadow-lg transition-shadow'
              >
                <div className='flex justify-center mb-4'>{feature.icon}</div>
                <h3 className='text-xl font-semibold text-gray-900 mb-3'>
                  {feature.title}
                </h3>
                <p className='text-gray-600'>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Boats Section */}
      <section className='py-16 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
              Kapal Unggulan Kami
            </h2>
            <p className='text-xl text-gray-600'>
              Pilih dari berbagai jenis kapal yang sesuai dengan kebutuhan Anda
            </p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {boats.map((boat) => (
              <BoatCard key={boat.id} boat={boat} showFullDescription={false} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-16 bg-blue-700 text-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>
            Siap Untuk Petualangan Laut Anda?
          </h2>
          <p className='text-xl mb-8 text-blue-100'>
            Hubungi kami sekarang dan dapatkan penawaran terbaik untuk sewa
            kapal
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <button className='bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors'>
              Hubungi Kami
            </button>
            <Link
              href='/boats'
              className='border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors inline-block'
            >
              Lihat Semua Kapal
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
