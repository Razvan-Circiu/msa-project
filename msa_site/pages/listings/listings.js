import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../../styles/Listings.module.css';
import Navbar from '../../components/Navbar';
import AnimalCard from '../../components/AnimalCard';
import Link from 'next/link';

export default function Listings() {
    const [animals, setAnimals] = useState([]);

    // Fetch animals from the backend
    useEffect(() => {
        fetch('/api/animals')
            .then((response) => response.json())
            .then((data) => setAnimals(data));
    }, []);

    return (
        <div className={styles.container}>
            <Head>
                <title>Adoption Listings</title>
                <meta name="description" content="Browse animals available for adoption." />
            </Head>

            <Navbar />

            <main className={styles.main}>
                <h1>Adoption Listings</h1>

                {/* Link to Add Listing Page */}
                <Link href="/listings/add-listing" className={styles.addListingButton}>
                    Add a New Listing
                </Link>

                {/* List of Animals */}
                <div className={styles.grid}>
                    {animals.map((animal) => (
                        <AnimalCard key={animal._id} animal={animal} />
                    ))}
                </div>
            </main>
        </div>
    );
}