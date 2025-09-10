import { motion } from "framer-motion";

export default function Header() {
  return (
    <header className="relative w-full h-64 overflow-hidden bg-gradient-to-b from-blue-100 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <svg
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[32rem] h-64 backdrop-blur-sm"
        viewBox="0 0 512 256"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Dôme principal */}
        <motion.path
          d="M0 256C0 256 128 64 256 64C384 64 512 256 512 256H0Z"
          fill="url(#glassGradient)"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="2"
          className="dark:stroke-white/20"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* Lignes verticales */}
        {[
          { d: "M50 256 V194", delay: 0.1 },
          { d: "M128 256 V118", delay: 0.3 },
          { d: "M192 256 V80", delay: 0.5 },
          { d: "M256 256 V64", delay: 0.7 },
          { d: "M320 256 V80", delay: 0.9 },
          { d: "M384 256 V118", delay: 1.1 },
          { d: "M463 256 V195", delay: 1.3 },
        ].map((line, i) => (
          <motion.path
            key={i}
            d={line.d}
            className="stroke-white/50 dark:stroke-white/30"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: line.delay, ease: "easeInOut" }}
          />
        ))}

        {/* Arcs horizontaux */}
        {[
          { d: "M0 256 Q256 0 512 256", delay: 1.4 },
          { d: "M64 256 Q256 110 448 256", delay: 1.6 },
          { d: "M96 256 Q256 176 416 256", delay: 1.8 },
          { d: "M128 256 Q256 220 384 256", delay: 2.0 },
        ].map((arc, i) => (
          <motion.path
            key={i}
            d={arc.d}
            className="stroke-white/30 dark:stroke-white/20"
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
      <div className="relative z-10 flex items-center justify-center h-full text-center">
        <motion.h1
          className="text-4xl font-bold text-gray-800 dark:text-gray-100 drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 2.4 }}
        >
          Bienvenue dans la Bibliothèque
        </motion.h1>
      </div>
    </header>
  );
}
