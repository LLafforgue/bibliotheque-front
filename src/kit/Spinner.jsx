import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Spinner = ({ size = 40, color = "#10b981", speed = 1.5 }) => {
  return (
    <div className="flex items-center justify-center">
      <motion.div
        animate={{ 
            rotate: 360,
            opacity: [0.5, 1, 0.5], // Effet de fondu
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          width: size,
          height: size,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        
        <FontAwesomeIcon
          icon={faSpinner}
          spin
          style={{
            fontSize: size * 0.8, // Taille légèrement réduite pour un meilleur rendu
            color: color,
          }}
        />
        
      </motion.div>
    </div>
  );
};

export default Spinner;
