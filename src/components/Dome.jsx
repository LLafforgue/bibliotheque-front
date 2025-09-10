import { motion } from "framer-motion";

export default function Header() {
  return (
    <div className="relative w-full h-64 overflow-hidden bg-gradient-to-b from-blue-200 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <svg
        className="absolute bottom-0 left-0 w-full h-64 backdrop-blur-sm"
        viewBox="0 0 1024 256"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        {/* Dôme principal */}
        <motion.path
          d="M0 256C0 256 256 64 512 64C768 64 1024 256 1024 256H0Z"
          fill="url(#glassGradient)"
          stroke="rgba(176, 176, 176, 0.52)"
          strokeWidth="2"
          className="stroke-gray-400/30 dark:stroke-white/30"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* Lignes verticales */}
        {[
          { d: "M100 256 V190", delay: 0.1 },
          { d: "M256 256 V118", delay: 0.3 },
          { d: "M384 256 V80", delay: 0.5 },
          { d: "M512 256 V64", delay: 0.7 },
          { d: "M640 256 V80", delay: 0.9 },
          { d: "M768 256 V118", delay: 1.1 },
          { d: "M924 256 V190", delay: 1.3 },
        ].map((line, i) => {
          const strokeWidth = [2, 1.5, 1.2, 1, 1.2, 1.5, 2];
          return (
            <motion.path
              key={i}
              d={line.d}
              className="stroke-gray-300/80 dark:stroke-white/30"
              strokeWidth={strokeWidth[i]}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: line.delay, ease: "easeInOut" }}
            />
          );
        })}

        {/* Arcs horizontaux */}
        {[
          { d: "M0 256 Q512 0 1024 256", delay: 1.4 },
          { d: "M128 256 Q512 110 896 256", delay: 1.6 },
          { d: "M192 256 Q512 176 832 256", delay: 1.8 },
          { d: "M256 256 Q512 220 768 256", delay: 2.0 },
        ].map((arc, i) => (
          <motion.path
            key={i}
            d={arc.d}
            className="stroke-gray-300/70 dark:stroke-white/20"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: arc.delay, ease: "easeInOut" }}
          />
        ))}

        <defs>
          {/* Dégradé radial clair/sombre */}
          <radialGradient id="glassGradient" cx="50%" cy="20%" r="80%">
            <stop offset="0%" stopColor="white" stopOpacity="0.5" />
            <stop offset="70%" stopColor="white" stopOpacity="0.15" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      {/* Contenu du header */}
      <div className="relative z-20 flex items-center justify-center h-full text-center">
        <motion.h1
          className="text-4xl font-bold text-gray-800 dark:text-gray-100 drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 2.4 }}
        >
          Bienvenue dans la Bibliothèque
        </motion.h1>
      </div>
    </div>
  );
}
