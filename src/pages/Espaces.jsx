import {useState, useEffect} from "react";
import Salle from "../components/Salle";
import fetchList from "../hooks/fetchList";
import Icon from "../kit/Icons";

export default function Espaces() {
    //a changer pour un refresh quand il y aura des datas.
    const [refresh, setRefresh] = useState(false);
    const [sallesUser, setSallesUser] = useState([]);
    const [loader, setLoader] = useState(false)
    
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
    
    const salles = sallesUser?.map((item,index) => {
                        return(
                    <Salle key={index} name={item.name} setRefresh={setRefresh} number={item.number} id={item._id}/>
                    )}
                );


    return (
        <div className="min-h-screen w-full flex flex-col items-center bg-gradient-to-b from-blue-50 dark:from-gray-700 to-blue-400 dark:to-gray-900 transition-colors duration-500">
            <div className="w-full p-5 flex flex-col justify-center items-center">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Bienvenue dans vos salles</h2>
                <Icon
                type='salle'
                title="Ajouter une salle"
                showTitle = {true}
                tooltipClassName="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm"
                classNameFont="mx-2 w-6 h-6 cursor-pointer font-bold"
                className="my-2 p-2 text-gray-800 dark:text-gray-200 
                flex items-center justify-center
                bg-emerald-300 dark:bg-violet-500 rounded-full shadow-lg
                transition-color active:translate-y-1 active:shadow-sm
                hover:bg-emerald-400 dark:hover:bg-violet-400"
                />
            </div>
            <div className="w-full flex flex-col justify-center items-center">
                {/*Liste des salles*/}
                {salles}
                {loader&&<span className="text-gray-600 dark:text-gray-400">Chargement des données</span>}
                {!loader&&sallesUser.length===0&&<p className="text-gray-600 dark:text-gray-400">Vous n'avez pas encore de salles. Cliquez sur le + pour en ajouter une.</p>}
            </div>
            
            
        </div>
    )
};
