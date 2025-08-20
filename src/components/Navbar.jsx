import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '/src/assets/logo.jpeg'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Close menu when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('#navbar-default') && !event.target.closest('button')) {
        setIsOpen(false);
      }
    };

    // Handle scroll effect for navbar
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(prev => !prev);

  return (
    <nav className={`bg-white sticky top-0 z-50 border-b transition-all duration-300 ${isScrolled ? 'shadow-md' : 'shadow-sm'}`}>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo and Title */}
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="h-10 w-10 rounded-full border-2 border-gray-200" alt="Logo" />
          <span className="self-center text-2xl font-bold whitespace-nowrap text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ProblemSolver
          </span>
        </Link>

        {/* Toggle Button - Improved for mobile */}
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-700 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-300"
          aria-controls="navbar-default"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          {!isOpen ? (
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </button>

        {/* Menu Links - Enhanced for mobile */}
        <div 
          className={`${isOpen ? 'block animate-fadeIn' : 'hidden'} w-full md:block md:w-auto`} 
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-white md:flex-row md:space-x-6 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent items-center">
            <li className="w-full md:w-auto">
              <Link
                to="/"
                className="block py-3 px-3 text-gray-800 rounded-sm hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 transition-colors duration-300 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li className="w-full md:w-auto">
              <Link
                to="/about"
                className="block py-3 px-3 text-gray-800 rounded-sm hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 transition-colors duration-300 font-medium"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
            </li>
            <li className="w-full md:w-auto">
              <Link
                to="/myinfo"
                className="block py-3 px-3 text-gray-800 rounded-sm hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 transition-colors duration-300 font-medium"
                onClick={() => setIsOpen(false)}
              >
                MyInfo
              </Link>
            </li>
            <li className="w-full md:w-auto">
              <Link
                to="/pricing"
                className="block py-3 px-3 text-gray-800 rounded-sm hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 transition-colors duration-300 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </Link>
            </li>
            <li className="w-full md:w-auto">
              <Link
                to="/problems"
                className="block py-3 px-3 text-gray-800 rounded-sm hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 transition-colors duration-300 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Problems
              </Link>
            </li>
            <li className="w-full md:w-auto mt-2 md:mt-0">
              <Link
                to="/contact"
                className="block py-3 px-6 text-center text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full md:rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium md:ml-4 shadow-md hover:shadow-lg"
                onClick={() => setIsOpen(false)}
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-20 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;