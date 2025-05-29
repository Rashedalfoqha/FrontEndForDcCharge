import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FiMapPin,
  
} from "react-icons/fi";
import Footer from "../Footer";
import Navbar from "../Navbar";
import { useTheme } from "../context/ThemeProvider";

const About = () => {
  const [data, setData] = useState(null);
  const {
    lang,
    setLang,
    darkMode,
   
  } = useTheme();
  const isArabic = lang === "ar";

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_HOST_URL}/api/page-content/about-2/${lang}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [lang]);

  if (!data)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="space-y-4">
          <div className="flex space-x-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-72 h-80 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse"
              ></div>
            ))}
          </div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto animate-pulse"></div>
        </div>
      </div>
    );

  const { sections, title } = data;

  const hero = sections.find((s) => s.id === "hero");
  const mission = sections.find((s) => s.id === "our-mission");
  const vision = sections.find((s) => s.id === "our-vision");
  const team = sections.find((s) => s.id === "team");

  return (
    <div
      className={`font-sans ${isArabic ? "text-right" : "text-left"} ${
        isArabic ? "rtl" : ""
      } ${darkMode ? "dark bg-gray-900" : "bg-white"}`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <Navbar lang={lang} setLang={setLang} />

      {/* Main Content */}
      <main className="pt-24 bg-gradient-to-b from-white to-green-50 dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <section className="relative py-20 px-6 overflow-hidden">
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <motion.h1
                  className="text-4xl md:text-5xl font-extrabold text-green-700 dark:text-green-400 mb-6 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {title}
                </motion.h1>
                {hero && (
                  <>
                    <motion.p
                      className="text-gray-600 dark:text-gray-300 text-lg mb-6 leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                    >
                      {hero.content}
                    </motion.p>
                    <motion.a
                      href={hero.ctaLink || "#"}
                      className="inline-block bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-full text-lg transition shadow-lg hover:shadow-green-600/30"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {hero.ctaText}
                    </motion.a>
                  </>
                )}
              </div>
              {hero?.image && (
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <img
                    src={hero.image}
                    alt="About EV Solution JO"
                    className="rounded-3xl shadow-2xl w-full h-auto object-cover border-8 border-white dark:border-gray-800"
                    loading="lazy"
                  />
                  <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-700 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-100 dark:bg-green-900/50 p-2 rounded-full">
                        <FiMapPin className="text-green-600 dark:text-green-400" />
                      </div>
                      <span className="text-sm font-medium">
                        {isArabic
                          ? "خدماتنا في جميع أنحاء الأردن"
                          : "Serving all of Jordan"}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-12 px-6 bg-white dark:bg-gray-700">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="grid md:grid-cols-3 gap-8 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {[
                {
                  title: isArabic ? "حلول مبتكرة" : "Innovative Solutions",
                  content: isArabic
                    ? "تكنولوجيا متطورة مصممة لتلبية الاحتياجات المتنوعة لمختلف الصناعات"
                    : "Cutting-edge technology tailored to meet the diverse needs of various industries",
                  icon: "💡",
                },
                {
                  title: isArabic ? "فريق خبراء" : "Expert Team",
                  content: isArabic
                    ? "متخصصون في الهندسة الكهروميكانيكية والمدنية ملتزمون بتقديم حلول عالية الجودة"
                    : "Specialists in Electromechanical and Civil Engineering dedicated to delivering top-notch solutions",
                  icon: "👨‍💼",
                },
                {
                  title: isArabic ? "قيم أخلاقية" : "Ethical Values",
                  content: isArabic
                    ? "ملتزمون بمعايير عالية والتخطيط طويل المدى وممارسات الأعمال الأخلاقية"
                    : "Committed to high standards, long-term planning and ethical business practices",
                  icon: "⚖️",
                },
              ].map((value, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-lg transition"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ y: -10 }}
                >
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-green-700 dark:text-green-400 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">{value.content}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 px-6 bg-green-50 dark:bg-gray-900">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
            {vision && (
              <motion.div
                className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-4">
                  {vision.heading}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {vision.content}
                </p>
              </motion.div>
            )}
            {mission && (
              <motion.div
                className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-4">
                  {mission.heading}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {mission.content}
                </p>
              </motion.div>
            )}
          </div>
        </section>

        {/* Team Section */}
        {team && (
          <section className="py-20 px-6 bg-white dark:bg-gray-800">
            <div className="max-w-6xl mx-auto">
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-center text-green-700 dark:text-green-400 mb-12"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {team.heading}
              </motion.h2>
              <motion.p
                className="text-center max-w-3xl mx-auto text-gray-700 dark:text-gray-300 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {team.content}
              </motion.p>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-20 px-6 bg-green-600 dark:bg-green-700 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {isArabic
                ? "انضم إلى الحركة الكهربائية"
                : "Join the Electric Movement"}
            </motion.h2>
            <motion.p
              className="text-xl mb-8 opacity-90 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {isArabic
                ? "استكشف حلول المركبات الكهربائية وابدأ مستقبلًا مستدامًا اليوم."
                : "Explore our range of electric vehicle solutions and make the switch to a sustainable future today."}
            </motion.p>
            <motion.a
              href="/products-and-services"
              className="inline-block bg-white text-green-600 dark:text-green-700 hover:bg-gray-100 py-3 px-8 rounded-full text-lg font-medium transition shadow-lg hover:shadow-xl"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {isArabic ? "اكتشف المزيد" : "Discover More"}
            </motion.a>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </div>
  );
};

export default About;
