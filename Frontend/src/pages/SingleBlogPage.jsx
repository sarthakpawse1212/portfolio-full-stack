import  { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Share2, Facebook, Twitter, Linkedin, Heart, Github, Mail, Phone } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '../utils/createPageURL'
import { AppContext } from '../context/AppContext';
import { formatBlogDate } from '../utils/formatDate';
import SEO from '../components/SEO';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const contactLinks = [
  {
    icon: Github,
    label: 'GitHub',
    value: '@sarthak',
    href: 'https://github.com/sarthakpawse1212',
    color: 'hover:bg-gray-700',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'Sarthak Pawse',
    href: 'https://www.linkedin.com/in/sarthakpawse12',
    color: 'hover:bg-blue-600',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'sarthakpawse1212@gmail.com',
    href: 'mailto:sarthakpawse1212@gmail.com',
    color: 'hover:bg-red-500',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91-7972005578',
    href: 'tel:7972005578',
    color: 'hover:bg-emerald-500',
  },
];

export default function SingleBlog() {

  const {blogsData} = useContext(AppContext);

  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = (urlParams.get('id'));
    
    if(blogsData === null) {
      fetch(
         `${API_BASE_URL}/api/post/${blogId}`,
        // `http://localhost:3000/api/post/${blogId}`
      )
        .then(res => res.json())
        .then(data => {
          setBlog(data);
          
        })
        .catch(err => console.error("Error fetching blog:", err));
    }

    if(blogsData !== null) {
      const foundBlog = blogsData.find(b => b._id === blogId);

      if (foundBlog) {
        setBlog(foundBlog);
        // Get related blogs (same category, exclude current)
        const related = blogsData
          .filter(b => b.category === foundBlog.category && b._id !== foundBlog._id)
          .slice(0, 3);
        setRelatedBlogs(related);
      } else {
        navigate(createPageUrl('Blogs'));
      }
    }


  }, [navigate]);

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  const renderEditorJS = (blocks) => {

    if (!Array.isArray(blocks)) return null;

    return blocks.map((block, index) => {
       switch (block.type) {
        case 'header':
          { const HeaderTag = `h${block.data.level}`;
          return (
            <HeaderTag key={index} className="text-white font-bold mb-4" style={{
              fontSize: block.data.level === 2 ? '2rem' : block.data.level === 3 ? '1.5rem' : '1.25rem'
            }}>
              {block.data.text}
            </HeaderTag>
          ); }
        case 'paragraph':
          return (
            <p key={index} className="text-gray-300 mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: block.data.text }} />
          );
        case 'list':
          { const ListTag = block.data.style === 'ordered' ? 'ol' : 'ul';
          return (
            <ListTag key={index} className="text-gray-300 mb-4 ml-6" style={{ listStyle: block.data.style === 'ordered' ? 'decimal' : 'disc' }}>
              {block.data.items.map((item, i) => (
                <li key={i} className="mb-2" dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </ListTag>
          ); }
        case 'quote':
          return (
            <blockquote key={index} className="border-l-4 border-purple-500 pl-4 py-2 mb-4 text-gray-300 italic">
              <p dangerouslySetInnerHTML={{ __html: block.data.text }} />
              {block.data.caption && (
                <cite className="text-sm text-gray-500 not-italic">— {block.data.caption?.split('&')[0]}</cite>
              )}
            </blockquote>
          );
        case 'code':
          return (
            <pre key={index} className="bg-[#0a0a0f] p-4 rounded-lg mb-4 overflow-x-auto">
              <code className="text-green-400 text-sm">{block.data.code}</code>
            </pre>
          );
        case 'image':
          return (
            <div key={index} className="mb-4">
              <img src={block.data.file.url} alt={block.data.caption || ''} className="w-full rounded-lg" />
              {block.data.caption && (
                
                <p className="text-sm text-gray-500 text-center mt-2">{
                  block.data.caption?.split('&')[0]
                  
                  }
                  </p>
              )}
            </div>
          );
        default:
          return null;
      }
    });
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Fixed Header */}
      <div className="sticky top-0 z-50 bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-purple-500/20">
        <div className="max-w-5xl mx-auto ml-2 px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            to={createPageUrl('Blogs')}
            className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Blogs
          </Link>
        </div>
      </div>

      <SEO 
        title={blog.title} 
        description={blog.excerpt} 
        type="article"
        image={blog.banner}
      />

      {/* Hero Section with Banner */}
      <div className="relative">
        <div className="h-[400px] sm:h-[500px] relative overflow-hidden">
          <img 
            src={blog.banner} 
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/60 to-transparent" />
          
          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-12">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* <span className="inline-block px-4 py-2 rounded-full bg-purple-500 text-white text-sm font-medium mb-4">
                  {blog.category}
                </span> */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                  {blog.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-gray-300">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      {formatBlogDate(blog.date)}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-amber-50 prose prose-invert prose-lg max-w-none
            prose-headings:text-white prose-headings:font-bold
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
            prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-purple-400 prose-a:no-underline hover:prose-a:text-purple-300
            prose-strong:text-white
            prose-ul:text-gray-300 prose-ul:my-6
            prose-li:my-2
            prose-code:text-purple-400 prose-code:bg-[#1a1a24] prose-code:px-2 prose-code:py-1 prose-code:rounded
            prose-pre:bg-[#1a1a24] prose-pre:border prose-pre:border-purple-500/30 prose-pre:rounded-xl prose-pre:p-6
          "
          // load {blog.content } here
            // dangerouslySetInnerHTML={{ __html: blog.content }}
          
        >
         {blog?.content?.blocks && renderEditorJS(blog.content.blocks)}
        </motion.article>

        {/* Share Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-5 pt-8 border-t border-purple-500/20"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h3 className="text-white font-semibold text-lg">Share this article</h3>
            <div className="flex items-center gap-3">
              <button className="p-3 rounded-full bg-[#1a1a24] border border-purple-500/30 text-purple-400 hover:bg-purple-500 hover:text-white transition-all">
                <Twitter className="w-5 h-5" />
              </button>
              <button className="p-3 rounded-full bg-[#1a1a24] border border-purple-500/30 text-purple-400 hover:bg-purple-500 hover:text-white transition-all">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="p-3 rounded-full bg-[#1a1a24] border border-purple-500/30 text-purple-400 hover:bg-purple-500 hover:text-white transition-all">
                <Linkedin className="w-5 h-5" />
              </button>
              <button className="p-3 rounded-full bg-[#1a1a24] border border-purple-500/30 text-purple-400 hover:bg-purple-500 hover:text-white transition-all">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Related Posts */}

        {/* Turn off Related Post for now */}

        
        {/* {relatedBlogs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 sm:mt-20"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedBlogs.map((relatedBlog) => (
                <Link
                  key={relatedBlog._id}
                  to={`${createPageUrl('SingleBlog')}?id=${relatedBlog._id}`}
                  className="group relative rounded-xl overflow-hidden bg-[#1a1a24] border border-purple-500/20 hover:border-purple-500/50 transition-all"
                >
                  <div className="h-40 overflow-hidden">
                    <img
                      src={relatedBlog.banner}
                      alt={relatedBlog.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-semibold mb-2 group-hover:text-purple-400 transition-colors line-clamp-2">
                      {relatedBlog.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )} */}
      </div>

       {/* Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-6 pb-5 pl-5 pr-5 pt-8 border-t border-white/10 "
              >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <span>© 2025 Sarthak. Built with</span>
                    <Heart className="w-4 h-4 text-purple-500 fill-purple-500" />
                    <span>and React</span>
                  </div>
                  <div className="flex items-center gap-6">
                    {contactLinks.slice(0, 3).map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-purple-400 transition-colors"
                      >
                        <link.icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
    </div>
  );
}