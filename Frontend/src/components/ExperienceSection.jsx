import { motion } from 'framer-motion';
import { Building2, Calendar, MapPin } from 'lucide-react';

const experiences = [
  {
    title: 'Software Engineer',
    company: 'Tech Mahindra',
    location: 'Pune, Maharashtra',
    period: '2023 Nov - 2026 Feb',
    description: 'Results-driven Software Engineer with 2+ years of experience at Tech Mahindra, working on scalable full-stack systems using Node.js, TypeScript, and React-based frontends. Strong backend expertise with hands-on exposure to frontend integration, UI performance considerations, and API-driven development. Contributed to a large-scale telecom transformation project (Telefonica Germany) serving over 45 million customers, ensuring high availability and stability.',
    achievements: [
      'Achieved a 30% reduction in production incidents through proactive optimization.',
      'A strong collaborator and mentor, contributing to improved team performance while managing high-availability applications in a microservices architecture.',
      'Mentored junior engineers and improved team-wide debugging efficiency through guided knowledge-sharing sessions, documentation, and cross-functional collaboration.',
    ],
    tech: ['Node.js', 'TypeScript', 'MongoDb', 'React', 'Docker', 'Kubernetes', 'AWS', 'Kafka', 'Redis', 'Agile', 'Jira'],
    current: false,
  },
  {
    title: 'Full Stack Developer',
    company: 'Turbosoft',
    location: 'Pune, Maharashtra',
    period: '2026',
    description: 'Working on scalable full-stack systems using Node.js, Strapi, TypeScript, and React-based frontends. Strong backend expertise with hands-on exposure to frontend integration, UI performance considerations, and API-driven development.',
    achievements: [
      'A strong collaborator contributing to performance improvements while building and managing high-availability applications.'
    ],
    tech: ['Node.js', 'TypeScript', 'MongoDb', 'React', 'Strapi', 'Postgres'],
    current: true,
  }
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative py-16 sm:py-24 lg:py-32 bg-[#0a0a0f]">
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
            Career Journey
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            Work Experience
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400 text-base sm:text-lg px-4">
            A timeline of my professional growth and impactful projects
          </p>
        </motion.div>

        {/* Experience Cards */}
        <div className="grid gap-6 sm:gap-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative p-6 sm:p-8 rounded-2xl bg-[#1a1a24] border border-purple-500/20 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                    <h3 className="text-lg sm:text-xl font-semibold text-white">{exp.title}</h3>
                    {exp.current && (
                      <span className="px-2 sm:px-3 py-1 rounded-full bg-purple-500 text-white text-xs font-medium">
                        Current
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-purple-400 mb-3">
                    <Building2 className="w-4 h-4 flex-shrink-0" />
                    <span className="font-medium">{exp.company}</span>
                  </div>
                  <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      {exp.period}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                      {exp.location}
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-gray-400 mb-6 leading-relaxed">{exp.description}</p>

              {/* Achievements */}
              <ul className="space-y-2 sm:space-y-3 mb-6">
                {exp.achievements.map((achievement, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-gray-300">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" />
                    {achievement}
                  </li>
                ))}
              </ul>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2">
                {exp.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 sm:px-3 py-1 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}