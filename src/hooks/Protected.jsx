import { useEffect, useState } from "react";
import fetchList from "./fetchList";

export default function Protected({Component}) {
    const [tokenValid, setTokenValid] = useState(null);
    const [userData, setUserData] = useState(null); // Ajout pour stocker les données utilisateur
    
    function Loader() {
        return <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>;
    }

    useEffect(() => {
        async function verifyToken() {
            try {
                const response = await fetchList('auth', 'GET');
                setTokenValid(response.result);
                if (response?._doc) {
                    setUserData({...response?._doc}); // Stockage des données utilisateur
                }
            } catch (error) {
                console.error("Erreur lors de la vérification du token :", error);
                console.log('1')
                setTokenValid(false);
            }
        }
        verifyToken();
    }, []);

    if (tokenValid === null) {
        return <div className="min-h-screen flex justify-center items-center"><Loader /></div>; // Affichage d'un loader
    }

    if (!tokenValid) {
        return (
            <h3 className="px-4 py-2 m-2 text-red-600 dark:text-red-400 font-medium text-lg bg-red-50 dark:bg-red-900/20 rounded-md border border-red-200 dark:border-red-800">
                Pas de token valide. Veuillez vous reconnecter !
            </h3>
        );
    }
    // Passage des données utilisateur en props au composant protégé
    return <Component {...(userData && { user: userData })} />;
}

