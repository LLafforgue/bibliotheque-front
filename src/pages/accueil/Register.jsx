import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import fetchList from '../../hooks/fetchList';

export default function Register ({email, password}) {
    const [user, setUser] = useState({email, password});
    const [alert, setAlert] = useState({username:false, firstname:false, email:false, password:false, confirm:false, notSent:''})
    const [confirm, setConfirm] = useState('')
    const [loading, setLoading] = useState(false)
    const patern = /^(?=.*[A-Z])(?=.*\d)(?=.*[&*$#@+_]).{8,}$/
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        //verifier les champs
        for(let field in alert){
            if((field!='confirm'&&field!='notSent')&&!user[field]){
                setAlert({...alert, [field]:true});
                return
            };
        };

        //conformité du mot de passe
        if(!patern.test(user.password)){
            setAlert({...alert, password:true});
            return;
        };
        //confirmation du mot de passe
        if(user?.password!==confirm){
            setAlert({...alert, confirm:true});
            setLoading(false)
            return;
        };
        
        //Envoi des données
        try{
            setLoading(true)
            const result = await fetchList('auth/users/register', 'POST', user);
            if(result.error){
            setAlert({...alert, notSent:result?.message?.toString()});
            return
            } else {
            localStorage.clear();
            localStorage.setItem('token', result.token);
            localStorage.setItem('username', result.data?.username);
            navigate('/espaces', {replace:true})
            }
        return

        }catch(err){
        setAlert({...alert, notSent:err});
        return
        } finally {
        setLoading(false)
        }

    };

    return (
    <div className='w-80 p-5 border-2 rounded-md border-emerald-300 dark:border-violet-500 bg-gray-50 text-gray-800 dark:bg-gray-700'>
        <div className='flex flex-col gap-2 mt-2 justify-center items-center '>
            <div className='mt-2 text-gray-800 dark:text-gray-50 text-lg font-bold'>
            Création d'un compte
            </div>
        <form 
        id='Register'
        onSubmit={handleSubmit}
        className='flex flex-col gap-2 mt-2 justify-center items-center'>
            <label htmlFor="username">
            <input 
            type='text'
            id='username'
            placeholder="Nom d'utilisateur"
            value={user?.username || ''}
            className={alert.username?'rounded-md px-2 py-1 border-2 border-red-950':'rounded-md px-2 py-1 border-2 border-emerald-300 dark:border-violet-500'}
            onChange={(e)=>{
                setUser({...user, username: e.target.value});
                setAlert({username:false, firstname:false, email:false, password:false, confirm:false, notSent:''});

            }}
            ></input>
            </label>
            {alert?.username&&<p className='text-red-800'>champ manquant</p>}

            <label htmlFor="firstname">
            <input 
            type='text'
            id='firstname'
            placeholder="Nom"
            value={user.firstname || ''}
            className={alert.firstname?'rounded-md px-2 py-1 border-2 border-red-950':'rounded-md px-2 py-1 border-2 border-emerald-300 dark:border-violet-500'}
            onChange={(e)=>setUser({...user, firstname: e.target.value})}
            ></input>
            </label>
            {alert?.firstname&&<p className='text-red-800'>champ manquant</p>}

            <label htmlFor="email">
            <input 
            id='email'
            type='email'
            placeholder='Email'
            value={user?.email ?? email}
            className='rounded-md px-2 py-1 border-2 border-emerald-300 dark:border-violet-500'
            onChange={(e)=>setUser({...user, email: e.target.value})}
            ></input>
            </label>
            {alert?.email&&!user.email&&<p className='text-red-800'>champ manquant</p>}

            <label htmlFor="password">
            <input 
            id='password'
            type='password'
            placeholder='Mot de passe'
            className='rounded-md px-2 py-1 border-2 border-emerald-300 dark:border-violet-500'
            onChange={(e)=>{
                setUser({...user, password: e.target.value});
                setAlert({username:false, firstname:false, email:false, password:false, confirm:false, notSent:''});
            }}
            ></input>
            </label>
            {alert?.password&&!user.password&&<p className='text-red-800'>champ manquant</p>}
            {alert?.password&&<p className='text-red-800'>Mot de passe non valide</p>}

            <label htmlFor="confirm">
            <input 
            id = 'confirm'
            type='password'
            placeholder='Mot de passe'
            className='rounded-md px-2 py-1 border-2 border-emerald-300 dark:border-violet-500'
            onChange={(e)=>{
                setConfirm(e.target.value);
                setAlert({username:false, firstname:false, email:false, password:false, confirm:false, notSent:''});
            }}
            ></input>
            </label>
            {alert?.confirm&&<p className='text-red-800'>Confirmation invalide</p>}

            <button
            type="submit"
            disabled={loading}
            className="cursor-pointer rounded-md px-2 py-1 border-2 border-emerald-300 dark:border-violet-500 bg-emerald-300 dark:bg-violet-500 hover:bg-emerald-400 dark:hover:bg-violet-400 text-gray-800 dark:text-gray-50 font-bold mt-2 disabled:opacity-50"
          >
            {loading ? "Changement..." : "S'enregistrer"}
          </button>
          {alert?.notSent&&<p className="text-red-800">{`Nous rencontrons une erreur de serveur : ${alert?.notSent} Effectuez une nouvelle tentative`}</p>}
        </form>
        </div>
        
        </div>)
}