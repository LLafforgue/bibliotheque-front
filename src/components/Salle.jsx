import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

export default function Salle({name, number, img, place, setName, id}) {
    const [modifOn, setModifOn] = useState(false);

    const chageName = (newName) => {
        // fetch to backend to change the name
        console.log(newName);
    }

    return <div className="w-11/12 md:w-3/4 lg:w-1/2 max-w-[500px] p-5 mb-5 bg-white dark:bg-gray-800 rounded-full shadow-lg flex justify-between items-center">
        {/*image container*/}
        <div className="w-16 h-16 bg-emerald-300 dark:bg-violet-500 rounded-full flex items-center justify-center">
            {/* <img src={``} alt={name} className="w-12 h-12 rounded-full"/> */}
            image
        </div>
        {/*info container*/}
        <div className="px-5 w-3/4 flex gap-1 flex-col justify-center items-start ">
            {/*Titre et modification*/}
            <div className="w-full flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{name}</h3>
            <FontAwesomeIcon icon={faPen} className="h-4 w-4 text-gray-600 dark:text-gray-400 cursor-pointer hover:text-emerald-300 dark:hover:text-violet-500"
            onClick={()=>{
                setModifOn(!modifOn);
            }}
            />
            </div>
            {modifOn&&<label htmlFor="name" className="w-full flex justify-center items-center gap-2">
                <input 
                type="text"
                placeholder="Nouveau nom"
                className="w-3/4 rounded-md px-2 py-1 border-2 border-emerald-300 dark:border-violet-500"
                onChange={(e)=>setName({newName:e.target.value, id})}
                ></input>
                <button 
                className="cursor-pointer rounded-md px-2 py-1 border-2 border-emerald-300 dark:border-violet-500 bg-emerald-300 dark:bg-violet-500 hover:bg-emerald-400 dark:hover:bg-violet-400 text-gray-800 dark:text-gray-50 font-bold"
                onClick={(e)=>{
                    setModifOn(false);
                    chageName(e.target.value);
                }}
                >Valider</button>
            </label>}
        {/*Nombre de liens*/}
        <div className="text-gray-600 dark:text-gray-400">
            <p>Nombre de liens à visiter : {number}</p>
        </div>
        </div>

    </div>
}