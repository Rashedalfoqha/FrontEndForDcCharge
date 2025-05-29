import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import { useTheme } from './context/ThemeProvider';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const {
    lang,
    setLang,
    darkMode,
    toggleDarkMode,
    mobileMenuOpen,
    setMobileMenuOpen,
  } = useTheme();

  const isArabic = lang === 'ar';

  const products = [
    { name: isArabic ? 'شواحن التيار المتردد (AC Chargers)' : 'AC Chargers', href: '/ac-chargers' },
    { name: isArabic ? 'شواحن التيار المستمر (DC Chargers)' : 'DC Chargers', href: '/dc-chargers' },
    { name: isArabic ? 'الخدمات المهنية' : 'Professional Services', href: '/professional-services' },
    { name: isArabic ? 'خدمات إصلاح الشواحن' : 'Chargers Repairing Services', href: '/chargers-repairing-services' },
    { name: isArabic ? 'خدمات الاستشارات المتخصصة لمحطات الشحن' : 'Exp. Consulting Services for Charging Stations', href: '/exp-consulting-services-for-charging-stations' },
  ];

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const hoverTimeout = useRef(null);

  const navigate = useNavigate();

  // Desktop hover handlers
  const handleMouseEnter = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 2000);
  };

  // Desktop click on Products & Services navigates to main page and closes menus
  const handleProductsClick = () => {
    navigate('/products-and-services');
    setDropdownOpen(false);
    if (mobileMenuOpen) setMobileMenuOpen(false);
  };

  // Mobile submenu toggle handler
  const toggleDropdownMobile = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <header
      className="fixed top-0 w-full z-50 bg-white dark:bg-gray-800 shadow-md transition-colors duration-300"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      <div
        className="container mx-auto px-6 py-4 flex items-center justify-between"
        style={{ direction: isArabic ? 'rtl' : 'ltr' }}
      >
        <div className="font-extrabold text-2xl tracking-tight text-green-700 dark:text-green-400 cursor-pointer" onClick={() => navigate('/')}>
          EV Solution JO
        </div>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex items-center gap-8 text-sm font-medium"
          style={{ direction: isArabic ? 'rtl' : 'ltr' }}
        >
          <a
            href="/"
            className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 relative group"
          >
            {lang === 'en' ? 'Home' : 'الرئيسية'}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
          </a>

          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={handleProductsClick}
              className="flex items-center text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 font-medium"
            >
              {lang === 'en' ? 'Products & Services' : 'المنتجات والخدمات'}
              <FiChevronDown
                className={`ml-1 ${isArabic ? 'rotate-180 mr-1 ml-0' : ''}`}
              />
            </button>

            <div
              className={`absolute top-full mt-2 w-72 bg-white dark:bg-gray-800 rounded-md shadow-lg transition-opacity duration-300 z-50 pointer-events-auto
                ${dropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
              style={{ [isArabic ? 'right' : 'left']: 0 }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <ul className="py-2">
                {products.map((product, i) => (
                  <li key={i}>
                    <a
                      href={product.href}
                      className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-700 hover:text-green-700 dark:hover:text-green-300 transition-colors"
                    >
                      {product.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <a
            href="/news"
            className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 relative group"
          >
            {isArabic ? 'الأخبار' : 'News'}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a
            href="/about"
            className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 relative group"
          >
            {lang === 'en' ? 'About' : 'من نحن'}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a
            href="/partners-customers"
            className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 relative group"
          >
            {lang === 'en' ? 'Partners' : 'شركاؤنا'}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a
            href="/contact"
            className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 relative group"
          >
            {lang === 'en' ? 'Contact' : 'اتصل بنا'}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a
            href="/landing"
            className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 relative group"
          >
            {lang === 'en' ? 'Download App' : 'تحميل التطبيق'}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
          </a>
        </nav>

        {/* Right side buttons */}
        <div
          className="flex items-center gap-4"
          style={{ direction: isArabic ? 'rtl' : 'ltr' }}
        >
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label={darkMode ? 'Light mode' : 'Dark mode'}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
          <button
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            className="px-3 py-1 border border-green-600 dark:border-green-400 text-green-600 dark:text-green-400 rounded-full hover:bg-green-600 dark:hover:bg-green-400 hover:text-white dark:hover:text-gray-900 transition-colors"
          >
            {lang === 'en' ? 'عربي' : 'English'}
          </button>
          <button
            className="md:hidden p-2"
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
              // Close dropdown when toggling mobile menu
              if (dropdownOpen) setDropdownOpen(false);
            }}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white dark:bg-gray-800 shadow-lg"
          dir={isArabic ? 'rtl' : 'ltr'}
        >
          <div
            className="container mx-auto px-6 py-4 flex flex-col gap-4"
            style={{ direction: isArabic ? 'rtl' : 'ltr' }}
          >
            <a
              href="/"
              className="py-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              {lang === 'en' ? 'Home' : 'الرئيسية'}
            </a>

            {/* Mobile: toggle submenu instead of navigating immediately */}
            <button
              onClick={toggleDropdownMobile}
              className="py-2 flex justify-between items-center w-full text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              aria-expanded={dropdownOpen}
            >
              <span>{lang === 'en' ? 'Products & Services' : 'المنتجات والخدمات'}</span>
              <FiChevronDown
                className={`ml-2 transition-transform ${
                  dropdownOpen ? 'rotate-180' : 'rotate-0'
                } ${isArabic ? 'ml-0 mr-2' : ''}`}
              />
            </button>

            {dropdownOpen && (
              <div className="pl-4 border-l-2 border-green-600 dark:border-green-400">
                {products.map((product, i) => (
                  <a
                    key={i}
                    href={product.href}
                    className="block py-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setDropdownOpen(false);
                    }}
                  >
                    {product.name}
                  </a>
                ))}

                {/* Optional link to main products page */}
                <a
                  href="/products-and-services"
                  className="block py-2 text-green-700 dark:text-green-400 font-semibold hover:underline"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setDropdownOpen(false);
                  }}
                >
                  {lang === 'en' ? 'View All Products & Services' : 'عرض كل المنتجات والخدمات'}
                </a>
              </div>
            )}

            <a
              href="/news"
              className="py-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              {isArabic ? 'الأخبار' : 'News'}
            </a>
            <a
              href="/about"
              className="py-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              {lang === 'en' ? 'About' : 'من نحن'}
            </a>
            <a
              href="/partners-customers"
              className="py-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              {lang === 'en' ? 'Partners' : 'شركاؤنا'}
            </a>
            <a
              href="/contact"
              className="py-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              {lang === 'en' ? 'Contact' : 'اتصل بنا'}
            </a>
            <a
              href="/landing"
              className="py-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              {lang === 'en' ? 'Download App' : 'تحميل التطبيق'}
            </a>
          </div>
        </motion.div>
      )}
    </header>
  );
}
