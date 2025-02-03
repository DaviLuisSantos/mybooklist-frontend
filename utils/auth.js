export const setToken = (token, key) => {
    localStorage.setItem('Authorization', token);
    localStorage.setItem('key', key);
};

export const getToken = () => {
    return localStorage.getItem('Authorization');
};

export const removeToken = () => {
    localStorage.removeItem('Authorization');
};

export const isTokenValid = () => {
    const token = getToken();
    if (!token || token === 'undefined') {
        return false;
    }

    try {
        return true;
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expiry = payload.exp;
        const now = Math.floor(Date.now() / 1000);

        return now < expiry;
    } catch (error) {
        console.error('Erro ao verificar o token:', error);
        return false;
    }
};