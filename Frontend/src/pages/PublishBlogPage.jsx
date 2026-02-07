import  { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '../utils/createPageURL';
import { AppContext } from '../context/AppContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function PublishBlog() {

  const { postData } = useContext(AppContext);

  const navigate = useNavigate();
  const [blogData, setBlogData] = useState(null);
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const draft = localStorage.getItem('blogDraft');
    if (draft) {
      setBlogData(JSON.parse(draft));
    } else {
      navigate('BlogEditor');
    }
  }, [navigate]);

  const handlePublish = async () => {
    if (!blogData) return;

    setError(null);
    setPublishing(true);

    const token = sessionStorage.getItem("authToken");

    if (!token) {
      setError("You must be logged in to publish a blog.");
      setPublishing(false);
      return;
    }
    
    // Validate token & role
    const validateRes = await fetch(
       `${API_BASE_URL}/api/validate`,
      //'http://localhost:3000/api/validate',
       {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!validateRes.ok) {
      throw new Error("Authentication failed. Please login again.");
    }

    const { role } = await validateRes.json();

    if (role !== "ADMIN") {
      setError("You do not have permission to publish blogs, Curruntly only Admin can publish blogs.");
      setPublishing(false);
      return;
    }

    try {

      let payload = postData;

      // let finalBody = {
      //     id: null,
      //     banner: payload.banner,
      //     title: payload.heading,
      //     content: payload.content,
      //     date: new Date().toISOString(),
      //     category: null,
      //     excerpt: ''
      //   };

      const response = await fetch(
        `${API_BASE_URL}/api/post`,
        //'http://localhost:3000/api/post', 
        {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },

         body: JSON.stringify({
          // id: null,
          banner: payload.banner,
          title: payload.heading,
          content: payload.content,
          // date: new Date().toISOString(),
          category: 'backend',// implement this later
          excerpt: payload.excerpt // implement this later
        }),

      });

      if (response.ok) {
        localStorage.removeItem('blogDraft');
        navigate('/blogs');
      } else {
        throw new Error('Failed to publish');
      }
    } catch (error) {
      console.error('Publish failed:', error);
      setError(error.message || "Something went wrong. Try again.");
    } finally {
      setPublishing(false);
    }
  };

  const renderEditorContent = (content) => {
    if (!content || !content.blocks) return null;

    return content.blocks.map((block, index) => {
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
                <p className="text-sm text-gray-500 text-center mt-2">{block.data?.caption?.split('&')[0]}</p>
              )}
            </div>
          );
        default:
          return null;
      }
    });
  };

  if (!blogData) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-purple-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-purple-500/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link 
              to={createPageUrl('BlogEditor')}
              className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Editor
            </Link>

            <button
              onClick={handlePublish}
              disabled={publishing}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-medium transition-all duration-300 shadow-lg shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {publishing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Publishing...
                </>
              ) : (
                'Publish Blog'
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-8 text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-sm font-medium mb-6">
              Preview Mode
            </span>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* Banner */}
          {blogData.banner && (
            <div className="mb-8 rounded-2xl overflow-hidden border-2 border-purple-500/30">
              <img 
                src={blogData.banner} 
                alt="Blog banner" 
                className="w-full h-64 sm:h-96 object-cover"
              />
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            {blogData.heading}
          </h1>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-8 pb-8 border-b border-purple-500/20">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none">
            {renderEditorContent(blogData.content)}
          </div>
        </motion.div>
      </div>
    </div>
  );
}