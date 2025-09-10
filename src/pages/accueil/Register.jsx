import React, {useState} from 'react'

export default function Register ({email, password}) {
    const [user, setUser] = useState({email, password});

    return (
    <div className='p-2 border-2 rounded-md border-emerald-300 dark:border-violet-500 bg-gray-50 text-gray-800 dark:bg-gray-700'>
        <div className='flex flex-col gap-2 mt-2 justify-center items-center '>
            <div className='mt-2 text-gray-800 dark:text-gray-50 text-lg font-bold'>
            Création d'un compte
            </div>
        <form 
        id='Register'
        onSubmit={(e)=>{
            e.preventDefault();
            console.log(user);
        }}
        className='flex flex-col gap-2 mt-2 justify-center items-center '>
            <label htmlFor="name">
            <input 
            type='text'
            placeholder="Nom d'utilisateur"
            value={user.name || ''}
            className='rounded-md px-2 py-1 border-2 border-emerald-300 dark:border-violet-500'
            onChange={(e)=>setUser({...user, name: e.target.value})}
            ></input>
            </label>
            <label htmlFor="email">
            <input 
            type='email'
            placeholder='Email'
            value={user?.email ?? email}
            className='rounded-md px-2 py-1 border-2 border-emerald-300 dark:border-violet-500'
            onChange={(e)=>setUser({...user, email: e.target.value})}
            ></input>
            </label>
            <label htmlFor="password">
            <input 
            type='password'
            placeholder='Mot de passe'
            className='rounded-md px-2 py-1 border-2 border-emerald-300 dark:border-violet-500'
            onChange={(e)=>setUser({...user, password: e.target.value})}
            ></input>
            </label>
            <label htmlFor="submit">
            <input 
            type='submit'
            value="Inscription"
            className='cursor-pointer rounded-md px-2 py-1 border-2 border-emerald-300 dark:border-violet-500 bg-emerald-300 dark:bg-violet-500 hover:bg-emerald-400 dark:hover:bg-violet-400 text-gray-800 dark:text-gray-50 font-bold'
            ></input>
            </label>
        </form>
        </div>
        
        </div>)
}