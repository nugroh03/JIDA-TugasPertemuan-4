'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Anchor, BarChart3, Ship, CreditCard, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
  { name: 'Kelola Kapal', href: '/dashboard/boats', icon: Ship },
  { name: 'Transaksi', href: '/dashboard/transactions', icon: CreditCard },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <aside className='w-64 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col'>
      <div className='h-16 flex items-center justify-center px-4'>
        <Link href='/dashboard' className='flex items-center space-x-2'>
          <Anchor className='h-8 w-8 text-blue-600' />
          <span className='text-xl font-bold'>Marina</span>
        </Link>
      </div>
      <nav className='flex-grow px-2 py-4'>
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              pathname === item.href ||
              (item.href !== '/dashboard' && pathname.startsWith(item.href))
                ? 'bg-gray-100 text-blue-600'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <item.icon className='h-5 w-5 mr-3' />
            {item.name}
          </Link>
        ))}
      </nav>
      <div className='p-4 mt-auto border-t border-gray-200'>
        <div className='mb-4'>
          <p className='text-sm font-semibold text-gray-800'>{user?.name}</p>
          <p className='text-xs text-gray-500'>{user?.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className='w-full flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition-colors'
        >
          <LogOut className='h-5 w-5 mr-2' />
          Logout
        </button>
      </div>
    </aside>
  );
}
