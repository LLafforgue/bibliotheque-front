import { useState } from 'react'
import Input from '../../kit/Input'
import Icon from '../../kit/Icons'
import fetchList from '../../hooks/fetchList'

export default function NvllSalle({ refresh, setIsVisible }) {
  const [name, setName] = useState("");
  const [alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const newSalle = async () => {
    setLoading(true);
    if (!name) {
      setLoading(false);
      setAlert(true);
      return;
    }
    try {
      const response = await fetchList("rubriques", "POST", { name });
      if (response.result) {
        setLoading(false);
        setIsVisible(false);
        refresh((prev)=>!prev);
      } else {
        setAlert(true);
        setLoading(false);
      }
    } catch {
      setAlert(true);
      setLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="nvll-salle-title"
      className="
        relative w-full sm:w-1/2 sm:h-auto h-1/2
        flex flex-col justify-center items-center
        bg-gradient-to-b from-emerald-300 to-emerald-100 
        dark:from-gray-800 dark:to-slate-800
        border-2 rounded-lg sm:rounded-2xl shadow-xl
        overflow-visible p-6
      "
    >
      {/* Bouton fermer */}
      <Icon
        type="fermer"
        className="absolute top-3 right-3 p-2 
                   text-gray-800 dark:text-gray-200 
                   hover:text-red-500 cursor-pointer"
        title="Fermer la fenêtre"
        action={() => setIsVisible(false)}
      />

      <h3
        id="nvll-salle-title"
        className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4"
      >
        Nouvelle Salle
      </h3>

      <Input
        type="text"
        placeholder="Nom de votre salle"
        className="items-center w-full"
        labelClassName="border-gray-50 border-b-2 text-gray-800 dark:text-gray-50"
        inputClassName="m-5 w-full"
        alerte={alert}
        alerteMessage="Erreur dans l'envoi"
        change={(e) => {
          setAlert(false);
          setName(e.target.value);
        }}
      />

      <Icon
        type="book"
        title="Ajouter cette salle"
        tooltipClassName="bg-white z-1000 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm"
        classNameFont="mx-2 w-6 h-6 cursor-pointer font-bold"
        className="
          my-2 p-3 
          flex items-center justify-center
          text-gray-800 dark:text-gray-200 
          bg-emerald-300 dark:bg-violet-500 rounded-full shadow-lg
          transition-colors duration-200 active:translate-y-1 active:shadow-sm
          hover:bg-emerald-400 dark:hover:bg-violet-400 cursor-pointer
        "
        showTitle={true}
        action={() => newSalle()}
      />

      {loading && (
        <div className="text-gray-700 dark:text-gray-300 mt-3">
          En chargement...
        </div>
      )}
    </div>
  );
}

