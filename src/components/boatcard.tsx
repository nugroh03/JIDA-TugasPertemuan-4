import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Users, ChevronRight, Clock, MapPin } from 'lucide-react';
import type { Boat } from '../types/boat';

interface BoatCardProps {
  boat: Boat;
  showFullDescription?: boolean;
  className?: string;
}

const BoatCard: React.FC<BoatCardProps> = ({
  boat,
  showFullDescription = false,
  className = '',
}) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1 ${className}`}
    >
      <div className='relative'>
        <div className='relative h-48'>
          {boat.name != '' && boat.image != '' && (
            <Image
              src={boat.image}
              alt={boat.name}
              fill
              className='object-cover'
            />
          )}
        </div>
        <div className='absolute top-3 left-3'>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              boat.category === 'wisata'
                ? 'bg-orange-100 text-orange-800'
                : 'bg-blue-100 text-blue-800'
            }`}
          >
            {boat.type}
          </span>
        </div>
        <div className='absolute top-3 right-3 bg-white rounded-full p-1'>
          <div className='flex items-center'>
            <Star className='h-3 w-3 text-yellow-400 fill-current' />
            <span className='text-xs font-medium ml-1'>{boat.rating}</span>
          </div>
        </div>
      </div>

      <div className='p-5'>
        <h3 className='text-lg font-semibold text-gray-900 mb-2'>
          {boat.name}
        </h3>
        <p
          className={`text-gray-600 text-sm mb-3 ${
            showFullDescription ? '' : 'line-clamp-2'
          }`}
        >
          {boat.description}
        </p>

        <div className='flex items-center justify-between mb-3'>
          <div className='flex items-center text-sm text-gray-600'>
            <Users className='h-4 w-4 mr-1' />
            <span>{boat.capacity} orang</span>
          </div>
          <div className='flex items-center text-sm text-gray-600'>
            <Clock className='h-4 w-4 mr-1' />
            <span>{boat.duration}</span>
          </div>
        </div>

        <div className='flex flex-wrap gap-1 mb-4'>
          {boat.features.slice(0, 2).map((feature, index) => (
            <span
              key={index}
              className='px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded'
            >
              {feature.name}
            </span>
          ))}
          {boat.features.length > 2 && (
            <span className='px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded'>
              +{boat.features.length - 2}
            </span>
          )}
        </div>

        <div className='flex items-center justify-between'>
          <div>
            <span className='text-xl font-bold text-orange-600'>
              {boat.price}
            </span>
            <span className='text-gray-500 text-sm'>/hari</span>
          </div>
          <Link
            href={`/boats/${boat.id}`}
            className='bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors flex items-center text-sm font-medium'
          >
            Detail
            <ChevronRight className='h-4 w-4 ml-1' />
          </Link>
        </div>

        <div className='mt-3 pt-3 border-t border-gray-100'>
          <div className='flex items-center text-xs text-gray-500'>
            <MapPin className='h-3 w-3 mr-1' />
            <span>{boat.destinations.slice(0, 2).join(', ')}</span>
            {boat.destinations.length > 2 && (
              <span> +{boat.destinations.length - 2}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoatCard;
