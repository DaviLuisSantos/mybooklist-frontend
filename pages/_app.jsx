import { UserProvider } from '@/contexts/UserContext';
import { BooksProvider } from '../contexts/UserBookContext';
import { ThemeProvider } from 'next-themes';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    return (
        <UserProvider>
            <BooksProvider>
                <ThemeProvider attribute="class" defaultTheme='dark'>
                    <Component {...pageProps} />
                </ThemeProvider>
            </BooksProvider>
        </UserProvider>
    );
}

export default MyApp;