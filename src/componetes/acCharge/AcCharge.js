import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FiChevronRight, FiPhone, FiMail, FiClock, FiFacebook , FiInstagram } from "react-icons/fi";
import { CiYoutube } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";

import Navbar from "../Navbar";
import Footer from "../Footer";
import { useTheme } from "../context/ThemeProvider";

const AcCharge = () => {
  const [data, setData] = useState(null);
  const {
    lang,
    setLang,
    darkMode,
    setDarkMode,
    mobileMenuOpen,
    setMobileMenuOpen,
  } = useTheme();
  const [loading, setLoading] = useState(true);
  const isArabic = lang === "ar";

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_HOST_URL}/api/page-content/ac-chargers/${lang}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [lang]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="space-y-4">
          <div className="flex space-x-4">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-72 h-80 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse"
              ></motion.div>
            ))}
          </div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300">
        {isArabic ? "لا توجد بيانات للعرض" : "No data available"}
      </div>
    );
  }

  const { title, sections } = data;

  return (
    <div
      className={`font-sans ${isArabic ? "rtl text-right" : "ltr text-left"} ${
        darkMode ? "dark bg-gray-900" : "bg-white"
      }`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <Navbar
        lang={lang}
        setLang={setLang}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Main Content */}
      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative py-20 px-6 overflow-hidden">
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.h1
              className="text-4xl md:text-5xl font-extrabold text-green-700 dark:text-green-400 mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {title}
            </motion.h1>

            {sections[0]?.content.map((para, idx) => (
              <motion.p
                key={idx}
                className="text-gray-600 dark:text-gray-300 text-lg mb-4 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 * (idx + 1), duration: 0.6 }}
              >
                {para}
              </motion.p>
            ))}

            {sections[0]?.image && (
              <motion.div
                className="mt-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <img
                  src={sections[0].image}
                  alt="AC Chargers"
                  className="rounded-3xl shadow-2xl w-full max-w-4xl mx-auto border-8 border-white dark:border-gray-800"
                  loading="lazy"
                />
              </motion.div>
            )}
          </div>
        </section>

        {/* Features Sections */}
        <div className="max-w-6xl mx-auto px-6 py-12">
          {sections.slice(1).map((section, index) => (
            <motion.section
              key={index}
              className={`mb-24 ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} flex flex-col lg:items-center gap-12`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="lg:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold text-green-700 dark:text-green-400 mb-6">
                  {section.heading}
                </h2>
                <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                  <p className="mb-4 leading-relaxed">{section.content}</p>
                </div>
              </div>

              <div className="lg:w-1/2">
                {section.image && (
                  <motion.div
                    className="relative overflow-hidden rounded-xl shadow-lg"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={section.image}
                      alt={section.heading}
                      className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                  </motion.div>
                )}
              </div>
            </motion.section>
          ))}
        </div>

        {/* CTA Section */}
        <section className="py-20 bg-green-600 dark:bg-green-700 text-white">
          <div className="max-w-4xl mx-auto text-center px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              {isArabic ? "جاهزون لتركيب شاحن التيار المتردد الخاص بك؟" : "Ready to install your AC charger?"}
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              {isArabic
                ? "فريقنا من الخبراء جاهز لمساعدتك في اختيار وتركيب أفضل حل شحن لاحتياجاتك"
                : "Our team of experts is ready to help you choose and install the best charging solution for your needs"}
            </p>
            <motion.a
              href="/contact"
              className="inline-block bg-white text-green-600 dark:text-green-700 hover:bg-gray-100 py-3 px-8 rounded-full text-lg font-medium transition shadow-lg hover:shadow-xl"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {isArabic ? "اتصل بنا الآن" : "Contact Us Now"}
            </motion.a>
          </div>
        </section>

        {/* Contact Section */}
        <motion.section
          className="py-20 px-6 bg-white dark:bg-gray-900"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-green-700 dark:text-green-400">{isArabic ? 'تواصل معنا' : 'Get In Touch'}</h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                {isArabic
                  ? 'فريقنا جاهز دائماً لمساعدتك والإجابة على استفساراتك على مدار الساعة.'
                  : 'Our dedicated team is here to assist you and answer your inquiries 24/7 through all channels.'}
              </p>

              <div className="space-y-4 mt-8">
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

              <div className="mt-8">
                <h4 className="font-medium dark:text-white mb-4">{isArabic ? 'تابعنا' : 'Follow Us'}</h4>
                <div className="flex gap-4">
                  <a href="https://www.facebook.com/EVSolutionJo" className="w-10 h-10 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center hover:bg-green-600 hover:text-white transition">
                    <FiFacebook className="text-gray-700 dark:text-gray-300 hover:text-white" />
                  </a>
                  <a href="https://www.youtube.com/@EVSolutionJo" className="w-10 h-10 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center hover:bg-green-600 hover:text-white transition">
                    <CiYoutube  className="text-gray-700 dark:text-gray-300 hover:text-white" />
                  </a>
                  <a  href="https://www.instagram.com/EVSolutionJo" className="w-10 h-10 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center hover:bg-green-600 hover:text-white transition">
                    <FiInstagram className="text-gray-700 dark:text-gray-300 hover:text-white" />
                  </a>
                  <a href="https://api.whatsapp.com/send/?phone=962790085686&text&type=phone_number&app_absent=0" className="w-10 h-10 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center hover:bg-green-600 hover:text-white transition">
                    <FaWhatsapp className="text-gray-700 dark:text-gray-300 hover:text-white" />
                  </a>
                   
                </div>
              </div>
            </div>

            <form className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-lg space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                {isArabic ? 'أرسل رسالة' : 'Send a Message'}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {isArabic ? 'الاسم الكامل' : 'Full Name'}
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
                    {isArabic ? 'البريد الإلكتروني' : 'Email Address'}
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {isArabic ? 'نوع الخدمة المطلوبة' : 'Service Needed'}
                </label>
                <select
                  id="service"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                >
                  <option value="">{isArabic ? 'اختر الخدمة' : 'Select Service'}</option>
                  <option value="ac-charger">{isArabic ? 'شاحن تيار متردد' : 'AC Charger Installation'}</option>
                  <option value="dc-charger">{isArabic ? 'شاحن تيار مستمر' : 'DC Charger Installation'}</option>
                  <option value="consultation">{isArabic ? 'استشارة فنية' : 'Technical Consultation'}</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {isArabic ? 'تفاصيل الطلب' : 'Request Details'}
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
                {isArabic ? 'إرسال الطلب' : 'Submit Request'}
                <FiChevronRight className={isArabic ? 'transform rotate-180' : ''} />
              </motion.button>
            </form>
          </div>
        </motion.section>
      </main>

      <Footer lang={lang} />
    </div>
  );
};

export default AcCharge;
