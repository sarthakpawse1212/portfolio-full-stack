import { useState, useEffect, useRef, useContext } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, Image as Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '../utils/createPageURL';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Paragraph from '@editorjs/paragraph';
import Quote from '@editorjs/quote';
import CodeTool from '@editorjs/code';
import ImageTool from '@editorjs/image';
import { AppContext } from '../context/AppContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function BlogEditor() {

  const { postData, setPostData } = useContext(AppContext);

  const navigate = useNavigate();
  const editorRef = useRef(null);
  const [editor, setEditor] = useState(null);
  const [bannerImage, setBannerImage] = useState('');
  const [bannerLoading, setBannerLoading] = useState(false);
  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrlInput, setImageUrlInput] = useState('');

  useEffect(() => {
    if (!editorRef.current) return;

    const editorInstance = new EditorJS({
      holder: 'editorjs',
      placeholder: 'Start writing your blog content...',
      tools: {
        header: {
          class: Header,
          config: {
            placeholder: 'Enter a header',
            levels: [2, 3, 4],
            defaultLevel: 2
          }
        },
        list: {
          class: List,
          inlineToolbar: true,
        },
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
        },
        quote: {
          class: Quote,
          inlineToolbar: true,
        },
        code: CodeTool,
        image: {
          class: ImageTool,
          config: {
            uploader: {
              async uploadByFile(file) {
                const formData = new FormData();
                formData.append('file', file);
                
                const response = await fetch(
                  `${API_BASE_URL}/api/upload`,
                  //'http://localhost:3000/api/upload', 
                  {
                  method: 'POST',
                  body: formData,
                });
                
                const data = await response.json();
                return {
                  success: 1,
                  file: {
                    url: data.url,
                  }
                };
              },
              async uploadByUrl(url) {
                const response = await fetch(
                  `${API_BASE_URL}/api/upload`,
                  //'http://localhost:3000/api/upload', 
                  {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ url }),
                });
                
                const data = await response.json();
                return {
                  success: 1,
                  file: {
                    url: data.url,
                  }
                };
              }
            }
          }
        },
      },
      onChange: () => {
        // Content changed
      }
    });

    setEditor(editorInstance);

    return () => {
      if (editorInstance && editorInstance.destroy) {
        editorInstance.destroy();
      }
    };
  }, []);

  const handleBannerUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setBannerLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch(
        `${API_BASE_URL}/api/upload`,
        // 'http://localhost:3000/api/upload', 
        {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      setBannerImage(data.url);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setBannerLoading(false);
    }
  };

  const handleBannerUrlUpload = async () => {
    if (!imageUrlInput) return;

    setBannerLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/upload`,
        // 'http://localhost:3000/api/upload',
         {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: imageUrlInput }),
      });
      
      const data = await response.json();
      setBannerImage(data.url);
      setImageUrlInput('');
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setBannerLoading(false);
    }
  };

  const handlePublish = async () => {
    if (!editor) return;

    try {
      const content = await editor.save();
      
      // Store in localStorage to pass to publish page
      localStorage.setItem('blogDraft', JSON.stringify({
        banner: bannerImage,
        heading,
        content,
      }));

      setPostData({...postData,
        banner: bannerImage, 
        heading: heading, 
        content: content,
        excerpt: description,
      });

      const token = sessionStorage.getItem("authToken");

      if (!token) {
        navigate("/login"); // redirect to login page
        return;
      }

      navigate('/publish-blog');
    } catch (error) {
      console.error('Failed to save:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-purple-500/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link 
              to={createPageUrl('Blogs')}
              className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Blogs
            </Link>

            <button
              onClick={handlePublish}
              disabled={!heading || !bannerImage}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-medium transition-all duration-300 shadow-lg shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue to Publish
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <h2 className='text-white mx-auto items-center align-middle justify-self-center mb-8 opacity-50'>Curruntly Only Admin can publish Blog You can try out writing blog editor features !!</h2>
        {/* Banner Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <label className="block text-white text-sm font-medium mb-3">
            Banner Image *
          </label>
          
          {bannerImage ? (
            <div className="relative rounded-2xl overflow-hidden border-2 border-purple-500/30 group">
              <img 
                src={bannerImage} 
                alt="Banner" 
                className="w-full h-64 sm:h-80 object-cover"
              />
              <button
                onClick={() => setBannerImage('')}
                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
              >
                <span className="px-4 py-2 bg-purple-500 text-white rounded-lg">
                  Change Image
                </span>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* File Upload */}
              <label className="block cursor-pointer">
                <div className="border-2 border-dashed border-purple-500/30 hover:border-purple-500/60 rounded-2xl p-12 text-center transition-colors bg-[#1a1a24]">
                  {bannerLoading ? (
                    <Loader2 className="w-12 h-12 mx-auto text-purple-400 animate-spin" />
                  ) : (
                    <>
                      <Upload className="w-12 h-12 mx-auto text-purple-400 mb-4" />
                      <p className="text-white font-medium mb-1">Upload Banner Image</p>
                      <p className="text-gray-400 text-sm">Click to browse or drag and drop</p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBannerUpload}
                  className="hidden"
                  disabled={bannerLoading}
                />
              </label>

              {/* URL Upload */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={imageUrlInput}
                  onChange={(e) => setImageUrlInput(e.target.value)}
                  placeholder="Or paste image URL..."
                  className="flex-1 px-4 py-3 bg-[#1a1a24] border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 transition-colors"
                  disabled={bannerLoading}
                />
                <button
                  onClick={handleBannerUrlUpload}
                  disabled={!imageUrlInput || bannerLoading}
                  className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Upload
                </button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Heading Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <label className="block text-white text-sm font-medium mb-3">
            Blog Title *
          </label>
          <input
            type="text"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            placeholder="Enter your blog title..."
            className="w-full px-6 py-4 bg-[#1a1a24] border border-purple-500/30 rounded-2xl text-white text-2xl font-bold placeholder-gray-500 focus:outline-none focus:border-purple-500/60 transition-colors"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <label className="block text-white text-sm font-medium mb-3">
            Short Description * 
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your blog description..."
            className="w-full px-6 py-4 bg-[#1a1a24] border border-purple-500/30 rounded-2xl text-white text-2xl font-bold placeholder-gray-500 focus:outline-none focus:border-purple-500/60 transition-colors"
          />
        </motion.div>

        {/* EditorJS Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <label className="block text-white text-sm font-medium mb-3">
            Content
          </label>
          <div 
            id="editorjs" 
            ref={editorRef}
            className="bg-[#1a1a24] border border-purple-500/30 rounded-2xl p-6 min-h-[500px] prose prose-invert max-w-none
              [&_.ce-block__content]:text-white
              [&_.ce-header]:text-white
              [&_.ce-paragraph]:text-gray-300
              [&_.ce-toolbar__plus]:text-purple-400
              [&_.ce-toolbar__settings-btn]:text-purple-400
              [&_.ce-inline-toolbar]:bg-[#2a2a34]
              [&_.ce-inline-toolbar]:border-purple-500/30
              [&_.ce-conversion-toolbar]:bg-[#2a2a34]
              [&_.ce-conversion-toolbar]:border-purple-500/30
              [&_.cdx-block]:text-white
              [&_.ce-code__textarea]:bg-[#0a0a0f]
              [&_.ce-code__textarea]:text-green-400
              [&_.cdx-quote]:border-purple-500/30
              [&_.cdx-quote]:text-gray-300
            "
          />
        </motion.div>
      </div>
    </div>
  );
}