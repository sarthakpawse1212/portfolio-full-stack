import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Github, Linkedin, Download, Phone, ArrowDown } from "lucide-react";
import Resume from "../assets/Sarthak-Software-Developer.pdf";
import ProfilePhoto from "../assets/NewProfilePhoto.png";
import { useEffect, useRef, useState } from "react";

// Typewriter hook: cycles through role strings
function useTypewriter(words, speed = 80, pause = 1800) {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout;
    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else {
      setDeleting(false);
      setWordIdx((w) => (w + 1) % words.length);
    }
    setDisplayed(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return displayed;
}

// Floating particle component
function Particles({ count = 28 }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 12 + 8,
    delay: Math.random() * 6,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-purple-400/30"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{ y: [0, -40, 0], opacity: [0, 0.6, 0] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Shimmer button (primary CTA)
function ShimmerButton({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`relative overflow-hidden group ${className}`}
    >
      {/* shimmer sweep */}
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
      {children}
    </button>
  );
}

// Animated border button (secondary CTA)
function BorderButton({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`relative group ${className}`}
    >
      {/* animated gradient border */}
      <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
      <span className="relative block rounded-xl bg-[#0a0a0f] border border-white/20 group-hover:border-transparent transition-colors duration-300">
        {children}
      </span>
    </button>
  );
}

