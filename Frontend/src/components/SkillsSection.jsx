import { motion } from 'framer-motion';
import LogoReact from "../assets/React.svg"
import LogoNode from "../assets/node.js.svg"
import LogoTypescript from "../assets/TypeScript.svg"
import LogoJavascript from "../assets/JavaScript.svg"
import LogoMongoDb from "../assets/MongoDB.svg"
import LogoTailwind from "../assets/TailwindCSS.svg"
import LogoDocker from "../assets/Docker.svg"
import LogoGit from "../assets/GitHub.svg"
import LogoAWS from "../assets/AWS.svg"
import LogoRedux from "../assets/Redux.svg"
import LogoExpress from "../assets/Express.svg"
import LogoHTML from "../assets/HTML5.svg"
import LogoKubctl from "../assets/Kubernetes.svg"
import LogoRedis from "../assets/Redis.svg"
import LogoKafka from "../assets/Kafka.svg"
import LogoPostman from "../assets/Postman.svg"
import LogoElasticSearch from "../assets/Elastic.svg"
import LogoJira from "../assets/Jira.svg"

// Technologies with brand colors
const technologies = [
  { 
    name: 'React', 
    icon: LogoReact,
    color: '#61DAFB',
    bgGradient: 'from-cyan-400 to-blue-500'
  },
  { 
    name: 'Node.js', 
    icon: LogoNode,
    color: '#339933',
    bgGradient: 'from-green-400 to-green-600'
  },
  { 
    name: 'TypeScript', 
    icon: LogoTypescript,
    color: '#3178C6',
    bgGradient: 'from-blue-500 to-blue-700'
  },
  { 
    name: 'Express', 
    icon: LogoExpress,
    color: '#000000',
    bgGradient: 'from-gray-800 to-black'
  },
  { 
    name: 'JavaScript', 
    icon: LogoJavascript,
    color: '#F7DF1E',
    bgGradient: 'from-yellow-300 to-yellow-500'
  },
  { 
    name: 'HTML5', 
    icon: LogoHTML,
    color: '#3776AB',
    bgGradient: 'from-blue-400 to-yellow-400'
  },
  { 
    name: 'MongoDB', 
    icon: LogoMongoDb,
    color: '#47A248',
    bgGradient: 'from-green-500 to-green-700'
  },
  { 
    name: 'Kubernetes', 
    icon: LogoKubctl,
    color: '#336791',
    bgGradient: 'from-blue-600 to-blue-800'
  },
  { 
    name: 'Tailwind CSS', 
    icon: LogoTailwind,
    color: '#06B6D4',
    bgGradient: 'from-cyan-400 to-blue-500'
  },
  { 
    name: 'Docker', 
    icon: LogoDocker,
    color: '#2496ED',
    bgGradient: 'from-blue-400 to-blue-600'
  },
  { 
    name: 'Github', 
    icon: LogoGit,
    color: '#F05032',
    bgGradient: 'from-orange-500 to-red-600'
  },
  { 
    name: 'AWS', 
    icon: LogoAWS,
    color: '#FF9900',
    bgGradient: 'from-orange-400 to-orange-600'
  },
  { 
    name: 'Redis', 
    icon: LogoRedis,
    color: '#F24E1E',
    bgGradient: 'from-purple-500 via-pink-500 to-orange-500'
  },
  { 
    name: 'Apache Kafka', 
    icon: LogoKafka,
    color: '#fff',
    bgGradient: 'from-pink-500 to-purple-600'
  },
  { 
    name: 'Redux', 
    icon: LogoRedux,
    color: '#764ABC',
    bgGradient: 'from-purple-500 to-purple-700'
  },
  { 
    name: 'Postman', 
    icon: LogoPostman,
    color: '#FFCA28',
    bgGradient: 'from-yellow-400 to-orange-500'
  },
  { 
    name: 'ElasticSearch', 
    icon: LogoElasticSearch,
    color: '#4FC08D',
    bgGradient: 'from-green-400 to-teal-500'
  },
  { 
    name: 'Jira', 
    icon: LogoJira,
    color: '#CC6699',
    bgGradient: 'from-pink-400 to-pink-600'
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="relative py-16 sm:py-24 lg:py-32 bg-[#0f0f14]">
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
            Technical Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            Tools & Technologies
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400 text-base sm:text-lg px-4">
            Technologies and tools I use to build modern applications
          </p>
        </motion.div>

        {/* Technologies Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.05,
                type: "spring",
                stiffness: 100
              }}
              className="group relative"
            >
              <motion.div
                whileHover={{ 
                  scale: 1.15,
                  rotate: [0, -5, 5, 0],
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
                className="relative flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl bg-[#1a1a24] border-2 border-gray-800 hover:border-transparent shadow-sm hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 cursor-pointer aspect-square overflow-hidden"
              >
                {/* Gradient Background on Hover */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${tech.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />
                
                {/* Icon */}
                <div className="relative z-10 text-4xl sm:text-5xl mb-2 transform group-hover:scale-110 transition-transform duration-300">
                  <img src={tech.icon} alt="" className="w-16 h-16"/>
                </div>
                
                {/* Tech Name - Shows on hover */}
                <div className="
                  relative z-10 text-xs sm:text-sm font-bold text-white text-center
                  opacity-80
                  md:opacity-0 md:group-hover:opacity-100
                  transition-opacity duration-300
                ">
                  {tech.name}
                </div>

                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
              </motion.div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}