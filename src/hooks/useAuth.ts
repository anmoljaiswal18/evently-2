import { useState } from "react";

// Define a type for the user data
type User = {
  id: string;
  name: string;
  email: string;
  // Add any other fields you expect
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => setUser(userData);
  const logout = () => setUser(null);

  return { user, login, logout };
};
