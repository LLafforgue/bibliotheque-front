/**
 * Effectue une requête HTTP vers l'API.
 *
 * @param {string} endpoint - L'endpoint de l'API (ex: "auth/users/register").
 * @param {string} [method="GET"] - La méthode HTTP utilisée ("GET", "POST", "PUT", "DELETE"...).
 * @param {Object|null} [body=null] - Les données à envoyer dans la requête (seront converties en JSON).
 *
 * @returns {Promise<{ error: boolean, data?: any, message?: string, status?: number }>}
 * - `error: false` et `data` si la requête réussit.
 * - `error: true` et `message` (+ `status` si dispo) si la requête échoue.
 * 
 * @example
 * // Requête POST avec body
 * const result = await fetchList("auth/users/register", "POST", { email, password });
 * if (result.error) {
 *   console.error(result.message);
 * } else {
 *   console.log("User créé:", result.data);
 * }
 */
export default async function fetchList(endpoint, method = 'GET', body = null) {

  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}) 
  };

  const config = {
    method,
    headers,
    ...(body ? { body: JSON.stringify(body) } : {})
  };

  try {
    const response = await fetch(`http://localhost:3001/${endpoint}`, config);
    const data = await response.json()

    if (!data.result) {
      const errorStatus = `Erreur serveur (${data.status}) `;
      const errorMessage = data.error || 'une erreur est survenue' ;
      return { error: true, status: response.status, message: errorMessage + errorStatus };
    }

    
    return { error: false, ...data };

  } catch (err) {
  
    console.error('Erreur réseau ou CORS:', err);
    return { error: true, message: 'Impossible de contacter le serveur. Vérifiez votre connexion.' };
  }
}
