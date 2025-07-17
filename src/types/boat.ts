export interface BoatFeature {
  name: string;
  icon: string;
}

export interface BoatSpecifications {
  'Panjang': string;
  'Lebar': string;
  'Mesin': string;
  'Kecepatan': string;
  'Bahan Bakar': string;
  'Toilet': string;
}

export interface Boat {
  id: number;
  name: string;
  type: string;
  category: 'wisata' | 'pancing';
  capacity: number;
  price: string;
  priceNum: number;
  image: string;
  gallery: string[];
  rating: number;
  reviews: number;
  description: string;
  features: BoatFeature[];
  specifications: BoatSpecifications;
  includes: string[];
  destinations: string[];
  duration: string;
}

export interface BoatStats {
  total: number;
  wisata: number;
  pancing: number;
  averageRating: number;
  totalCapacity: number;
  priceRange: {
    min: number;
    max: number;
  };
}

export type BoatCategory = 'wisata' | 'pancing' | 'all';
export type CapacityRange = 'small' | 'medium' | 'large' | 'all';
export type SortOption =
  | 'name'
  | 'price-low'
  | 'price-high'
  | 'rating'
  | 'capacity';

export interface BoatFilters {
  searchTerm: string;
  category: BoatCategory;
  capacity: CapacityRange;
  sortBy: SortOption;
}
