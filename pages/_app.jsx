import { UserProvider } from '@/contexts/UserContext';
import { BooksProvider } from '../contexts/UserBookContext';
import { ThemeProvider } from 'next-themes';
import { GoogleOAuthProvider } from "@react-oauth/google"

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    return (
        <GoogleOAuthProvider clientId='1087239602529-9bv30fm57pnto3vitrofk8ihcjl6iaiq.apps.googleusercontent.com'>
            <UserProvider>
                <BooksProvider>
                    <ThemeProvider attribute="class" defaultTheme='dark'>
                        <Component {...pageProps} />
                    </ThemeProvider>
                </BooksProvider>
            </UserProvider>
        </GoogleOAuthProvider>

    );
}

export default MyApp;