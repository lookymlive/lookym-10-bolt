import { create } from 'zustand';
import { databases } from '@/lib/appwrite';
import { Query } from 'appwrite';

export interface Video {
  id: string;
  storeId: string;
  storeName: string;
  videoUrl: string;
  thumbnail: string;
  title: string;
  price: number;
  likes: number;
  views: number;
}

interface VideoState {
  videos: Video[];
  isLoading: boolean;
  fetchVideos: () => Promise<void>;
  likeVideo: (videoId: string) => Promise<void>;
}

export const useVideoStore = create<VideoState>((set, get) => ({
  videos: [],
  isLoading: true,
  fetchVideos: async () => {
    try {
      const response = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_VIDEOS_ID!,
        [Query.orderDesc('$createdAt'), Query.limit(20)]
      );
      set({ videos: response.documents as unknown as Video[], isLoading: false });
    } catch (error) {
      console.error('Fetch videos error:', error);
      set({ isLoading: false });
    }
  },
  likeVideo: async (videoId: string) => {
    // Implement like functionality
  },
}));