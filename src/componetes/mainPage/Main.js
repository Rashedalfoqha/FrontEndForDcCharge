import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Navbar from "../Navbar";
import MapSection from "./MapSection";
import { FiChevronRight } from "react-icons/fi";
import Footer from "../Footer";
import { useTheme } from "../context/ThemeProvider";

export default function Main() {
  const {
    lang,
    mobileMenuOpen,
    setMobileMenuOpen,
  } = useTheme();

  const [data, setData] = useState(null);
console.log(process.env.REACT_APP_HOST_URL);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_HOST_URL}/api/page-content/home/${lang}`)
      .then((response) => {
        setData(response.data)

      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [lang]);

  if (!data)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="space-y-4">
          <div className="flex space-x-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-72 h-80 bg-gray-200 rounded-2xl animate-pulse"
              ></div>
            ))}
          </div>
          <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto animate-pulse"></div>
        </div>
      </div>
    );

  const { sections } = data;
  const getSection = (id) => sections.find((section) => section.id === id);

  const Hero = getSection("hero");
  const Story = getSection("Our Story & Vision");
  const WhyChoose = getSection("Why Choose Us?");

  const isArabic = lang === "ar";

  const services = [
    {
      title:
        lang === "en"
          ? "Home Charging Installation"
          : "تركيب محطات الشحن المنزلية",
      icon: "🏠",
      desc:
        lang === "en"
          ? "Professional installation of Level 2 chargers for residential properties"
          : "تركيب محطات الشحن المنزلية من المستوى الثاني",
    },
    {
      title: lang === "en" ? "Commercial Solutions" : "حلول تجارية",
      icon: "🏢",
      desc:
        lang === "en"
          ? "Custom EV charging solutions for businesses and public spaces"
          : "حلول شحن المركبات الكهربائية المخصصة للشركات والأماكن العامة",
    },
    {
      title: lang === "en" ? "Maintenance & Support" : "الصيانة والدعم",
      icon: "🔧",
      desc:
        lang === "en"
          ? "24/7 monitoring and maintenance services for your charging stations"
          : "خدمات المراقبة والصيانة على مدار الساعة لمحطات الشحن الخاصة بك",
    },
  ];

  const features = [
    {
      title: lang === "en" ? "Certified Technicians" : "فنيون معتمدون",
      icon: "✅",
    },
    {
      title: lang === "en" ? "24/7 Support" : "دعم على مدار الساعة",
      icon: "🕒",
    },
    {
      title: lang === "en" ? "Competitive Pricing" : "أسعار تنافسية",
      icon: "💲",
    },
    {
      title: lang === "en" ? "Warranty Included" : "ضمان شامل",
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

  const stats = [
    {
      label: lang === "en" ? "Chargers Installed" : "محطة شحن",
      targetValue: 250,
      id: "chargers",
    },
    {
      label: lang === "en" ? "Support Availability" : "دعم فني دائم",
      targetValue: 24,
      id: "support",
    },
    {
      label: lang === "en" ? "Customer Satisfaction" : "رضا العملاء",
      targetValue: 98,
      id: "satisfaction",
    },
    {
      label: lang === "en" ? "Years Experience" : "سنوات خبرة",
      targetValue: 5,
      id: "experience",
    },
  ];

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
                    {lang === "en" ? "Our Services" : "خدماتنا"}
                  </motion.a>
                </div>
              </div>
              <div className="relative">
                <img
                  src={Hero.image}
                  alt="EV Charging Station"
                  className="w-full h-auto rounded-3xl shadow-2xl object-cover border-8 border-white dark:border-gray-800"
                  loading="lazy"
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
                      {lang === "en" ? "50+ Locations" : "50+ موقع"}
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
              {stats.map((state) => (
                <AnimatedCounter
                  key={state.id}
                  targetValue={state.targetValue}
                  label={state.label}
                />
              ))}
            </div>
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
                {lang === "en" ? "OUR SERVICES" : "خدماتنا"}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mt-2 mb-4">
                {lang === "en"
                  ? "Comprehensive EV Solutions"
                  : "حلول شاملة للسيارات الكهربائية"}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {lang === "en"
                  ? "From residential installations to commercial charging networks, we cover all your EV charging needs"
                  : "من التركيبات المنزلية إلى شبكات الشحن التجارية، نحن نغطي جميع احتياجات شحن سيارتك الكهربائية"}
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
              />
              <div className="absolute -bottom-6 -right-6 bg-green-600 dark:bg-green-500 text-white p-6 rounded-xl shadow-lg">
                <div className="text-3xl font-bold">5+</div>
                <div className="text-sm">
                  {lang === "en" ? "Years Experience" : "سنوات خبرة"}
                </div>
              </div>
            </div>
            <div>
              <span className="text-green-600 dark:text-green-400 font-medium">
                {lang === "en" ? "OUR STORY" : "قصتنا"}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mt-2 mb-6">
                {lang === "en" ? "Our Story & Vision" : "قصتنا ورؤيتنا"}
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
                {lang === "en" ? "WHY CHOOSE US" : "لماذا نحن"}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mt-2 mb-6">
                {lang === "en" ? "Why Choose Us?" : "لماذا تختارنا؟"}
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
              />
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-700 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 dark:bg-green-900/50 p-2 rounded-full">
                    {/* Icon */}
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
                      {lang === "en" ? "Fast Installation" : "تركيب سريع"}
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
                {lang === "en" ? "TESTIMONIALS" : "آراء العملاء"}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mt-2 mb-4">
                {lang === "en" ? "What Our Clients Say" : "ماذا يقول عملاؤنا"}
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
                    {lang === "en"
                      ? "The installation was quick and professional. My EV charger works perfectly and their support team is always available."
                      : "كان التركيب سريعًا واحترافيًا. يعمل شاحن سيارتي الكهربائية بشكل مثالي وفريق الدعم الخاص بهم متاح دائمًا."}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                    <div>
                      <div className="font-medium dark:text-white">
                        {lang === "en" ? `Client ${i}` : `عميل ${i}`}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {lang === "en" ? "Amman, Jordan" : "عمان، الأردن"}
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
                {lang === "en" ? "CONTACT US" : "اتصل بنا"}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                {lang === "en" ? "Get In Touch" : "ابقى على تواصل"}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                {lang === "en"
                  ? "Our dedicated team is here to assist you and answer your inquiries 24/7 through all channels."
                  : "فريقنا جاهز دائماً لمساعدتك والإجابة على استفساراتك على مدار الساعة."}
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
                      {lang === "en" ? "Phone" : "الهاتف"}
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
                      {lang === "en" ? "Email" : "البريد الإلكتروني"}
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
                      {lang === "en" ? "Working Hours" : "ساعات العمل"}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {lang === "en"
                        ? "Sunday - Thursday: 8AM - 6PM"
                        : "الأحد - الخميس: 8 صباحًا - 6 مساءً"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-medium dark:text-white mb-4">
                  {lang === "en" ? "Follow Us" : "تابعنا"}
                </h4>
                <div className="flex gap-4">
                  {["Facebook", "Twitter", "Instagram", "LinkedIn"].map(
                    (social) => (
                      <a
                        key={social}
                        href={`https://www.${social.toLowerCase()}.com/evsjo`}
                        className="w-10 h-10 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center shadow hover:shadow-md transition"
                        aria-label={social}
                      >
                        <span className="text-gray-700 dark:text-gray-300">
                          {social[0]}
                        </span>
                      </a>
                    )
                  )}
                </div>
              </div>
            </div>

            <form className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                {lang === "en" ? "Send Us a Message" : "أرسل لنا رسالة"}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    {lang === "en" ? "Name" : "الاسم"}
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
                    {lang === "en" ? "Email" : "البريد الإلكتروني"}
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
                  {lang === "en" ? "Subject" : "الموضوع"}
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
                  {lang === "en" ? "Message" : "الرسالة"}
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
                {lang === "en" ? "Send Message" : "إرسال الرسالة"}
                <FiChevronRight />
              </motion.button>
            </form>
          </div>
        </motion.section>

        {/* Map Section */}
        <section className="h-96 w-full bg-gray-300 dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg my-12">
          <div className="h-full w-full">
            <MapSection lang={lang} />
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
