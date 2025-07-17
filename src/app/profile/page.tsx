import React from 'react';
import Image from 'next/image';
import { Users, Award, MapPin, Calendar, Star, Shield } from 'lucide-react';

export const metadata = {
  title: 'Profil - Marina Boat',
  description:
    'Profil lengkap Marina Boat dan tim profesional kami yang berpengalaman dalam industri wisata bahari.',
};

export default function Profile() {
  const stats = [
    {
      icon: <Users className='h-8 w-8 text-blue-700' />,
      number: '500+',
      label: 'Pelanggan Puas',
    },
    {
      icon: <Award className='h-8 w-8 text-blue-700' />,
      number: '10+',
      label: 'Tahun Pengalaman',
    },
    {
      icon: <MapPin className='h-8 w-8 text-blue-700' />,
      number: '15+',
      label: 'Destinasi Wisata',
    },
    {
      icon: <Calendar className='h-8 w-8 text-blue-700' />,
      number: '1000+',
      label: 'Trip Berhasil',
    },
  ];

  const team = [
    {
      name: 'Kapten Budi Santoso',
      role: 'Kapten Senior',
      experience: '15 tahun',
      image:
        'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Berpengalaman dalam navigasi laut dan keselamatan kapal',
    },
    {
      name: 'Joko Widodo',
      role: 'Pemandu Wisata',
      experience: '8 tahun',
      image:
        'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Ahli dalam spot pancing dan lokasi wisata terbaik',
    },
    {
      name: 'Sari Dewi',
      role: 'Customer Service',
      experience: '5 tahun',
      image:
        'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Melayani dengan ramah dan profesional',
    },
  ];

  return (
    <div className='py-8'>
      {/* Hero Section */}
      <section className='relative bg-gradient-to-r from-blue-900 to-teal-700 text-white'>
        <div className='absolute inset-0'>
          <Image
            src='https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=1920'
            alt='Marina'
            fill
            className='object-cover opacity-30'
            priority
          />
        </div>
        <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
          <div className='text-center'>
            <h1 className='text-4xl md:text-5xl font-bold mb-6'>
              Tentang Marina Boat
            </h1>
            <p className='text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto'>
              Penyedia jasa sewa kapal terpercaya dengan komitmen pada keamanan,
              kenyamanan, dan kepuasan pelanggan
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className='py-16 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
            {stats.map((stat, index) => (
              <div key={index} className='text-center'>
                <div className='flex justify-center mb-4'>{stat.icon}</div>
                <div className='text-3xl font-bold text-gray-900 mb-2'>
                  {stat.number}
                </div>
                <div className='text-gray-600'>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className='py-16 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <div>
              <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-6'>
                Cerita Kami
              </h2>
              <div className='space-y-4 text-gray-600'>
                <p>
                  Marina Boat didirikan pada tahun 2014 dengan visi menjadi
                  penyedia jasa sewa kapal terbaik di Indonesia. Berawal dari
                  satu kapal kecil, kini kami telah berkembang menjadi armada
                  yang terdiri dari 8 kapal dengan berbagai ukuran dan
                  spesifikasi.
                </p>
                <p>
                  Kami memahami bahwa setiap pelanggan memiliki kebutuhan yang
                  berbeda. Oleh karena itu, kami menawarkan berbagai paket
                  layanan mulai dari wisata keluarga, trip pancing, hingga acara
                  korporat. Semua dilakukan dengan standar keamanan yang tinggi
                  dan pelayanan yang ramah.
                </p>
                <p>
                  Komitmen kami adalah memberikan pengalaman berlayar yang tak
                  terlupakan sambil menjaga kelestarian lingkungan laut. Kami
                  bangga telah melayani lebih dari 500 pelanggan dengan tingkat
                  kepuasan 98%.
                </p>
              </div>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className='relative h-32 rounded-lg overflow-hidden shadow-lg'>
                <Image
                  src='/boats/fishing_master.png'
                  alt='Marina'
                  fill
                  className='object-cover'
                />
              </div>
              <div className='relative h-32 rounded-lg overflow-hidden shadow-lg mt-8'>
                <Image
                  src='/boats/luxury_yacht.png'
                  alt='Sunset'
                  fill
                  className='object-cover'
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className='py-16 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
              Tim Profesional Kami
            </h2>
            <p className='text-xl text-gray-600'>
              Didukung oleh tim berpengalaman dan bersertifikat internasional
            </p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {team.map((member, index) => (
              <div
                key={index}
                className='bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow'
              >
                <div className='relative w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden'>
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className='object-cover'
                  />
                </div>
                <h3 className='text-xl font-semibold text-gray-900 mb-1'>
                  {member.name}
                </h3>
                <p className='text-blue-700 font-medium mb-2'>{member.role}</p>
                <p className='text-gray-600 text-sm mb-3'>
                  Pengalaman: {member.experience}
                </p>
                <p className='text-gray-600 text-sm'>{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className='py-16 bg-blue-700 text-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl md:text-4xl font-bold mb-4'>
              Nilai-Nilai Kami
            </h2>
            <p className='text-xl text-blue-100'>
              Prinsip yang kami pegang teguh dalam setiap pelayanan
            </p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='text-center'>
              <Shield className='h-12 w-12 text-blue-300 mx-auto mb-4' />
              <h3 className='text-xl font-semibold mb-3'>Keamanan Utama</h3>
              <p className='text-blue-100'>
                Keselamatan pelanggan adalah prioritas utama dengan peralatan
                standar internasional
              </p>
            </div>
            <div className='text-center'>
              <Star className='h-12 w-12 text-blue-300 mx-auto mb-4' />
              <h3 className='text-xl font-semibold mb-3'>Kualitas Terbaik</h3>
              <p className='text-blue-100'>
                Memberikan pelayanan berkualitas tinggi dengan armada kapal yang
                terawat
              </p>
            </div>
            <div className='text-center'>
              <Users className='h-12 w-12 text-blue-300 mx-auto mb-4' />
              <h3 className='text-xl font-semibold mb-3'>Pelayanan Prima</h3>
              <p className='text-blue-100'>
                Tim profesional yang siap melayani dengan ramah dan responsif
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
