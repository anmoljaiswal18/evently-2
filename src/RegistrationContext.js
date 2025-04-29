import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState } from 'react';
// Create context with default values
const RegistrationContext = createContext({
    isOpen: false,
    openRegistration: () => { },
    closeRegistration: () => { },
});
// Provider component
export function RegistrationProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const openRegistration = () => setIsOpen(true);
    const closeRegistration = () => setIsOpen(false);
    return (_jsx(RegistrationContext.Provider, { value: { isOpen, openRegistration, closeRegistration }, children: children }));
}
// Custom hook to use the registration context
export const useRegistration = () => useContext(RegistrationContext);
