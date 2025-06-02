import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FiChevronRight, FiPhone, FiMail, FiClock, FiInstagram ,FiMapPin} from "react-icons/fi";
import { CiYoutube } from "react-icons/ci";
import { FaWhatsapp,FaFacebook } from "react-icons/fa";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useTheme } from "../context/ThemeProvider";
import { TiSocialLinkedinCircular } from "react-icons/ti";

const AcCharge = () => {
  const [data, setData] = useState(null);
  const { lang, darkMode } = useTheme();
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
      <Navbar />

      <main className="pt-24">
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

        <div className="max-w-6xl mx-auto px-6 py-12">
          {sections.slice(1).map((section, index) => (
            <motion.section
              key={index}
              className={`mb-24 ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } flex flex-col lg:items-center gap-12`}
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
                  <p className="mb-6 leading-relaxed">{section.content}</p>

                  {section.features && section.features.length > 0 && (
                    <div className="overflow-x-auto">
                      <table className="min-w-full table-auto border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300">
                        <thead>
                          <tr className="bg-green-100 dark:bg-green-900/30">
                            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                              {isArabic ? "الميزة" : "Feature"}
                            </th>
                            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                              {isArabic ? "القيمة" : "Value"}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {section.features.map((feature, idx) => (
                            <tr
                              key={idx}
                              className={idx % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-green-50 dark:bg-green-900/10"}
                            >
                              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-semibold">
                                {feature.name}
                              </td>
                              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                                {feature.value}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
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
      </main>

      <Footer lang={lang} />
    </div>
  );
};

export default AcCharge;