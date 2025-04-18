import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState } from "react";
const RegistrationContext = createContext(undefined);
export const RegistrationProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const openRegistration = () => setIsOpen(true);
    const closeRegistration = () => setIsOpen(false);
    return (_jsx(RegistrationContext.Provider, { value: { isOpen, openRegistration, closeRegistration }, children: children }));
};
export const useRegistration = () => {
    const context = useContext(RegistrationContext);
    if (!context)
        throw new Error("useRegistration must be used within RegistrationProvider");
    return context;
};
