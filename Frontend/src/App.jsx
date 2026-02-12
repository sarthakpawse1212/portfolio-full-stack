import { useEffect, useState } from 'react'
import './App.css'
import BlogSection from './components/BlogSection'
import ContactSection from './components/ContactSection'
import ExperienceSection from './components/ExperienceSection'
import HeroSection from './components/HeroSection'
import Navbar from './components/Navbar'
import ProjectsSection from './components/ProjectSection'
import SkillsSection from './components/SkillsSection'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function App() {

  const [blogs, setBlogs] = useState([]); // store blogs from backend
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try {
      setLoading(true);

      //change base url according to backend server from .env file
      const res = await fetch(
        `${API_BASE_URL}/api/posts?page=1&limit=3`,
        // `http://localhost:3000/api/posts?page=1&limit=3`,
      );
      const result = await res.json();
      setBlogs(result.data);

    } catch (error) {
      throw new Error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(()=> {
    fetchData();
  }, [])

  return (
    <div className="bg-[#0a0a0f] min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <BlogSection blogs={blogs} loading={loading}/>
        <ContactSection />
      </main>
    </div>
  )
}

export default App
