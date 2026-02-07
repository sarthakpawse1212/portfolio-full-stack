import  { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, ArrowLeft, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils/createPageURL'
import { AppContext } from '../context/AppContext';
import Loader from '../components/Loader';
import { formatBlogDate } from '../utils/formatDate';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export default function Blogs() {

  const [loading, setLoading] = useState(true);
  
  const { setBlogsData } = useContext(AppContext);

  const [blogs, setBlogs] = useState([]); // store blogs from backend
  const [page, setPage] = useState(1); // current page
  const [hasMore, setHasMore] = useState(true); // load more control
  const LIMIT = 6; // blogs per page

  const fetchBlogs = async (pageNumber = 1) => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/posts?page=${pageNumber}&limit=${LIMIT}`,
        //`http://localhost:3000/api/posts?page=${pageNumber}&limit=${LIMIT}`,
      );
      const result = await res.json();
      setLoading(false);

      // Append new blogs instead of replacing
      setBlogs((prev) => [...prev, ...result.data]);

      // Store in context also
      setBlogsData(result.data);

      // Stop Load More when no more pages
      if (pageNumber >= result.totalPages) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchBlogs(nextPage);
  };

  useEffect(() => {
    fetchBlogs(1); // load first 6 blogs
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Header */}

      <div className="sticky top-0 z-50 bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-purple-500/20">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between">
                  <Link 
                    to={createPageUrl('')}
                    className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Home
                  </Link>
      
                  <Link 
                to={createPageUrl('BlogEditor')}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-medium transition-all duration-300 shadow-lg shadow-purple-500/25 flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Create Blog
              </Link>
                </div>
              </div>
            </div>



      <div className="relative py-10 sm:py-20 lg:py-15 bg-gradient-to-b from-[#0f0f14] to-[#0a0a0f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            
            <span className="inline-block px-4 py-2 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              All Articles
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
              Learning in Public
            </h1>
            <p className="max-w-2xl mx-auto text-gray-400 text-base sm:text-lg">
              Practical insights, tutorials, and lessons from building real-world systems
            </p>
          </motion.div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative rounded-2xl overflow-hidden bg-[#1a1a24] border border-purple-500/20 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <img
                  src={blog.banner}
                  alt={blog.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a24] to-transparent" />
                
                {/* Category Badge */}
                {/* <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-purple-500 text-white text-xs font-medium">
                    {blog.category}
                  </span>
                </div> */}
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6">
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatBlogDate(blog.date)}
                  </div>
                  {/* <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {blog.readTime}
                  </div> */}
                </div>

                <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 group-hover:text-purple-400 transition-colors">
                  {blog.title}
                </h3>

                <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                  {blog.excerpt}
                </p>

                <Link 
                  to={`${createPageUrl('SingleBlog')}?id=${blog._id}`}
                  className="flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
                >
                  Read More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mt-12 sm:mt-16"
          >
            <button
              onClick={loadMore}
              className="px-6 sm:px-8 py-5 sm:py-6 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white transition-all duration-300 shadow-lg shadow-purple-500/25"
            >
              Load More Blogs
            </button>
          </motion.div>
        )}

        {/* All Loaded Message */}
        {!hasMore && blogs.length > 6 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-12 sm:mt-16"
          >
            <p className="text-gray-500 text-sm">Youve reached the end of the blog posts</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}