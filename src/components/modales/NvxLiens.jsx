import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Input from '../../kit/Input';
import Icon from '../../kit/Icons';
import fetchList from '../../hooks/fetchList';

export default function NvxLiens({ refresh, setIsVisible, salles }) {
  // État pour la liste des liens et leur visibilité
  const [liens, setLiens] = useState([
    { href: '', description: '', motsClef: '', salle: '', isOpen: true }
  ]);
  const [alert, setAlert] = useState({ href: false, description: false, motsClef: false, salle: false });
  const [loading, setLoading] = useState(false);

  // Bascule l'état plié/délié d'un lien
  const toggleLien = (index) => {
    const newLiens = [...liens];
    newLiens[index].isOpen = !newLiens[index].isOpen;
    setLiens(newLiens);
  };

  // Vérifie si le dernier lien est complet
  const isLastLienComplete = () => {
    const lastLien = liens[liens.length - 1];
    return lastLien.href && lastLien.description && lastLien.motsClef && lastLien.salle;
  };

  // Ajoute un nouveau lien vide si le dernier est complet
  const addLien = () => {
    if (isLastLienComplete()) {
      setLiens([...liens, { href: '', description: '', motsClef: '', salle: '', isOpen: true }]);
      setAlert({ href: false, description: false, motsClef: false, salle: false });
    } else {
      setAlert({
        href: !liens[liens.length - 1].href,
        description: !liens[liens.length - 1].description,
        motsClef: !liens[liens.length - 1].motsClef,
        salle: !liens[liens.length - 1].salle,
      });
    }
  };

  // Met à jour un champ spécifique d'un lien
  const handleChange = (index, field, value) => {
    const newLiens = [...liens];
    newLiens[index][field] = value;
    setLiens(newLiens);
    if (value) setAlert({ ...alert, [field]: false });
  };

  // Soumet la liste des liens
  const submitLiens = async () => {
    setLoading(true);
    const isValid = liens.every(lien =>
      lien.href && lien.description && lien.motsClef && lien.salle
    );

    if (!isValid) {
      setAlert({
        href: !liens.every(lien => lien.href),
        description: !liens.every(lien => lien.description),
        motsClef: !liens.every(lien => lien.motsClef),
        salle: !liens.every(lien => lien.salle),
      });
      setLoading(false);
      return;
    }

    try {
      const response = await fetchList("liens", "POST", { liens });
      if (response.result) {
        setLoading(false);
        setIsVisible(false);
        refresh(true);
      } else {
        setAlert({ href: true, description: true, motsClef: true, salle: true });
        setLoading(false);
      }
    } catch (error) {
      setAlert({ href: true, description: true, motsClef: true, salle: true });
      setLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="nvx-liens-title"
      className="
        relative w-full sm:w-3/4 md:w-1/2 lg:w-1/3 h-[80vh]
        flex flex-col
        bg-gradient-to-b from-emerald-300 to-emerald-100
        dark:from-gray-800 dark:to-slate-800
        border-2 rounded-lg sm:rounded-2xl shadow-xl
        p-6
      "
    >
      {/* Bouton fermer */}
      <Icon
        type="fermer"
        className="absolute top-3 right-3 p-2
                   text-gray-800 dark:text-gray-200
                   hover:text-red-500 cursor-pointer z-10"
        title="Fermer la fenêtre"
        action={() => setIsVisible(false)}
      />

      <h3
        id="nvx-liens-title"
        className="mb-4 text-xl font-bold text-gray-800 dark:text-gray-100"
      >
        Ajouter des Liens
      </h3>

      {/* Conteneur scrollable avec Framer Motion */}
      <motion.div
        className="flex-1 overflow-y-auto pr-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <AnimatePresence>
          {liens.map((lien, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="w-full mb-4 bg-white dark:bg-gray-700 rounded-lg shadow-md"
            >
              {/* En-tête pliable */}
              <div
                className="flex justify-between items-center p-4 cursor-pointer"
                onClick={() => toggleLien(index)}
              >
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Lien {index + 1}
                </h4>
                <Icon
                  type={lien.isOpen ? "replier" : "afficher"}
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
                  title={lien.isOpen ? "Réduire" : "Développer"}
                  classNameFont="w-5 h-5"
                />
              </div>

              {/* Contenu du formulaire (visible si isOpen) */}
              {lien.isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-4 pb-4"
                >
                  {/* Sélection de la salle */}
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Salle
                    </label>
                    <select
                      value={lien.salle}
                      onChange={(e) => handleChange(index, 'salle', e.target.value)}
                      className={`w-full rounded-md px-2 py-1 border-2 ${
                        alert.salle && !lien.salle ? 'border-red-500' : 'border-emerald-300 dark:border-violet-500'
                      }`}
                    >
                      <option value="">Sélectionnez une salle</option>
                      {salles.map((salle) => (
                        <option key={salle.id} value={salle.id}>
                          {salle.name}
                        </option>
                      ))}
                    </select>
                    {alert.salle && !lien.salle && (
                      <p className="text-red-500 text-xs mt-1">Veuillez sélectionner une salle.</p>
                    )}
                  </div>

                  {/* URL du lien */}
                  <Input
                    type="url"
                    title="URL"
                    placeholder="https://exemple.com"
                    value={lien.href}
                    change={(e) => handleChange(index, 'href', e.target.value)}
                    alerte={alert.href && !lien.href}
                    alerteMessage="Veuillez entrer une URL valide."
                    className="mb-3"
                    inputClassName="w-full"
                  />

                  {/* Titre du lien */}
                  <Input
                    type="text"
                    title="Titre"
                    placeholder="Titre du lien"
                    value={lien.description}
                    change={(e) => handleChange(index, 'description', e.target.value)}
                    alerte={alert.description && !lien.description}
                    alerteMessage="Veuillez entrer un titre."
                    className="mb-3"
                    inputClassName="w-full"
                  />

                  {/* Mots-clés */}
                  <Input
                    type="text"
                    title="Mots-clés"
                    placeholder="mot1, mot2, mot3"
                    value={lien.motsClef}
                    change={(e) => handleChange(index, 'motsClef', e.target.value)}
                    alerte={alert.motsClef && !lien.motsClef}
                    alerteMessage="Veuillez entrer au moins un mot-clé."
                    className="mb-3"
                    inputClassName="w-full"
                  />
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Boutons d'action */}
      <div className="flex justify-center space-x-4 mt-4">
        {/* Bouton pour ajouter un nouveau lien (désactivé si le dernier n'est pas complet) */}
        <Icon
          type="plusCircle"
          title={isLastLienComplete() ? "Ajouter un lien" : "Veuillez compléter ce lien"}
          tooltipClassName="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm"
          classNameFont="mx-2 w-6 h-6 cursor-pointer font-bold"
          className={`
            p-3 flex items-center justify-center
            ${isLastLienComplete()
              ? 'text-gray-800 dark:text-gray-200 bg-emerald-300 dark:bg-violet-500 hover:bg-emerald-400 dark:hover:bg-violet-400'
              : 'text-gray-400 dark:text-gray-500 bg-gray-200 dark:bg-gray-600 cursor-not-allowed'}
            rounded-full shadow-lg transition-colors duration-200
          `}
          action={isLastLienComplete() ? addLien : undefined}
        />

        {/* Bouton pour soumettre */}
        <Icon
          type="book"
          title="Enregistrer les liens"
          tooltipClassName="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm"
          classNameFont="mx-2 w-6 h-6 cursor-pointer font-bold"
          className="
            p-3 flex items-center justify-center
            text-gray-800 dark:text-gray-200
            bg-emerald-300 dark:bg-violet-500 rounded-full shadow-lg
            transition-colors duration-200 active:translate-y-1 active:shadow-sm
            hover:bg-emerald-400 dark:hover:bg-violet-400 cursor-pointer
          "
          action={submitLiens}
        />
      </div>

      {loading && (
        <div className="text-gray-700 dark:text-gray-300 mt-3 text-center">
          Envoi en cours...
        </div>
      )}
    </div>
  );
}
