export interface Video {
  id: string;
  storeId: string;
  storeName: string;
  videoUrl: string;
  thumbnail: string;
  title: string;
  description: string;
  price: number;
  likes: number;
  views: number;
  products: Product[];
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  sizes: string[];
  colors: string[];
  inStock: boolean;
}