import React from "react";
import { NavLink } from "react-router-dom";
import ToggleDarkMode from "../hooks/ToggleDarkMode";
import {motion} from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser, faBook, faStar, faHouse, faBell, faCog, faPlusCircle, faPlus} from '@fortawesome/free-solid-svg-icons';
import useMobile from "../hooks/UseMobile";


export default function Header() {
    const isMobile = useMobile();

  return (
    <div className="w-full p-5 bg-emerald-300 dark:bg-violet-500 text-gray-800 dark:text-gray-50">
     <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }} 
      transition={{ duration: 0.5 }}
      className="flex justify-round items-center"
     >
      <h1 className="text-2xl font-bold">Bibliothèque de User</h1>

      <nav className="mx-[10%] flex flex-wrap gap-4">
        <NavLink to="/espaces/user" className="hover:underline">
        <FontAwesomeIcon icon={faUser} className="h-4 w-4 dark:text-white"/>
        </NavLink>
        
        <NavLink to="/espaces" className="hover:underline">
        <FontAwesomeIcon icon={faBook} className="h-4 w-4 dark:text-white"/>
        </NavLink>

        <NavLink to='/espaces/favoris' className="hover:underline">
        <FontAwesomeIcon icon={faStar} className="h-4 w-4 dark:text-white"/>
        </NavLink>

        <NavLink to='/espaces/nouvel' className="flex gap-2 items-center hover:underline">
        <FontAwesomeIcon icon={faCog} className="h-4 w-4 dark:text-white"/>
        {isMobile||'Nouvel Salle'}
        </NavLink>

        <NavLink to='/' className="flex gap-2 items-center hover:underline">
        <FontAwesomeIcon icon={faHouse} className="h-4 w-4 dark:text-white"/>
        {isMobile||'Déconnexion'}
        </NavLink>
      </nav>

    <div className="flex gap-2">
        <motion.div
        animate={{ rotate: [0, 10, 0] }}
        transition={{
            duration: 1.5,
            ease: "easeInOut",
            repeat: 2,
            repeatType: "reverse",
        }}>
        <FontAwesomeIcon icon={faBell} className="h-4 w-4 dark:text-white"/>
        </motion.div>
        {isMobile||'Alertes'}
    </div>
    <div className="flex gap-2 ml-4">
        <FontAwesomeIcon icon={faPlusCircle} className="h-6 w-6 text-gray-800 dark:text-gray-50 hover:scale-110 transition-transform cursor-pointer"/>
        {isMobile||'Ajouter une salle'}
    </div>
    </motion.div>
    
        <ToggleDarkMode allContainer={false} />
    </div>
  );
}