export default function HeroSection() {
  const roleText = useTypewriter([
    "Software Engineer",
    "Full-Stack Developer",
    "API Architect",
  ]);

  // Mouse-follow magnetic tilt on photo
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const scrollToSection = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Skill chips for instant credibility scan
  const skills = ["React", "Node.js", "TypeScript", "PostgreSQL", "Docker", "REST APIs"];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-[#0a0a0f] overflow-hidden"
    >
      {/* NEW: Animated grid background ─── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139,92,246,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,92,246,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* NEW: Dual radial glow spots ─── */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-purple-600/8 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-600/8 blur-[100px] pointer-events-none" />
      {/* 🔵 NEW: cyan accent glow top-right */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-cyan-500/5 blur-[80px] pointer-events-none" />

      {/* NEW: Floating particles ─── */}
      <Particles />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* ══════════════════════════════
              LEFT — Photo with 3-D tilt
          ══════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 lg:order-1 flex justify-center"
          >
            {/* perspective wrapper for 3-D tilt */}
            <div style={{ perspective: 900 }}>
              <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="relative cursor-crosshair"
              >
                {/* multiple layered glows for richer halo */}
                <div className="absolute -inset-4 bg-gradient-to-br from-purple-600/30 via-blue-600/20 to-cyan-500/10 rounded-3xl blur-2xl" />
                <div className="absolute -inset-1 bg-gradient-to-br from-purple-500/40 to-blue-500/40 rounded-3xl blur-md" />

                {/* gradient border instead of solid */}
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[380px] lg:h-[380px] rounded-3xl overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, rgba(139,92,246,0.6), rgba(59,130,246,0.4), rgba(6,182,212,0.3))",
                    padding: "2px",
                  }}
                >
                  <div className="w-full h-full rounded-3xl overflow-hidden bg-[#0a0a0f]">
                    <img
                      src={ProfilePhoto}
                      alt="Sarthak"
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 hover:scale-100"
                    />
                  </div>
                </div>

                {/* floating badge anchored to card bottom-right */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute -bottom-4 -right-4 flex items-center gap-2 px-3 py-2 rounded-xl bg-[#111118] border border-purple-500/30 shadow-xl shadow-purple-900/30"
                >
                  {/* pulsing green dot = "available" signal */}
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                  <span className="text-xs font-medium text-gray-300 whitespace-nowrap">Available for work</span>
                </motion.div>

                {/* experience pill anchored top-left */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  className="absolute -top-4 -left-4 px-3 py-2 rounded-xl bg-[#111118] border border-blue-500/30 shadow-xl shadow-blue-900/20"
                >
                  <span className="text-xs font-medium text-gray-300">3+ yrs experience</span>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* ══════════════════════════════
              RIGHT — Content
          ══════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="order-1 lg:order-2 text-center lg:text-left"
          >

            {/*  name uses staggered word reveal */}
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 leading-[1.05]"
            >
              {["Hi,", "I'm"].map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                  className="text-white inline-block mr-3"
                >
                  {word}
                </motion.span>
              ))}
              <motion.span
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75, duration: 0.6 }}
                className="inline-block bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent"
              >
                Sarthak
              </motion.span>
            </motion.h1>

            {/* Typewriter role line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex items-center gap-2 justify-center lg:justify-start mb-5 h-9"
            >
              <span className="text-xl sm:text-2xl text-gray-300 font-light">
                {roleText}
              </span>
              {/* blinking cursor */}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
                className="inline-block w-0.5 h-7 bg-purple-400 rounded"
              />
            </motion.div>

            {/*  shorter, punchier bio */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="text-base sm:text-lg text-gray-500 mb-7 leading-relaxed max-w-lg mx-auto lg:mx-0"
            >
              I build fast, reliable products — from architecture to deployment.
              Helping buisnesses ship with confidence.
            </motion.p>

            {/* ─── CTAs ─── */}
            {/* 3 CTAs with clear hierarchy */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.35 }}
              className="flex flex-col sm:flex-row gap-3 mb-9 justify-center lg:justify-start"
            >
              {/* PRIMARY — highest contrast, shimmer animation */}
              <ShimmerButton
                onClick={() => scrollToSection("#contact")}
                className="flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-cyan-500 text-white rounded-xl text-base font-semibold transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:-translate-y-0.5"
              >
                {/* rocket emoji gives instant context */}
                <span>Let&apos;s Build Together</span>
                {/* <span className="text-base">🚀</span> */}
              </ShimmerButton>

              {/* SECONDARY — animated border */}
              <BorderButton
                onClick={() => scrollToSection("#projects")}
                className="text-base font-medium"
              >
                <span className="flex items-center justify-center gap-2 px-6 py-3.5 text-gray-300 hover:text-white transition-colors duration-300">
                  View My Work
                  <ArrowDown className="w-4 h-4" />
                </span>
              </BorderButton>

              {/* TERTIARY — ghost */}
              <button
                onClick={() => scrollToSection("#services")}
                className="px-6 py-3.5 text-gray-500 hover:text-purple-400 text-base font-medium transition-colors duration-300 underline-offset-4 hover:underline"
              >
                Services
              </button>
            </motion.div>

            {/* ─── Social Links ─── */}
            {/* icons have tooltip labels + hover lift */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="flex gap-3 justify-center lg:justify-start flex-wrap"
            >
              {[
                { icon: Github, href: "https://github.com/sarthakpawse1212?tab=repositories", label: "GitHub" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/sarthakpawse12/", label: "LinkedIn" },
                { icon: Phone, href: "tel:+917972005578", label: "Call Me" },
                { icon: Download, href: Resume, label: "Resume" },
              ].map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  title={social.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.55 + i * 0.08 }}
                  whileHover={{ y: -3 }}             // lift on hover
                  className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/4 border border-white/10 hover:bg-purple-500/15 hover:border-purple-500/40 transition-all duration-300"
                >
                  <social.icon className="w-4 h-4 text-gray-500 group-hover:text-purple-400 transition-colors" />
                  {/* visible text label (not just icon) */}
                  <span className="text-xs text-gray-500 group-hover:text-purple-400 transition-colors font-medium hidden sm:inline">
                    {social.label}
                  </span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ─── Scroll indicator with line + dot ─── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 cursor-pointer group"
        onClick={() => scrollToSection("#skills")}
      >
        <span className="text-[10px] font-mono tracking-[0.3em] text-gray-600 uppercase group-hover:text-purple-400 transition-colors">
          Scroll
        </span>
        {/* vertical line with travelling dot */}
        <div className="relative w-px h-12 bg-gradient-to-b from-purple-500/40 to-transparent">
          <motion.div
            animate={{ y: [0, 36, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-purple-500 shadow-sm shadow-purple-500"
          />
        </div>
      </motion.div>
    </section>
  );
}
