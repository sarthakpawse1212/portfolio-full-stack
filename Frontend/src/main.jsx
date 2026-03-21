import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Blogs from './pages/BlogsPage.jsx'
import BlogEditor from './pages/BlogEditorPage.jsx'
import PublishBlog from './pages/PublishBlogPage.jsx'
import SingleBlog from './pages/SingleBlogPage.jsx'
import { AppProvider } from './context/AppContext.jsx'
import Register from './utils/register.jsx'
import Login from './utils/login.jsx'
import { HelmetProvider } from 'react-helmet-async';

createRoot(document.getElementById('root')).render(

  <HelmetProvider>

    <BrowserRouter>
      {/* <App /> */}
      <AppProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog-editor" element={<BlogEditor />} />
          <Route path="/publish-blog" element={<PublishBlog />} />
          <Route path="/single-blog" element={<SingleBlog />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>

  </HelmetProvider>
)
