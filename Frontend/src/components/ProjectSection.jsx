import { motion } from 'framer-motion';
import { ExternalLink, Github, Folder } from 'lucide-react';
import { useState } from 'react';
//import { Button } from '@/components/ui/button';
import newBlogBanner from '../assets/BlogSectionPortfolio.png'
import walletBanner from '../assets/WalletBanner.png'

const projects = [
  {
    title: 'Microservices-Based E-Commerce Backend System',
    description: 'Designed for scale, not just functionality, production-style e-commerce backend using a microservices architecture.',
    image: 'https://images.unsplash.com/photo-1667372459510-55b5e2087cd0?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    tags: ['Node.js', 'TypeScript', 'Kafka', 'ElasticSearch', 'Stripe', 'JWT', 'Docker', 'Jest', 'ORM'],
    github: 'https://github.com/sarthakpawse1212/Microservices-E-commerce-',
    live: 'https://github.com/sarthakpawse1212/Microservices-E-commerce-',
    featured: true,
    stats: { stars: 89, forks: 21 },
  },
  {
    title: 'Full-Stack Portfolio Website with Blog Platform',
    description: 'More than a portfolio, a personal publishing platform built to explore modern development with content management, routing, and dynamic rendering.',
    image: newBlogBanner,
    tags: ['ReactJS', 'NodeJs', 'MongoDb', 'Tailwind', 'REST APIs'],
    github: 'https://github.com/sarthakpawse1212/portfolio-full-stack',
    live: 'https://www.beginixx.com/',
    featured: true,
    stats: { stars: 256, forks: 67 },
  },
  {
    title: 'Wallet Service - Currency Management Backend',
    description: 'Implemented a ledger-based transaction architecture supporting multiple asset types (Gold Coins, Diamonds, Loyalty Points), along with Dockerized infrastructure, database migrations, health monitoring endpoints, and API testing via Postman.',
    image: walletBanner,
    tags: ['NodeJS', 'PostgreSQL', 'Redis', 'Docker', 'REST API', 'Backend Architecture'],
    github: 'https://github.com/sarthakpawse1212/currency-management-backend-',
    live: 'https://github.com/sarthakpawse1212/currency-management-backend-',
    featured: true,
    stats: { stars: 0, forks: 0 },
  }
];

export default function ProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section id="projects" className="relative py-16 sm:py-24 lg:py-32 bg-[#0f0f14]">
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
            Inspired by production-grade systems
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            Things I’ve Built
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400 text-base sm:text-lg px-4">
            Real-world projects focused on scalability, performance, and clean architecture.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() =>
                setActiveIndex(activeIndex === index ? null : index)
              }
              className="group relative rounded-2xl overflow-hidden bg-[#1a1a24] border border-purple-500/20 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-110"
                />
                <span className="absolute bottom-3 left-3 text-xs text-white md:hidden">
                  Tap to view links
                </span>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Overlay Links */}
                <div className={`
                                  absolute inset-0 flex items-center justify-center gap-3 sm:gap-4
                                  bg-black/80 backdrop-blur-sm
                                  transition-opacity duration-300
                                  opacity-0
                                  group-hover:opacity-100
                                  ${activeIndex === index ? "opacity-100" : ""}
                                `}>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 sm:p-3 rounded-full bg-purple-500 text-white hover:bg-purple-600 transition-colors"
                  >
                    <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 sm:p-3 rounded-full bg-purple-500 text-white hover:bg-purple-600 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                </div>

                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 px-2 sm:px-3 py-1 rounded-full bg-purple-500 text-white text-xs font-medium">
                    Featured
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-base sm:text-lg font-semibold text-white">
                    {project.title}
                  </h3>
                  <Folder className="w-5 h-5 text-purple-400 flex-shrink-0 ml-2" />
                </div>

                <p className="text-gray-400 text-xs sm:text-sm mb-4 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-2 py-1 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* View More */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12 sm:mt-16"
        >
        </motion.div>

        {/* View More */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12 sm:mt-16"
        >
          <button
          
            className="px-4 sm:px-6 py-3 sm:py-4 bg-transparent border-2 border-purple-500 hover:bg-purple-500 text-purple-400 hover:text-white rounded-lg text-base sm:text-lg font-medium transition-all duration-300"
          >
            <a href="https://github.com/sarthakpawse1212?tab=repositories"> View All on GitHub</a>
           
          </button>
        </motion.div>
      </div>
    </section>
  );
}