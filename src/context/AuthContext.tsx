import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut
} from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth } from '../lib/firebase';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: typeof signInWithEmailAndPassword;
  signup: typeof createUserWithEmailAndPassword;
  logout: typeof firebaseSignOut;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const login = (email: string, pass: string) => signInWithEmailAndPassword(auth, email, pass);
  const signup = (email: string, pass: string) => createUserWithEmailAndPassword(auth, email, pass);
  const logout = () => firebaseSignOut(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ 
      currentUser, 
      loading,
      login: login as any,
      signup: signup as any,
      logout
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
