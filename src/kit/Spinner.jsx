import { motion } from "framer-motion";
import { ClipLoader } from "react-spinners"; // ou PuffLoader, MoonLoader, etc.

const Spinner = ({
  size = 40,
  color = "#10b981",
  speed = 1.5,
  loaderType = "ClipLoader", // Option pour changer le type de loader
}) => {
  // Mapping des loaders disponibles (étendable)
  const LoaderComponent = {
    ClipLoader: ClipLoader,
   
  }[loaderType];

  return (
    <div className="flex items-center justify-center">
      <motion.div
        animate={{
          opacity: [0.5, 1, 0.5], // Effet de fondu via Framer Motion
        }}
        transition={{
          duration: speed * 0.6, // Synchronisé avec la vitesse de rotation
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <LoaderComponent
          color={color}
          size={size}
          speedMultiplier={speed / 1.5} // Ajuste la vitesse native du loader
        />
      </motion.div>
    </div>
  );
};

export default Spinner;
