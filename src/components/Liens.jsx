import { useState } from "react";
import Icon from "../kit/Icons";
import fetchList from "../hooks/fetchList";
import useMobile from "../hooks/UseMobile";
function Lien ({ id, href, description, refresh, fav, video }) {
  const [favoris, setFavoris] = useState(fav)
  const favorisStyle = favoris? 'text-yellow-600 hover:text-gray-600' : 'text-gray-300 hover:text-yellow-400'
  const isMobile = useMobile();

  const handleClick = (e) => {
    e.stopPropagation();
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  const handleFav = async () => {
    const response = await fetchList(`liens/favoris/${id}`,'PUT');
    if(response.result) {
        // setFavoris(response.data.favoris)
        refresh(prev=>!prev)
        setFavoris(prev=>!prev)
    }
    
  }

  return (
    <div
      className="mb-2 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-md
                 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors
                 flex items-center justify-between cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex flex-wrap items-center">
        <Icon
          type="link"
          className="mr-2 text-blue-500 dark:text-blue-300"
          title = {`Aller vers ${description}`}
          showTitle = {true}
        />
        {isMobile&&<p className="ml-2 text-gray-700 dark:text-gray-200">{description}</p>}
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-xs">
        {new URL(href).hostname}
        </p>
        
      </div>
      <div
        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
      >
        {video&&<Icon
         type='video'
         title="Présence d'une vidéo"
         className="w-2 h-2 mx-2" 
         />}
        <Icon 
         type='star' 
         title='favoris' 
         className="w-3 h-3 mx-2" 
         classNameFont={`${favorisStyle}`} 
         action = {(e) => {
          e.stopPropagation();
          handleFav()
        }}/>
        <Icon type="fermer" title = 'supprimer' className="ml-1 w-2 h-2" action = {(e) => {
          e.stopPropagation();
          //Fonction de suppression du lien de la salle ou de la DB
        }} />
      </div>
    </div>
  );
};

export default Lien