import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const withAuth = (WrappedComponent) => {
    const AuthComponent = (props) => {
        const router = useRouter();
        const [isAuthenticated, setIsAuthenticated] = useState(false);
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            let isInitiallyAuthenticated = false;
            if (typeof window !== 'undefined') {
                const token = Cookies.get('Authorization');
                isInitiallyAuthenticated = !!token;
                console.log('Token:', token);
            }

            console.log('isInitiallyAuthenticated:', isInitiallyAuthenticated);
            if (!isInitiallyAuthenticated) {
                router.push('/login');
                setLoading(false);
                console.log('Redirecionando para /login');
                return;
            } else {
                setIsAuthenticated(true);
                console.log('Usuário autenticado');
                setLoading(false);
            }
        }, [router]);

        
        if (loading) {
            console.log('Carregando...');
            return null;
        }
        if (!isAuthenticated) {
            console.log('Não autenticado, retornando null');
            return null;
        }

        console.log('Renderizando componente protegido');
        return <WrappedComponent {...props} />;
    };

    AuthComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    return AuthComponent;
};

export default withAuth;