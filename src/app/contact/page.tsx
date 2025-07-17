'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Facebook,
  Instagram,
  Twitter,
  Anchor,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    guests: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        date: '',
        guests: '',
        message: '',
      });

      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: <Phone className='h-6 w-6' />,
      title: 'Telepon',
      details: ['+62 812-3456-7890', '+62 361-123456'],
      description: 'Hubungi kami langsung untuk konsultasi',
    },
    {
      icon: <Mail className='h-6 w-6' />,
      title: 'Email',
      details: ['info@marinaboat.com', 'booking@marinaboat.com'],
      description: 'Kirim pertanyaan atau permintaan booking',
    },
    {
      icon: <MapPin className='h-6 w-6' />,
      title: 'Alamat',
      details: ['Jl. Pantai Indah No. 123', 'Sanur, Bali 80228'],
      description: 'Kunjungi marina kami langsung',
    },
    {
      icon: <Clock className='h-6 w-6' />,
      title: 'Jam Operasional',
      details: ['Senin - Minggu: 06:00 - 20:00', '24/7 Emergency'],
      description: 'Siap melayani setiap hari',
    },
  ];

  const socialMedia = [
    {
      icon: <Facebook className='h-6 w-6' />,
      name: 'Facebook',
      handle: '@marinaboat.id',
    },
    {
      icon: <Instagram className='h-6 w-6' />,
      name: 'Instagram',
      handle: '@marinaboat.bali',
    },
    {
      icon: <Twitter className='h-6 w-6' />,
      name: 'Twitter',
      handle: '@marinaboat',
    },
    {
      icon: <MessageCircle className='h-6 w-6' />,
      name: 'WhatsApp',
      handle: '+62 812-3456-7890',
    },
  ];

  const faqs = [
    {
      question: 'Bagaimana cara melakukan booking?',
      answer:
        'Anda dapat melakukan booking melalui form di website ini, menghubungi kami via WhatsApp, atau datang langsung ke marina kami.',
    },
    {
      question: 'Apakah ada deposit yang harus dibayar?',
      answer:
        'Ya, kami memerlukan deposit 30% dari total biaya sewa untuk mengkonfirmasi booking Anda.',
    },
    {
      question: 'Bagaimana jika cuaca buruk?',
      answer:
        'Keselamatan adalah prioritas utama. Jika cuaca tidak memungkinkan, kami akan menawarkan reschedule atau refund penuh.',
    },
    {
      question: 'Apakah makanan sudah termasuk?',
      answer:
        'Tergantung paket yang dipilih. Beberapa paket sudah termasuk catering, atau Anda bisa request tambahan.',
    },
  ];

  return (
    <div className='py-8'>
      {/* Hero Section */}
      <section className='relative bg-gradient-to-r from-blue-900 via-teal-800 to-blue-700 text-white'>
        <div className='absolute inset-0'>
          <Image
            src='https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=1920'
            alt='Contact'
            fill
            className='object-cover opacity-30'
            priority
          />
        </div>
        <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
          <div className='text-center'>
            <div className='flex justify-center mb-6'>
              <MessageCircle className='h-16 w-16 text-blue-300' />
            </div>
            <h1 className='text-4xl md:text-5xl font-bold mb-6'>
              Hubungi Kami
            </h1>
            <p className='text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto'>
              Siap membantu mewujudkan petualangan laut impian Anda. Hubungi tim
              profesional kami sekarang juga!
            </p>
          </div>
        </div>
      </section>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-12'>
          {/* Contact Form */}
          <div className='lg:col-span-2'>
            <div className='bg-white rounded-xl shadow-lg p-8'>
              <div className='flex items-center mb-6'>
                <Send className='h-6 w-6 text-blue-700 mr-3' />
                <h2 className='text-2xl font-bold text-gray-900'>
                  Kirim Pesan
                </h2>
              </div>

              {submitStatus === 'success' && (
                <div className='mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center'>
                  <CheckCircle className='h-5 w-5 text-green-600 mr-2' />
                  <span className='text-green-800'>
                    Pesan Anda berhasil dikirim! Kami akan segera menghubungi
                    Anda.
                  </span>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className='mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center'>
                  <AlertCircle className='h-5 w-5 text-red-600 mr-2' />
                  <span className='text-red-800'>
                    Terjadi kesalahan. Silakan coba lagi atau hubungi kami
                    langsung.
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} className='space-y-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Nama Lengkap *
                    </label>
                    <input
                      type='text'
                      name='name'
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      placeholder='Masukkan nama lengkap'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Email *
                    </label>
                    <input
                      type='email'
                      name='email'
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      placeholder='nama@email.com'
                    />
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Nomor Telepon *
                    </label>
                    <input
                      type='tel'
                      name='phone'
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      placeholder='+62 812-3456-7890'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Jenis Layanan
                    </label>
                    <select
                      name='service'
                      value={formData.service}
                      onChange={handleInputChange}
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    >
                      <option value=''>Pilih layanan</option>
                      <option value='wisata'>Wisata Laut</option>
                      <option value='pancing'>Kapal Pancing</option>
                      <option value='sunset'>Sunset Cruise</option>
                      <option value='island-hopping'>Island Hopping</option>
                      <option value='corporate'>Corporate Event</option>
                      <option value='wedding'>Wedding Charter</option>
                    </select>
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Tanggal Rencana
                    </label>
                    <input
                      type='date'
                      name='date'
                      value={formData.date}
                      onChange={handleInputChange}
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Jumlah Tamu
                    </label>
                    <select
                      name='guests'
                      value={formData.guests}
                      onChange={handleInputChange}
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    >
                      <option value=''>Pilih jumlah tamu</option>
                      <option value='1-5'>1-5 orang</option>
                      <option value='6-10'>6-10 orang</option>
                      <option value='11-20'>11-20 orang</option>
                      <option value='21-30'>21-30 orang</option>
                      <option value='30+'>Lebih dari 30 orang</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Pesan
                  </label>
                  <textarea
                    name='message'
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none'
                    placeholder='Ceritakan detail kebutuhan Anda, destinasi yang diinginkan, atau pertanyaan lainnya...'
                  />
                </div>

                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='w-full bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'
                >
                  {isSubmitting ? (
                    <>
                      <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2'></div>
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <Send className='h-5 w-5 mr-2' />
                      Kirim Pesan
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info Sidebar */}
          <div className='space-y-8'>
            {/* Contact Information */}
            <div className='bg-white rounded-xl shadow-lg p-6'>
              <h3 className='text-xl font-bold text-gray-900 mb-6'>
                Informasi Kontak
              </h3>
              <div className='space-y-6'>
                {contactInfo.map((info, index) => (
                  <div key={index} className='flex items-start space-x-4'>
                    <div className='flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-700'>
                      {info.icon}
                    </div>
                    <div className='flex-grow'>
                      <h4 className='font-semibold text-gray-900 mb-1'>
                        {info.title}
                      </h4>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className='text-gray-600 text-sm'>
                          {detail}
                        </p>
                      ))}
                      <p className='text-gray-500 text-xs mt-1'>
                        {info.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className='bg-white rounded-xl shadow-lg p-6'>
              <h3 className='text-xl font-bold text-gray-900 mb-6'>
                Media Sosial
              </h3>
              <div className='space-y-4'>
                {socialMedia.map((social, index) => (
                  <div
                    key={index}
                    className='flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer'
                  >
                    <div className='text-blue-700'>{social.icon}</div>
                    <div>
                      <p className='font-medium text-gray-900'>{social.name}</p>
                      <p className='text-sm text-gray-600'>{social.handle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Contact */}
            <div className='bg-gradient-to-r from-blue-700 to-teal-600 rounded-xl shadow-lg p-6 text-white'>
              <div className='flex items-center mb-4'>
                <Anchor className='h-6 w-6 mr-2' />
                <h3 className='text-lg font-bold'>Butuh Bantuan Cepat?</h3>
              </div>
              <p className='text-blue-100 mb-4 text-sm'>
                Tim customer service kami siap membantu Anda 24/7 untuk
                emergency atau pertanyaan mendesak.
              </p>
              <div className='space-y-2'>
                <button className='w-full bg-white text-blue-700 py-2 px-4 rounded-lg font-medium hover:bg-blue-50 transition-colors text-sm'>
                  WhatsApp: +62 812-3456-7890
                </button>
                <button className='w-full bg-orange-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-orange-700 transition-colors text-sm'>
                  Emergency: +62 361-123456
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <section className='py-16 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
              Lokasi Marina Kami
            </h2>
            <p className='text-xl text-gray-600'>
              Kunjungi marina kami di Sanur, Bali untuk melihat langsung armada
              kapal kami
            </p>
          </div>

          <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
            <div className='aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center'>
              <div className='text-center'>
                <MapPin className='h-16 w-16 text-gray-400 mx-auto mb-4' />
                <p className='text-gray-600 mb-2'>Interactive Map</p>
                <p className='text-sm text-gray-500'>
                  Jl. Pantai Indah No. 123, Sanur, Bali 80228
                </p>
              </div>
            </div>
            <div className='p-6'>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <div className='text-center'>
                  <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3'>
                    <MapPin className='h-6 w-6 text-blue-700' />
                  </div>
                  <h4 className='font-semibold text-gray-900 mb-1'>
                    Mudah Dijangkau
                  </h4>
                  <p className='text-sm text-gray-600'>
                    15 menit dari Bandara Ngurah Rai
                  </p>
                </div>
                <div className='text-center'>
                  <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3'>
                    <Clock className='h-6 w-6 text-blue-700' />
                  </div>
                  <h4 className='font-semibold text-gray-900 mb-1'>
                    Buka Setiap Hari
                  </h4>
                  <p className='text-sm text-gray-600'>06:00 - 20:00 WITA</p>
                </div>
                <div className='text-center'>
                  <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3'>
                    <Phone className='h-6 w-6 text-blue-700' />
                  </div>
                  <h4 className='font-semibold text-gray-900 mb-1'>
                    Hubungi Dulu
                  </h4>
                  <p className='text-sm text-gray-600'>
                    Untuk memastikan ketersediaan
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className='py-16 bg-white'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className='text-xl text-gray-600'>
              Temukan jawaban untuk pertanyaan umum tentang layanan kami
            </p>
          </div>

          <div className='space-y-6'>
            {faqs.map((faq, index) => (
              <div
                key={index}
                className='bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow'
              >
                <h3 className='text-lg font-semibold text-gray-900 mb-3'>
                  {faq.question}
                </h3>
                <p className='text-gray-600 leading-relaxed'>{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className='text-center mt-8'>
            <p className='text-gray-600 mb-4'>
              Tidak menemukan jawaban yang Anda cari?
            </p>
            <button className='bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors'>
              Hubungi Customer Service
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
