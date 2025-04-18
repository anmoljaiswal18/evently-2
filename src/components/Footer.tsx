import React from "react";
import { FaFacebookF, FaLinkedin, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      className="relative min-h-[300px] bg-cover bg-center text-white py-10"
      style={{ backgroundImage: "url('/images/footer.jpg')" }}
    >
      {/* Light Blur Overlay */}
      <div className="absolute inset-0 backdrop-blur-md bg-transparent"></div>


      <div className="relative container mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          
          {/* Left Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold uppercase leading-tight text-white drop-shadow-md">
              Need Help? <br /> Get In Touch
            </h2>
            <div className="text-gray-300">
              <a href="tel:+919304288699" className="block hover:text-yellow-400 transition">
                Call +91 9304288699
              </a>
              <a href="mailto:support@evently.com" className="block hover:text-yellow-400 transition">
                support@evently.com
              </a>
              <a href="#" className="block hover:text-yellow-400 transition">
                Raise A Ticket
              </a>
            </div>
          </div>

          {/* Right Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white drop-shadow-md">
              Join the Conversation
            </h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-500"><FaFacebookF size={24} /></a>
              <a href="#" className="hover:text-blue-700"><FaLinkedin size={24} /></a>
              <a href="#" className="hover:text-pink-500"><FaInstagram size={24} /></a>
              <a href="#" className="hover:text-green-500"><FaWhatsapp size={24} /></a>
            </div>

            {/* Footer Links */}
            <div className="flex flex-wrap gap-3 text-sm text-gray-300">
              <a href="#" className="hover:text-white">Competition</a>
              <a href="#" className="hover:text-white">Blog</a>
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms & Conditions</a>
              <a href="#" className="hover:text-white">Pricing</a>
              <a href="#" className="hover:text-white">Refund & Cancellation</a>
              <a href="#" className="hover:text-white">Careers</a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-500 w-full mt-12"></div>
        <div className="mt-8 text-center text-sm text-gray-300">
          2020 - 2025 © Evently Pvt. Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  );
}