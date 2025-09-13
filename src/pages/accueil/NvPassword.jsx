import { useState } from "react";
import { useNavigate, useParams , Outlet } from "react-router-dom";
import ToggleDarkMode from "../../hooks/ToggleDarkMode";
import fetchList from "../../hooks/fetchList";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faCloud } from "@fortawesome/free-solid-svg-icons";

export default function NvPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const {token} = useParams()
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await fetchList("auth/forgotPassword", "POST", {
        email,
      });

      if (data.result) {
        alert("Si un compte existe, un email a été envoyé !");
        navigate("/", { replace: true });
      } else {
        alert(data?.error || "Une erreur est survenue");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 dark:from-gray-800 to-blue-200 dark:to-gray-900 overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Étoiles en dark mode */}
        <div className="hidden dark:block">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
              className="absolute text-yellow-300"
              style={{
                top: `${Math.random() * 90}%`,
                left: `${Math.random() * 90}%`,
              }}
            >
              <FontAwesomeIcon icon={faStar}  />
            </motion.div>
          ))}
        </div>

        {/* Nuages en light mode */}
        <div className="block dark:hidden relative overflow-hidden h-full w-full">
            {[...Array(4)].map((_, i) => (
                <motion.div
                key={i}
                initial={{ x: "-100vw" }}
                animate={{ x: "120vw" }}
                transition={{
                    duration: 20, // Même durée pour tous les nuages
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 2, // Délai différent pour chaque nuage
                }}
                className="absolute text-gray-100 opacity-60 text-4xl whitespace-nowrap"
                style={{
                    top: `${20 + i * 15}%`,
                    left: 0,
                }}
                >
                <FontAwesomeIcon icon={faCloud} />
                </motion.div>
            ))}
            </div>

      </div>

      {/* Carte verre poli */}
      {!token?
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-80 p-5 border-2 rounded-2xl border-emerald-300 dark:border-violet-500
                   bg-white/30 dark:bg-gray-700/30 backdrop-blur-md shadow-lg"
      >
        <div className="flex flex-col gap-2 mt-2 justify-center items-center">
          <div className="mt-2 text-gray-800 dark:text-gray-50 text-lg font-bold">
            Renseignez votre adresse mail pour recevoir l'accès au changement de mot de passe
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 mt-2 justify-center items-center w-full"
          >
            <label htmlFor="email" className="w-full">
              <input
                type="email"
                id="email"
                placeholder="Votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-md px-2 py-1 border-2 border-emerald-300 dark:border-violet-500"
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer rounded-md px-2 py-1 border-2 border-emerald-300 dark:border-violet-500
                         bg-emerald-300 dark:bg-violet-500 hover:bg-emerald-400 dark:hover:bg-violet-400
                         text-gray-800 dark:text-gray-50 font-bold mt-2 disabled:opacity-50"
            >
              {loading ? "Envoi..." : "Envoyer"}
            </button>
          </form>
        </div>
      </motion.div>
      :
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-80 p-5 border-2 rounded-2xl border-emerald-300 dark:border-violet-500
                   bg-white/30 dark:bg-gray-700/30 backdrop-blur-md shadow-lg"
      >
        <div className="flex flex-col gap-2 mt-2 justify-center items-center">
        <Outlet/>
        </div>

      </motion.div>
      }
      {/* Bouton dark mode */}
      <ToggleDarkMode allContainer={true} className="fixed bottom-5 left-5 z-20" />
    </div>
  );
}
