
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Phone, Download, MapPin, ArrowUpRight, Heart } from 'lucide-react';

import Resume from '../assets/Sarthak-Software-Developer.pdf'

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
    value: '+91 7972005578',
    href: 'tel:7972005578',
    color: 'hover:bg-emerald-500',
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-16 sm:py-10 lg:py-32 bg-[#0f0f14]">
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
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            Let&apos;s Work Together
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400 text-base sm:text-lg px-4">
            Have a project in mind? Let&apos;s discuss new opportunities and creative ideas
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contact Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {contactLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative p-5 sm:p-6 rounded-2xl bg-[#1a1a24] border border-purple-500/20 hover:bg-purple-500 hover:border-purple-500 transition-all duration-300"
                >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2.5 sm:p-3 rounded-xl bg-purple-500/20 group-hover:bg-white/20 transition-colors">
                    <link.icon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 group-hover:text-white transition-colors" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 group-hover:text-white transition-colors" />
                </div>
                <p className="text-xs sm:text-sm text-gray-400 group-hover:text-white/80 mb-1">{link.label}</p>
                <p className="text-sm sm:text-base text-white group-hover:text-white font-medium">{link.value}</p>
              </motion.a>
            ))}
          </motion.div>

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative p-6 sm:p-8 lg:p-12 rounded-3xl bg-[#1a1a24] border border-purple-500/20">
              <div className="relative">
                <div className="flex items-center gap-2 mb-6">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                  <span className="text-sm sm:text-base text-gray-400">Pune, Maharashtra</span>
                </div>

                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4">
                  Ready to bring your ideas to life?
                </h3>
                <p className="text-sm sm:text-base text-gray-400 mb-8 leading-relaxed">
                 Get in touch to discuss your next project. 
                 I’m currently available for freelance work and business development opportunities.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button
                    // asChild
                    className="flex justify-center px-4 sm:px-4 py-4 sm:py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-xl font-medium transition-all duration-300 shadow-lg shadow-purple-500/25"
                  >
                    <a className="flex items-center" href={Resume} download>
                      <Download className="justify-baseline w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      Download Resume
                    </a>
                  </button>
                  <button
                    // asChild
                    // variant="outline"
                    className="flex justify-center px-4 sm:px-4 py-4 sm:py-4 bg-transparent border-2 border-purple-500 hover:bg-purple-500 text-purple-400 hover:text-white rounded-xl font-medium transition-all duration-300"
                  >
                    <a className="flex items-center" href="tel:+917972005578">
                      <Phone className="justify-baseline w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      Call Now
                    </a>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24 pt-8 border-t border-white/10"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <span>© 2026 Sarthak. Built with</span>
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
    </section>
  );
}