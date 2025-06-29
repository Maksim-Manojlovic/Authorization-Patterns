export interface UserAttributes {
  role: string;
  [key: string]: unknown;
}

export interface AuthContextType {
  user: UserAttributes | null;
  login: (user: UserAttributes) => void;
  logout: () => void;
}
