import Head from 'next/head';
import HomePage from '../components/HomePage';

export default function Home() {
    return (
        <div>
            <Head>
                <title>My Book List</title>
                <meta name="description" content="A simple book tracking application" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <HomePage />
        </div>
    );
}