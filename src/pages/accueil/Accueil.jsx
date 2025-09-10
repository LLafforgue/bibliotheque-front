import React, {useState} from 'react'
import Login from './Login'
import Register from './Register'
import { useSearchParams, NavLink } from 'react-router-dom'
import ToggleDarkMode from '../../hooks/ToggleDarkMode'
import Dome from '../../components/Dome'

function Accueil() {
    const [searchParams] = useSearchParams()
    const mode = searchParams.get('mode')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

  return (
    <div className='min-h-screen flex flex-col justify-beetwen items-center bg-blue-50 dark:bg-gray-900 transition-colors duration-500'>
        <Dome/>
        <div className='mt-10 p-5 flex flex-col justify-center items-center '>
        {mode === 'login'?
            <Login setEmail={setEmail} setPassword={setPassword}/>
            :
            <Register email={email} password={password}/>
        }
        </div>
        <nav className='text-center text-sm text-gray-800 dark:text-gray-200 underline m-2'>
            {mode === 'login'?
            <NavLink to ='/?mode=Register'>Je m'inscris</NavLink>
            :
            <NavLink to ='/?mode=login'>Je suis déjà inscrit.e</NavLink>
            }
        
        </nav>
      <div>
        <ToggleDarkMode />
      </div>
    </div>
  )
}
export default Accueil
