import React from 'react';
import Image from 'next/image';
import {
  Users,
  Award,
  MapPin,
  Calendar,
  Star,
  Shield,
  Heart,
  Target,
  Eye,
  CheckCircle,
  Anchor,
  Waves,
  Sun,
} from 'lucide-react';

export const metadata = {
  title: 'Tentang Kami - Marina Boat',
  description:
    'Pelajari lebih lanjut tentang Marina Boat, penyedia jasa sewa kapal pancing dan wisata terpercaya dengan pengalaman lebih dari 10 tahun.',
};

export default function About() {
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

  const milestones = [
    {
      year: '2014',
      title: 'Berdirinya Marina Boat',
      description:
        'Memulai usaha dengan 1 kapal kecil dan visi besar untuk melayani wisata laut Indonesia',
    },
    {
      year: '2016',
      title: 'Ekspansi Armada',
      description:
        'Menambah 5 kapal baru dengan berbagai ukuran untuk memenuhi kebutuhan pelanggan',
    },
    {
      year: '2018',
      title: 'Sertifikasi Internasional',
      description:
        'Mendapat sertifikasi keselamatan internasional dan bergabung dengan asosiasi wisata bahari',
    },
    {
      year: '2020',
      title: 'Digital Transformation',
      description:
        'Meluncurkan platform online dan sistem booking digital untuk kemudahan pelanggan',
    },
    {
      year: '2022',
      title: 'Penghargaan Terbaik',
      description:
        'Meraih penghargaan "Best Marine Tourism Provider" dari Kementerian Pariwisata',
    },
    {
      year: '2024',
      title: 'Armada Premium',
      description:
        'Memiliki 15 kapal modern dengan fasilitas premium dan teknologi navigasi terkini',
    },
  ];

  const values = [
    {
      icon: <Shield className='h-12 w-12 text-blue-600' />,
      title: 'Keamanan Utama',
      description:
        'Keselamatan pelanggan adalah prioritas utama dengan peralatan standar internasional dan crew bersertifikat.',
    },
    {
      icon: <Heart className='h-12 w-12 text-red-500' />,
      title: 'Pelayanan Tulus',
      description:
        'Melayani dengan hati dan memberikan pengalaman terbaik untuk setiap perjalanan laut Anda.',
    },
    {
      icon: <Star className='h-12 w-12 text-yellow-500' />,
      title: 'Kualitas Premium',
      description:
        'Memberikan pelayanan berkualitas tinggi dengan armada kapal yang terawat dan fasilitas modern.',
    },
    {
      icon: <Waves className='h-12 w-12 text-teal-500' />,
      title: 'Cinta Laut',
      description:
        'Berkomitmen menjaga kelestarian laut dan memberikan edukasi tentang konservasi maritim.',
    },
  ];

  const certifications = [
    'ISO 9001:2015 - Quality Management System',
    'SOLAS Certificate - Safety of Life at Sea',
    'Marine Insurance Coverage',
    'Tourism Business License',
    'Environmental Management Certification',
    'Crew Professional Certification',
  ];

  return (
    <div className='py-8'>
      {/* Hero Section */}
      <section className='relative bg-gradient-to-r from-blue-900 via-blue-800 to-teal-700 text-white'>
        <div className='absolute inset-0'>
          <Image
            src='https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=1920'
            alt='Marina'
            fill
            className='object-cover opacity-20'
            priority
          />
        </div>
        <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24'>
          <div className='text-center'>
            <div className='flex justify-center mb-6'>
              <Anchor className='h-16 w-16 text-blue-300' />
            </div>
            <h1 className='text-4xl md:text-6xl font-bold mb-6'>
              Tentang Marina Boat
            </h1>
            <p className='text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed'>
              Lebih dari sekedar penyedia jasa sewa kapal, kami adalah partner
              terpercaya untuk menjelajahi keindahan laut Indonesia dengan aman
              dan nyaman
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className='py-16 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
            {stats.map((stat, index) => (
              <div
                key={index}
                className='text-center group hover:transform hover:scale-105 transition-all duration-300'
              >
                <div className='flex justify-center mb-4 group-hover:text-blue-800 transition-colors'>
                  {stat.icon}
                </div>
                <div className='text-3xl md:text-4xl font-bold text-gray-900 mb-2'>
                  {stat.number}
                </div>
                <div className='text-gray-600 font-medium'>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className='py-16 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
            <div className='bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow'>
              <div className='flex items-center mb-6'>
                <Eye className='h-8 w-8 text-blue-700 mr-3' />
                <h3 className='text-2xl font-bold text-gray-900'>Visi Kami</h3>
              </div>
              <p className='text-gray-600 leading-relaxed text-lg'>
                Menjadi penyedia jasa wisata bahari terdepan di Indonesia yang
                memberikan pengalaman berlayar tak terlupakan sambil
                melestarikan keindahan laut untuk generasi mendatang.
              </p>
            </div>

            <div className='bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow'>
              <div className='flex items-center mb-6'>
                <Target className='h-8 w-8 text-blue-700 mr-3' />
                <h3 className='text-2xl font-bold text-gray-900'>Misi Kami</h3>
              </div>
              <ul className='space-y-3 text-gray-600'>
                <li className='flex items-start'>
                  <CheckCircle className='h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0' />
                  <span>
                    Memberikan pelayanan wisata bahari berkualitas tinggi dengan
                    standar keamanan internasional
                  </span>
                </li>
                <li className='flex items-start'>
                  <CheckCircle className='h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0' />
                  <span>
                    Mempromosikan keindahan laut Indonesia kepada wisatawan
                    domestik dan mancanegara
                  </span>
                </li>
                <li className='flex items-start'>
                  <CheckCircle className='h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0' />
                  <span>
                    Berkontribusi dalam pelestarian lingkungan laut melalui
                    praktik wisata berkelanjutan
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className='py-16 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
              Perjalanan Kami
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Dari mimpi sederhana hingga menjadi pemimpin industri wisata
              bahari Indonesia
            </p>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16'>
            <div>
              <h3 className='text-2xl font-bold text-gray-900 mb-6'>
                Cerita Kami
              </h3>
              <div className='space-y-4 text-gray-600 leading-relaxed'>
                <p>
                  Marina Boat lahir dari kecintaan mendalam terhadap laut
                  Indonesia. Didirikan pada tahun 2014 oleh sekelompok pelaut
                  berpengalaman yang memiliki visi untuk memperkenalkan
                  keindahan laut Nusantara kepada dunia.
                </p>
                <p>
                  Berawal dari satu kapal sederhana, kami terus berkembang
                  dengan komitmen pada keamanan, kenyamanan, dan kepuasan
                  pelanggan. Setiap perjalanan yang kami layani adalah
                  kesempatan untuk menciptakan kenangan indah dan mempererat
                  hubungan manusia dengan laut.
                </p>
                <p>
                  Hari ini, dengan armada 15 kapal modern dan tim profesional
                  berpengalaman, kami bangga telah melayani ribuan pelanggan
                  dari berbagai negara, semuanya dengan satu tujuan: memberikan
                  pengalaman berlayar terbaik di Indonesia.
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
              <div className='relative h-32 rounded-lg overflow-hidden shadow-lg'>
                <Image
                  src='/boats/family_cruiser.png'
                  alt='Marina'
                  fill
                  className='object-cover'
                />
              </div>
              <div className='relative h-32 rounded-lg overflow-hidden shadow-lg mt-8'>
                <Image
                  src='/boats/sunset_cruiser.png'
                  alt='Sunset'
                  fill
                  className='object-cover'
                />
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className='mb-16'>
            <h3 className='text-2xl font-bold text-gray-900 mb-8 text-center'>
              Milestone Perjalanan
            </h3>
            <div className='space-y-8'>
              {milestones.map((milestone, index) => (
                <div key={index} className='flex items-start space-x-4 group'>
                  <div className='flex-shrink-0'>
                    <div className='w-12 h-12 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold group-hover:bg-blue-800 transition-colors'>
                      {milestone.year.slice(-2)}
                    </div>
                  </div>
                  <div className='flex-grow'>
                    <div className='bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow'>
                      <div className='flex items-center mb-2'>
                        <span className='text-sm font-semibold text-blue-700 bg-blue-100 px-2 py-1 rounded'>
                          {milestone.year}
                        </span>
                      </div>
                      <h4 className='text-lg font-semibold text-gray-900 mb-2'>
                        {milestone.title}
                      </h4>
                      <p className='text-gray-600'>{milestone.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className='py-16 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
              Nilai-Nilai Kami
            </h2>
            <p className='text-xl text-gray-600'>
              Prinsip yang memandu setiap langkah perjalanan kami
            </p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {values.map((value, index) => (
              <div
                key={index}
                className='bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-2 text-center'
              >
                <div className='flex justify-center mb-4'>{value.icon}</div>
                <h3 className='text-xl font-semibold text-gray-900 mb-3'>
                  {value.title}
                </h3>
                <p className='text-gray-600 leading-relaxed'>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className='py-16 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
              Sertifikasi & Penghargaan
            </h2>
            <p className='text-xl text-gray-600'>
              Komitmen kami pada standar kualitas dan keamanan internasional
            </p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {certifications.map((cert, index) => (
              <div
                key={index}
                className='flex items-center space-x-3 bg-gray-50 p-4 rounded-lg hover:bg-blue-50 transition-colors'
              >
                <Award className='h-6 w-6 text-blue-700 flex-shrink-0' />
                <span className='text-gray-700 font-medium'>{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-16 bg-gradient-to-r from-blue-700 to-teal-600 text-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <div className='flex justify-center mb-6'>
            <Sun className='h-12 w-12 text-yellow-300' />
          </div>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>
            Bergabunglah Dengan Petualangan Kami
          </h2>
          <p className='text-xl mb-8 text-blue-100 max-w-3xl mx-auto'>
            Mari bersama-sama menjelajahi keindahan laut Indonesia dan ciptakan
            kenangan yang akan terukir selamanya
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <button className='bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors'>
              Mulai Petualangan
            </button>
            <button className='border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors'>
              Hubungi Kami
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
