import boatsData from '../data/boats.json';
import type { Boat, BoatCategory, SortOption, BoatStats } from '../types/boat';

// Get all boats
export function getAllBoats(): Boat[] {
  return boatsData as Boat[];
}

// Get boat by ID
export function getBoatById(id: number): Boat | undefined {
  return boatsData.find((boat) => boat.id === id) as Boat | undefined;
}

// Get boats by category
export function getBoatsByCategory(category: BoatCategory): Boat[] {
  if (category === 'all') return getAllBoats();
  return boatsData.filter((boat) => boat.category === category) as Boat[];
}

// Get featured boats (top rated)
export function getFeaturedBoats(limit: number = 3): Boat[] {
  const boats = getAllBoats();

  // Shuffle array using Fisher-Yates algorithm
  const shuffled = [...boats];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, limit);
}

// Search boats by name or type
export function searchBoats(query: string): Boat[] {
  const lowercaseQuery = query.toLowerCase();
  return boatsData.filter(
    (boat) =>
      boat.name.toLowerCase().includes(lowercaseQuery) ||
      boat.type.toLowerCase().includes(lowercaseQuery) ||
      boat.description.toLowerCase().includes(lowercaseQuery)
  ) as Boat[];
}

// Filter boats by capacity
export function filterBoatsByCapacity(
  minCapacity: number,
  maxCapacity?: number
): Boat[] {
  return boatsData.filter((boat) => {
    if (maxCapacity) {
      return boat.capacity >= minCapacity && boat.capacity <= maxCapacity;
    }
    return boat.capacity >= minCapacity;
  }) as Boat[];
}

// Sort boats
export function sortBoats(boats: Boat[], sortBy: SortOption): Boat[] {
  const sortedBoats = [...boats];

  switch (sortBy) {
    case 'name':
      return sortedBoats.sort((a, b) => a.name.localeCompare(b.name));
    case 'price-low':
      return sortedBoats.sort((a, b) => a.priceNum - b.priceNum);
    case 'price-high':
      return sortedBoats.sort((a, b) => b.priceNum - a.priceNum);
    case 'rating':
      return sortedBoats.sort((a, b) => b.rating - a.rating);
    case 'capacity':
      return sortedBoats.sort((a, b) => b.capacity - a.capacity);
    default:
      return sortedBoats;
  }
}

// Get boat statistics
export function getBoatStats(): BoatStats {
  const boats = getAllBoats();
  return {
    total: boats.length,
    wisata: boats.filter((boat) => boat.category === 'wisata').length,
    pancing: boats.filter((boat) => boat.category === 'pancing').length,
    averageRating:
      boats.reduce((sum, boat) => sum + boat.rating, 0) / boats.length,
    totalCapacity: boats.reduce((sum, boat) => sum + boat.capacity, 0),
    priceRange: {
      min: Math.min(...boats.map((boat) => boat.priceNum)),
      max: Math.max(...boats.map((boat) => boat.priceNum)),
    },
  };
}
