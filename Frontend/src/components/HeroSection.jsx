import { motion } from "framer-motion";
import { Github, Linkedin, Download, Phone, ArrowDown } from "lucide-react";
import Resume from "../assets/Sarthak-Software-Developer.pdf";
import ProfilePhoto from '../assets/NewProfilePhoto.png';

export default function HeroSection() {
  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-[#0a0a0f]"
    >

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Section - Photo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1 flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-purple-500/20 rounded-3xl rotate-6 blur-xl"></div>
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-3xl overflow-hidden border-4 border-purple-500/50">
                <img
                  src={ProfilePhoto}
                  alt="sarthak-photo"
                  className="w-75 h-75 sm:w-100 sm:h-100 object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
          </motion.div>

          {/* Right Section - Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2 text-center lg:text-left"
          >
            {/* <span className="inline-block px-4 py-2 mb-6 text-sm font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full">
              Available for new opportunities
            </span> */}

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6">
              <span className="text-white">Hi, I&apos;m </span>
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Sarthak
              </span>
            </h1>

            <p className="text-xl sm:text-2xl lg:text-3xl text-gray-400 mb-4 sm:mb-6 font-light">
              Software engineer building digital products
            </p>

            <p className="text-base sm:text-lg text-gray-400 mb-8 sm:mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Building systems and modern web applications.
              Helping startups and businesses launch reliable solutions & software.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 sm:mb-10 justify-center lg:justify-start">
              <button
                onClick={() => scrollToSection("#projects")}
                className="flex items-center justify-center px-3 sm:px-4 py-3 sm:py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-lg text-base sm:text-lg font-medium transition-all duration-300 shadow-lg shadow-purple-500/25"
              >
                My Work
                <ArrowDown className="ml-2 w-4 h-4 sm:w-5 sm:h-5 justify-between" />
              </button>
              <button
                onClick={() => scrollToSection('#services')}
                className="px-3 sm:px-4 py-3 sm:py-3 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-white/30 text-white rounded-lg text-base sm:text-lg font-medium transition-all duration-300 shadow-lg"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("#contact")}
                //variant="outline"
                className="px-4 sm:px-6 py-3 sm:py-4 bg-transparent border-2 border-purple-500 hover:bg-purple-500 text-purple-400 hover:text-white rounded-lg text-base sm:text-lg font-medium transition-all duration-300"
              >
                Let’s Build Something Solid
              </button>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 justify-center lg:justify-start flex-wrap">
              {[
                { icon: Github, href: "https://github.com/sarthakpawse1212?tab=repositories", label: "GitHub" },
                {
                  icon: Linkedin,
                  href: "https://www.linkedin.com/in/sarthakpawse12/",
                  label: "LinkedIn",
                },
                { icon: Phone, href: "tel:+917972005578", label: "Call" },
                { icon: Download, href: Resume, label: "Resume" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group relative p-3 sm:p-4 rounded-xl bg-white/5 border border-purple-500/30 hover:bg-purple-500 hover:border-purple-500 transition-all duration-300"
                  title={social.label}
                >
                  <social.icon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => scrollToSection("#skills")}
        >
          <span className="text-xs text-gray-500 uppercase tracking-widest">
            Scroll
          </span>
          <div className="w-6 h-10 rounded-full border-2 border-purple-500/50 flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-purple-500"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
