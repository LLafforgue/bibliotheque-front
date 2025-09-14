import React, {useState} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ToggleDarkMode from "../hooks/ToggleDarkMode";
import {motion} from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser, faBook, faStar, faRightFromBracket, faBell, faCog, faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import useMobile from "../hooks/UseMobile";
import Icon from "../kit/Icons";


export default function Header() {
    const isMobile = useMobile();
    const [hasAlter, setHasAlert] = useState(true);
    const username = localStorage.getItem('username');
    const navigate = useNavigate();

  return (
    <div className="w-full p-5 bg-emerald-300 dark:bg-violet-500 text-gray-800 dark:text-gray-50">
     <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }} 
      transition={{ duration: 0.5 }}
      className="flex justify-round items-center"
     >
      <h1 className="text-2xl font-bold">Bibliothèque de {username}</h1>

      <nav className="mx-[10%] flex flex-wrap justify-center gap-6">
               
        {/* <NavLink to="/espaces" className="flex gap-2 items-center hover:scale-110 transition-transform cursor-pointer"> */}
        <Icon 
        type={faBook} 
        title='Accès aux salles' 
        showTitle={true}
        className="flex gap-2 items-center hover:scale-110 transition-transform cursor-pointer"
        tooltipClassName='bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-sm' 
        classNameFont="h-4 w-4 dark:text-white"
        action={()=>navigate('/espaces')}
        />
        {/* </NavLink> */}
        
        <NavLink to='/espaces/nouvel' className="flex gap-2 items-center hover:scale-110 transition-transform cursor-pointer">
        <FontAwesomeIcon icon={faCog} className="h-4 w-4 dark:text-white"/>
        {isMobile||'Gérer les salles'}
        </NavLink>

        <NavLink to="/espaces/user" className="flex gap-2 items-center hover:scale-110 transition-transform cursor-pointer">
        <FontAwesomeIcon icon={faUser} className="h-4 w-4 dark:text-white"/>
        {isMobile||'Paramètres'}
        </NavLink>

        <NavLink to='/espaces/favoris' className="flex gap-2 items-center hover:scale-110 transition-transform cursor-pointer">
        <FontAwesomeIcon icon={faStar} className="h-4 w-4 dark:text-white"/>
        {isMobile||'Favoris'}
        </NavLink>

        <div 
        className="flex gap-2 items-center hover:scale-110 transition-transform cursor-pointer"
        onClick={()=>{
            localStorage.clear();
            navigate('/', {replace:true});
          }}
          >
        <FontAwesomeIcon icon={faRightFromBracket} className="h-4 w-4 dark:text-white"/>
        {isMobile||'Déconnexion'}
        </div>
      </nav>

    <div className="flex items-center gap-2">
        <motion.div
        animate={hasAlter&&{ rotate: [0, 10, 0] }}
        transition={{
            duration: 1.5,
            ease: "easeInOut",
            repeat: 2,
            repeatType: "reverse",
        }}>
        <FontAwesomeIcon icon={faBell} className="h-4 w-4 flex items-center dark:text-white"/>
        </motion.div>
        {isMobile||'Alertes'}
    </div>
    <div className="flex items-center gap-2 ml-4">
        <FontAwesomeIcon icon={faPlusCircle} className="h-6 w-6 text-gray-800 dark:text-gray-50 hover:scale-110 transition-transform cursor-pointer"/>
        {isMobile||'Ajouter un lien'}
    </div>
    </motion.div>
        <ToggleDarkMode allContainer={false} className={'fixed bottom-5 rigth-5'} />
    </div>
  );
}