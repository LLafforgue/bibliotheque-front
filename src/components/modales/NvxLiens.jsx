import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Input from '../../kit/Input';
import Icon from '../../kit/Icons';
import fetchList from '../../hooks/fetchList';

/**
 * 
 * @param {} param0 
 * @returns 
 */
export default function NvxLiens({ refresh, setIsVisible, salles,salleActive }) {
    // État pour la liste des liens et leur visibilité
    const [liens, setLiens] = useState([
        {
            id: crypto.randomUUID(),
            href: '',
            description: '',
            motsClefs: [],
            salles: salleActive&&[salleActive]||[],
            isOpen: true,
            alert : false
        },
    ]);
    const [alert, setAlert] = useState({
        href: false,
        description: false,
        motsClefs: false,
        salle: false,
        sanitized: false
    });
    const [loading, setLoading] = useState(false);
    const [selectedSalle, setSelectedSalle] = useState('');
    const [motClef, setMotClef] = useState('')

    //sanitized les entrées
    function sanitizedEntries(id,field,input) {
        if (/[\u0027\u003C\u003E\u0028\u0029\u0024\u007C\u0060]/.test(input)) {
            setLiens(liens.map((lien)=>
            lien.id!==id? lien : {...lien, alert:true}
        ));
        setAlert({...alert, [field]:true })
        return false
        } else {
            alert[field]&&setAlert({...alert, [field]:false });
            return true
        }
        }



    // Bascule l'état plié/déplié d'un lien
    const toggleLien = (id) => {
        setLiens(
            liens.map((lien) =>
                lien.id === id ? { ...lien, isOpen: !lien.isOpen } : lien
            )
        );
    };

    // Supprimer un lien
    const removeLien = (id) => {
        if (liens.length > 1) {
            setLiens(liens.filter((lien) => lien.id !== id));
        }
    };

    // Vérifie si le dernier lien est complet
    const isLastLienComplete = () => {
        const lastLien = liens.at(-1);
        return (
            lastLien.href &&
            lastLien.salles.length > 0
        );
    };

    // Ajoute un nouveau lien vide si le dernier est complet
    const addLien = () => {
        if (isLastLienComplete()) {
            setLiens([
                ...liens,
                {
                    id: crypto.randomUUID(),
                    href: '',
                    description: '',
                    motsClefs: [],
                    salles: [],
                    isOpen: true,
                },
            ]);
        }
    };

    // Met à jour un champ spécifique d'un lien
    const handleChange = (id, field, value) => {
    

        if (field !== 'salles'&&field !=='motsClefs') {
            setLiens(
                liens.map((lien) =>
                    lien.id === id ? { ...lien, [field]: value, alert:false } : lien
                )
            );
        } else if (field === 'salles') {
            if(salles.some((e) => e.name===selectedSalle)){
            setSelectedSalle('');
            setLiens(
                liens.map((lien) =>
                    lien.id === id
                        ? {
                              ...lien,
                              salles: [...lien.salles.filter(e=>e!==value), value],
                              alert:false
                          }
                        : lien
                )
            );
            alert.salle&&setAlert({...alert, salle:false });
        } else {
            setLiens(liens.map((lien)=>
            lien.id!==id? lien : {...lien, alert:true}
            ));
            setAlert({...alert, salle:true })
        }
        } else {
            setLiens(liens.map(lien=> lien.id===id
                ? {
                    ...lien, 
                    motsClefs: [...lien.motsClefs, value],
                    alert:false
                }
                : lien))
        }
    };

    //Supprime une salle
    const deleteSalle = (id,value)=>{
        setLiens(
                liens.map((lien) =>
                    lien.id === id
                        ? {
                              ...lien,
                              salles: lien.salles.filter(e=>e!==value),
                          }
                        : lien
                )
            );
    }

    //Supprime un mot clef
    const deleteMotClef = (id, value)=>{
            setLiens(
                liens.map(lien =>
                    lien.id === id
                        ? {
                            ...lien,
                            motsClefs: lien.motsClefs.filter(e => e.toLowerCase() !== value.toLowerCase())
                        }
                        : lien
                )
            );
    }
    
    // Soumet la liste des liens
    const submitLiens = async () => {
        setLoading(true);
        const isValid = liens.every(
            (lien) =>
                lien.href &&
                lien.description &&
                lien.motsClefs.length > 0 &&
                lien.salles.length > 0
        );

        if (!isValid) {
            setAlert({
                href: !liens.every((lien) => lien.href),
                description: !liens.every((lien) => lien.description),
                motsClefs: !liens.every((lien) => lien.motsClefs.length > 0),
                salle: !liens.every((lien) => lien.salles.length > 0),
            });
            setLoading(false);
            return;
        }
        const data = liens.map(({ href, description, salles, motsClefs }) => ({
                                    href,
                                    description,
                                    salles,
                                    motsClefs
                                    }));
        try {
            const response = await fetchList('liens', 'POST', { data });

            if (response.result) {
                refresh((prev)=>!prev);
                setIsVisible(false);
                alert('Liens bien ajoutés');
                setLoading(false);
            } else {
                setAlert({
                    href: true,
                    description: true,
                    motsClefs: true,
                    salle: true,
                });
                setLoading(false);
            }
        } catch (error) {
            setAlert({
                href: true,
                description: true,
                motsClefs: true,
                salle: true,
            });
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
                className="
                    absolute top-3 right-3 p-2
                    text-gray-800 dark:text-gray-200
                    hover:text-red-500 cursor-pointer z-10
                "
                title="Fermer la fenêtre"
                action={() => {setIsVisible(false); refresh(prev=>!prev)}}
                tooltipClassName='backdrop-blur-sm text-gray-800 dark:text-gray-50'

            />

            <h3
                id="nvx-liens-title"
                className="
                    mb-4 text-xl font-bold
                    text-gray-800 dark:text-gray-100
                "
            >
                {'Ajouter des Liens : ' + liens.length + (liens.length > 1 ? ' liens' : ' lien')}
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
                            key={lien.id}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="
                                w-full mb-4
                                bg-white dark:bg-gray-700
                                rounded-lg shadow-md
                            "
                        >
                            {/* En-tête pliable */}
                            <div
                                className="
                                    flex justify-between items-center
                                    p-4 cursor-pointer
                                "
                                onClick={() => toggleLien(lien.id)}
                            >
                                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                    Lien {index + 1} : {lien.isOpen||lien.description}
                                </h4>
                                <div className="flex items-center gap-3">
                                    <Icon
                                        type="fermer"
                                        title="Supprimer"
                                        action={(e) => {
                                            e.stopPropagation();
                                            removeLien(lien.id);
                                        }}
                                        className="
                                            text-red-500
                                            hover:text-red-700
                                            cursor-pointer
                                        "
                                        tooltipClassName='backdrop-blur-sm text-gray-800 dark:text-gray-50'

                                    />
                                    <Icon
                                        type={lien.isOpen ? 'replier' : 'afficher'}
                                        title={lien.isOpen ? 'Réduire' : 'Développer'}
                                        className="
                                            text-gray-600 dark:text-gray-300
                                            hover:text-gray-800 dark:hover:text-gray-100
                                        "
                                        classNameFont="w-5 h-5"
                                        tooltipClassName='backdrop-blur-sm text-gray-800 dark:text-gray-50'
                                    />
                                </div>
                            </div>

                            {/* Contenu du formulaire (visible si isOpen) */}
                            {lien.isOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="px-4 pb-4"
                                >
                                    {/* Sélection de la salle */}
                                    <div className="mb-3 flex flex-col gap-2">
                                        <div className="flex items-center gap-2">
                                            <Input
                                                type="text"
                                                title="Sélectionner vos salles"
                                                value={selectedSalle}
                                                placeholder="Choisissez vos salles"
                                                className="mb-0 w-[80%]"
                                                inputClassName="w-full"
                                                change={(e) => setSelectedSalle(e.target.value)}
                                                autoBoxClassName="max-h-10"
                                                autocomplete={true}
                                                dataliste={salles.map((e) => e.name)}
                                                onAutoClick={(e) => setSelectedSalle(e)}
                                                alerte={lien.alert&&alert.salle||alert.salle&&lien.salles.length===0}
                                                alerteMessage={lien.alert?"Selectionnez une salle existante.":"Veuillez entrer au moins une salle."}

                                            />
                                            {selectedSalle.length>1&&
                                            (<motion.div
                                                onClick = {()=>{handleChange(lien.id, 'salles', selectedSalle)}}
                                                whileTap = {{sclale:0.95}}
                                                animate = {{scale:[1,1.1,1]}}
                                                transition = {{
                                                    duration : 1.5,
                                                    repeat: Infinity,
                                                    ease:"easeInOut"
                                                }}
                                                >
                                                <Icon
                                                type="pluscircle"
                                                title="Ajouter la salle choisie"
                                                className="
                                                    my-2 p-2
                                                    flex items-center justify-center
                                                    text-gray-800 dark:text-gray-200
                                                    bg-emerald-300 dark:bg-violet-500
                                                    rounded-full shadow-lg
                                                    transition-all cursor-pointer
                                                    active:translate-y-1 active:shadow-sm
                                                    hover:bg-emerald-400 dark:hover:bg-violet-400
                                                    w-7 h-7
                                                "
                                                classNameFont="w-3 h-3"
                                                tooltipClassName='backdrop-blur-sm text-gray-800 dark:text-gray-50'
                                                />
                                            </motion.div>)}
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {lien.salles?.map((salle, i) => (
                                                <span
                                                    key={i}
                                                    className="
                                                        flex items-center gap-1
                                                        px-3 py-1
                                                        bg-emerald-100 dark:bg-gray-600
                                                        text-emerald-800 dark:text-gray-200
                                                        rounded-full text-sm
                                                        transition-colors
                                                        hover:bg-emerald-200 dark:hover:bg-gray-500
                                                    "
                                                >
                                                    {salle}
                                                    <Icon
                                                        type="fermer"
                                                        title="Supprimer la salle"
                                                        className="
                                                            ml-1 text-emerald-600 dark:text-gray-300
                                                            hover:text-emerald-800 dark:hover:text-gray-100
                                                            transition-colors
                                                        "
                                                        classNameFont="w-3.5 h-3.5"
                                                        tooltipClassName='backdrop-blur-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-50'

                                                        action={() => deleteSalle(lien.id, salle)}
                                                    />
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* URL du lien */}
                                    <Input
                                        type="url"
                                        title="URL"
                                        placeholder="https://exemple.com"
                                        value={lien.href}
                                        change={(e) => handleChange(lien.id, 'href', e.target.value)}
                                        alerte={alert.href && !lien.href}
                                        alerteMessage="Veuillez entrer une URL valide."
                                        className="mb-3"
                                        inputClassName="w-full"
                                        tooltipClassName='backdrop-blur-sm text-gray-800 dark:text-gray-50'
                                    />

                                    {/* Titre du lien */}
                                    <Input
                                        type="text"
                                        title="Titre"
                                        placeholder="Titre du lien"
                                        value={lien.description}
                                        change={(e) =>
                                            sanitizedEntries(lien.id,'description',e.target.value)&&
                                            handleChange(lien.id, 'description', e.target.value)
                                        }
                                        alerte={alert.description&&lien.alert||alert.description && !lien.description}
                                        alerteMessage={lien.alert?"caractère invalide détecté":"Veuillez entrer un titre."}
                                        className="mb-3"
                                        inputClassName="w-full"
                                    />

                                    {/* Mots-clés */}
                                    
                                    <div className="mb-3 flex flex-col gap-2">
                                        <div className="flex items-center gap-2">
                                            <Input
                                                type="text"
                                                title="Sélectionner vos mots clefs"
                                                value={motClef}
                                                placeholder="Choisissez votre mot clef"
                                                className="mb-0 w-[80%]"
                                                inputClassName="w-full"
                                                change={(e) => {sanitizedEntries(e.target.value)&&setMotClef(e.target.value)}}
                                                autoBoxClassName="max-h-10"
                                                autocomplete={true}
                                                dataliste={liens.flatMap((e) => e?.motsClefs)}
                                                onAutoClick={(e) => setMotClef(e)}
                                                alerte={alert.motsClefs&&lien.alert||alert.motsClefs && lien.motsClefs.length === 0}
                                                alerteMessage={lien.alert?"caractère invalide":"Veuillez entrer au moins un mot-clé."}
                                            />
                                            {motClef.length>1&&
                                            <motion.div
                                                onClick = {() =>{
                                                    setMotClef('');
                                                    handleChange(lien.id, 'motsClefs', motClef);
                                                }}
                                                whileTap = {{sclale:0.95}}
                                                animate = {{scale:[1,1.1,1]}}
                                                transition = {{
                                                    duration : 1.5,
                                                    repeat: Infinity,
                                                    ease:"easeInOut"
                                                }}
                                                >
                                                    <Icon
                                                type="pluscircle"
                                                title="Ajouter le mot clef"
                                                className="
                                                    my-2 p-2
                                                    flex items-center justify-center
                                                    text-gray-800 dark:text-gray-200
                                                    bg-emerald-300 dark:bg-violet-500
                                                    rounded-full shadow-lg
                                                    transition-all cursor-pointer
                                                    active:translate-y-1 active:shadow-sm
                                                    hover:bg-emerald-400 dark:hover:bg-violet-400
                                                    w-7 h-7
                                                "
                                                classNameFont="w-3 h-3"
                                                tooltipClassName='backdrop-blur-sm text-gray-800 dark:text-gray-50'
                                            />
                                            </motion.div>}
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {lien.motsClefs?.map((mot, i) => (
                                                <span
                                                    key={i}
                                                    className="
                                                        flex items-center gap-1
                                                        px-3 py-1
                                                        bg-emerald-100 dark:bg-gray-600
                                                        text-emerald-800 dark:text-gray-200
                                                        rounded-full text-sm
                                                        transition-colors
                                                        hover:bg-emerald-200 dark:hover:bg-gray-500
                                                    "
                                                >
                                                    {mot}
                                                    <Icon
                                                        type="fermer"
                                                        title="Supprimer la salle"
                                                        className="
                                                            ml-1 text-emerald-600 dark:text-gray-300
                                                            hover:text-emerald-800 dark:hover:text-gray-100
                                                            transition-colors
                                                        "
                                                        classNameFont="w-3.5 h-3.5"
                                                        tooltipClassName='backdrop-blur-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-50'

                                                        action={() => deleteMotClef(lien.id, mot)}
                                                    />
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* Boutons d'action */}
            <div className="flex justify-center space-x-4 mt-4">
                {/* Bouton pour ajouter un nouveau lien */}
                <Icon
                    type="plusCircle"
                    title={
                        isLastLienComplete()
                            ? 'Ajouter un lien'
                            : 'Veuillez compléter ce lien'
                    }
                    tooltipClassName="
                        bg-white dark:bg-gray-800 backdrop-blur-sm
                        text-gray-800 dark:text-gray-200
                        text-sm
                    "
                    classNameFont="w-6 h-6 font-bold"
                    className={`
                        p-3 flex items-center justify-center
                        rounded-full shadow-lg
                        transition-all duration-200
                        ${
                            isLastLienComplete()
                                ? 'text-gray-800 dark:text-gray-200 bg-emerald-300 dark:bg-violet-500 hover:bg-emerald-400 dark:hover:bg-violet-400 cursor-pointer'
                                : 'text-gray-400 dark:text-gray-500 bg-gray-200 dark:bg-gray-600 cursor-not-allowed'
                        }
                        w-12 h-12
                    `}
                    
                    action={isLastLienComplete() ? addLien : undefined}
                />

                {/* Bouton pour soumettre */}
                <Icon
                    type="book"
                    title="Enregistrer les liens"
                    tooltipClassName="
                        bg-white dark:bg-gray-800
                        text-gray-800 dark:text-gray-200
                        text-sm
                    "
                    classNameFont="w-6 h-6 font-bold"
                    className="
                        p-3 flex items-center justify-center
                        text-gray-800 dark:text-gray-200
                        bg-emerald-300 dark:bg-violet-500
                        rounded-full shadow-lg
                        transition-all duration-200
                        active:translate-y-1 active:shadow-sm
                        hover:bg-emerald-400 dark:hover:bg-violet-400
                        cursor-pointer
                        w-12 h-12
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
