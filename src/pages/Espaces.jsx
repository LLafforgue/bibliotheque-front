import {useState, useEffect} from "react";
import { Reorder, AnimatePresence, motion } from "framer-motion";
import Salle from "../components/Salle";
import NvllSalle from "../components/modales/NvllSalle";
import NvxLiens from "../components/modales/NvxLiens";
import fetchList from "../hooks/fetchList";
import Icon from "../kit/Icons";
import Input from "../kit/Input";
import useMobile from "../hooks/UseMobile";
import Lien from "../components/Liens";
import Spinner from "../kit/Spinner";


export default function Espaces() {

    const [refresh, setRefresh] = useState(false);
    const [sallesUser, setSallesUser] = useState([]);
    const [loader, setLoader] = useState(false);
    const [lock, setLock] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const [liensIsVisible, setLiensIsVisible] = useState(false);
    const [visibleLiens, setVisibleLiens] = useState([]);
    const [salleActiveId, setSalleActiveId] = useState(null);
    const [salleInput, setSalleInput] = useState('');
    const patern = new RegExp(salleInput, "i");
    const [search, setSearch] = useState('');
    const [divisions, setDivision] = useState([]);
    


    //Détecteur de réduction de taille de fenètre
    const isMobile = useMobile();

    const loadLiens = (id)=>{
        const liens = sallesUser.filter(s=>s._id===id)[0].liens
        setSalleActiveId(id)

        setVisibleLiens( liens.map((l)=>{
            return <Lien key = {l._id} href= {l.href} description={l.description} id={l._id} fav={l.favoris} favIcon={l?.favicon} refresh={setRefresh} video={l.video}/>
        }))

        };

    useEffect(() => {
        setLoader(true)
       const dataFetch = async () => {
        const response = await fetchList('rubriques', 'GET');
        response.error?
        setSallesUser([])
        :
        setSallesUser(response.data);
        const divisionNumber = Math.ceil(response?.data?.length/4) //test divisions
        setDivision(Array.from({ length: divisionNumber }, (_, i) => i)) //test divisions
        console.log(response.data)
        setLoader(false)
       };
       dataFetch();
    }, [refresh,lock]);

    const salles = divisions.map((div,i)=>{
        return <div key={i} className="flex">

                {sallesUser.map((s,j)=>{
                        if( j>=(i)*4 && j<(i+1)*4){

                            if(search==='noms' && !patern.test(s.name)) return

                            return(
                            <Salle 
                                onSalleClick={()=>loadLiens(s._id)}
                                key={s._id}
                                salle={s} 
                                name={s.name} 
                                setRefresh={setRefresh} 
                                number={s.number} 
                                id={s._id}
                                lock={lock}
                                isActive={salleActiveId === s._id}/>)
                        }
                        }
                    )}

             </div>
    })


    const handlePosition = async () => {
        const newPositions = sallesUser.reduce(
                                (acc, s, i) => s.position !== i + 1 ? [...acc, { _id: s._id, position: i + 1 }] : acc,
                                []
                            );
        if(newPositions.length){
            const response = await fetchList('rubriques','PUT',{data:newPositions})
            response.result?
            alert(response?.data?.toString()) : alert(`erreur ${response?.status?.toString()} : ${response?.message?.toString()}`)
        }
        setLock(true)
    }
    
    return (
        <div className="min-h-screen w-full 
                        flex flex-col items-center 
                        bg-gradient-to-b from-blue-50 dark:from-gray-700 to-blue-400 dark:to-gray-900 
                        transition-colors duration-500">
            
            {/* Header de recherche*/}
            <h2 className="my-1 text-3xl font-bold text-gray-800 dark:text-gray-200">Bienvenue dans vos salles</h2>
            <div className="w-full max-w-md mx-auto mb-6">
                {/* Conteneur principal avec bordure et fond */}
                <div className="
                    flex items-center gap-0
                    p-2 pl-3
                    bg-white dark:bg-gray-800
                    border border-gray-300 dark:border-gray-600
                    rounded-lg shadow-sm
                    focus-within:ring-2 focus-within:ring-emerald-500 dark:focus-within:ring-violet-500
                    transition-all
                    ">
                    {/* Icône de recherche */}
                    <Icon
                    type="search"
                    title="Faire une recherche de salle par :"
                    showTitle={true}
                    className="text-gray-500 dark:text-gray-400"
                    classNameFont="w-5 h-5"
                    />

                    {/* Séparateur visuel */}
                    <span className="mx-2 text-gray-400 dark:text-gray-500">|</span>

                    {/* Options de recherche (noms/mots-clés) */}
                    <div className="flex">
                    <button
                        onClick={() => setSearch('noms')}
                        className={`
                        px-3 py-1 rounded-md text-sm font-medium transition-colors
                        ${search === 'noms'
                            ? 'text-emerald-600 dark:text-violet-400 bg-emerald-50 dark:bg-gray-700'
                            : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100'}
                        `}
                        >
                        Noms
                    </button>
                    <span className="mx-2 text-gray-400 dark:text-gray-500">|</span>
                    <button
                        onClick={() => setSearch('motClefs')}
                        className={`
                        px-3 py-1 rounded-md text-sm font-medium transition-colors
                        ${search === 'motClefs'
                            ? 'text-emerald-600 dark:text-violet-400 bg-emerald-50 dark:bg-gray-700'
                            : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100'}
                        `}
                        >
                        Mots-clés
                    </button>
                    </div>
                </div>

                {/* Zone de recherche conditionnelle */}
                <div className="mt-2 relative">
                    {search === 'noms' && (
                    <Input
                        type="text"
                        title="Rechercher une salle"
                        placeholder="Ex: Salle de réunion, Projet Alpha..."
                        value={salleInput}
                        change={(e) => setSalleInput(e.target.value)}
                        autocomplete={true}
                        dataliste={sallesUser.map(s => s.name)}
                        onAutoClick={setSalleInput}
                        className="w-full"
                        inputClassName="
                        pl-10 pr-4 py-2
                        border border-gray-300 dark:border-gray-600
                        rounded-lg shadow-sm
                        focus:ring-2 focus:ring-emerald-500 dark:focus:ring-violet-500
                        dark:bg-gray-800 dark:text-gray-200
                        "
                        autoBoxClassName="
                        max-h-60 w-full
                        bg-white dark:bg-gray-800
                        border border-gray-200 dark:border-gray-700
                        rounded-md shadow-lg
                        overflow-y-auto
                        mt-1
                        "
                    />
                    )}

                    {search === 'motClefs' && (
                    <Input
                        type="text"
                        title="Rechercher par mots-clés"
                        placeholder="Ex: marketing, design, urgent..."
                        value={salleInput}
                        change={(e) => setSalleInput(e.target.value)}
                        autocomplete={true}
                        dataliste={sallesUser.flatMap(s => s.liens.flatMap(l => l.motsClefs)).filter((v, i, a) => a.indexOf(v) === i)} // Supprime les doublons
                        onAutoClick={setSalleInput}
                        className="w-full"
                        inputClassName="
                        pl-10 pr-4 py-2
                        border border-gray-300 dark:border-gray-600
                        rounded-lg shadow-sm
                        focus:ring-2 focus:ring-emerald-500 dark:focus:ring-violet-500
                        dark:bg-gray-800 dark:text-gray-200
                        "
                        autoBoxClassName="
                        max-h-60 w-full
                        bg-white dark:bg-gray-800
                        border border-gray-200 dark:border-gray-700
                        rounded-md shadow-lg
                        overflow-y-auto
                        mt-1
                        "
                    />
                    )}
                    {search&&<Icon
                    type="fermer"
                    title="Annuler la recherche"
                    action={()=>setSearch('')}
                    className={`
                        absolute right-2 top-1
                        
                        text-gray-500 dark:text-gray-400
                        hover:text-gray-800 dark:hover:text-gray-200
                        transition-all duration-200
                        ${search ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}  {/* Animation */}
                        z-10
                        `}
                    tooltipClassName="
                        bg-white dark:bg-gray-800
                        text-gray-800 dark:text-gray-200
                        text-sm
                        border border-gray-200 dark:border-gray-700
                        "
                    />}
                </div>
            </div>

            {/* Gestion des salles */}
            <div className="w-full p-5 flex gap-2 justify-center items-center">
                <Icon
                type={isVisible&&'salleouverte'||'sallefermee'}
                title="Ajouter une salle"
                showTitle = {true}
                action={()=>setIsVisible(!isVisible)}
                tooltipClassName="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm"
                classNameFont="mx-2 w-6 h-6 cursor-pointer font-bold"
                className="
                my-2 p-2 
                flex items-center justify-center
                text-gray-800 dark:text-gray-200 
                bg-emerald-300 dark:bg-violet-500 rounded-full shadow-lg
                transition-color duration-200 active:translate-y-1 active:shadow-sm
                hover:bg-emerald-400 dark:hover:bg-violet-400 cursor-pointer"
                />
                {/*Modale pour une nouvelle salle*/}
                <AnimatePresence initial={false}>
                {isVisible&&<motion.div
                                initial={{ opacity: 0, scale: 0, y:-100 }}
                                animate={{ opacity: 1, scale: 1, y:0 }}
                                exit={{ opacity: 0, scale: 0, y:0 }}
                                transition={{
                                duration: 0.5, 
                                ease: "easeInOut",
                                }}
                                style={{
                                position: "fixed",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                                backdropFilter: "blur(5px)",
                                zIndex: 1000,
                                overflow: "visible"
                            }}
                            
                            >
                                <NvllSalle setIsVisible={setIsVisible} refresh={setRefresh}/>
                            </motion.div>}
                </AnimatePresence>

                {/*Gestion Drag & Drop de l'ordre des salles*/}
                {lock?
                <Icon
                type='lock'
                title='Selectionner pour gérer votre arangement'
                action={()=>{setLock(false); setSalleInput('')}}
                tooltipClassName="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm"
                classNameFont="mx-2 w-6 h-6 cursor-pointer font-bold"
                className="
                my-2 p-2 
                flex items-center justify-center
                text-gray-800 dark:text-gray-200 
                bg-emerald-300 dark:bg-violet-500 rounded-full shadow-lg
                transition-color active:translate-y-1 active:shadow-sm
                hover:bg-emerald-400 dark:hover:bg-violet-400"
                />
                :
                <Icon
                type='unlock'
                title='Selectionner pour figer votre arangement'
                showTitle = {true}
                action={()=>handlePosition()}
                tooltipClassName="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm"
                classNameFont="mx-2 w-6 h-6 cursor-pointer font-bold"
                className="
                my-2 p-2 
                flex items-center justify-center
                text-gray-800 dark:text-gray-200 
                bg-emerald-300 dark:bg-violet-500 rounded-full shadow-lg
                transition-color active:translate-y-1 active:shadow-sm
                hover:bg-emerald-400 dark:hover:bg-violet-400"
                />
                }

                {/*Modale pour nouveau lien*/}
                <div className="flex items-center gap-2 ml-4">
                    <Icon
                        type="plusCircle"
                        title="Ajouter un lien"
                        tooltipClassName="bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-sm"
                        classNameFont="h-6 w-6 text-gray-800 dark:text-gray-50 hover:scale-110 transition-transform cursor-pointer"
                        className="flex items-center gap-2 text-gray-800 dark:text-gray-50"
                        showTitle={true}
                        action = {()=>setLiensIsVisible(true)}
                    />
                    <AnimatePresence initial={false}>
                        {liensIsVisible&&<motion.div
                                        initial={{ opacity: 0, scale: 0, y:-100 }}
                                        animate={{ opacity: 1, scale: 1, y:0 }}
                                        exit={{ opacity: 0, scale: 0, y:0 }}
                                        transition={{
                                        duration: 0.5, 
                                        ease: "easeInOut",
                                        }}
                                        style={{
                                        position: "fixed",
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                                        backdropFilter: "blur(5px)",
                                        zIndex: 1000,
                                        overflow: "visible"
                                    }}
                                    
                                    >
                                        <NvxLiens 
                                            refresh={setRefresh} 
                                            salles={sallesUser}
                                            setIsVisible={setLiensIsVisible}
                                            salleActive = {salleActiveId&&sallesUser.find(s=>s._id===salleActiveId).name} />
                                    </motion.div>}
                    </AnimatePresence>
                </div>
                
            </div>
            
            {/*Affichage des salle + liens*/}
            <div className={`w-full max-h-5/6 flex  justify-center items-start ${isMobile ? "flex-col" : "flex-row"}`}>
                {/* Liste des salles */}
                <Reorder.Group
                    className="flex  flex-col justify-center items-center flex-1"
                    values={sallesUser}
                    onReorder={setSallesUser}
                >
                    {salles}
                </Reorder.Group>

                
            {/* Affichage des liens */}
            {visibleLiens?.length > 0 && (
                <motion.div
                    initial={{
                        opacity: 0,
                        x: isMobile ? "100%" : 20, // mobile = glisse de droite
                        y: 0
                    }}
                    animate={{
                        opacity: 1,
                        x: 0,
                        y: 0
                    }}
                    exit={{
                        opacity: 0,
                        x: isMobile ? "100%" : 20, // repart sur la droite
                        y: 0
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={`
                        ${isMobile 
                            ? "fixed inset-0 w-full h-full z-50 p-4 flex flex-col items-center bg-white dark:bg-gray-900" 
                            : "ml-4 w-1/2 relative"
                        }
                    `}
                >
                    <div className={` rounded-lg shadow-xl overflow-y-auto p-3 border border-gray-200 dark:border-gray-700 
                                    ${isMobile ? "flex-1 w-4/5" : "fixed bg-white dark:bg-gray-800"}`}>
                        
                        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex justify-between mb-2">
                            Liens associés à {sallesUser.find((e)=>e._id===salleActiveId).name}
                            <Icon type="fermer" title="Fermer" action={() => setVisibleLiens([])} />
                        </h3>

                        {visibleLiens.length > 0 ? (
                            visibleLiens
                        ) : (
                            <p className="text-sm text-gray-500 dark:text-gray-400 p-2">
                                Aucun lien pour cette salle
                            </p>
                        )}
                    </div>
                </motion.div>
            )}

            </div>

            {loader && <Spinner/>}
                    {!loader && sallesUser.length === 0 && (
                        <p className="text-gray-600 dark:text-gray-400">
                            Vous n'avez pas encore de salles. Cliquez sur le + pour en ajouter une.
                        </p>
                    )}
            
            
        </div>
    )
};
