import { create } from 'zustand';
import { storage, databases } from '@/lib/appwrite';
import { ID } from 'appwrite';
import type { Video, Product } from '@/types/video';

interface UploadState {
  isUploading: boolean;
  progress: number;
  uploadVideo: (
    file: File,
    thumbnail: File,
    metadata: Omit<Video, 'id' | 'videoUrl' | 'thumbnail' | 'likes' | 'views' | 'status' | 'createdAt' | 'updatedAt'>
  ) => Promise<void>;
}

export const useUploadStore = create<UploadState>((set) => ({
  isUploading: false,
  progress: 0,
  uploadVideo: async (file, thumbnail, metadata) => {
    set({ isUploading: true, progress: 0 });
    try {
      // Upload video file
      const videoFile = await storage.createFile(
        process.env.NEXT_PUBLIC_APPWRITE_STORAGE_ID!,
        ID.unique(),
        file
      );

      // Upload thumbnail
      const thumbnailFile = await storage.createFile(
        process.env.NEXT_PUBLIC_APPWRITE_STORAGE_ID!,
        ID.unique(),
        thumbnail
      );

      // Create video document
      await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_VIDEOS_ID!,
        ID.unique(),
        {
          ...metadata,
          videoUrl: videoFile.$id,
          thumbnail: thumbnailFile.$id,
          likes: 0,
          views: 0,
          status: 'pending'
        }
      );

      set({ isUploading: false, progress: 100 });
    } catch (error) {
      console.error('Upload error:', error);
      set({ isUploading: false, progress: 0 });
      throw error;
    }
  }
}));