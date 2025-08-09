export interface User {
  id: string;
  email: string;
  phone?: string;
  name: string;
  avatar?: string;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
  isBlocked?: boolean;
  subscriptionStatus?: 'free' | 'premium' | 'pro';
  subscriptionExpiry?: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email?: string;
  phone?: string;
  password: string;
}

export interface RegisterData {
  email: string;
  phone?: string;
  password: string;
  name: string;
}

export interface SocialAuthProvider {
  name: string;
  icon: string;
  handler: () => void;
}