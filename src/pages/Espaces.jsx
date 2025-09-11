import React,{useState, useEffect} from "react";
import Salle from "../components/Salle";
import fetchList from "../hooks/fetchList";

export default function Espaces() {
    //a changer pour un refresh quand il y aura des datas.
    const [sallesUser, setSallesUser] = useState([]);
    const sallesTest = [
        {name: 'Salle 1', number: 5},
        {name: 'Salle 2', number: 3},
        {name: 'Salle 3', number: 8},
        {name: 'Salle 4', number: 2},
        {name: 'Salle 5', number: 6},
    ];
    useEffect(() => {
       const dataFetch = async () => {
        const data = await fetchList('rubriques', 'GET');
        setSallesUser(data.data);
       };
       dataFetch();
        // const sallesUtilisateur = undefined
    }, []);

    const setName = ({newName,id}) => {
        // fetch to backend to change the name
        setSallesUser([...sallesUser, sallesUser[id].name=newName]);
        console.log(newName);
        console.log(Salle);
    }

    const salles = sallesUser.map((item,index) => {
                        return(
                    <Salle key={index} name={item.name} setName={setName} number={item.number} id={index}/>
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
                {salles.length===0&&<p className="text-gray-600 dark:text-gray-400">Vous n'avez pas encore de salles. Cliquez sur le + pour en ajouter une.</p>}
            </div>
            
        </div>
    )
};
