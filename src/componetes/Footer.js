import React from 'react';
import { FiFacebook , FiInstagram } from 'react-icons/fi';
import { CiYoutube } from "react-icons/ci";
import { FaWhatsapp } from 'react-icons/fa';


export default function Footer({ lang }) {
  return (
    <footer className="bg-gray-200 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-green-700 dark:text-green-400 mb-4">EV Solution JO</h3>
            <p className="text-sm">
              {lang === 'en'
                ? 'Leading provider of EV charging solutions in Jordan'
                : 'الرائد في توفير حلول شحن السيارات الكهربائية في الأردن'}
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">{lang === 'en' ? 'Quick Links' : 'روابط سريعة'}</h4>
            <ul className="space-y-2">
              <li><a href={"/"} className="hover:text-green-600 dark:hover:text-green-400 transition">{lang === 'en' ? 'Home' : 'الرئيسية'}</a></li>
              <li><a href={"/products-and-services"} className="hover:text-green-600 dark:hover:text-green-400 transition">{lang === 'en' ? 'Services' : 'الخدمات'}</a></li>
              <li><a href={"/about"} className="hover:text-green-600 dark:hover:text-green-400 transition">{lang === 'en' ? 'About Us' : 'من نحن'}</a></li>
              <li><a href={"/contact"} className="hover:text-green-600 dark:hover:text-green-400 transition">{lang === 'en' ? 'Contact' : 'اتصل بنا'}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">{lang === 'en' ? 'Services' : 'الخدمات'}</h4>
            <ul className="space-y-2">
              <li><a href={"/home-installation"} className="hover:text-green-600 dark:hover:text-green-400 transition">{lang === 'en' ? 'Home Installation' : 'تركيب منزلي'}</a></li>
              <li><a href={"/exp-consulting-services-for-charging-stations"} className="hover:text-green-600 dark:hover:text-green-400 transition">{lang === 'en' ? 'Commercial Solutions' : 'حلول تجارية'}</a></li>
              <li><a href={"/chargers-repairing-services"} className="hover:text-green-600 dark:hover:text-green-400 transition">{lang === 'en' ? 'Maintenance' : 'الصيانة'}</a></li>
              <li><a href={"/contact"} className="hover:text-green-600 dark:hover:text-green-400 transition">{lang === 'en' ? 'Consultation' : 'استشارات'}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">{lang === 'en' ? 'Newsletter' : 'النشرة البريدية'}</h4>
            <p className="text-sm mb-4">
              {lang === 'en'
                ? 'Subscribe to our newsletter for the latest updates'
                : 'اشترك في نشرتنا البريدية للحصول على آخر التحديثات'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-2">
              <input
                type="email"
                placeholder={lang === 'en' ? 'Your email' : 'بريدك الإلكتروني'}
                className="px-4 py-2 w-full rounded-l-lg border border-gray-300 dark:border-gray-600 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-r-lg transition">
                {lang === 'en' ? 'Subscribe' : 'اشتراك'}
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 dark:border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">
            © {new Date().getFullYear()} EV Solution JO. {lang === 'en' ? 'All rights reserved.' : 'جميع الحقوق محفوظة.'}
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a
              href="https://www.facebook.com/EVSolutionJo"
              className="text-gray-500 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              aria-label="Facebook"
            >
              <FiFacebook size={18} />
            </a>
            <a
              href="https://www.youtube.com/@EVSolutionJo"
              className="text-gray-500 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              aria-label="Twitter"
            >
              <CiYoutube  size={18} />
            </a>
            <a
               href="https://www.instagram.com/EVSolutionJo"
              className="text-gray-500 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              aria-label="Instagram"
            >
              <FiInstagram size={18} />
            </a>
            <a
              href="https://api.whatsapp.com/send/?phone=962790085686&text&type=phone_number&app_absent=0"
              className="text-gray-500 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              aria-label="LinkedIn"
            >
              <FaWhatsapp size={18} />
            </a>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a
              href="/privacy"
              className="text-sm text-gray-500 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              {lang === 'en' ? 'Privacy Policy' : 'سياسة الخصوصية'}
            </a>
            <a
              href="/terms"
              className="text-sm text-gray-500 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              {lang === 'en' ? 'Terms of Service' : 'شروط الخدمة'}
            </a>
            <a
              href="/sitemap"
              className="text-sm text-gray-500 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              {lang === 'en' ? 'Sitemap' : 'خريطة الموقع'}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
