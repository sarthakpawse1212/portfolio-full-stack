/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, BookOpen, Loader2 } from 'lucide-react';
// import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils/createPageURL'
import { formatBlogDate } from '../utils/formatDate';

export default function BlogSection( {blogs, loading}) {

  return (
    <section
      id="blogs"
      className="relative py-16 sm:py-24 lg:py-32 bg-[#0a0a0f]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            Latest Articles
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            Lessons From Building
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400 text-base sm:text-lg px-4">
            I write to clarify my thinking and share what I learn along the way.
          </p>
        </motion.div>

        {/* Blog Cards */}

        {loading ? (
          <div className="flex justify-center text-amber-50 ">
              <Loader2 className="mr-2 animate-spin text-white" />
              <p className=''>Loading...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
                  
                </div>

                <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 group-hover:text-purple-400 transition-colors">
                  {blog.title}
                </h3>

                <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                  {blog.excerpt}
                </p>

                <Link
                  to={`${createPageUrl("SingleBlog")}?id=${blog._id}`}
                  className="flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
                >
                  Continue Reading
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        )
        }
        

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex text-center mt-12 sm:mt-16 justify-center"
        >
          <button
            // asChild
            className="px-4 sm:px-6 py-3 sm:py-4 bg-transparent border-2 border-purple-500 hover:bg-purple-500 text-purple-400 hover:text-white rounded-lg text-base sm:text-lg font-medium transition-all duration-300"
          >
            <div className="flex justify-center flex-direction: row alighn-center align-items: center">
              <BookOpen className="justify-between w-4 h-4 sm:w-5 sm:h-5 mr-2 mt-1" />
              <Link to={"/blogs"}>Go to Blogs</Link>
            </div>
        
          </button>
        </motion.div>
      </div>
    </section>
  );
}