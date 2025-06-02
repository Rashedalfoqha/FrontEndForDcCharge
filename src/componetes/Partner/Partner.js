import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Footer from '../Footer';
import Navbar from '../Navbar';
import { useTheme } from '../context/ThemeProvider';

const Partner = () => {
  const { lang, darkMode, setDarkMode, mobileMenuOpen, setMobileMenuOpen } = useTheme();
  const isArabic = lang === 'ar';

  const [brandsData, setBrandsData] = useState(null);
  const [customersData, setCustomersData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    Promise.all([
      axios.get(`${process.env.REACT_APP_HOST_URL}/brands`),
      axios.get(`${process.env.REACT_APP_HOST_URL}/customers`)
    ])
      .then(([brandsRes, customersRes]) => {
        const brandsArray = brandsRes.data.brands || [];
        const customersArray = customersRes.data.customers || [];
        console.log(customersArray)
        

        const brandsSection = brandsArray.length > 0 ? {
          heading: brandsArray[0].title?.[lang] || (isArabic ? "علاماتنا التجارية" : "Our Brands"),
          content: brandsArray[0].description?.[lang] || "",
          image: brandsArray[0].image || [],
        } : null;

        const customersSection = customersArray.length > 0 ? {
          heading: customersArray[0].title?.[lang] || (isArabic ? "عملاؤنا" : "Our Customers"),
          content: customersArray[0].description?.[lang] || "",
          images: customersArray[0].images || [],
        } : null;

        if (brandsSection) setBrandsData({ sections: [brandsSection] });
        else setBrandsData(null);

        if (customersSection) setCustomersData({ sections: [customersSection] });
        else setCustomersData(null);

      })
      .catch(err => {
        console.error(err);
        setError("Failed to fetch brands or customers");
      })
      .finally(() => setLoading(false));
  }, [lang, isArabic]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div
      className={`font-sans ${isArabic ? 'text-right rtl' : 'text-left'} ${darkMode ? 'dark bg-gray-900' : 'bg-white'}`}
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      <Navbar
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <main className="pt-24 bg-gradient-to-b from-white to-green-50 dark:from-gray-900 dark:to-gray-800">
        <section className="relative py-16 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <motion.h1
              className="text-4xl md:text-5xl font-extrabold text-green-700 dark:text-green-400 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {isArabic ? 'شركاؤنا وعملاؤنا' : 'Our Partners & Customers'}
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {isArabic
                ? 'نحن فخورون بالشراكة مع أبرز العلامات التجارية في مجال السيارات الكهربائية وتقنيات الشحن'
                : "We're proud to partner with leading brands in EV technology and charging solutions"}
            </motion.p>
          </div>
        </section>

        {/* قسم العلامات التجارية */}
        {brandsData?.sections?.map((section, idx) => (
          <section key={`brands-section-${idx}`} className="py-12 px-6">
            <div className="max-w-6xl mx-auto">
              <motion.div
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
                  {section.heading}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 max-w-3xl mb-8">
                  {section.content}
                </p>
              </motion.div>

              {section.image && Array.isArray(section.image) && (
                <motion.div
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8"
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
                  {section.image.map((imgSrc, i) => (
                    <motion.div
                      key={i}
                      className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex items-center justify-center h-40"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      whileHover={{ y: -5 }}
                    >
                      <img src={imgSrc} alt={`img-${i}`} className="object-contain h-full w-full" loading="lazy" />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </section>
        ))}

        {/* قسم العملاء */}
        {customersData?.sections?.map((section, idx) => (
          <section key={`customers-section-${idx}`} className="py-12 px-6">
            <div className="max-w-6xl mx-auto">
              <motion.div
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
                  {section.heading}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 max-w-3xl mb-8">
                  {section.content}
                </p>
              </motion.div>

              {section.images && Array.isArray(section.images) && (
                <motion.div
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8"
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
                  {section.images.map((imgObj, i) => (
                    <motion.div
                      key={i}
                      className="bg-white dark:bg-gray-700 p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col items-center"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      whileHover={{ y: -5 }}
                    >
                      <img
                        src={imgObj.url}
                        alt={imgObj.caption?.[lang] || `customer-img-${i}`}
                        className="object-contain h-40 w-full mb-3"
                        loading="lazy"
                      />
                      <p className="text-center text-gray-700 dark:text-gray-300 text-sm">
                        {imgObj.caption?.[lang]}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </section>
        ))}

        <section className={`py-16 px-6 ${darkMode ? ' dark:bg-gray-900' : 'bg-white'} text-bla`}>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {isArabic ? 'شكر خاص ودعوة' : 'Special Thanks and Invitation'}
            </h2>
            <p className="max-w-4xl text-gray-700 leading-relaxed">
              {isArabic
                ? 'نقدم شكرنا العميق لجميع شركائنا وعملائنا. لقد كانت ولاؤكم ودعمكم أساسًا لنمونا ونجاحنا. ونحن نتطلع إلى المستقبل بحماس للترحيب بعملاء وشركاء جدد في مجتمعنا. ندعوكم للانضمام إلينا وتجربة الجودة والخدمة الاستثنائية التي نعرف بها. معًا، يمكننا تحقيق أشياء عظيمة ومواصلة بناء علاقات دائمة.'
                : 'We extend our heartfelt thanks to all our partners and customers. Your loyalty and support have been instrumental in our growth and success. As we look to the future, we are excited to welcome new customers and partners into our community. We invite you to join us and experience the exceptional quality and service that we are known for. Together, we can achieve great things and continue to build lasting relationships.'}
            </p>
          </div>
        </section>

        <section className="py-20 px-6 bg-green-600 dark:bg-green-700 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {isArabic ? 'هل ترغب في أن تصبح شريكًا معنا؟' : 'Want to become a partner?'}
            </motion.h2>
            <motion.p
              className="text-xl mb-8 opacity-90"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {isArabic
                ? 'انضم إلى شبكة شركائنا المتنامية واستفد من فرص العمل في سوق السيارات الكهربائية سريع النمو'
                : 'Join our growing partner network and benefit from opportunities in the fast-growing EV market'}
            </motion.p>
            <motion.a
              href="/contact"
              className="inline-block bg-white text-green-600 dark:text-green-700 hover:bg-gray-100 py-3 px-8 rounded-full text-lg font-medium transition shadow-lg hover:shadow-xl"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {isArabic ? 'اتصل بنا' : 'Contact Us'}
            </motion.a>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </div>
  );
};

export default Partner;
