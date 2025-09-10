import React, {useState} from 'react'
import Login from './Login'
import Register from './Register'
import { useSearchParams, NavLink } from 'react-router-dom'
import ToggleDarkMode from '../../hooks/ToggleDarkMode'
import Dome from '../../components/Dome'
import { motion } from 'framer-motion'

function Accueil() {
    const [searchParams] = useSearchParams()
    const mode = searchParams.get('mode')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

  return (
    <div className='min-h-screen flex flex-col justify-beetwen items-center bg-gradient-to-b from-blue-50 dark:from-gray-700 to-blue-400 dark:to-gray-900 transition-colors duration-500'>
        <Dome/>
        <div className='w-11/12 md:w-3/4 lg:w-1/2 max-w-[500px] mt-10 p-5 flex flex-col justify-center items-center [perspective:1000px]'>
          <motion.div
            animate={{ rotateY: mode === 'login' ? 0 : 180 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{ transformStyle: "preserve-3d" }}
            className='relative w-full min-h-[22rem] flex items-center justify-center'
          >
            {/* Face avant */}
            <div className='p-5 w-full absolute inset-0 flex items-center justify-center bg-white/30 dark:bg-gray-800/30 rounded-lg shadow-lg [backface-visibility:hidden]'>
              <Login setEmail={setEmail} setPassword={setPassword}/>
            </div>

            {/* Face arrière */}
            <div
              className='p-5 w-full absolute inset-0 flex items-center justify-center bg-white/30 dark:bg-gray-800/30 rounded-lg shadow-lg [backface-visibility:hidden]'
              style={{ transform: "rotateY(180deg)" }}
            >
              <Register email={email} password={password}/>
            </div>
          </motion.div>
          <nav className='text-center text-sm text-gray-800 dark:text-gray-200 underline m-2 '>
            {mode === 'login'?
            <NavLink to ='/?mode=Register'>Je m'inscris</NavLink>
            :
            <NavLink to ='/?mode=login'>Je suis déjà inscrit.e</NavLink>
            }
        
        </nav>
        </div>

      <div>
        <ToggleDarkMode allContainer={true} />
      </div>
    </div>
  )
}
export default Accueil
