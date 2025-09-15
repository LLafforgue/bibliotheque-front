import { useState } from 'react'
import Input from '../kit/Input'
import Icon from '../kit/Icons'
import fetchList from '../hooks/fetchList'

export default function NvllSalle({refresh, setIsVisible}){
    const [name, setName] = useState('')
    const [alert, setAlert] = useState(false)
    const [loading, setLoading] = useState(false)

    const newSalle = async () =>{
        setLoading(true);
        if (!name) {
            setLoading(false)
            setAlert(true)
        }
        try{
        const response = await fetchList('rubriques','POST',{name})
        if (response.result) {
            setLoading(false);
            setIsVisible(false);
            refresh(true);
        } else {
            setAlert(true)
            setLoading(false);
        }
        } catch {
            setAlert(true);
            setLoading(false);
        }
    }

    return (
        <div className='w-1/2 h-2/6
                        flex flex-col justify-center items-center
                        bg-gradient-to-b from:bg-emerald-300 to:bg-emerald-100 dark:from:bg-gray-800 dark:to:bg-slate-800
                        rounded-lg'>
        <Input
            type='text'
            title='Nouvelle Salle'
            placeholder='Nom de votre salle'
            className='items-center'
            labelClassName = 'border-gray-50 border-b-2 text-gray-800 dark:text-gray-50'
            inputClassName='m-5'
            alerte={alert}
            alerteMessage="Erreur dans l'envoi"
            change={(e)=>{
                setAlert(false)
                setName(e.target.value);
            }}
            />
        <Icon
            type='book'
            title='Ajouter cette salle'
            className='w-full'
            classNameFont='text-gray-800 dark:text-gray-50'
            showTitle = {true}
            action={()=>newSalle()}
            />
            {loading&&<div>En chargement</div>}
        </div>
        )
}
