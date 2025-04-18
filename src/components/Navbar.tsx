import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Registration from "./Registration";
import { useRegistration } from "../context/RegistrationContext";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isOpen, closeRegistration, openRegistration } = useRegistration();

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
          <button onClick={openRegistration} className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-blue-800 hover:text-white">
            List Your Event
          </button>
          <button onClick={openRegistration} className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-blue-800 hover:text-white">
            Find Your Event
          </button>
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
            <button onClick={openRegistration} className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-blue-800 hover:text-white">
              List Your Event
            </button>
            <button onClick={openRegistration} className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-blue-800 hover:text-white">
              Find Your Event
            </button>
          </div>
        </div>
      </Dialog>

      {/* Shared Modal */}
      <Dialog open={isOpen} onClose={closeRegistration} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
          <button onClick={closeRegistration} className="absolute top-2 right-2">
            <XMarkIcon className="h-6 w-6 text-black" />
          </button>
          <Registration />
        </div>
      </Dialog>
    </header>
  );
};

export default Navbar;
