import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FiChevronRight,
  FiPhone,
  FiMail,
  FiClock,
  FiFacebook,
  FiInstagram,
} from "react-icons/fi";
import { CiYoutube } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";

import Footer from "../Footer";
import Navbar from "../Navbar";
import { useTheme } from "../context/ThemeProvider";

const ChargersRepairingServices = () => {
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
      .get(`${process.env.REACT_APP_HOST_URL}/api/page-content/ev-chargers-repair/${lang}`)
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
                className="w-72 h-80 bg-gray-200 dark:bg-gray-700 rounded-2xl"
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 1.5,
                }}
              ></motion.div>
            ))}
          </div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto"></div>
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
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {title}
            </motion.h1>

            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                className="mb-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Section Heading */}
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                  {section.heading}
                </h2>

                {/* Section Content */}
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                  {section.content}
                </p>

                {/* Images for hero section */}
                {section.id === "hero" &&
                  section.image &&
                  section.image.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                      {section.image.map((imgUrl, i) => (
                        <motion.div
                          key={i}
                          whileHover={{ scale: 1.03 }}
                          className="overflow-hidden rounded-xl shadow-lg"
                        >
                        <img
  src={imgUrl}
  alt={`Section ${section.id} item ${i + 1}`}
  className="w-full h-64 object-cover"
  loading="lazy"
/>
                        </motion.div>
                      ))}
                    </div>
                  )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-green-600 dark:bg-green-700 text-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
              <div className="p-4">
                <div className="text-4xl font-bold mb-2">100+</div>
                <div className="text-sm opacity-80">
                  {isArabic ? "إصلاح شهرياً" : "Monthly Repairs"}
                </div>
              </div>
              <div className="p-4">
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-sm opacity-80">
                  {isArabic ? "خدمة الطوارئ" : "Emergency Service"}
                </div>
              </div>
              <div className="p-4">
                <div className="text-4xl font-bold mb-2">95%</div>
                <div className="text-sm opacity-80">
                  {isArabic ? "رضا العملاء" : "Customer Satisfaction"}
                </div>
              </div>
              <div className="p-4">
                <div className="text-4xl font-bold mb-2">1-3</div>
                <div className="text-sm opacity-80">
                  {isArabic ? "أيام الإصلاح" : "Repair Days"}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <motion.section
          className="py-20 px-6 bg-gray-100 dark:bg-gray-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <span className="text-green-600 dark:text-green-400 font-medium">
                {isArabic ? "اتصل بنا" : "CONTACT US"}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                {isArabic ? "ابقى على تواصل" : "Get In Touch"}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                {isArabic
                  ? "فريقنا جاهز دائماً لمساعدتك والإجابة على استفساراتك على مدار الساعة."
                  : "Our dedicated team is here to assist you and answer your inquiries 24/7 through all channels."}
              </p>

              <div className="space-y-4 mt-8">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-full mt-1">
                    <FiPhone className="text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-medium dark:text-white">
                      {isArabic ? "الهاتف" : "Phone"}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      +962-79-0085-686
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-full mt-1">
                    <FiMail className="text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-medium dark:text-white">
                      {isArabic ? "البريد الإلكتروني" : "Email"}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Info@evsjo.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-full mt-1">
                    <FiClock className="text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-medium dark:text-white">
                      {isArabic ? "ساعات العمل" : "Working Hours"}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {isArabic
                        ? "الأحد - الخميس: 8 صباحًا - 6 مساءً"
                        : "Sunday - Thursday: 8AM - 6PM"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-medium dark:text-white mb-4">
                  {isArabic ? "تابعنا" : "Follow Us"}
                </h4>
                <div className="flex gap-4">
                  <a
                    href="https://www.facebook.com/EVSolutionJo"
                    className="w-10 h-10 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center shadow hover:shadow-md transition"
                    aria-label="Facebook"
                  >
                    <FiFacebook className="text-gray-700 dark:text-gray-300" />
                  </a>
                  <a
                    href="https://www.youtube.com/@evsjo"
                    className="w-10 h-10 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center shadow hover:shadow-md transition"
                    aria-label="Twitter"
                  >
                    <CiYoutube  className="text-gray-700 dark:text-gray-300" />
                  </a>
                  <a
                     href="https://www.instagram.com/EVSolutionJo"
                    className="w-10 h-10 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center shadow hover:shadow-md transition"
                    aria-label="Instagram"
                  >
                    <FiInstagram className="text-gray-700 dark:text-gray-300" />
                  </a>
                  <a
                    href="https://api.whatsapp.com/send/?phone=962790085686&text&type=phone_number&app_absent=0"
                    className="w-10 h-10 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center shadow hover:shadow-md transition"
                    aria-label="WhatsApp"
                  >
                    <FaWhatsapp className="text-gray-700 dark:text-gray-300" />
                  </a>
                </div>
              </div>
            </div>

            <form className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                {isArabic ? "أرسل لنا رسالة" : "Send Us a Message"}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    {isArabic ? "الاسم" : "Name"}
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    {isArabic ? "البريد الإلكتروني" : "Email"}
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  {isArabic ? "الموضوع" : "Subject"}
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  {isArabic ? "الرسالة" : "Message"}
                </label>
                <textarea
                  id="message"
                  rows="5"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  required
                ></textarea>
              </div>

              <motion.button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg text-lg transition flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isArabic ? "إرسال الرسالة" : "Send Message"}
                <FiChevronRight className={isArabic ? "transform rotate-180" : ""} />
              </motion.button>
            </form>
          </div>
        </motion.section>
      </main>

      <Footer lang={lang} />
    </div>
  );
};

export default ChargersRepairingServices;
