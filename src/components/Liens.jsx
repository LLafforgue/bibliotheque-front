import { useState } from "react";
import Icon from "../kit/Icons";
import fetchList from "../hooks/fetchList";
import useMobile from "../hooks/UseMobile";

function Lien ({ id, href, description, refresh, fav, video, favIcon }) {
  const [favoris, setFavoris] = useState(fav);
  const favorisStyle = favoris
    ? "text-yellow-600 hover:text-gray-600"
    : "text-gray-300 hover:text-yellow-400";
  const isMobile = useMobile();

  const handleClick = (e) => {
    e.stopPropagation();
    window.open(href, "_blank", "noopener,noreferrer");
  };

  const handleFav = async () => {
    const response = await fetchList(`liens/favoris/${id}`, "PUT");
    if (response.result) {
      refresh((prev) => !prev);
      setFavoris((prev) => !prev);
    }
  };

  return (
    <div
      className="mb-2 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-md
                 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors
                 flex items-center justify-between cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex flex-wrap items-center">
        {favIcon ? (<div className="flex items-center">
          <img
            src={favIcon}
            alt="favicon"
            className="w-5 h-5 mr-2 rounded-sm"
            onError={(e) => {
              // si l'image ne se charge pas, on remplace par l'icône "link"
              e.currentTarget.style.display = "none";
              e.currentTarget.insertAdjacentElement(
                "afterend",
                (() => {
                  const span = document.createElement("span");
                  span.innerHTML = `<svg class="w-5 h-5 text-blue-500 dark:text-blue-300"><use href="#icon-link"></use></svg>`;
                  return span;
                })()
              );
            }}
          />
          <span className="mr-2 text-blue-500 dark:text-blue-300" >{`Aller vers ${description}`}</span>
          </div>
        ) : (
          <Icon
            type="link"
            className="mr-2 text-blue-500 dark:text-blue-300"
            title={`Aller vers ${description}`}
            showTitle={true}
          />
        )}
        {isMobile && (
          <p className="ml-2 text-gray-700 dark:text-gray-200">
            {description}
          </p>
        )}
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-xs">
          {new URL(href).hostname}
        </p>
      </div>
      <div className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
        {video && (
          <Icon
            type="video"
            title="Présence d'une vidéo"
            className="w-2 h-2 mx-2"
          />
        )}
        <Icon
          type="star"
          title="favoris"
          className="w-3 h-3 mx-2"
          classNameFont={`${favorisStyle}`}
          action={(e) => {
            e.stopPropagation();
            handleFav();
          }}
        />
        <Icon
          type="fermer"
          title="supprimer"
          className="ml-1 w-2 h-2"
          action={(e) => {
            e.stopPropagation();
            // suppression
          }}
        />
      </div>
    </div>
  );
}

export default Lien;
