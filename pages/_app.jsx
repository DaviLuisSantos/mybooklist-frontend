import { BooksProvider } from '../contexts/UserBookContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    return (
        <BooksProvider>
            <Component {...pageProps} />
        </BooksProvider>
    );
}

export default MyApp;