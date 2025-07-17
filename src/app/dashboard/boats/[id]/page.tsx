'use client';

import React from 'react';
import {
  Wifi,
  Wind,
  Utensils,
  Music,
  ShieldCheck,
  Anchor,
  Star,
  CheckCircle2,
  MapPin,
} from 'lucide-react';
import { Boat, BoatFeature } from '@/types';
import { useParams } from 'next/navigation';

// Tipe data untuk properti kapal

// Mapping dari nama ikon di JSON ke komponen ikon dari lucide-react
const iconMap: Record<string, React.ElementType> = {
  wifi: Wifi,
  wind: Wind,
  utensils: Utensils,
  music: Music,
  shield: ShieldCheck,
  anchor: Anchor,
};

const BoatDetailPage: React.FC = () => {
  const params = useParams();
  const boatId = parseInt(params.id as string, 10);

  const [boatData, setBoatData] = React.useState<Boat | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchBoat = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/v1/boats/${boatId}`);
        if (!response.ok) {
          throw new Error(`Gagal mengambil data kapal: ${response.status}`);
        }
        console.log('Boat:', response);

        const data = await response.data.data.json();
        setBoatData(data);
      } catch (error: any) {
        setError(error.message || 'Terjadi kesalahan saat memuat data kapal.');
      } finally {
        setIsLoading(false);
      }
    };

    if (!isNaN(boatId)) {
      fetchBoat();
    }
  }, [boatId]);

  if (isLoading)
    return <div className='text-center py-12'>Memuat data kapal...</div>;
  if (error)
    return <div className='text-center py-12 text-red-600'>Error: {error}</div>;

  return <BoatDetail boatData={boatData!} />;
};

export default BoatDetailPage;

// Komponen untuk menampilkan detail kapal (dipindahkan dari halaman)
const BoatDetail: React.FC<{ boatData: Boat }> = ({ boatData }) => {
  const InfoSection: React.FC<{ title: string; children: React.ReactNode }> = ({
    title,
    children,
  }) => (
    <div className='py-8 border-b border-gray-200'>
      <h2 className='text-2xl font-bold text-gray-800 mb-4'>{title}</h2>
      {children}
    </div>
  );

  console.log('Data Kapal di Render:', boatData);

  // ... (bagian kode BoatDetail yang sudah ada, dari judul hingga detail pemesanan)

  return (
    <div className='bg-white font-sans'>
      <div className='container mx-auto px-4 py-8'>
        {/* Judul dan Rating */}
        <div className='mb-4'>
          <h1 className='text-4xl font-bold text-gray-900'>{boatData.name}</h1>
          <div className='flex items-center mt-2 text-gray-600'>
            <Star className='w-5 h-5 text-yellow-500 fill-current' />
            <span className='ml-1 font-bold text-gray-800'>
              {boatData.rating}
            </span>
            <span className='mx-2'>·</span>
            <span>{boatData.reviews} ulasan</span>
            <span className='mx-2'>·</span>
            <span className='font-semibold text-blue-600'>{boatData.type}</span>
          </div>
        </div>

        {/* Galeri Gambar */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-2 mb-8 h-[500px]'>
          {/* <div className='col-span-1 md:col-span-2 h-full'>
            <img
              src={boatData.gallery[0]}
              alt={boatData.name}
              className='w-full h-full object-cover rounded-lg'
            />
          </div> */}
          {/* Untuk simplisitas, kita hanya tampilkan satu gambar utama.
                Galeri yang lebih kompleks dapat dibuat di sini. */}
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-12'>
          {/* Kolom Kiri - Informasi Utama */}
          <div className='lg:col-span-2'>
            {/* Deskripsi Kapal */}
            <div className='pb-8 border-b border-gray-200'>
              <div className='flex justify-between items-start'>
                <div>
                  <h2 className='text-2xl font-bold text-gray-800'>
                    {boatData.type} dioperasikan oleh Kapten Ahli
                  </h2>
                  <div className='flex items-center text-gray-500 mt-2 space-x-4'>
                    <span>Kapasitas: {boatData.capacity} orang</span>
                    <span>·</span>
                    <span>Durasi: {boatData.duration}</span>
                  </div>
                </div>
                <img
                  src='/path/to/captain-avatar.png'
                  alt='Kapten'
                  className='w-16 h-16 rounded-full'
                />
              </div>
            </div>

            {/* Deskripsi */}
            <InfoSection title='Tentang Ocean Explorer'>
              <p className='text-gray-600 leading-relaxed'>
                {boatData.description}
              </p>
            </InfoSection>

            {/* Fasilitas */}
            <InfoSection title='Fasilitas yang Ditawarkan'>
              <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                {boatData.features.map((feature: BoatFeature) => {
                  const Icon = iconMap[feature.icon];
                  return (
                    <div
                      key={feature.name}
                      className='flex items-center space-x-3'
                    >
                      {Icon && <Icon className='w-6 h-6 text-blue-600' />}
                      <span className='text-gray-700'>{feature.name}</span>
                    </div>
                  );
                })}
              </div>
            </InfoSection>

            {/* Termasuk */}
            <InfoSection title='Harga Termasuk'>
              <ul className='space-y-3'>
                {boatData.includes.map((item: string) => (
                  <li key={item} className='flex items-center'>
                    <CheckCircle2 className='w-5 h-5 text-green-500 mr-3 flex-shrink-0' />
                    <span className='text-gray-700'>{item}</span>
                  </li>
                ))}
              </ul>
            </InfoSection>

            {/* Spesifikasi */}
            <InfoSection title='Spesifikasi Kapal'>
              <div className='grid grid-cols-2 gap-x-8 gap-y-4'>
                {Object.entries(boatData.specifications).map(([key, value]) => (
                  <div key={key} className='flex flex-col'>
                    <span className='font-semibold text-gray-800'>{key}</span>
                    <span className='text-gray-600'>{String(value)}</span>
                  </div>
                ))}
              </div>
            </InfoSection>

            {/* Destinasi */}
            <InfoSection title='Pilihan Destinasi'>
              <div className='flex flex-wrap gap-3'>
                {boatData.destinations.map((dest: string) => (
                  <div
                    key={dest}
                    className='flex items-center bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1.5 rounded-full'
                  >
                    <MapPin className='w-4 h-4 mr-2' />
                    {dest}
                  </div>
                ))}
              </div>
            </InfoSection>
          </div>

          {/* Kolom Kanan - Kartu Pemesanan */}
          <div className='lg:col-span-1'>
            <div className='sticky top-8 p-6 border border-gray-200 rounded-lg shadow-lg bg-white'>
              <div className='flex items-baseline mb-4'>
                <span className='text-3xl font-bold text-gray-900'>
                  {boatData.price}
                </span>
                <span className='ml-1 text-gray-600'>
                  / {boatData.duration}
                </span>
              </div>
              <div className='space-y-4'>
                <div className='border border-gray-300 rounded-lg p-3'>
                  <label
                    htmlFor='date'
                    className='block text-xs font-semibold text-gray-700'
                  >
                    TANGGAL
                  </label>
                  <input
                    type='date'
                    id='date'
                    className='w-full border-none p-0 focus:ring-0'
                    defaultValue={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className='border border-gray-300 rounded-lg p-3'>
                  <label
                    htmlFor='guests'
                    className='block text-xs font-semibold text-gray-700'
                  >
                    JUMLAH ORANG
                  </label>
                  <div className='flex justify-between items-center'>
                    <input
                      type='number'
                      id='guests'
                      defaultValue='2'
                      min='1'
                      max={boatData.capacity}
                      className='w-full border-none p-0 focus:ring-0'
                    />
                  </div>
                </div>
              </div>
              <button className='w-full mt-6 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition duration-300'>
                Pesan Sekarang
              </button>
              <p className='text-center text-sm text-gray-500 mt-4'>
                Anda tidak akan ditagih sekarang
              </p>

              <div className='mt-6 pt-4 border-t border-gray-200'>
                <div className='flex justify-between text-gray-700 mb-2'>
                  <span>{boatData.price} x 1 perjalanan</span>
                  <span>{boatData.price}</span>
                </div>
                <div className='flex justify-between text-gray-700 mb-2'>
                  <span>Biaya layanan</span>
                  <span>Rp 50.000</span>
                </div>
                <div className='flex justify-between font-bold text-gray-900 mt-4 pt-4 border-t border-gray-200'>
                  <span>Total</span>
                  <span>Rp 2.550.000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
