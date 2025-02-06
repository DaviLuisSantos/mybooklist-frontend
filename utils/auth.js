import Cookies from 'js-cookie';

export const setToken = (token, key, user) => {
    Cookies.set('Authorization', token, { expires: 7 });
    Cookies.set('key', key, { expires: 7 });
    Cookies.set('user', user, { expires: 7 });
};

export const getToken = () => {
    return Cookies.get('Authorization');
};

export const removeToken = () => {
    Cookies.remove('Authorization');
    Cookies.remove('key');
    Cookies.remove('user');
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