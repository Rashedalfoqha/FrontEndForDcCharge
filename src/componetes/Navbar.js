import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import { useTheme } from './context/ThemeProvider';
import { useNavigate } from 'react-router-dom';

const WhatsAppButton = () => {
  const whatsappLink = `https://api.whatsapp.com/send/?phone=962790085686&text&type=phone_number&app_absent=0`;
  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-colors"
      aria-label="Chat on WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-7 h-7"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M20.52 3.48A11.88 11.88 0 0012 0a11.87 11.87 0 00-10.6 16.66L0 24l7.59-1.99A11.86 11.86 0 0012 24c6.62 0 12-5.38 12-12 0-3.19-1.25-6.19-3.48-8.52zm-7.5 16a8.14 8.14 0 01-4.41-1.33l-.32-.22-4.06 1.06 1.08-4.03-.21-.33A8.09 8.09 0 014.5 7.5a7.5 7.5 0 1111.04 10.48z" />
        <path d="M17.48 14.07l-2.44-.7a.52.52 0 00-.5.12l-1.1 1.1a7.16 7.16 0 01-3.46-3.46l1.1-1.1a.5.5 0 00.11-.5l-.7-2.44a.52.52 0 00-.52-.37H8.13a.5.5 0 00-.5.5c0 3.04 2.47 5.5 5.5 5.5a.5.5 0 00.5-.5v-1.52a.52.52 0 00-.15-.38z" />
      </svg>
    </a>
  );
};

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

  const handleProductsClick = () => {
    navigate('/products-and-services');
    setDropdownOpen(false);
    if (mobileMenuOpen) setMobileMenuOpen(false);
  };

  const toggleDropdownMobile = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <>
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
                if (dropdownOpen) setDropdownOpen(false);
              }}
              aria-label="Menu"
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
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
      <WhatsAppButton phoneNumber="962790000000" message="مرحباً! أريد الاستفسار." />
    </>
  );
}
