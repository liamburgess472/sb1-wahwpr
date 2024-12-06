import { User } from '@supabase/supabase-js';

export interface AuthUser extends User {
  user_metadata: {
    avatar_url?: string;
    full_name?: string;
  };
}

export interface AuthState {
  user: AuthUser | null;
  loading: boolean;
}

export interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}