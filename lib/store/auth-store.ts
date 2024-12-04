import { create } from 'zustand';
import { account } from '@/lib/appwrite';
import { ID } from 'appwrite';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  signIn: async (email: string, password: string) => {
    try {
      await account.createEmailSession(email, password);
      const user = await account.get();
      set({ user: { id: user.$id, email: user.email, name: user.name } });
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  },
  signUp: async (email: string, password: string, name: string) => {
    try {
      await account.create(ID.unique(), email, password, name);
      await account.createEmailSession(email, password);
      const user = await account.get();
      set({ user: { id: user.$id, email: user.email, name: user.name } });
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  },
  signOut: async () => {
    try {
      await account.deleteSession('current');
      set({ user: null });
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  },
  checkAuth: async () => {
    try {
      const user = await account.get();
      set({ 
        user: { id: user.$id, email: user.email, name: user.name },
        isLoading: false 
      });
    } catch (error) {
      set({ user: null, isLoading: false });
    }
  },
}));