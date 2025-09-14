import {useState, useEffect} from "react";
import Salle from "../components/Salle";
import fetchList from "../hooks/fetchList";

export default function Espaces() {
    //a changer pour un refresh quand il y aura des datas.
    const [refresh, setRefresh] = useState(false);
    const [sallesUser, setSallesUser] = useState([]);
    
    useEffect(() => {
       const dataFetch = async () => {
        const response = await fetchList('rubriques', 'GET');
        response.error?
        setSallesUser([])
        :
        setSallesUser(response.data);
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
            <div className="w-full p-5 flex justify-center items-center">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Bienvenue dans vos espaces</h2>
                <div className="ml-2 w-6 h-6 bg-emerald-300 dark:bg-violet-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-emerald-400 dark:hover:bg-violet-400 text-gray-800 dark:text-gray-50 font-bold">+</div> 
            </div>
            <div className="w-full flex flex-col justify-center items-center">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-5">Vos salles</h3>
                {/*Liste des salles*/}
                {salles}
                {sallesUser.length===0&&<p className="text-gray-600 dark:text-gray-400">Vous n'avez pas encore de salles. Cliquez sur le + pour en ajouter une.</p>}
            </div>
            
        </div>
    )
};
