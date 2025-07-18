'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Wifi,
  Wind,
  Utensils,
  Music,
  ShieldCheck,
  Anchor,
  Plus,
  Trash2,
  Save,
  ArrowLeft,
  Loader2,
  CheckCircle2,
} from 'lucide-react';

// Mapping ikon
const iconOptions = [
  { value: 'wifi', label: 'WiFi', icon: Wifi },
  { value: 'wind', label: 'AC', icon: Wind },
  { value: 'utensils', label: 'Makanan', icon: Utensils },
  { value: 'music', label: 'Musik', icon: Music },
  { value: 'shield', label: 'Keamanan', icon: ShieldCheck },
  { value: 'anchor', label: 'Jangkar', icon: Anchor },
];

export default function AddBoatPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    category: 'wisata',
    capacity: 1,
    duration: '',
    price: '',
    rating: 4.0,
    reviews: 0,
    description: '',
    image: '',
    gallery: [''],
    features: [{ name: '', icon: 'wifi' }],
    includes: [''],
    destinations: [''],
    specifications: {
      'Panjang': '',
      'Lebar': '',
      'Mesin': '',
      'Kecepatan': '',
      'Bahan Bakar': '',
      'Toilet': '',
    },
  });

  // Fungsi untuk mengekstrak angka dari format harga Indonesia
  const extractPriceNumber = (priceString: string): number => {
    const numbers = priceString.replace(/[^\d]/g, '');
    return numbers ? parseInt(numbers, 10) : 0;
  };

  // Handle input changes
  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSpecificationChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [key]: value,
      },
    }));
  };

  const handleArrayChange = (field: string, index: number, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].map((item: any, i: number) =>
        i === index ? value : item
      ),
    }));
  };

  const addArrayItem = (field: string, defaultValue: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field as keyof typeof prev], defaultValue],
    }));
  };

  const removeArrayItem = (field: string, index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].filter(
        (_: any, i: number) => i !== index
      ),
    }));
  };

  // Submit form untuk menambah kapal baru
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi field yang wajib diisi
    if (
      !formData.name.trim() ||
      !formData.type.trim() ||
      !formData.description.trim()
    ) {
      setError('Nama kapal, tipe, dan deskripsi wajib diisi.');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      setSuccessMessage(null);

      // Bersihkan data dan tambahkan priceNum
      const cleanedFormData = {
        ...formData,
        priceNum: extractPriceNumber(formData.price),
        gallery: formData.gallery.filter((url) => url.trim()),
        includes: formData.includes.filter((item) => item.trim()),
        destinations: formData.destinations.filter((dest) => dest.trim()),
        features: formData.features.filter((feature) => feature.name.trim()),
      };

      const response = await fetch('/api/v1/boats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cleanedFormData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `Gagal menambah kapal: ${response.status}`
        );
      }

      const result = await response.json();
      setSuccessMessage('Kapal baru berhasil ditambahkan!');

      // Redirect ke halaman manage boats setelah 2 detik
      setTimeout(() => {
        router.push('/dashboard/boats');
      }, 2000);
    } catch (error: any) {
      setError(error.message || 'Gagal menambah kapal baru.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='bg-gray-50 min-h-screen'>
      <div className='container mx-auto px-4 py-8'>
        {/* Header */}
        <div className='flex items-center justify-between mb-8'>
          <div className='flex items-center space-x-4'>
            <button
              onClick={() => router.back()}
              className='inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50'
            >
              <ArrowLeft className='w-4 h-4 mr-2' />
              Kembali
            </button>
            <h1 className='text-3xl font-bold text-gray-900'>
              Tambah Kapal Baru
            </h1>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className='mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg'>
            <div className='flex items-center'>
              <CheckCircle2 className='w-5 h-5 mr-2' />
              {successMessage}
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className='mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg'>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className='space-y-8'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* Kolom Kiri - Form Utama */}
            <div className='lg:col-span-2 space-y-6'>
              {/* Informasi Dasar */}
              <div className='bg-white rounded-lg shadow p-6'>
                <h2 className='text-xl font-semibold text-gray-900 mb-4'>
                  Informasi Dasar
                </h2>
                <div className='space-y-4'>
                  <div>
                    <label
                      htmlFor='name'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      Nama Kapal *
                    </label>
                    <input
                      type='text'
                      id='name'
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange('name', e.target.value)
                      }
                      className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                      placeholder='Masukkan nama kapal'
                      required
                    />
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <div>
                      <label
                        htmlFor='type'
                        className='block text-sm font-medium text-gray-700 mb-1'
                      >
                        Tipe Kapal *
                      </label>
                      <input
                        type='text'
                        id='type'
                        value={formData.type}
                        onChange={(e) =>
                          handleInputChange('type', e.target.value)
                        }
                        className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        placeholder='e.g., Yacht, Speedboat'
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor='category'
                        className='block text-sm font-medium text-gray-700 mb-1'
                      >
                        Kategori
                      </label>
                      <select
                        id='category'
                        value={formData.category}
                        onChange={(e) =>
                          handleInputChange('category', e.target.value)
                        }
                        className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                      >
                        <option value='wisata'>Wisata</option>
                        <option value='transportasi'>Transportasi</option>
                        <option value='nelayan'>Nelayan</option>
                        <option value='kargo'>Kargo</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor='capacity'
                        className='block text-sm font-medium text-gray-700 mb-1'
                      >
                        Kapasitas *
                      </label>
                      <input
                        type='number'
                        id='capacity'
                        value={formData.capacity}
                        onChange={(e) =>
                          handleInputChange(
                            'capacity',
                            parseInt(e.target.value)
                          )
                        }
                        className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        placeholder='Jumlah orang'
                        min='1'
                        required
                      />
                    </div>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <div>
                      <label
                        htmlFor='duration'
                        className='block text-sm font-medium text-gray-700 mb-1'
                      >
                        Durasi
                      </label>
                      <input
                        type='text'
                        id='duration'
                        value={formData.duration}
                        onChange={(e) =>
                          handleInputChange('duration', e.target.value)
                        }
                        className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        placeholder='e.g., 4 jam'
                      />
                    </div>

                    <div>
                      <label
                        htmlFor='price'
                        className='block text-sm font-medium text-gray-700 mb-1'
                      >
                        Harga
                      </label>
                      <input
                        type='text'
                        id='price'
                        value={formData.price}
                        onChange={(e) =>
                          handleInputChange('price', e.target.value)
                        }
                        className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        placeholder='e.g., Rp 2.500.000'
                      />
                    </div>

                    <div>
                      <label
                        htmlFor='rating'
                        className='block text-sm font-medium text-gray-700 mb-1'
                      >
                        Rating
                      </label>
                      <input
                        type='number'
                        step='0.1'
                        min='0'
                        max='5'
                        id='rating'
                        value={formData.rating}
                        onChange={(e) =>
                          handleInputChange(
                            'rating',
                            parseFloat(e.target.value)
                          )
                        }
                        className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        placeholder='0.0 - 5.0'
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor='description'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      Deskripsi *
                    </label>
                    <textarea
                      id='description'
                      value={formData.description}
                      onChange={(e) =>
                        handleInputChange('description', e.target.value)
                      }
                      rows={4}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                      placeholder='Deskripsikan kapal Anda...'
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor='image'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      Gambar Utama
                    </label>
                    <input
                      type='text'
                      id='image'
                      value={formData.image}
                      onChange={(e) =>
                        handleInputChange('image', e.target.value)
                      }
                      className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                      placeholder='URL atau path gambar utama'
                    />
                  </div>
                </div>
              </div>

              {/* Galeri Gambar */}
              <div className='bg-white rounded-lg shadow p-6'>
                <h2 className='text-xl font-semibold text-gray-900 mb-4'>
                  Galeri Gambar
                </h2>
                <div className='space-y-3'>
                  {formData.gallery.map((url, index) => (
                    <div key={index} className='flex gap-2'>
                      <input
                        type='text'
                        value={url}
                        onChange={(e) =>
                          handleArrayChange('gallery', index, e.target.value)
                        }
                        className='flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        placeholder='URL gambar'
                      />
                      {formData.gallery.length > 1 && (
                        <button
                          type='button'
                          onClick={() => removeArrayItem('gallery', index)}
                          className='px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50'
                        >
                          <Trash2 className='w-4 h-4' />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type='button'
                    onClick={() => addArrayItem('gallery', '')}
                    className='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50'
                  >
                    <Plus className='w-4 h-4 mr-2 inline' />
                    Tambah Gambar
                  </button>
                </div>
              </div>

              {/* Fasilitas */}
              <div className='bg-white rounded-lg shadow p-6'>
                <h2 className='text-xl font-semibold text-gray-900 mb-4'>
                  Fasilitas Kapal
                </h2>
                <div className='space-y-3'>
                  {formData.features.map((feature, index) => (
                    <div key={index} className='flex gap-2'>
                      <input
                        type='text'
                        value={feature.name}
                        onChange={(e) =>
                          handleArrayChange('features', index, {
                            ...feature,
                            name: e.target.value,
                          })
                        }
                        className='flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        placeholder='Nama fasilitas'
                      />
                      <select
                        value={feature.icon}
                        onChange={(e) =>
                          handleArrayChange('features', index, {
                            ...feature,
                            icon: e.target.value,
                          })
                        }
                        className='w-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                      >
                        {iconOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      {formData.features.length > 1 && (
                        <button
                          type='button'
                          onClick={() => removeArrayItem('features', index)}
                          className='px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50'
                        >
                          <Trash2 className='w-4 h-4' />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type='button'
                    onClick={() =>
                      addArrayItem('features', { name: '', icon: 'wifi' })
                    }
                    className='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50'
                  >
                    <Plus className='w-4 h-4 mr-2 inline' />
                    Tambah Fasilitas
                  </button>
                </div>
              </div>

              {/* Yang Termasuk */}
              <div className='bg-white rounded-lg shadow p-6'>
                <h2 className='text-xl font-semibold text-gray-900 mb-4'>
                  Harga Termasuk
                </h2>
                <div className='space-y-3'>
                  {formData.includes.map((item, index) => (
                    <div key={index} className='flex gap-2'>
                      <input
                        type='text'
                        value={item}
                        onChange={(e) =>
                          handleArrayChange('includes', index, e.target.value)
                        }
                        className='flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        placeholder='Item yang disertakan'
                      />
                      {formData.includes.length > 1 && (
                        <button
                          type='button'
                          onClick={() => removeArrayItem('includes', index)}
                          className='px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50'
                        >
                          <Trash2 className='w-4 h-4' />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type='button'
                    onClick={() => addArrayItem('includes', '')}
                    className='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50'
                  >
                    <Plus className='w-4 h-4 mr-2 inline' />
                    Tambah Item
                  </button>
                </div>
              </div>

              {/* Destinasi */}
              <div className='bg-white rounded-lg shadow p-6'>
                <h2 className='text-xl font-semibold text-gray-900 mb-4'>
                  Pilihan Destinasi
                </h2>
                <div className='space-y-3'>
                  {formData.destinations.map((dest, index) => (
                    <div key={index} className='flex gap-2'>
                      <input
                        type='text'
                        value={dest}
                        onChange={(e) =>
                          handleArrayChange(
                            'destinations',
                            index,
                            e.target.value
                          )
                        }
                        className='flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        placeholder='Nama destinasi'
                      />
                      {formData.destinations.length > 1 && (
                        <button
                          type='button'
                          onClick={() => removeArrayItem('destinations', index)}
                          className='px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50'
                        >
                          <Trash2 className='w-4 h-4' />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type='button'
                    onClick={() => addArrayItem('destinations', '')}
                    className='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50'
                  >
                    <Plus className='w-4 h-4 mr-2 inline' />
                    Tambah Destinasi
                  </button>
                </div>
              </div>
            </div>

            {/* Kolom Kanan - Spesifikasi & Actions */}
            <div className='lg:col-span-1 space-y-6'>
              {/* Spesifikasi Kapal */}
              <div className='bg-white rounded-lg shadow p-6'>
                <h2 className='text-xl font-semibold text-gray-900 mb-4'>
                  Spesifikasi Kapal
                </h2>
                <div className='space-y-4'>
                  {Object.entries(formData.specifications).map(
                    ([key, value]) => (
                      <div key={key}>
                        <label
                          htmlFor={key}
                          className='block text-sm font-medium text-gray-700 mb-1'
                        >
                          {key}
                        </label>
                        <input
                          type='text'
                          id={key}
                          value={value}
                          onChange={(e) =>
                            handleSpecificationChange(key, e.target.value)
                          }
                          className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                          placeholder={`Masukkan ${key.toLowerCase()}`}
                        />
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className='bg-white rounded-lg shadow p-6 sticky top-8'>
                <div className='space-y-4'>
                  <button
                    type='submit'
                    disabled={isSubmitting}
                    className='w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300'
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className='w-4 h-4 mr-2 animate-spin inline' />
                        Menyimpan...
                      </>
                    ) : (
                      <>
                        <Save className='w-4 h-4 mr-2 inline' />
                        Tambah Kapal
                      </>
                    )}
                  </button>

                  <button
                    type='button'
                    onClick={() => router.back()}
                    disabled={isSubmitting}
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                    Batal
                  </button>
                </div>

                <div className='mt-6 pt-4 border-t text-sm text-gray-500'>
                  <p>• Field dengan tanda (*) wajib diisi</p>
                  <p>• Data akan langsung tersimpan setelah submit</p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
