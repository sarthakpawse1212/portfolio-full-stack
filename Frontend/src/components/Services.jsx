import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Zap, ArrowRight, CheckCircle2, ExternalLink } from 'lucide-react';
import fullStackBanner from '../assets/FullStackBanner.png';

const servicesData = [
  {
    id: 1,
    icon: Code,
    heading: "Experience",
    title: 'Full Stack Development',
    description: 'End-to-end web application development with modern technologies like React, Node.js, and cloud infrastructure.',
    features: [
      'Custom Web Applications',
      'RESTful API Development',
      'Database Design & Optimization',
      'Cloud Deployment & DevOps'
    ],
    sampleWork: {
      title: 'Web Applications & Business Platforms',
      image: fullStackBanner,
      description: 'Build and maintained full stack platforms & microservices which handles millions of transactions with 99.99% uptime.',
      link: '#'
    },
    gradient: 'from-purple-600 to-blue-600'
  },
  {
    id: 5,
    icon: Database,
    heading: "Experience",
    title: 'Backend & API Services',
    description: 'Robust, scalable backend systems and APIs that power modern applications with security and reliability.',
    features: [
      'Microservices Architecture',
      'REST APIs & Gateways',
      'Database Management',
      'Authentication & Security'
    ],
    sampleWork: {
      title: 'Scalable, highly available APIs',
      image: 'https://codingscape.com/hubfs/blog-banner-microservices.jpg',
      description: 'Secure systems processing millions of monthly transactions.',
      link: '#'
    },
    gradient: 'from-orange-600 to-red-600'
  },
  {
    id: 6,
    icon: Zap,
    heading: "Experience",
    title: 'Consulting & Code Review',
    description: 'Expert technical consultation and comprehensive code audits to improve your existing applications and team processes.',
    features: [
      'Architecture Planning',
      'Code Quality Audits',
      'Performance Profiling',
      'Team Training & Mentorship'
    ],
    sampleWork: {
      title: 'Tech Advisory',
      image: 'https://images.unsplash.com/photo-1607705703571-c5a8695f18f6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29kZSUyMHJldmlld3xlbnwwfHwwfHx8MA%3D%3D',
      description: 'Experienece in managing large codebases and mentoring teams to improve code quality and development processes.',
      link: '#'
    },
    gradient: 'from-yellow-600 to-orange-600'
  }
];

