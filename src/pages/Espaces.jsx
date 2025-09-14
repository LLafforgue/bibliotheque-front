import {useState, useEffect} from "react";
import { Reorder } from "framer-motion";
import Salle from "../components/Salle";
import fetchList from "../hooks/fetchList";
import Icon from "../kit/Icons";

export default function Espaces() {
    //a changer pour un refresh quand il y aura des datas.
    const [refresh, setRefresh] = useState(false);
    const [sallesUser, setSallesUser] = useState([]);
    const [loader, setLoader] = useState(false);
    const [lock, setLock] = useState(true);
    
    useEffect(() => {
        setLoader(true)
       const dataFetch = async () => {
        const response = await fetchList('rubriques', 'GET');
        response.error?
        setSallesUser([])
        :
        setSallesUser(response.data);
        setLoader(false)
       };
       dataFetch();
    }, [refresh]);
    
    const salles = sallesUser?.map((item) => {
                        return(  
                                <Salle 
                                    key={item._id} 
                                    salle={item} 
                                    name={item.name} 
                                    setRefresh={setRefresh} 
                                    number={item.number} 
                                    id={item._id}
                                    lock={lock}/>
                             )}
                );

    const handlePosition = async () => {
        const newPositions = sallesUser.reduce(
                                (acc, s, i) => s.position !== i + 1 ? [...acc, { _id: s._id, position: i+1 }] : acc,
                                []
                            );
        if(newPositions.length){
            const response = await fetchList('rubriques','PUT',{data:newPositions})
            response.result?
            alert(response?.data?.toString()) : alert(response?.message?.toString()|response?.status?.toString())
        }
        setLock(true)
    }
    
    return (
        <div className="
            min-h-screen w-full
            flex flex-col items-center
            bg-gradient-to-b from-blue-50 dark:from-gray-700 to-blue-400 dark:to-gray-900
            transition-colors duration-500
                        ">
            <h2 className="my-1 text-3xl font-bold text-gray-800 dark:text-gray-200">Bienvenue dans vos salles</h2>
            <div className="w-full p-5 flex gap-2 justify-center items-center">
                <Icon
                type='salle'
                title="Ajouter une salle"
                showTitle = {true}
                tooltipClassName="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm"
                classNameFont="mx-2 w-6 h-6 cursor-pointer font-bold"
                className="
                my-2 p-2 
                flex items-center justify-center
                text-gray-800 dark:text-gray-200 
                bg-emerald-300 dark:bg-violet-500 rounded-full shadow-lg
                transition-color active:translate-y-1 active:shadow-sm
                hover:bg-emerald-400 dark:hover:bg-violet-400 cursor-pointer"
                />
                {lock?
                <Icon
                type='lock'
                title='Selectionner pour gérer votre arangement'
                action={()=>setLock(false)}
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
            </div>
            <div className="w-full max-h-5/6 flex flex-wrap flex-col justify-center items-center">
                {/*Liste des salles*/}
                <Reorder.Group
                className="w-full flex flex-wrap flex-col justify-center items-center"
                values={sallesUser}
                onReorder={setSallesUser}
                >
                {salles}
                </Reorder.Group>
                {loader&&<span className="text-gray-600 dark:text-gray-400">Chargement des données</span>}
                {!loader&&sallesUser.length===0&&<p className="text-gray-600 dark:text-gray-400">Vous n'avez pas encore de salles. Cliquez sur le + pour en ajouter une.</p>}
            </div>
            
            
        </div>
    )
};
