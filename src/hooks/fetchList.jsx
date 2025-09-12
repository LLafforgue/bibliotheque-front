const token = localStorage.getItem('token')
console.log(token);
export default async function fetchList(endpoint, method = 'GET', body = null) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
    };
    const config = {
        method,
        headers
    };
    if (body) {
        config.body = JSON.stringify(body);
    }
    try {
        const response = await fetch(`http://localhost:3001/${endpoint}`, config);
        const data = await response.json();
        if (!data.result) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await data ;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}