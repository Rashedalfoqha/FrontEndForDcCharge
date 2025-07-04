import React, { useEffect, useState, lazy, Suspense } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Navbar from "../Navbar";
import { FiChevronRight, FiInstagram } from "react-icons/fi";
import { FaFacebook, FaWhatsapp } from "react-icons/fa";
import { CiYoutube } from "react-icons/ci";
import { TiSocialLinkedinCircular } from "react-icons/ti";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeProvider";

// Lazy load heavy components
const MapSection = lazy(() => import("./MapSection"));
const Footer = lazy(() => import("../Footer"));

export default function Main() {
  const { lang, mobileMenuOpen, setMobileMenuOpen } = useTheme();
  const [news, setNews] = useState([]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [pageData, newsData] = await Promise.all([
          axios.get(`${process.env.REACT_APP_HOST_URL}/api/page-content/home/${lang}`),
          axios.get(`${process.env.REACT_APP_HOST_URL}/api/post/all`)
        ]);
        
        setData(pageData.data);
        setNews(newsData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [lang]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="space-y-4">
          <div className="flex flex-wrap justify-center gap-4">
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
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-medium text-gray-800 dark:text-white">
            {lang === "en" 
              ? "Failed to load data. Please try again later." 
              : "فشل تحميل البيانات. يرجى المحاولة مرة أخرى لاحقًا."}
          </h2>
        </div>
      </div>
    );
  }

  const { sections } = data;
  const getSection = (id) => sections.find((section) => section.id === id);

  const Hero = getSection("hero");
  const Story = getSection("Our Story & Vision");
  const WhyChoose = getSection("Why Choose Us?");
  const stats = getSection("stats");

  const isArabic = lang === "ar";

  const services = [
    {
      title: isArabic ? "تركيب محطات الشحن المنزلية" : "Home Charging Installation",
      icon: "🏠",
      desc: isArabic 
        ? "تركيب محطات الشحن المنزلية من المستوى الثاني" 
        : "Professional installation of Level 2 chargers for residential properties",
    },
    {
      title: isArabic ? "حلول تجارية" : "Commercial Solutions",
      icon: "🏢",
      desc: isArabic 
        ? "حلول شحن المركبات الكهربائية المخصصة للشركات والأماكن العامة" 
        : "Custom EV charging solutions for businesses and public spaces",
    },
    {
      title: isArabic ? "الصيانة والدعم" : "Maintenance & Support",
      icon: "🔧",
      desc: isArabic 
        ? "خدمات المراقبة والصيانة على مدار الساعة لمحطات الشحن الخاصة بك" 
        : "24/7 monitoring and maintenance services for your charging stations",
    },
  ];

  const features = [
    {
      title: isArabic ? "فنيون معتمدون" : "Certified Technicians",
      icon: "✅",
    },
    {
      title: isArabic ? "دعم على مدار الساعة" : "24/7 Support",
      icon: "🕒",
    },
    {
      title: isArabic ? "أسعار تنافسية" : "Competitive Pricing",
      icon: "💲",
    },
    {
      title: isArabic ? "ضمان شامل" : "Warranty Included",
      icon: "🛡️",
    },
  ];

  function AnimatedCounter({ targetValue, label }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
      const timer = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount < targetValue) {
            return prevCount + 1;
          } else {
            clearInterval(timer);
            return targetValue;
          }
        });
      }, 20);
      return () => clearInterval(timer);
    }, [targetValue]);

    return (
      <motion.div
        className="p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="text-4xl font-bold mb-2">
          <motion.span key={count}>{count}+</motion.span>
        </div>
        <div className="text-sm opacity-80">{label}</div>
      </motion.div>
    );
  }

  return (
    <div
      className={`font-sans ${isArabic ? "text-right rtl" : "text-left"}`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <Navbar
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <main className="pt-8 bg-gradient-to-b from-white to-green-50 dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <motion.section
          className="relative py-20 px-4 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-transparent dark:from-green-400/10"></div>
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-green-700 dark:text-green-400 mb-4 leading-tight">
                  {Hero.heading}
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg leading-relaxed max-w-lg">
                  {Hero.content}
                </p>
                <div className="flex flex-wrap gap-4">
                  <motion.a
                    href="/products-and-services"
                    className="inline-block bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-full text-lg transition shadow-lg hover:shadow-green-600/30"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {Hero.ctaText}
                  </motion.a>
                  <motion.a
                    href={"#services"}
                    className="inline-block border-2 border-green-600 text-green-600 dark:text-green-400 dark:border-green-400 hover:bg-green-600 hover:text-white dark:hover:bg-green-400 dark:hover:text-gray-900 py-3 px-8 rounded-full text-lg transition"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isArabic ? "خدماتنا" : "Our Services"}
                  </motion.a>
                </div>
              </div>
              <div className="relative">
                <img
                  src={Hero.image}
                  alt="EV Charging Station"
                  className="w-full h-auto rounded-3xl shadow-2xl object-cover border-8 border-white dark:border-gray-800"
                  loading="lazy"
                  width="600"
                  height="400"
                />
                <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <div className="bg-green-100 dark:bg-green-900/50 p-2 rounded-full">
                      <span
                        role="img"
                        aria-label="location"
                        className="text-green-600 dark:text-green-400"
                      >
                        📍
                      </span>
                    </div>
                    <span className="text-sm font-medium">
                      {isArabic ? "50+ موقع" : "50+ Locations"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Stats Section */}
        <section className="py-12 bg-green-600 dark:bg-green-700 text-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.features.map((state) => (
                <AnimatedCounter
                  key={state.id}
                  targetValue={state.value}
                  label={state.name}
                />
              ))}
            </div>
          </div>
        </section>

        {/* News Section */}
        <section className="py-12 bg-gray-100 dark:bg-gray-800" id="news">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <span className="text-green-600 dark:text-green-400 font-medium">
                {isArabic ? "أحدث الأخبار" : "LATEST NEWS"}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mt-2 mb-4">
                {isArabic ? "ابقَ على اطلاع" : "Stay Updated"}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {isArabic
                  ? "اقرأ آخر التحديثات والأخبار حول شركتنا وخدماتنا."
                  : "Read the latest updates and news about our company and services."}
              </p>
            </div>

            {news.length === 0 ? (
              <div className="text-center py-12 text-gray-600 dark:text-gray-400">
                {isArabic
                  ? "لا توجد أخبار متاحة في الوقت الحالي."
                  : "No news available at the moment."}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                {news.slice(0, 3).map((newsItem) => (
                  <motion.div
                    key={newsItem._id}
                    className="bg-white dark:bg-gray-700 rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="h-48 overflow-hidden">
                      <img
                        src={newsItem.imageUrl}
                        alt={newsItem.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        width="400"
                        height="200"
                      />
                    </div>
                    <div className="p-6">
                      <div className="text-sm text-green-600 dark:text-green-400 mb-2">
                        {new Date(newsItem.publishedDate).toLocaleDateString(
                          isArabic ? "ar-EG" : "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                        <Link
                          to={`post/${newsItem._id}`}
                          className="hover:text-green-600 dark:hover:text-green-400"
                        >
                          {newsItem.title}
                        </Link>
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                        {newsItem.body}
                      </p>
                      <Link
                        to={`post/${newsItem._id}`}
                        className="inline-flex items-center text-green-600 dark:text-green-400 hover:underline"
                      >
                        {isArabic ? "اقرأ المزيد" : "Read more"}
                        <FiChevronRight className="ml-1" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
            {news.length > 3 && (
              <div className="text-center py-4">
                <Link
                  to="/news"
                  className="inline-flex items-center text-green-600 dark:text-green-400 hover:underline"
                >
                  {isArabic ? "عرض جميع الأخبار" : "View All News"}
                  <FiChevronRight className="ml-1" />
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Services Section */}
        <section
          id="services"
          className="py-20 px-6 bg-gray-100 dark:bg-gray-800"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-green-600 dark:text-green-400 font-medium">
                {isArabic ? "خدماتنا" : "OUR SERVICES"}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mt-2 mb-4">
                {isArabic
                  ? "حلول شاملة للسيارات الكهربائية"
                  : "Comprehensive EV Solutions"}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {isArabic
                  ? "من التركيبات المنزلية إلى شبكات الشحن التجارية، نحن نغطي جميع احتياجات شحن سيارتك الكهربائية"
                  : "From residential installations to commercial charging networks, we cover all your EV charging needs"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, i) => (
                <motion.div
                  key={i}
                  className="bg-white dark:bg-gray-700 rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <div className="p-8">
                    <div className="text-5xl mb-6">{service.icon}</div>
                    <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      {service.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <motion.section
          className="py-20 px-6 bg-white dark:bg-gray-900"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src={Story.image}
                alt="Our Story"
                className="rounded-2xl shadow-xl w-full h-auto object-cover"
                loading="lazy"
                width="600"
                height="400"
              />
              <div className="absolute -bottom-6 -right-6 bg-green-600 dark:bg-green-500 text-white p-6 rounded-xl shadow-lg">
                <div className="text-3xl font-bold">5+</div>
                <div className="text-sm">
                  {isArabic ? "سنوات خبرة" : "Years Experience"}
                </div>
              </div>
            </div>
            <div>
              <span className="text-green-600 dark:text-green-400 font-medium">
                {isArabic ? "قصتنا" : "OUR STORY"}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mt-2 mb-6">
                {isArabic ? "قصتنا ورؤيتنا" : "Our Story & Vision"}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg font-medium leading-relaxed">
                {Story.heading}
              </p>
              <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                {Story.content}
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                {features.slice(0, 2).map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-xl">{feature.icon}</span>
                    <span className="font-medium dark:text-gray-200">
                      {feature.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Why Choose Us */}
        <motion.section
          className="py-20 px-6 bg-green-50 dark:bg-gray-800"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-green-600 dark:text-green-400 font-medium">
                {isArabic ? "لماذا نحن" : "WHY CHOOSE US"}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mt-2 mb-6">
                {isArabic ? "لماذا تختارنا؟" : "Why Choose Us?"}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6 whitespace-pre-line leading-relaxed">
                {WhyChoose.content}
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                {features.slice(2, 4).map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-xl">{feature.icon}</span>
                    <span className="font-medium dark:text-gray-200">
                      {feature.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src={WhyChoose.image}
                alt="Why Choose Us"
                className="rounded-2xl shadow-xl w-full h-auto object-cover"
                loading="lazy"
                width="600"
                height="400"
              />
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-700 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 dark:bg-green-900/50 p-2 rounded-full">
                    <span
                      role="img"
                      aria-label="clock"
                      className="text-green-600 dark:text-green-400"
                    >
                      ⏰
                    </span>
                  </div>
                  <div>
                    <div className="font-medium">
                      {isArabic ? "تركيب سريع" : "Fast Installation"}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      24-48 hours
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Testimonials */}
        <section className="py-20 px-6 bg-white dark:bg-gray-900">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-green-600 dark:text-green-400 font-medium">
                {isArabic ? "آراء العملاء" : "TESTIMONIALS"}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mt-2 mb-4">
                {isArabic ? "ماذا يقول عملاؤنا" : "What Our Clients Say"}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="flex items-center gap-2 text-yellow-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
                    {isArabic
                      ? "كان التركيب سريعًا واحترافيًا. يعمل شاحن سيارتي الكهربائية بشكل مثالي وفريق الدعم الخاص بهم متاح دائمًا."
                      : "The installation was quick and professional. My EV charger works perfectly and their support team is always available."}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                    <div>
                      <div className="font-medium dark:text-white">
                        {isArabic ? `عميل ${i}` : `Client ${i}`}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {isArabic ? "عمان، الأردن" : "Amman, Jordan"}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
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
                    <span
                      role="img"
                      aria-label="phone"
                      className="text-green-600 dark:text-green-400"
                    >
                      📞
                    </span>
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
                    <span
                      role="img"
                      aria-label="email"
                      className="text-green-600 dark:text-green-400"
                    >
                      📧
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium dark:text-white">
                      {isArabic ? "البريد الإلكتروني" : "Email"}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      info@evsjo.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-full mt-1">
                    <span
                      role="img"
                      aria-label="clock"
                      className="text-green-600 dark:text-green-400"
                    >
                      ⏰
                    </span>
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

              <motion.div
                className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md"
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h4 className="font-medium text-xl dark:text-white mb-4">
                  {isArabic ? "تابعنا" : "Follow Us"}
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
                <FiChevronRight />
              </motion.button>
            </form>
          </div>
        </motion.section>

        {/* Map Section */}
        <section className="h-96 w-full bg-gray-300 dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg my-12">
          <div className="h-full w-full">
            <Suspense fallback={<div className="h-full w-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">Loading map...</div>}>
              <MapSection lang={lang} />
            </Suspense>
          </div>
        </section>
      </main>

      <Suspense fallback={null}>
        <Footer lang={lang} />
      </Suspense>
    </div>
  );
}
