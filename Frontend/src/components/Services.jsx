import fullStackBanner from '../assets/FullStackBanner.png';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Globe, Database, Zap, ArrowRight } from 'lucide-react';
import { useRef } from "react";

const servicesData = [
  {
    id: 1,
    icon: Code,
    title: 'Full Stack Development',
    tagline: 'From idea to production-ready app',
    description: 'End-to-end web application development with modern technologies like React, Node.js, and cloud infrastructure. I handle the full pipeline so you can focus on your business.',
    features: ['Custom Web Applications', 'RESTful API Development', 'Database Design & Optimization', ],
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvZGV8ZW58MHx8MHx8fDA%3D',
    accent: 'rgba(139,92,246,0.15)',
    bar: 'bg-violet-400/60',
    number: '01'
  },
  {
    id: 2,
    icon: Database,
    title: 'Backend & API Services',
    tagline: 'Reliable systems that scale with you',
    description: 'Robust, scalable backend systems and APIs that power modern applications. Built with security, performance, and maintainability at the core.',
    features: ['Microservices Architecture', 'REST APIs', 'Database Management', 'Authentication & Security'],
    image: 'https://codingscape.com/hubfs/blog-banner-microservices.jpg',
    accent: 'rgba(124,58,237,0.12)',
    bar: 'bg-violet-500/50',
    number: '02'
  },
  {
    id: 3,
    icon: Globe,
    title: 'SEO & Performance',
    tagline: 'Get found. Get fast. Get results.',
    description: 'Optimize your web presence for search engines and lightning-fast performance. I make your site rank higher, load faster, and convert better.',
    features: ['Technical SEO Audits', 'Core Web Vitals Optimization', 'Schema Markup Implementation', 'Analytics & Reporting'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80',
    accent: 'rgba(139,92,246,0.10)',
    bar: 'bg-violet-300/50',
    number: '03'
  },
  {
    id: 4,
    icon: Zap,
    title: 'Consulting & Code Review',
    tagline: 'Elevate your team & codebase',
    description: 'Expert technical consultation and comprehensive code audits to improve your existing applications. I help teams ship faster with confidence.',
    features: ['Architecture Planning', 'Code Quality Audits', 'Performance Profiling', 'Team Training & Mentorship'],
    image: 'https://images.unsplash.com/photo-1607705703571-c5a8695f18f6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29kZSUyMHJldmlld3xlbnwwfHwwfHx8MA%3D%3D',
    accent: 'rgba(109,40,217,0.12)',
    bar: 'bg-purple-300/50',
    number: '04'
  }
];

export default function ServicesSection() {
  const tabsContainerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

 useEffect(() => {
  if (tabsContainerRef.current) {
    const container = tabsContainerRef.current;
    const activeTab = container.children[activeIndex];

    const isSmallScreen = window.innerWidth < 1024;

    if (activeTab && isSmallScreen) {
      const tabLeft = activeTab.offsetLeft;
      const tabWidth = activeTab.offsetWidth;
      const containerWidth = container.offsetWidth;
      const maxScroll = container.scrollWidth - containerWidth;

      const targetScroll = tabLeft - containerWidth / 2 + tabWidth / 2;

      container.scrollTo({
        left: Math.max(0, Math.min(targetScroll, maxScroll)), // ← clamp between 0 and max
        behavior: "smooth",
      });
    }
  }
}, [activeIndex]);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % servicesData.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [autoPlay]);

  const active = servicesData[activeIndex];

  return (
    <section id="services" className="relative py-24 sm:py-36 overflow-hidden">
      {/* Background matching app theme */}
      <div className="absolute inset-0 bg-[#0a0a0f]" />
      <div className="absolute top-1/3 -left-64 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -right-64 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

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
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-5">
            Services & 
            <span className="text-gray-500"> Expertise</span>
          </h2>
          <p className="max-w-3xl mx-auto text-gray-400 text-base sm:text-lg leading-relaxed">
            Transform your ideas into high-performing digital products. From concept to deployment,
            I deliver solutions that drive real business results.
          </p>
        </motion.div>

        {/* Main Layout: right-heavy panel */}
        <div className="flex flex-col  gap-3 lg:gap-5" style={{ minHeight: 560 }}>

          {/* Left Sidebar — refined list */}
          <div ref={tabsContainerRef} className="flex gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 lg:w-64 xl:w-72 flex-shrink-0 scrollbar-hide">
            {servicesData.map((service, idx) => {
              const SIcon = service.icon;
              const isActive = idx === activeIndex;
              return (
                <button
                  key={service.id}
                  onClick={() => { setActiveIndex(idx); setAutoPlay(false); }}
                  className={`relative flex-shrink-0 group text-left transition-all duration-300 rounded-lg overflow-hidden min-w-[140px] lg:w-full`}
                >
                  <div className={`flex items-center gap-3 px-4 py-3.5 transition-all duration-300 ${
                    isActive ? 'bg-[#1a1a24]' : 'hover:bg-[#1a1a24]/60'
                  }`}>
                    {/* Left accent bar */}
                    <div className={`absolute left-0 top-2 bottom-2 w-[2px] rounded-full transition-all duration-300 ${
                      isActive ? 'bg-purple-500' : 'bg-transparent'
                    }`} />

                    {/* Icon */}
                    <div className={`flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center border transition-all duration-300 ${
                      isActive
                        ? 'border-purple-500/30 bg-purple-500/20'
                        : 'border-gray-800 bg-[#0f0f14] group-hover:border-purple-500/20 group-hover:bg-purple-500/10'
                    }`}>
                      <SIcon className={`w-4 h-4 transition-colors ${isActive ? 'text-purple-300' : 'text-gray-600 group-hover:text-gray-400'}`} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className={`text-sm font-medium truncate transition-colors leading-snug ${
                        isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'
                      }`}>
                        {service.title}
                      </p>
                    </div>

                    {/* Number — far right */}
                    <span className={`text-[10px] font-mono flex-shrink-0 transition-colors ${
                      isActive ? 'text-purple-400/60' : 'text-gray-700'
                    }`}>
                      {service.number}
                    </span>
                  </div>

                  {/* Progress bar at bottom of active item */}
                  {isActive && autoPlay && (
                    <div className="absolute bottom-0 left-4 right-4 h-px bg-purple-500/10 overflow-hidden rounded-full">
                      <motion.div
                        key={`${activeIndex}-progress`}
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 4, ease: 'linear' }}
                        className="h-full bg-purple-500/50"
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Panel — cinematic image + content */}
          <div className="flex-1 relative rounded-xl overflow-hidden min-h-[420px] lg:min-h-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="absolute inset-0"
              >
                {/* Image with heavy dark overlay for premium, muted look */}
                <div className="absolute inset-0">
                  <img
                    src={active.image}
                    alt={active.title}
                    className="w-full h-full object-cover scale-105"
                    style={{ filter: 'saturate(0.3) brightness(0.4)' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/70 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/60 to-transparent" />
                  {/* Subtle tinted overlay using accent color */}
                  <div className="absolute inset-0" style={{ background: active.accent }} />
                </div>

                {/* Content — bottom-left aligned */}
                <div className="relative h-full flex flex-col justify-between p-7 sm:p-10">

                  {/* Bottom: main content */}
                  <div>
                    <motion.p
                      key={`tagline-${active.id}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, duration: 0.4 }}
                      className="text-xs font-medium tracking-[0.15em] uppercase text-purple-400/70 mb-3"
                    >
                      {active.tagline}
                    </motion.p>

                    <motion.h3
                      key={`title-${active.id}`}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15, duration: 0.4 }}
                      className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight"
                    >
                      {active.title}
                    </motion.h3>

                    <motion.p
                      key={`desc-${active.id}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                      className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-lg mb-6"
                    >
                      {active.description}
                    </motion.p>

                    {/* Features — pill chips, muted */}
                    <motion.div
                      key={`features-${active.id}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25, duration: 0.4 }}
                      className="flex flex-wrap gap-2 mb-8"
                    >
                      {active.features.map((f, i) => (
                        <span
                          key={i}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-gray-300 text-xs font-medium"
                          >
                          <span className="w-1 h-1 rounded-full bg-purple-400/50 flex-shrink-0" />
                          {f}
                        </span>
                      ))}
                    </motion.div>

                    {/* CTA — understated, premium */}
                    <motion.a
                      key={`cta-${active.id}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                      href="#contact"
                      onClick={(e) => {
                        e.preventDefault();
                        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm font-medium backdrop-blur-sm hover:bg-purple-500/30 hover:text-white hover:border-purple-500/50 transition-all duration-300 group/cta"
                    >
                      Discuss This Service
                      <ArrowRight className="w-4 h-4 group-hover/cta:translate-x-0.5 transition-transform duration-300" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* CTA Section — refined, no loud glow */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mt-20 sm:mt-20 -mx-4 sm:-mx-4 lg:-mx-6"
        >
          <div className="relative border-y border-purple-500/20 py-12 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0f0f14]">
            {/* Orbs matching app theme */}
            <motion.div
              animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 left-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"
            />
            <motion.div
              animate={{ x: [0, -25, 0], y: [0, 15, 0] }}
              transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-0 right-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"
            />

            <div className="relative max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">

                {/* Left — large editorial text (spans 3 cols) */}
                <div className="lg:col-span-3 space-y-7">
                  <div>
                    <span className="inline-block px-4 py-2 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-medium mb-5">
                     Ready to work together?
                    </span>
                    <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1]">
                     Lets build something
                     <br />
                     <span className="text-gray-500">extraordinary.</span>
                    </h3>
                  </div>

                  <div className="flex items-center gap-8 pt-2">
                   {[{ value: '30+', label: 'Projects Built' }, { value: '3+', label: 'Years Experience' }, { value: '< 2h', label: 'Response Time' }].map((stat, idx) => (
                     <div key={idx} className="border-l border-purple-500/20 pl-6 first:border-0 first:pl-0">
                        <div className="text-2xl font-bold text-white mb-0.5">{stat.value}</div>
                        <div className="text-xs text-gray-500">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {['Fast Delivery', 'Clean Code', 'Responsive Design', 'SEO Optimized'].map((f, idx) => (
                      <span key={idx} className="px-3 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-300/70 text-xs">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right — CTA block (spans 2 cols) */}
                <div className="lg:col-span-2 lg:mr-15">
                  <div className="relative p-8 rounded-2xl bg-[#1a1a24] border border-purple-500/20">
                    <div className="space-y-5">
                      <div>
                        <h4 className="text-xl font-semibold text-white mb-2">Start Your Project Today</h4>
                        <p className="text-sm text-gray-400 leading-relaxed">
                          Free consultation included. No commitments, just a clear plan forward.
                        </p>
                      </div>

                      {/* Main CTA */}
                      <motion.a
                        href="#contact"
                        onClick={(e) => {
                          e.preventDefault();
                          document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center justify-between w-full px-6 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold text-sm transition-all duration-300 shadow-lg shadow-purple-500/25"
                      >
                        <span>Get Started Now</span>
                        <motion.div
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <ArrowRight className="w-4 h-4" />
                        </motion.div>
                      </motion.a>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}