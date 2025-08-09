export interface Ad {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: Category;
  subcategory?: string;
  tags: string[];
  location: {
    city: string;
    state: string;
    country: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  userId: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  status: 'pending' | 'approved' | 'rejected' | 'sold' | 'expired';
  featured: boolean;
  premium: boolean;
  views: number;
  favorites: number;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
  subcategories?: string[];
  adCount?: number;
}

export interface AdFilters {
  category?: string;
  subcategory?: string;
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  radius?: number;
  search?: string;
  tags?: string[];
  status?: Ad['status'];
  featured?: boolean;
  premium?: boolean;
  userId?: string;
  sortBy?: 'newest' | 'oldest' | 'price-low' | 'price-high' | 'popular';
}