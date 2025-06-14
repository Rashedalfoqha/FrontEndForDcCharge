import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FiChevronRight, FiChevronLeft, FiPhone, FiMail, FiClock, FiFacebook, FiInstagram } from "react-icons/fi";
import { CiYoutube } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useTheme } from "../context/ThemeProvider";

const ProfessionalServices = () => {
  const { lang, darkMode, setDarkMode, mobileMenuOpen, setMobileMenuOpen } = useTheme();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const isArabic = lang === "ar";

  const touchStartXRef = useRef(null);
  const touchEndXRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_HOST_URL}/api/page-content/installation-services/${lang}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [lang]);

  useEffect(() => {
    if (data) {
      const imagesLength = Array.isArray(data.sections[0]?.image) ? data.sections[0].image.length : 1;
      const timer = setInterval(() => {
        setActiveImageIndex((prev) => (prev + 1) % imagesLength);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [data]);

  const handleTouchStart = (e) => {
    touchStartXRef.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    touchEndXRef.current = e.changedTouches[0].screenX;
    handleSwipeGesture();
  };

  const handleSwipeGesture = () => {
    if (touchStartXRef.current !== null && touchEndXRef.current !== null) {
      const distance = touchStartXRef.current - touchEndXRef.current;
      const swipeThreshold = 50;
      if (distance > swipeThreshold) {
        setActiveImageIndex((prev) => {
          const imagesLength = Array.isArray(data.sections[0]?.image) ? data.sections[0].image.length : 1;
          return (prev + 1) % imagesLength;
        });
      } else if (distance < -swipeThreshold) {
        setActiveImageIndex((prev) => {
          const imagesLength = Array.isArray(data.sections[0]?.image) ? data.sections[0].image.length : 1;
          return (prev - 1 + imagesLength) % imagesLength;
        });
      }
    }
  };

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
              />
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

  // CSS Styles for arrows and dots
  const arrowButtonStyle = "absolute top-1/2 transform -translate-y-1/2 bg-green-600 bg-opacity-70 hover:bg-opacity-90 text-white rounded-full p-3 shadow-lg z-20 transition duration-300 ease-in-out cursor-pointer flex items-center justify-center";

  const dotsContainerStyle = "absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-20";
  const dotStyle = (active) =>
    `w-4 h-4 rounded-full transition-colors duration-300 cursor-pointer ${
      active ? "bg-green-600 dark:bg-green-400" : "bg-gray-300 dark:bg-gray-600"
    }`;

  return (
    <div className={`font-sans ${isArabic ? "rtl text-right" : "ltr text-left"} ${darkMode ? "dark bg-gray-900" : "bg-white"}`} dir={isArabic ? "rtl" : "ltr"}>
      <Navbar lang={lang} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="pt-24 bg-gradient-to-b from-white to-green-50 dark:from-gray-900 dark:to-gray-800">
        <section className="relative py-20 px-6 overflow-hidden">
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <motion.h1
                className="text-4xl md:text-5xl font-extrabold text-green-700 dark:text-green-400 mb-6 leading-tight"
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                {title}
              </motion.h1>

              {Array.isArray(sections[0]?.content) ? (
                sections[0].content.map((para, idx) => (
                  <motion.p
                    key={idx}
                    className="text-gray-600 dark:text-gray-300 text-lg mb-4 leading-relaxed"
                    initial={{ opacity: 0, x: isArabic ? 50 : -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 * (idx + 1), duration: 0.6 }}
                  >
                    {para}
                  </motion.p>
                ))
              ) : (
                <motion.p className="text-gray-600 dark:text-gray-300 text-lg mb-4 leading-relaxed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
                  {sections[0]?.content}
                </motion.p>
              )}
            </motion.div>

            {sections[0]?.image && Array.isArray(sections[0].image) ? (
              <div
                className="relative h-96 w-full rounded-3xl shadow-2xl overflow-hidden select-none"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                {sections[0].image.map((img, idx) => (
                  <motion.img
                    key={idx}
                    src={img}
                    alt={`Professional Service ${idx + 1}`}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
                    style={{ opacity: idx === activeImageIndex ? 1 : 0 }}
                    loading="lazy"
                    draggable={false}
                  />
                ))}

                {/* الأسهم */}
                <button
                  aria-label="Previous Image"
                  onClick={() =>
                    setActiveImageIndex((prev) => (prev - 1 + sections[0].image.length) % sections[0].image.length)
                  }
                  className={`${arrowButtonStyle} left-4`}
                >
                  <FiChevronLeft size={24} />
                </button>

                <button
                  aria-label="Next Image"
                  onClick={() => setActiveImageIndex((prev) => (prev + 1) % sections[0].image.length)}
                  className={`${arrowButtonStyle} right-4`}
                >
                  <FiChevronRight size={24} />
                </button>

                {/* النقاط */}
                <div className={dotsContainerStyle}>
                  {sections[0].image.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={dotStyle(idx === activeImageIndex)}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            ) : sections[0]?.image ? (
              <motion.img
                src={sections[0].image}
                alt="Professional Services"
                className="rounded-3xl shadow-2xl w-full max-w-4xl mx-auto border-8 border-white dark:border-gray-800"
                loading="lazy"
              />
            ) : null}
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-6 py-12">
          {sections.slice(1).map((section, index) => (
            <motion.section
              key={index}
              className={`mb-24 ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} flex flex-col lg:items-center gap-12`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <div className="lg:w-1/2">
                <motion.h2
                  className="text-3xl md:text-4xl font-bold text-green-700 dark:text-green-400 mb-6"
                  whileInView={{ x: 0 }}
                  initial={{ x: isArabic ? 50 : -50 }}
                  viewport={{ once: true }}
                >
                  {section.heading}
                </motion.h2>
                <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                  {Array.isArray(section.content) ? (
                    section.content.map((para, idx) => (
                      <motion.p
                        key={idx}
                        className="mb-4 leading-relaxed"
                        initial={{ opacity: 0, x: isArabic ? 30 : -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * idx }}
                      >
                        {para}
                      </motion.p>
                    ))
                  ) : (
                    <motion.p className="mb-4 leading-relaxed" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                      {section.content}
                    </motion.p>
                  )}
                </div>
              </div>

              <div
                className="lg:w-1/2 select-none"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                {section.image && Array.isArray(section.image) ? (
                  <motion.div
                    className="relative overflow-hidden rounded-xl shadow-lg"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                  >
                    <div className="relative h-96 w-full">
                      {section.image.map((img, idx) => (
                        <motion.img
                          key={idx}
                          src={img}
                          alt={`${section.heading} ${idx + 1}`}
                          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
                          style={{ opacity: idx === activeImageIndex ? 1 : 0 }}
                          loading="lazy"
                          draggable={false}
                        />
                      ))}

                      {/* الأسهم */}
                      <button
                        aria-label="Previous Image"
                        onClick={() =>
                          setActiveImageIndex((prev) => (prev - 1 + section.image.length) % section.image.length)
                        }
                        className={`${arrowButtonStyle} left-4`}
                      >
                        <FiChevronLeft size={24} />
                      </button>

                      <button
                        aria-label="Next Image"
                        onClick={() => setActiveImageIndex((prev) => (prev + 1) % section.image.length)}
                        className={`${arrowButtonStyle} right-4`}
                      >
                        <FiChevronRight size={24} />
                      </button>
                    </div>
                  </motion.div>
                ) : section.image ? (
                  <img
                    src={section.image}
                    alt={section.heading}
                    className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                ) : null}
              </div>
            </motion.section>
          ))}
        </div>

        {/* بقية الصفحة تبقى كما هي */}
        <section className="py-20 bg-green-600 dark:bg-green-700 text-white">
          <div className="max-w-4xl mx-auto text-center px-6">
            <motion.h2 className="text-3xl md:text-4xl font-bold mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              {isArabic ? "جاهزون لتقديم خدماتنا الاحترافية؟" : "Ready for our professional services?"}
            </motion.h2>
            <motion.p
              className="text-xl mb-8 opacity-90 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {isArabic ? "فريقنا من الخبراء جاهز لمساعدتك في تقديم أفضل الحلول لاحتياجاتك" : "Our team of experts is ready to help you with the best solutions for your needs"}
            </motion.p>
            <motion.a
              href="/contact"
              className="inline-block bg-white text-green-600 dark:text-green-700 hover:bg-gray-100 py-3 px-8 rounded-full text-lg font-medium transition shadow-lg hover:shadow-xl"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {isArabic ? "اتصل بنا الآن" : "Contact Us Now"}
            </motion.a>
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
              <motion.h2
                className="text-3xl font-bold text-green-700 dark:text-green-400"
                initial={{ opacity: 0, x: isArabic ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                {isArabic ? "تواصل معنا" : "Get In Touch"}
              </motion.h2>
              <motion.p
                className="text-gray-600 dark:text-gray-300 text-lg"
                initial={{ opacity: 0, x: isArabic ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                {isArabic
                  ? "فريقنا جاهز دائماً لمساعدتك والإجابة على استفساراتك على مدار الساعة."
                  : "Our dedicated team is here to assist you and answer your inquiries 24/7 through all channels."}
              </motion.p>

              <div className="space-y-4">
                <motion.div
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: isArabic ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-full mt-1">
                    <FiPhone className="text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-medium dark:text-white">{isArabic ? "الهاتف" : "Phone"}</h4>
                    <p className="text-gray-600 dark:text-gray-300">+962-79-0085-686</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: isArabic ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-full mt-1">
                    <FiMail className="text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-medium dark:text-white">{isArabic ? "البريد الإلكتروني" : "Email"}</h4>
                    <p className="text-gray-600 dark:text-gray-300">info@evsjo.com</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: isArabic ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-full mt-1">
                    <FiClock className="text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-medium dark:text-white">{isArabic ? "ساعات العمل" : "Working Hours"}</h4>
                    <p className="text-gray-600 dark:text-gray-300">{isArabic ? "الأحد - الخميس: 8 صباحًا - 6 مساءً" : "Sunday - Thursday: 8AM - 6PM"}</p>
                  </div>
                </motion.div>
              </div>

              <motion.div
                className="mt-8"
                initial={{ opacity: 0, x: isArabic ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <h4 className="font-medium dark:text-white mb-4">{isArabic ? "تابعنا" : "Follow Us"}</h4>
                <div className="flex gap-4">
                  <motion.a
                    href="https://www.facebook.com/EVSolutionJo"
                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-green-600 hover:text-white transition"
                    whileHover={{ y: -3 }}
                  >
                    <FiFacebook className="text-gray-700 dark:text-gray-300 hover:text-white" />
                  </motion.a>
                  <motion.a
                    href="https://www.youtube.com/@evsjo"
                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-green-600 hover:text-white transition"
                    whileHover={{ y: -3 }}
                  >
                    <CiYoutube className="text-gray-700 dark:text-gray-300 hover:text-white" />
                  </motion.a>
                  <motion.a
                    href="https://www.instagram.com/EVSolutionJo"
                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-green-600 hover:text-white transition"
                    whileHover={{ y: -3 }}
                  >
                    <FiInstagram className="text-gray-700 dark:text-gray-300 hover:text-white" />
                  </motion.a>
                  <motion.a
                    href="https://api.whatsapp.com/send/?phone=962790085686&text&type=phone_number&app_absent=0"
                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-green-600 hover:text-white transition"
                    whileHover={{ y: -3 }}
                  >
                    <FaWhatsapp className="text-gray-700 dark:text-gray-300 hover:text-white" />
                  </motion.a>
                </div>
              </motion.div>
            </div>

            <motion.form
              className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-lg space-y-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{isArabic ? "أرسل رسالة" : "Send a Message"}</h3>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {isArabic ? "الاسم الكامل" : "Full Name"}
                </label>
                <motion.input
                  type="text"
                  id="name"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                  whileFocus={{ scale: 1.01 }}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {isArabic ? "البريد الإلكتروني" : "Email Address"}
                </label>
                <motion.input
                  type="email"
                  id="email"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                  whileFocus={{ scale: 1.01 }}
                />
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {isArabic ? "نوع الخدمة المطلوبة" : "Service Needed"}
                </label>
                <motion.select
                  id="service"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                  whileFocus={{ scale: 1.01 }}
                >
                  <option value="">{isArabic ? "اختر الخدمة" : "Select Service"}</option>
                  <option value="installation">{isArabic ? "خدمات التركيب" : "Installation Services"}</option>
                  <option value="maintenance">{isArabic ? "الصيانة" : "Maintenance"}</option>
                  <option value="consultation">{isArabic ? "استشارة فنية" : "Technical Consultation"}</option>
                </motion.select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {isArabic ? "تفاصيل الطلب" : "Request Details"}
                </label>
                <motion.textarea
                  id="message"
                  rows="5"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                  whileFocus={{ scale: 1.01 }}
                ></motion.textarea>
              </div>

              <motion.button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg text-lg transition flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isArabic ? "إرسال الطلب" : "Submit Request"}
                <FiChevronRight className={isArabic ? "transform rotate-180" : ""} />
              </motion.button>
            </motion.form>
          </div>
        </motion.section>
      </main>
      <Footer lang={lang} darkMode={darkMode} setDarkMode={setDarkMode} />
    </div>
  );
};

export default ProfessionalServices;
