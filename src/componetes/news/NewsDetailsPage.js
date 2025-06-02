import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiClock, FiUser, FiTag } from 'react-icons/fi';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { useTheme } from '../context/ThemeProvider';

const NewsDetailsPage = () => {
  const { lang, darkMode } = useTheme();
  const isArabic = lang === 'ar';

  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const postResponse = await axios.get(`${process.env.REACT_APP_HOST_URL}/api/post/${id}`);
        setPost(postResponse.data);
      } catch (err) {
        setError(err.message || (isArabic ? 'حدث خطأ أثناء تحميل المنشور' : 'Error loading post'));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, isArabic]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0e1525]">
        <div className="space-y-4">
          <div className="flex space-x-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-72 h-80 bg-gray-700 rounded-2xl animate-pulse"></div>
            ))}
          </div>
          <div className="h-8 bg-gray-700 rounded w-1/2 mx-auto animate-pulse"></div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0e1525] text-green-400">
        <p className="mb-4 text-lg">{error}</p>
        <motion.button
          className="px-6 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
        >
          {isArabic ? 'عودة' : 'Go Back'}
        </motion.button>
      </div>
    );

  if (!post) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-green-400" dir={isArabic ? 'rtl' : 'ltr'}>
      <Navbar />

      <main className="pt-24 pb-16 max-w-4xl mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-12">
          <motion.button
            onClick={() => navigate(-1)}
            className={`flex items-center gap-2 mb-8 hover:text-green-600 transition-colors mx-auto ${
              isArabic ? 'flex-row-reverse justify-center' : ''
            } text-green-400`}
            whileHover={{ x: isArabic ? 5 : -5 }}
          >
            <FiChevronLeft />
            {isArabic ? 'عودة إلى الأخبار' : 'Back to News'}
          </motion.button>

          <article>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
              <div className="flex flex-wrap items-center justify-center gap-4 mb-6 text-green-400 text-sm">
                <div className="flex items-center gap-2">
                  <FiClock />
                  <time dateTime={post.publishedDate}>
                    {new Date(post.publishedDate).toLocaleDateString(isArabic ? 'ar-EG' : 'en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
                {post.author && (
                  <div className="flex items-center gap-2">
                    <FiUser />
                    <span>{post.author}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <FiTag />
                  <span className="px-3 py-1 rounded-full bg-green-700 text-green-200">{post.category}</span>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight text-[#6de07d]">{post.title}</h1>

              {post.imageUrl && (
                <motion.div className="mb-10 rounded-xl overflow-hidden shadow-lg mx-auto max-w-full" whileHover={{ scale: 1.005 }}>
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-auto max-h-[500px] object-cover"
                    onError={e => {
                      e.target.src = darkMode ? '/placeholder-dark.jpg' : '/placeholder-light.jpg';
                    }}
                  />
                </motion.div>
              )}

              <div className="max-w-xl mx-auto text-white/90 text-lg leading-relaxed">
                {post.body.split('\n').map((paragraph, i) => (
                  <p key={i} className="mb-6 text-gray-700 dark:text-white">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>
          </article>
        </motion.div>
      </main>

      <Footer lang={lang}/>
    </div>
  );
};

export default NewsDetailsPage;
