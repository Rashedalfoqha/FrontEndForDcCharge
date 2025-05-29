import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { useTheme } from '../context/ThemeProvider';

const EvLandingHero = () => {
  const { lang, darkMode, mobileMenuOpen, setMobileMenuOpen, setDarkMode } = useTheme();
  const isArabic = lang === 'ar';

  return (
    <div className={`font-sans ${isArabic ? 'rtl text-right' : 'text-left'} ${darkMode ? 'dark bg-gray-900' : 'bg-white'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      
      {/* Navbar from your shared Partner component */}
      <Navbar
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Hero Section */}
      <div className={`relative overflow-hidden min-h-screen bg-gradient-to-b ${darkMode ? 'from-gray-900 to-gray-800' : 'from-white to-green-50'}`}>
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={`absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1605152276897-4f618f831968?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10`}
          ></div>

          {/* Floating bubbles with adjusted color for green theme */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-green-400/20"
              initial={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: 0.3,
              }}
              animate={{
                opacity: [0.3, 0.5, 0.3],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-6 py-12 md:py-20">
          <div className="flex flex-col items-center text-center">
            {/* App screenshot */}
            <motion.div
              className="relative mb-10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-64 h-auto relative mx-auto">
                {/* Phone frame */}
                <svg viewBox="0 0 308 632" fill="none" className="w-full h-auto">
                  <path
                    d="M1 54.5C1 24.9528 24.9528 1 54.5 1H253.5C283.047 1 307 24.9528 307 54.5V577.5C307 607.047 283.047 631 253.5 631H54.5C24.9528 631 1 607.047 1 577.5V54.5Z"
                    stroke={darkMode ? '#9AE6B4' : '#276749'}
                    strokeWidth="2"
                  />
                  <path
                    d="M12 55.5C12 30.9233 31.9233 11 56.5 11H251.5C276.077 11 296 30.9233 296 55.5V576.5C296 601.077 276.077 621 251.5 621H56.5C31.9233 621 12 601.077 12 576.5V55.5Z"
                    fill={darkMode ? '#22543D' : 'white'}
                    stroke={darkMode ? '#9AE6B4' : '#276749'}
                    strokeWidth="2"
                  />
                </svg>

                {/* App screenshot inside phone */}
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-[88%] h-[95%] overflow-hidden rounded-xl">
                  {/* <img
                    src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                    alt="App screenshot"
                    className="w-full h-full object-cover"
                  /> */}
                </div>
              </div>
            </motion.div>

            {/* Text content */}
            <motion.h1
              className={`text-3xl md:text-4xl font-bold leading-tight mb-4 ${
                darkMode ? 'text-green-300' : 'text-green-700'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {isArabic ? 'اشحن سيارتك الكهربائية' : 'Charge Your EV'}{' '}
              <span className="text-green-400">{isArabic ? 'في أي مكان' : 'Anywhere'}</span>
            </motion.h1>

            <motion.p
              className={`text-lg mb-8 max-w-md ${
                darkMode ? 'text-green-200' : 'text-green-800'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              {isArabic
                ? 'اعثر على محطات الشحن، راقب شحنك، وادفع بسهولة مع تطبيقنا المحمول.'
                : 'Find charging stations, monitor your charge, and pay seamlessly with our mobile app.'}
            </motion.p>

            {/* App store badges */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 w-full max-w-xs mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <a
                href={""}
                className="bg-green-700 text-white rounded-xl px-4 py-3 flex items-center justify-center hover:bg-green-800 transition-colors"
              >
                {/* App Store SVG */}
                <svg className="w-6 h-6 mr-2" viewBox="0 0 384 512" fill="currentColor">
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 54-84.1-20.6-26.5-49.2-30.1-67.6-30.1-29.4 0-60.1 11.7-80.4 11.7-21.6 0-55.8-11.7-87.5-11.7-20.8 0-52.2 4.9-75.9 30.5C16.3 203.6 0 239.6 0 272.1c0 31.3 11.7 65.7 20.6 87.3 11.3 27.9 55.8 94.7 99.1 94.7 22.1 0 41.6-11.7 69.9-11.7 28.3 0 46.2 11.7 69.9 11.7 41.6 0 84.4-63.3 95.7-91.3 12.5-30.4 17.8-59.7 17.8-91.3-.1-17.2-3.2-33.5-8.3-48.8zM224 80.3c13.2 0 24-10.8 24-24s-10.8-24-24-24-24 10.8-24 24 10.8 24 24 24zm86.1 149.3c-3.9-20.5-15.8-38.5-34.2-51.7 17.2-21.1 19.6-50.4 4.8-73.5-16.9-27.4-54.3-36.4-83.9-19.3-32.5 20.9-36.3 56.8-22.5 86.5-14.6 17.5-22.8 38.7-22.8 62.3 0 21.9 7.6 42.3 22.8 58.9-1.5 4.9-2.3 10-2.3 15.2 0 37.6 27.9 72.4 72.9 72.4 41.4 0 74-29.8 74-70.8 0-31.3-14.3-56.5-42.1-69.1 8.8-13.8 12.4-30.2 10.3-47.3z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs">{isArabic ? 'حمّل من' : 'Download on the'}</div>
                  <div className="text-lg font-semibold">App Store</div>
                </div>
              </a>

              <a
                href={""}
                className="bg-green-700 text-white rounded-xl px-4 py-3 flex items-center justify-center hover:bg-green-800 transition-colors"
              >
                {/* Google Play SVG */}
                <svg className="w-6 h-6 mr-2" viewBox="0 0 512 512" fill="currentColor">
                  <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs">{isArabic ? 'احصل عليه من' : 'Get it on'}</div>
                  <div className="text-lg font-semibold">Google Play</div>
                </div>
              </a>
            </motion.div>

            {/* App features */}
            <motion.div
              className="mt-16 grid grid-cols-2 gap-6 max-w-md mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              {[
                { icon: '⚡', title: isArabic ? 'شحن سريع' : 'Fast Charging', desc: isArabic ? 'ابحث عن أسرع المحطات' : 'Find the fastest stations' },
                { icon: '📍', title: isArabic ? 'في الوقت الحقيقي' : 'Real-time', desc: isArabic ? 'تحديثات توفر مباشرة' : 'Live availability updates' },
                { icon: '💳', title: isArabic ? 'دفع سهل' : 'Easy Pay', desc: isArabic ? 'المدفوعات داخل التطبيق' : 'In-app payments' },
                { icon: '📊', title: isArabic ? 'تحليلات' : 'Analytics', desc: isArabic ? 'تتبع تاريخ الشحن' : 'Track your charging history' },
              ].map((feature, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm p-4 rounded-xl text-center text-green-900 dark:text-green-200">
                  <div className="text-2xl mb-2">{feature.icon}</div>
                  <h3 className="font-bold mb-1">{feature.title}</h3>
                  <p className="text-sm">{feature.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

      </div>

      {/* Footer from your shared Partner component */}
      <Footer lang={lang} />
    </div>
  );
};

export default EvLandingHero;
