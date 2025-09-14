import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fetchList from '../../hooks/fetchList';

export default function Register({ email, password }) {
    const [user, setUser] = useState({ email, password });
    const [alert, setAlert] = useState({
        username: false,
        firstname: false,
        email: false,
        password: false,
        confirm: false,
        notSent: ''
    });
    const [confirm, setConfirm] = useState('');
    const [loading, setLoading] = useState(false);
    const patern = /^(?=.*[A-Z])(?=.*\d)(?=.*[&*$#@+_]).{8,}$/;
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Vérifier les champs
        for (let field in alert) {
            if (field !== 'confirm' && field !== 'notSent' && !user[field]) {
                setAlert({ ...alert, [field]: true });
                return;
            }
        }

        // Conformité du mot de passe
        if (!patern.test(user.password)) {
            setAlert({ ...alert, password: true });
            return;
        }

        // Confirmation du mot de passe
        if (user?.password !== confirm) {
            setAlert({ ...alert, confirm: true });
            setLoading(false);
            return;
        }

        // Envoi des données
        try {
            setLoading(true);
            const result = await fetchList('auth/users/register', 'POST', user);
            if (result.error) {
                setAlert({ ...alert, notSent: result?.message?.toString() });
                return;
            } else {
                localStorage.clear();
                localStorage.setItem('token', result.token);
                localStorage.setItem('username', result.data?.username);
                navigate('/espaces', { replace: true });
            }
        } catch (err) {
            setAlert({ ...alert, notSent: err });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-80 p-5 border-2 rounded-md border-emerald-300 dark:border-violet-500 bg-gray-50 text-gray-800 dark:bg-gray-700">
            <div className="flex flex-col gap-2 mt-2 justify-center items-center">
                <div className="mt-2 text-gray-800 dark:text-gray-50 text-lg font-bold">
                    Création d'un compte
                </div>

                {/*Formulaire d'enregistrement*/}
                <form
                    id="Register"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-2 mt-2 justify-center items-center"
                >
                    <label htmlFor="username">
                        <input
                            type="text"
                            id="username"
                            placeholder="Nom d'utilisateur"
                            value={user?.username || ''}
                            className={alert.username
                                ? 'rounded-md px-2 py-1 border-2 border-red-950'
                                : 'rounded-md px-2 py-1 border-2 border-emerald-300 dark:border-violet-500'}
                            onChange={(e) => {
                                setUser({ ...user, username: e.target.value });
                                setAlert({ username: false, firstname: false, email: false, password: false, confirm: false, notSent: '' });
                            }}
                        />
                    </label>
                    {alert?.username && <p className="text-red-800">Champ manquant</p>}

                    <label htmlFor="firstname">
                        <input
                            type="text"
                            id="firstname"
                            placeholder="Nom"
                            value={user.firstname || ''}
                            className={alert.firstname
                                ? 'rounded-md px-2 py-1 border-2 border-red-950'
                                : 'rounded-md px-2 py-1 border-2 border-emerald-300 dark:border-violet-500'}
                            onChange={(e) => setUser({ ...user, firstname: e.target.value })}
                        />
                    </label>
                    {alert?.firstname && <p className="text-red-800">Champ manquant</p>}

                    <label htmlFor="email">
                        <input
                            id="email"
                            type="email"
                            placeholder="Email"
                            value={user?.email ?? email}
                            className="rounded-md px-2 py-1 border-2 border-emerald-300 dark:border-violet-500"
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                        />
                    </label>
                    {alert?.email && !user.email && <p className="text-red-800">Champ manquant</p>}

                    <label htmlFor="password">
                        <input
                            id="password"
                            type="password"
                            placeholder="Mot de passe"
                            className="rounded-md px-2 py-1 border-2 border-emerald-300 dark:border-violet-500"
                            onChange={(e) => {
                                setUser({ ...user, password: e.target.value });
                                setAlert({ username: false, firstname: false, email: false, password: false, confirm: false, notSent: '' });
                            }}
                        />
                    </label>
                    {alert?.password && !user.password && <p className="text-red-800">Champ manquant</p>}
                    {alert?.password && <p className="text-red-800">Mot de passe non valide</p>}

                    <label htmlFor="confirm">
                        <input
                            id="confirm"
                            type="password"
                            placeholder="Confirmation du mot de passe"
                            className="rounded-md px-2 py-1 border-2 border-emerald-300 dark:border-violet-500"
                            onChange={(e) => {
                                setConfirm(e.target.value);
                                setAlert({ username: false, firstname: false, email: false, password: false, confirm: false, notSent: '' });
                            }}
                        />
                    </label>
                    {alert?.confirm && <p className="text-red-800">Confirmation invalide</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className=" px-2 py-1
                                    text-gray-800 dark:text-gray-50 font-bold mt-2 disabled:opacity-50
                                    bg-emerald-300 dark:bg-violet-500 hover:bg-emerald-400 dark:hover:bg-violet-400
                                    transition duration-200 active:translate-y-1 active:shadow-sm cursor-pointer 
                                    rounded-md border-2 border-emerald-300 dark:border-violet-500"
                    >
                        {loading ? "Chargement..." : "S'enregistrer"}
                    </button>
                    {alert?.notSent && (
                        <p className="text-red-800">
                            {`Erreur : ${alert?.notSent}. Veuillez réessayer.`}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}
