import { useLoaderData } from "react-router-dom";
import Lien from "../components/Liens";
import Spinner from "../kit/Spinner";
import { useState } from "react";
import fetchList from "../hooks/fetchList";

export default function Favoris() {
    // Récupère les données chargées par le loader
    const { response } = useLoaderData();
    const [favoris, setFavoris] = useState(response.data);
    const [loading, setLoading] = useState(false);

    // Fonction pour rafraîchir les données après une action (ex: suppression)
    const handleRefresh = async () => {
        setLoading(true);
        try {
            const newResponse = await fetchList("liens/favoris", "GET");
            setFavoris(newResponse.data);
        } catch (error) {
            console.error("Erreur lors du rafraîchissement :", error);
        } finally {
            setLoading(false);
        }
    };

    // Affichage pendant le chargement initial ou rafraîchissement
    if (!favoris && !response.error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
                <Spinner />
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                    Chargement de vos favoris...
                </p>
            </div>
        );
    }

    // Affichage en cas d'erreur
    if (response.error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
                <div className="flex items-center justify-center w-16 h-16 mb-4 bg-red-100 dark:bg-red-900/20 rounded-full">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-8 h-8 text-red-500 dark:text-red-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                <p className="text-lg font-medium text-red-600 dark:text-red-400">
                    {response.message || "Une erreur est survenue"}
                </p>
                </div>
            </div>
        );
    }

    // Affichage quand il n'y a pas de favoris
    if (!favoris?.length) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
                <div className="flex items-center justify-center w-20 h-20 mb-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-full">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-10 h-10 text-yellow-500 dark:text-yellow-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
                    Aucun favoris trouvé
                </h3>
                <p className="max-w-md text-gray-600 dark:text-gray-400">
                    Vous n'avez pas encore ajouté de liens à vos favoris.
                    <br />
                    Cliquez sur l'étoile ✨ dans vos liens pour les ajouter ici.
                </p>
            </div>
            </div>

        );
    }

    // Affichage normal avec la liste des favoris
    return (
        <div className="p-4">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    Vos Liens Favoris
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    {favoris.length} lien{favoris.length > 1 && "s"} enregistré{favoris.length > 1 && "s"}
                </p>
            </div>

            <div className="space-y-3">
                {favoris.map((lien) => (
                    <Lien
                        key={lien._id}
                        id={lien._id}
                        href={lien.href}
                        description={lien.description}
                        fav={lien.favoris}
                        video={lien.video}
                        refresh={handleRefresh}
                    />
                ))}
            </div>
        </div>
    );
}
