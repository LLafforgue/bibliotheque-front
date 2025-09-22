import Icon from "../kit/Icons";
import fetchList from "../hooks/fetchList";

function Lien ({ href, description }) {
  const handleClick = (e) => {
    e.stopPropagation();
    window.open(href, '_blank', 'noopener,noreferrer');
  };

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
        <div>
          {/* <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate max-w-xs">
            {description}
          </p> */}
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-xs">
            {new URL(href).hostname}
          </p>
        </div>
      </div>
      <div
        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
      >
        <Icon type="fermer" title = 'supprimer' className="w-4 h-4" action = {(e) => {
          e.stopPropagation();
          //Fonction de suppression de lien
        }} />
      </div>
    </div>
  );
};

export default Lien