const token = 'yp1J5j-83hZp3oVIkGYry_PmipI78TyB'

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
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}