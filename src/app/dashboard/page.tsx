'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  BarChart3,
  Anchor,
  Calendar,
  TrendingUp,
  Ship,
  Star,
  Activity,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import type { BoatStats } from '../../types';

const StatCardSkeleton = () => (
  <div className='bg-white rounded-lg shadow-sm p-6 animate-pulse'>
    <div className='flex items-center justify-between'>
      <div>
        <div className='h-4 bg-gray-200 rounded w-24 mb-2'></div>
        <div className='h-7 bg-gray-300 rounded w-16 mb-2'></div>
        <div className='h-3 bg-gray-200 rounded w-20'></div>
      </div>
      <div className='p-3 rounded-lg bg-gray-200 h-14 w-14'></div>
    </div>
  </div>
);

export default function Dashboard() {
  const { user, logout, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<BoatStats | null>(null);
  const [isStatsLoading, setIsStatsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.push('/login');
    }
  }, [user, isAuthLoading, router]);

  useEffect(() => {
    if (user) {
      fetch('/api/v1/boats/stats')
        .then((res) => res.json())
        .then((data) => setStats(data.data))
        .finally(() => setIsStatsLoading(false));
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (isAuthLoading) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700'></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const dashboardStats = [
    {
      title: 'Total Kapal',
      value: stats?.total || 0,
      icon: <Ship className='h-8 w-8 text-blue-600' />,
      color: 'bg-blue-100',
      change: '+2 bulan ini',
    },
    {
      title: 'Kapal Wisata',
      value: stats?.wisata || 0,
      icon: <Anchor className='h-8 w-8 text-green-600' />,
      color: 'bg-green-100',
      change: 'Aktif semua',
    },
    {
      title: 'Kapal Pancing',
      value: stats?.pancing || 0,
      icon: <Activity className='h-8 w-8 text-orange-600' />,
      color: 'bg-orange-100',
      change: 'Siap operasi',
    },
    {
      title: 'Rating Rata-rata',
      value: stats ? stats.averageRating.toFixed(1) : '0.0',
      icon: <Star className='h-8 w-8 text-yellow-600' />,
      color: 'bg-yellow-100',
      change: 'Sangat baik',
    },
  ];

  const quickActions = [
    {
      title: 'Kelola Kapal',
      description: 'Tambah, edit, atau hapus data kapal',
      href: '/dashboard/boats',
      icon: <Ship className='h-6 w-6' />,
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      title: 'Lihat Statistik',
      description: 'Analisis performa dan booking',
      href: '/dashboard/analytics',
      icon: <BarChart3 className='h-6 w-6' />,
      color: 'bg-green-600 hover:bg-green-700',
    },
    {
      title: 'Kelola Booking',
      description: 'Lihat dan kelola reservasi',
      href: '/dashboard/bookings',
      icon: <Calendar className='h-6 w-6' />,
      color: 'bg-orange-600 hover:bg-orange-700',
    },
    {
      title: 'Laporan',
      description: 'Generate laporan bulanan',
      href: '/dashboard/reports',
      icon: <TrendingUp className='h-6 w-6' />,
      color: 'bg-purple-600 hover:bg-purple-700',
    },
  ];

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header
      <header className='bg-white shadow-sm border-b'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            <div className='flex items-center'>
              <Anchor className='h-8 w-8 text-blue-700 mr-3' />
              <h1 className='text-xl font-bold text-gray-900'>
                Marina Boat Dashboard
              </h1>
            </div>
            <div className='flex items-center space-x-4'>
              <span className='text-sm text-gray-600'>
                Selamat datang, <span className='font-medium'>{user.name}</span>
              </span>
              <button
                onClick={handleLogout}
                className='flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors'
              >
                <LogOut className='h-4 w-4' />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header> */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Welcome Section */}
        <div className='mb-8'>
          <h2 className='text-2xl font-bold text-gray-900 mb-2'>
            Dashboard Admin
          </h2>
          <p className='text-gray-600'>
            Kelola armada kapal dan operasional Marina Boat
          </p>
        </div>

        {/* Stats Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
          {isStatsLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <StatCardSkeleton key={index} />
              ))
            : dashboardStats.map((stat, index) => (
                <div
                  key={index}
                  className='bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow'
                >
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-sm font-medium text-gray-600 mb-1'>
                        {stat.title}
                      </p>
                      <p className='text-2xl font-bold text-gray-900'>
                        {stat.value}
                      </p>
                      <p className='text-xs text-gray-500 mt-1'>
                        {stat.change}
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.color}`}>
                      {stat.icon}
                    </div>
                  </div>
                </div>
              ))}
        </div>

        {/* Quick Actions */}
        <div className='mb-8'>
          <h3 className='text-lg font-semibold text-gray-900 mb-4'>
            Aksi Cepat
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            {quickActions.map((action, index) => (
              <Link
                key={index}
                href={action.href}
                className='block bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-all duration-200 hover:transform hover:-translate-y-1'
              >
                <div
                  className={`inline-flex p-3 rounded-lg text-white mb-4 ${action.color}`}
                >
                  {action.icon}
                </div>
                <h4 className='text-lg font-semibold text-gray-900 mb-2'>
                  {action.title}
                </h4>
                <p className='text-gray-600 text-sm'>{action.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className='bg-white rounded-lg shadow-sm'>
          <div className='p-6 border-b border-gray-200'>
            <h3 className='text-lg font-semibold text-gray-900'>
              Aktivitas Terbaru
            </h3>
          </div>
          <div className='p-6'>
            <div className='space-y-4'>
              <div className='flex items-center space-x-3'>
                <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                <span className='text-sm text-gray-600'>
                  Kapal "Ocean Explorer" berhasil ditambahkan
                </span>
                <span className='text-xs text-gray-400'>2 jam yang lalu</span>
              </div>
              <div className='flex items-center space-x-3'>
                <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                <span className='text-sm text-gray-600'>
                  Data kapal "Fishing Master" diperbarui
                </span>
                <span className='text-xs text-gray-400'>5 jam yang lalu</span>
              </div>
              <div className='flex items-center space-x-3'>
                <div className='w-2 h-2 bg-orange-500 rounded-full'></div>
                <span className='text-sm text-gray-600'>
                  Booking baru untuk "Sunset Cruiser"
                </span>
                <span className='text-xs text-gray-400'>1 hari yang lalu</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
