import { UserProvider } from '@/contexts/UserContext';
import { BooksProvider } from '../contexts/UserBookContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    return (
        <UserProvider>
            <BooksProvider>
                <Component {...pageProps} />
            </BooksProvider>
        </UserProvider>
    );
}

export default MyApp;