import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface UserAttributes {
  role: string;
  [key: string]: string;
}

interface AuthContextType {
  user: UserAttributes | null;
  login: (userData: UserAttributes) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserAttributes | null>(null);

  const login = (userData: UserAttributes) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
