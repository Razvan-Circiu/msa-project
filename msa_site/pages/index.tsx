import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Navbar from '../components/Navbar';

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Pet Adoption Platform</title>
                <meta name="description" content="Find your next pet and connect with adoption centers in Timișoara." />
            </Head>

            <Navbar />

            <main className={styles.main}>
                <h1 className={styles.title}>Welcome to Pet Adoption Platform</h1>
                <p className={styles.description}>Find your next furry friend and connect with adoption centers in Timișoara.</p>

                <div className={styles.grid}>
                    <a href="/listings/listings" className={styles.card}>
                        <h2>View Listings &rarr;</h2>
                        <p>Browse animals available for adoption.</p>
                    </a>

                    <a href="/chat/chat" className={styles.card}>
                        <h2>Community Chat &rarr;</h2>
                        <p>Join the conversation and get pet advice.</p>
                    </a>

                    {/* Add this new card for Adoption Centers */}
                    <a href="/centers" className={styles.card}>
                        <h2>Adoption Centers &rarr;</h2>
                        <p>Find adoption centers near you.</p>
                    </a>

                    <a href="/profile" className={styles.card}>
                        <h2>Profile &rarr;</h2>
                        <p>See your profile and your notifications.</p>
                    </a>

                    <a href="/about" className={styles.card}>
                        <h2>About Us &rarr;</h2>
                        <p>See informations about the creators and their contact.</p>
                    </a>
                </div>
            </main>
        </div>
    );
}