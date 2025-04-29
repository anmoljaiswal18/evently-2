import React, { useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import Registration from "./AuthPage";
import { useRegistration } from "../context/RegistrationContext";

// Define user type
type User = {
  userId?: string;
  name?: string;
  email: string;
};

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isOpen, closeRegistration, openRegistration } = useRegistration();
  const [user, setUser] = useState<User | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Check for authenticated user on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setUserMenuOpen(false);
    navigate("/");
  };

  // Function to handle login/register
  const handleAuthSuccess = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    closeRegistration();
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-blue-600 shadow-md z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between py-4">
        <Link to="/" className="text-lg font-semibold text-gray-900">
          <img src="/images/logo.png" alt="Evently Logo" className="h-10 w-auto" />
        </Link>

        <nav className="hidden lg:flex gap-x-8">
          <Link to="/" className="text-white hover:text-yellow-400">Home</Link>
          <Link to="/" className="text-white hover:text-yellow-400">Religious Event</Link>
          <Link to="/" className="text-white hover:text-yellow-400">Sponsors For Event</Link>
          <Link to="/" className="text-white hover:text-yellow-400">Wall of Love</Link>
        </nav>

        <div className="hidden lg:flex gap-x-4">
          {user ? (
            <div className="relative">
              <button 
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-blue-800 hover:text-white"
              >
                <UserCircleIcon className="h-6 w-6" />
                <span>{user.name || user.email.split('@')[0]}</span>
              </button>
              
              {/* User dropdown menu */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 z-50">
                  <div className="mb-4 border-b pb-2">
                    <p className="font-bold">{user.name || "User"}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    {user.userId && <p className="text-xs text-gray-500">ID: {user.userId}</p>}
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button onClick={openRegistration} className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-blue-800 hover:text-white">
                Login/SignUp
              </button>
            </>
          )}
        </div>

        <button className="lg:hidden" onClick={() => setMobileMenuOpen(true)}>
          <Bars3Icon className="h-8 w-8 text-black" />
        </button>
      </div>

      <Dialog open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} className="lg:hidden">
        <div className="fixed inset-y-0 right-0 w-64 bg-blue-600 shadow-xl p-4 flex flex-col z-50">
          <button onClick={() => setMobileMenuOpen(false)} className="self-end mb-4">
            <XMarkIcon className="h-8 w-8 text-black" />
          </button>
          <nav className="flex flex-col space-y-4">
            <Link to="/" className="text-white hover:text-yellow-400">Home</Link>
            <Link to="/" className="text-white hover:text-yellow-400">Religious Event</Link>
            <Link to="/" className="text-white hover:text-yellow-400">Sponsors For Event</Link>
            <Link to="/" className="text-white hover:text-yellow-400">Wall of Love</Link>
          </nav>
          <div className="mt-auto flex flex-col gap-2">
            {user ? (
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <UserCircleIcon className="h-6 w-6" />
                  <span className="font-bold">{user.name || user.email.split('@')[0]}</span>
                </div>
                <p className="text-sm text-gray-600">{user.email}</p>
                {user.userId && <p className="text-xs text-gray-500">ID: {user.userId}</p>}
                <button 
                  onClick={handleLogout}
                  className="w-full mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button onClick={openRegistration} className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-blue-800 hover:text-white">
                  Login/SignUp
                </button>
              </>
            )}
          </div>
        </div>
      </Dialog>

      {/* Registration Modal */}
      <Dialog open={isOpen} onClose={closeRegistration} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
          <button onClick={closeRegistration} className="absolute top-2 right-2">
            <XMarkIcon className="h-6 w-6 text-black" />
          </button>
          <Registration onAuthSuccess={handleAuthSuccess} />
        </div>
      </Dialog>
    </header>
  );
};

export default Navbar;