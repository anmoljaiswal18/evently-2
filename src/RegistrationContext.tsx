import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define context type
interface RegistrationContextType {
  isOpen: boolean;
  openRegistration: () => void;
  closeRegistration: () => void;
}

// Create context with default values
const RegistrationContext = createContext<RegistrationContextType>({
  isOpen: false,
  openRegistration: () => {},
  closeRegistration: () => {},
});

// Props type
interface RegistrationProviderProps {
  children: ReactNode;
}

// Provider component
export function RegistrationProvider({ children }: RegistrationProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openRegistration = () => setIsOpen(true);
  const closeRegistration = () => setIsOpen(false);

  return (
    <RegistrationContext.Provider value={{ isOpen, openRegistration, closeRegistration }}>
      {children}
    </RegistrationContext.Provider>
  );
}

// Custom hook to use the registration context
export const useRegistration = () => useContext(RegistrationContext);