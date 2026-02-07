import { motion } from 'framer-motion';

export default function Loader() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        {/* Animated Spinner */}
        <div className="relative w-20 h-20">
          <motion.div
            className="absolute inset-0 border-4 border-purple-500/30 rounded-full"
          />
          <motion.div
            className="absolute inset-0 border-4 border-transparent border-t-purple-500 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
          className="text-purple-400 text-lg font-medium"
        >
          Loading...
        </motion.div>
      </div>
    </div>
  );
}