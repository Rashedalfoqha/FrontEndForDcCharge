import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiChevronRight, FiPhone, FiMail, FiClock, FiInstagram } from 'react-icons/fi';
import { CiYoutube } from 'react-icons/ci';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { useTheme } from '../context/ThemeProvider';
import { FaFacebook, FaWhatsapp } from 'react-icons/fa';
import { TiSocialLinkedinCircular } from 'react-icons/ti';

function ProductsServices() {
  const { lang, darkMode, setDarkMode, mobileMenuOpen, setMobileMenuOpen } = useTheme();
  const [data, setData] = useState(null);
  const isArabic = lang === 'ar';

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_HOST_URL}/api/page-content/products-and-services/${lang}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.error(err));
  }, [lang]);

  if (!data)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="space-y-4">
          <div className="flex space-x-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-72 h-80 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse"></div>
            ))}
          </div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto animate-pulse"></div>
        </div>
      </div>
    );

  const { sections } = data;

  return (
    <div className={`font-sans ${isArabic ? 'text-right rtl' : 'text-left'} ${darkMode ? 'dark bg-gray-900' : 'bg-white'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      <Navbar
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <main className="pt-24 bg-gradient-to-b from-white to-green-50 dark:from-gray-900 dark:to-gray-800">
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <motion.h1
              className="text-4xl md:text-5xl font-extrabold text-green-700 dark:text-green-400 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {sections[0].heading}
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {sections[0].content}
            </motion.p>
          </div>
        </section>

        <section className="py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {sections.slice(1).map((sec, idx) => (
                <motion.div
                  key={idx}
                  className="bg-white dark:bg-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <div className="h-60 overflow-hidden">
                    <img
                      src={sec.image}
                      alt={sec.heading}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-bold text-green-700 dark:text-green-400 mb-3">{sec.heading}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">{sec.content}</p>
                    <motion.a
                      href={sec.ctaLink}
                      className="inline-flex items-center text-green-600 dark:text-green-400 font-medium group"
                      whileHover={{ x: 5 }}
                    >
                      {sec.ctaText}
                      <FiChevronRight className={`ml-1 group-hover:translate-x-1 transition-transform ${isArabic ? 'transform rotate-180' : ''}`} />
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <motion.section
          className="py-20 px-6 bg-white dark:bg-gray-900"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-green-700 dark:text-green-400">{isArabic ? 'اتصل بنا' : 'Contact Us'}</h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                {isArabic
                  ? 'فريقنا جاهز دائماً لمساعدتك والإجابة على استفساراتك على مدار الساعة.'
                  : 'Our dedicated team is here to assist you and answer your inquiries 24/7 through all channels.'}
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-full mt-1">
                    <FiPhone className="text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-medium dark:text-white">{isArabic ? 'الهاتف' : 'Phone'}</h4>
                    <p className="text-gray-600 dark:text-gray-300">+962-79-0085-686</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-full mt-1">
                    <FiMail className="text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-medium dark:text-white">{isArabic ? 'البريد الإلكتروني' : 'Email'}</h4>
                    <p className="text-gray-600 dark:text-gray-300">info@evsjo.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-full mt-1">
                    <FiClock className="text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-medium dark:text-white">{isArabic ? 'ساعات العمل' : 'Working Hours'}</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {isArabic ? 'الأحد - الخميس: 8 صباحًا - 6 مساءً' : 'Sunday - Thursday: 8AM - 6PM'}
                    </p>
                  </div>
                </div>
              </div>

               <motion.div
                              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md"
                              initial={{ x: -50, opacity: 0 }}
                              whileInView={{ x: 0, opacity: 1 }}
                              transition={{ duration: 0.5, delay: 0.1 }}
                            >
                              <h4 className="font-medium text-xl dark:text-white mb-4">
                                {lang === "en" ? "Follow Us" : "تابعنا"}
                              </h4>
                              <div className="flex gap-4">
                                {[
                                  {
                                    icon: <FaFacebook size={18} />,
                                    name: "Facebook",
                                    href: "https://www.facebook.com/EVSolutionJo",
                                  },
                                  {
                                    icon: <CiYoutube size={18} />,
                                    name: "YouTube",
                                    href: "https://www.youtube.com/@EVSolutionJo",
                                  },
                                  {
                                    icon: <FiInstagram size={18} />,
                                    name: "Instagram",
                                    href: "https://www.instagram.com/EVSolutionJo",
                                  },
                                  {
                                    icon: <FaWhatsapp size={18} />,
                                    name: "WhatsApp",
                                    href: "https://api.whatsapp.com/send/?phone=962790085686&text&type=phone_number&app_absent=0",
                                  },
                                  {
                                    icon: <TiSocialLinkedinCircular size={18} />,
                                    name: "LinkedIn",
                                    href: "https://www.linkedin.com/company/evsolutionjo",
                                  },
                                ].map((social) => (
                                  <motion.a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center shadow hover:shadow-lg transition hover:bg-green-100 hover:text-green-600 dark:hover:bg-green-900/20 dark:hover:text-green-400"
                                    aria-label={social.name}
                                    whileHover={{ y: -3 }}
                                  >
                                    <span className="text-gray-700 dark:text-gray-300">
                                      {social.icon}
                                    </span>
                                  </motion.a>
                                ))}
                              </div>
                            </motion.div>
            </div>

            <form className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-lg space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                {isArabic ? 'أرسل لنا رسالة' : 'Send Us a Message'}
              </h3>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {isArabic ? 'الاسم' : 'Name'}
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {isArabic ? 'البريد الإلكتروني' : 'Email'}
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {isArabic ? 'الرسالة' : 'Message'}
                </label>
                <textarea
                  id="message"
                  rows="5"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                ></textarea>
              </div>

              <motion.button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg text-lg transition flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isArabic ? 'إرسال الرسالة' : 'Send Message'}
                <FiChevronRight className={isArabic ? 'transform rotate-180' : ''} />
              </motion.button>
            </form>
          </div>
        </motion.section>
      </main>

      <Footer lang={lang} />
    </div>
  );
}

export default ProductsServices;
