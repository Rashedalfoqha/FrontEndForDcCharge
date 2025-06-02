import React from "react";
import { motion } from "framer-motion";
import { FiChevronRight, FiPhone, FiMail, FiClock, FiMapPin, FiInstagram } from "react-icons/fi";
import { FaFacebook, FaWhatsapp } from "react-icons/fa";
import { CiYoutube } from "react-icons/ci";
import { useTheme } from "../context/ThemeProvider";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { TiSocialLinkedinCircular } from "react-icons/ti";

export default function ContactUs() {
  const { lang, darkMode, setDarkMode } = useTheme();

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <motion.section
        className="py-16 px-4 sm:px-6 lg:py-20 lg:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.span
              className="inline-block px-4 py-2 bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 font-medium rounded-full mb-4"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {lang === "en" ? "CONTACT US" : "اتصل بنا"}
            </motion.span>
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {lang === "en" ? "Get In Touch" : "ابقى على تواصل"}
            </motion.h2>
            <motion.p
              className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {lang === "en"
                ? "Our dedicated team is here to assist you and answer your inquiries 24/7 through all channels."
                : "فريقنا جاهز دائماً لمساعدتك والإجابة على استفساراتك على مدار الساعة."}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <motion.div
                className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md"
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                  {lang === "en" ? "Contact Information" : "معلومات التواصل"}
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-5">
                    <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-full text-green-600 dark:text-green-400 mt-1">
                      <FiPhone className="text-xl" />
                    </div>
                    <div>
                      <h4 className="font-medium text-lg dark:text-white">
                        {lang === "en" ? "Phone" : "الهاتف"}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">+962-79-0085-686</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5">
                    <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-full text-green-600 dark:text-green-400 mt-1">
                      <FiMail className="text-xl" />
                    </div>
                    <div>
                      <h4 className="font-medium text-lg dark:text-white">
                        {lang === "en" ? "Email" : "البريد الإلكتروني"}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">info@evsjo.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5">
                    <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-full text-green-600 dark:text-green-400 mt-1">
                      <FiClock className="text-xl" />
                    </div>
                    <div>
                      <h4 className="font-medium text-lg dark:text-white">
                        {lang === "en" ? "Working Hours" : "ساعات العمل"}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        {lang === "en"
                          ? "Sunday - Thursday: 8AM - 6PM"
                          : "الأحد - الخميس: 8 صباحًا - 6 مساءً"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5">
                    <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-full text-green-600 dark:text-green-400 mt-1">
                      <FiMapPin className="text-xl" />
                    </div>
                    <div>
                      <h4 className="font-medium text-lg dark:text-white">
                        {lang === "en" ? "Location" : "الموقع"}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        {lang === "en" ? "Amman, Jordan" : "عمان، الأردن"}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

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

            <motion.form
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                {lang === "en" ? "Send Us a Message" : "أرسل لنا رسالة"}
              </h3>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      {lang === "en" ? "Name" : "الاسم"}
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      {lang === "en" ? "Email" : "البريد الإلكتروني"}
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    {lang === "en" ? "Subject" : "الموضوع"}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    {lang === "en" ? "Message" : "الرسالة"}
                  </label>
                  <textarea
                    id="message"
                    rows="5"
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition"
                    required
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg text-lg transition flex items-center justify-center gap-2 font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {lang === "en" ? "Send Message" : "إرسال الرسالة"}
                  <FiChevronRight className="animate-pulse" />
                </motion.button>
              </div>
            </motion.form>
          </div>
        </div>
      </motion.section>
      <Footer lang={lang} darkMode={darkMode} setDarkMode={setDarkMode} />
    </div>
  );
}