export default function ServicesSection() {
  const [activeService, setActiveService] = useState(null);

  return (
    <section id="services" className="relative py-20 sm:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0f0f14] to-[#0a0a0f]" />
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            What I Offer
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            Premium Development Services
          </h2>
          <p className="max-w-3xl mx-auto text-gray-400 text-base sm:text-lg leading-relaxed">
            Transform your ideas into high-performing digital products. From concept to deployment,
            I deliver solutions that drive real business results.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {servicesData.map((service, index) => {
            const Icon = service.icon;
            const isActive = activeService === service.id;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onHoverStart={() => setActiveService(service.id)}
                onHoverEnd={() => setActiveService(null)}
                className="group relative"
              >
                {/* Service Card */}
                <div className={`relative h-full rounded-2xl border transition-all duration-500 overflow-hidden ${
                  isActive 
                    ? 'border-purple-500/60 shadow-2xl shadow-purple-500/20 bg-[#1a1a24]' 
                    : 'border-purple-500/20 bg-[#1a1a24]/50'
                }`}>
                  
                  {/* Icon Header */}
                  <div className="p-6 sm:p-8">
                    <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${service.gradient} mb-6 transform transition-transform duration-500 ${
                      isActive ? 'scale-110' : 'scale-100'
                    }`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Features List */}
                    <ul className="space-y-3 mb-6">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                          <CheckCircle2 className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Sample Work Preview */}
                    <div className={`transition-all duration-500 ${
                      isActive ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0'
                    } overflow-hidden`}>
                      <div className="border-t border-purple-500/20 pt-6">
                        <p className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-3">
                          {service.heading}
                        </p>
                        
                        <div className="relative rounded-xl overflow-hidden mb-3">
                          <img 
                            src={service.sampleWork.image} 
                            alt={service.sampleWork.title}
                            className="w-full h-40 object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                            <h4 className="text-white font-semibold text-sm">
                              {service.sampleWork.title}
                            </h4>
                          </div>
                        </div>

                        <p className="text-xs text-gray-400 mb-4">
                          {service.sampleWork.description}
                        </p>

                        <a 
                          href={service.sampleWork.link}
                          className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
                        >
                          View Case Study
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Hover Gradient Border Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`} />
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative mt-16 sm:mt-24 -mx-4 sm:-mx-6 lg:-mx-8"
        >
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [90, 0, 90],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"
            />
          </div>

          {/* Main CTA Content */}
          <div className="relative bg-gradient-to-br from-purple-600/10 via-blue-600/10 to-purple-600/10 border-y border-purple-500/30 backdrop-blur-sm py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Left Side - Stats/Features */}
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="space-y-4"
                  >
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                      Let’s Build Something
                      <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                        Meaningful Together
                      </span>
                    </h3>
                    <p className="text-gray-300 text-lg">
                      Have an idea or project in mind? I focus on creating clean, modern, and reliable digital solutions that help bring your vision to life.
                    </p>
                  </motion.div>

                  {/* Animated Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { value: '30+', label: 'Projects Built' },
                      { value: '100%', label: 'Dedication to Quality' },
                      { value: '3+', label: 'Years Experience' }
                    ].map((stat, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        className="text-center p-4 rounded-xl bg-white/5 border border-purple-500/20 backdrop-blur-sm"
                      >
                        <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{stat.value}</div>
                        <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Trust Indicators */}
                  <div className="flex flex-wrap gap-3 pt-4">
                    {['Fast Delivery', 'Maintainable Code', 'Responsive Design', 'SEO Focused', 'Documented Systems Architectures & APIs'].map((feature, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="px-4 py-2 rounded-full bg-purple-500/20 text-purple-300 text-sm border border-purple-500/30"
                      >
                        ✓ {feature}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Right Side - CTA Card */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="relative p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#1a1a24] to-[#0f0f14] border border-purple-500/50 shadow-2xl shadow-purple-500/20">
                    {/* Animated Border Glow */}
                    <motion.div
                      animate={{
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-xl"
                    />

                    <div className="relative space-y-6">
                      <div className="text-center">
                        <motion.div
                          animate={{
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="inline-block mb-4"
                        >
                          {/* <span className="text-5xl">🚀</span> */}
                          {/* <img className="w-25 h-25 object-cover" src={floating} alt="" /> */}
                        </motion.div>
                        <h4 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                          Start Your Project Today
                        </h4>
                        <p className="text-gray-400 mb-6">
                          Free consultation · Honest collaboration · Quality results
                        </p>
                      </div>

                      {/* CTA Button with Pulse Effect */}
                      <motion.a
                        href="#contact"
                        onClick={(e) => {
                          e.preventDefault();
                          document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative block w-full"
                      >
                        <motion.div
                          animate={{
                            boxShadow: [
                              '0 0 20px rgba(168, 85, 247, 0.3)',
                              '0 0 40px rgba(168, 85, 247, 0.6)',
                              '0 0 20px rgba(168, 85, 247, 0.3)',
                            ],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="flex items-center justify-center gap-3 px-8 py-5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-lg transition-all duration-300"
                        >
                          <span>Get Started Now</span>
                          <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            <ArrowRight className="w-6 h-6" />
                          </motion.div>
                        </motion.div>
                      </motion.a>

                      {/* Additional Info */}
                      <div className="text-center pt-4 border-t border-purple-500/20">
                        <p className="text-sm text-gray-500">
                          Avarage response time: <span className="text-purple-400 font-semibold">2 hours</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}