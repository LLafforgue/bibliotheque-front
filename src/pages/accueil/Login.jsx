import React from 'react'
import { useNavigate } from 'react-router-dom';
import fetchList from '../../hooks/fetchList';


export default function Login ({setEmail, setPassword}) {
    const navigate = useNavigate();


    return (<div className='w-80 p-5 border-2 rounded-md border-emerald-300 dark:border-violet-500 bg-violet-50 text-gray-800 dark:bg-gray-700'>
        <div className='flex flex-col gap-2 mt-2 justify-center items-center '>
            <div className='mt-2 text-gray-800 dark:text-gray-50 text-lg font-bold'>
            Page de connexion
            </div>
        <form 
        id='Connexion'
        onSubmit={(e)=>{
            e.preventDefault();
            fetchList('auth/users/login', 'POST', {email: e.target[0].value, password: e.target[1].value})
            .then(data=>{
                if(data.result){
                    localStorage.clear();
                    console.log(data.token);
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('username', data.data.username);
                    navigate('/espaces', {replace:true});
                } else {
                    alert(data?.error)
                }
            })
            setEmail('');
            setPassword('');
        }}
        className='flex flex-col gap-2 mt-2 justify-center items-center '>
            <label htmlFor="email">
            <input 
            type='email'
            placeholder='Email'
            className='rounded-md px-2 py-1 border-2 border-emerald-300 dark:border-violet-500'
            onChange={(e)=>setEmail(e.target.value)}
            ></input>
            </label>
            <label htmlFor="password">
            <input 
            type='password'
            placeholder='Mot de passe'
            className='rounded-md px-2 py-1 border-2 border-emerald-300 dark:border-violet-500'
            onChange={(e)=>setPassword(e.target.value)}
            ></input>
            </label>
            <label htmlFor="submit">
            <input 
            type='submit'
            value='Se connecter'
            className='cursor-pointer rounded-md px-2 py-1 border-2 border-emerald-300 dark:border-violet-500 bg-emerald-300 dark:bg-violet-500 hover:bg-emerald-400 dark:hover:bg-violet-400 text-gray-800 dark:text-gray-50 font-bold'
            ></input>
            </label>
        </form>
            <h6 
            className='dark:text-gray-50 cursor-pointer dark:hover:text-violet-500'
            onClick={()=>{alert('Fonctionnalité à venir !')}}
            >
                Mot de passe oublié
            </h6>
        </div>
        
        </div>)
}