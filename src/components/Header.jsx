import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ToggleDarkMode from "../hooks/ToggleDarkMode";
import { motion } from "framer-motion";
import useMobile from "../hooks/UseMobile";
import Icon from "../kit/Icons";

export default function Header() {
    const isMobile = useMobile();
    const [hasAlert, setHasAlert] = useState(true); // Correction du nom de la variable
    const username = localStorage.getItem("username");
    const navigate = useNavigate();
    

    return (
        <div className="w-full p-5 bg-emerald-300 dark:bg-violet-500 text-gray-800 dark:text-gray-50">
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex justify-between items-center" // Correction de "justify-round" en "justify-between"
            >
                <h1 className="text-2xl font-bold">Bibliothèque de {username}</h1>

                <nav className="mx-[10%] flex flex-wrap justify-center gap-6">
                    <Icon
                        type="book"
                        title="Accès aux salles"
                        showTitle={true}
                        className="flex gap-2 items-center hover:scale-110 transition-transform cursor-pointer"
                        tooltipClassName="bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-sm"
                        classNameFont="h-4 w-4 dark:text-white"
                        action={() => navigate("/espaces")}
                    />

                    <Icon
                        type="cog"
                        title="Gérer les salles"
                        showTitle={true}
                        className="flex gap-2 items-center hover:scale-110 transition-transform cursor-pointer"
                        tooltipClassName="bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-sm"
                        classNameFont="h-4 w-4 dark:text-white"
                        action={() => navigate("/espaces/nouvel")}
                    />

                    <Icon
                        type="user"
                        title="Paramètres utilisateur"
                        showTitle={true}
                        className="flex gap-2 items-center hover:scale-110 transition-transform cursor-pointer"
                        tooltipClassName="bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-sm"
                        classNameFont="h-4 w-4 dark:text-white"
                        action={() => navigate("/espaces/user")}
                    />

                    <Icon
                        type="star"
                        title="Favoris"
                        showTitle={true}
                        className="flex gap-2 items-center hover:scale-110 transition-transform cursor-pointer"
                        tooltipClassName="bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-sm"
                        classNameFont="h-4 w-4 dark:text-white"
                        action={() => navigate("/espaces/favoris")}
                    />

                    <Icon
                        type="logout"
                        title="Déconnexion"
                        showTitle={true}
                        className="flex gap-2 items-center hover:scale-110 transition-transform cursor-pointer"
                        tooltipClassName="bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-sm"
                        classNameFont="h-4 w-4 dark:text-white"
                        action={() => navigate("/", { replace: true })}
                    />
                </nav>

                <div className="flex items-center gap-2">
                    <motion.div
                        animate={hasAlert ? { rotate: [0, 10, 0] } : {}}
                        transition={{
                            duration: 1.5,
                            ease: "easeInOut",
                            repeat: 2,
                            repeatType: "reverse",
                        }}
                    >
                        <Icon
                            type="bell"
                            title="Alertes"
                            tooltipClassName="bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-sm"
                            classNameFont="h-6 w-6 text-gray-800 dark:text-gray-50 hover:scale-110 transition-transform cursor-pointer"
                        />
                    </motion.div>
                </div>

                
            </motion.div>

            <ToggleDarkMode allContainer={false} className="fixed bottom-5 right-5" /> {/* Correction de "rigth" en "right" */}
        </div>
    );
}
