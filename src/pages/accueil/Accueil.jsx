import React, {useState} from 'react'
import Login from './Login'
import Register from './Register'
import { useSearchParams, NavLink } from 'react-router-dom'

function Accueil() {
    console.log(useSearchParams());
    const [searchParams] = useSearchParams()
    const mode = searchParams.get('mode')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  return (
    <div>
        <header>Bienvenue dans votre bibliothèque</header>
        {mode === 'login'?
            <Login setEmail={setEmail} setPassword={setPassword}/>
            :
            <Register email={email} password={password}/>
        }
        <nav>
            <NavLink to ='/?mode=login'>Je suis déjà inscrit.e</NavLink>
            {' | '}
            <NavLink to ='/?mode=Register'>Je m'inscris</NavLink>
        </nav>
    </div>
  )
}
export default Accueil
