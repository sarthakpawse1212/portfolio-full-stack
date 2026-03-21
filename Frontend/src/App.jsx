import { useEffect, useState } from 'react'
import './App.css'
import BlogSection from './components/BlogSection'
import ContactSection from './components/ContactSection'
import ExperienceSection from './components/ExperienceSection'
import HeroSection from './components/HeroSection'
import Navbar from './components/Navbar'
import ProjectsSection from './components/ProjectSection'
import SkillsSection from './components/SkillsSection'
import ServicesSection from './components/Services'
import SEO from './components/SEO'
import { Helmet } from 'react-helmet-async'

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

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Sarthak Pawse",
    "url": "https://portfolio-website-sp.netlify.app",
    "jobTitle": "Full Stack Developer",
    "description": "I build fast, reliable products from architecture to deployment using React, Node.js, and Docker.",
    "sameAs": [
      "https://github.com/sarthakpawse1212",
      "https://www.linkedin.com/in/sarthak-pawse-12122002-/"
    ],
    "knowsAbout": ["React", "Node.js", "TypeScript", "PostgreSQL", "Docker", "REST APIs", "Microservices", "Cloud Deployment"],
  };

  return (
    <>
    <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>
    <div className="bg-[#0a0a0f] min-h-screen">
      <SEO
        title="Full Stack Developer & Architecture Expert"
        description="I build fast, reliable products from architecture to deployment. Specializing in React, Node.js, and Docker."
      />
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection/>
        <ProjectsSection />
        <ExperienceSection />
        <SkillsSection />
        <BlogSection blogs={blogs} loading={loading}/>
        <ContactSection />
      </main>
    </div>
    </>
  )
}

export default App
