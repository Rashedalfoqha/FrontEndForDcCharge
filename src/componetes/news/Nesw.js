import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiChevronRight } from 'react-icons/fi';
import Footer from '../Footer';
import Navbar from '../Navbar';
import { useTheme } from '../context/ThemeProvider';

const NewsPage = () => {
  const {
    lang,
    
  } = useTheme();

  const isArabic = lang === 'ar';

  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_HOST_URL}/api/post/all`);
        setPosts(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [lang]);

  const latestPostsByCategory = React.useMemo(() => {
    if (!posts) return [];
    const grouped = {};
    posts.forEach(post => {
      if (!grouped[post.category]) {
        grouped[post.category] = post;
      } else {
        if (new Date(post.publishedDate) > new Date(grouped[post.category].publishedDate)) {
          grouped[post.category] = post;
        }
      }
    });
    return Object.values(grouped);
  }, [posts]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0e1525]">
        <div className="space-y-4">
          <div className="flex flex-wrap justify-center gap-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-72 h-80 rounded-2xl animate-pulse bg-gray-700"
              ></div>
            ))}
          </div>
          <div className="h-8 rounded w-1/2 mx-auto animate-pulse bg-gray-700"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0e1525] text-green-400 text-center p-6 max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">{isArabic ? 'حدث خطأ' : 'An error occurred'}</h2>
        <p className="mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white"
        >
          {isArabic ? 'إعادة المحاولة' : 'Retry'}
        </button>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-[#0e1525] text-green-400"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      <Navbar />

      <main className="pt-24 px-4 max-w-6xl mx-auto">
        <section className="relative py-16 text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold mb-4 text-[#6de07d]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {isArabic ? 'آخر الأخبار والتحديثات' : 'Latest News & Updates'}
          </motion.h1>
          <motion.p
            className="text-xl max-w-2xl mx-auto text-white/90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {isArabic
              ? 'ابق على اطلاع بأحدث الأخبار والتطورات في عالمنا'
              : 'Stay updated with the latest news and developments'}
          </motion.p>
        </section>

        <section className="py-12 px-2">
          {latestPostsByCategory.length === 0 ? (
            <div className="text-center py-12 text-white/90">
              <h3 className="text-xl font-medium">{isArabic ? 'لا توجد منشورات متاحة' : 'No posts available'}</h3>
            </div>
          ) : (
            <div className="flex flex-col gap-12">
              {latestPostsByCategory.map(post => (
                <motion.article
                  key={post._id}
                  className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-[#142038] rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex-shrink-0 w-full md:w-1/3 h-48 md:h-40 overflow-hidden rounded-lg border border-green-700">
                    <img
                      src={post.imageUrl || '/placeholder-dark.jpg'}
                      alt={post.title}
                      className="w-full h-full object-cover"
                      onError={e => {
                        e.target.src = '/placeholder-dark.jpg';
                      }}
                    />
                  </div>

                  <div className="flex flex-col flex-grow text-white">
                    <span className="mb-2 px-3 py-1 text-xs rounded self-start bg-green-800 text-green-300 font-semibold">
                      {post.category}
                    </span>
                    <time dateTime={post.publishedDate} className="text-xs text-green-400 mb-2">
                      {new Date(post.publishedDate).toLocaleDateString(isArabic ? 'ar-EG' : 'en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </time>
                    <h2 className="text-2xl font-semibold mb-3 text-[#6de07d]">{post.title}</h2>
                    <p className="text-base mb-6 text-white/90">{post.body}</p>
                    <motion.a
                      href={`/post/${post._id}`}
                      className="inline-flex items-center text-sm font-medium text-green-400 hover:text-green-300 transition-colors"
                      whileHover={{ x: isArabic ? -5 : 5 }}
                    >
                      {isArabic ? 'اقرأ المزيد' : 'Read More'}
                      <FiChevronRight className={isArabic ? 'mr-1' : 'ml-1'} />
                    </motion.a>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </section>
{/* 
        <section className="py-16 px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#6de07d]">
              {isArabic ? 'اشترك في نشرتنا البريدية' : 'Subscribe to our Newsletter'}
            </h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              {isArabic
                ? 'احصل على آخر الأخبار والتحديثات مباشرة إلى بريدك الإلكتروني'
                : 'Get the latest news and updates delivered straight to your inbox'}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder={isArabic ? 'بريدك الإلكتروني' : 'Your email address'}
                className="flex-grow px-4 py-3 rounded-lg border border-green-700 bg-[#142038] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                {isArabic ? 'اشتراك' : 'Subscribe'}
              </button>
            </div>
          </div>
        </section> */}
      </main>

      <Footer />
    </div>
  );
};

export default NewsPage;
