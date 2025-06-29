export interface UserAttributes {
  role: string;
  [key: string]: string;
}

export interface AuthContextType {
  user: UserAttributes | null;
  setUser: (user: UserAttributes | null) => void;
  isAuthenticated: boolean;
  login: (user: UserAttributes) => void;
  logout: () => void;
}
