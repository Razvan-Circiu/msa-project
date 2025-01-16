import { useState } from 'react';
import Head from 'next/head';
import styles from '../../styles/Listings.module.css';
import Navbar from '../../components/Navbar';
import AnimalCard from '../../components/AnimalCard';
import Link from 'next/link';

export default function Listings() {
    // State for the list of animals
    const [animals, setAnimals] = useState([
        {
            id: 1,
            name: 'Buddy',
            species: 'Dog',
            gender: 'Male',
            age: '2 years',
            location: 'Timișoara',
            image: '/images/buddy.jpg',
        },
        {
            id: 2,
            name: 'Mittens',
            species: 'Cat',
            gender: 'Female',
            age: '1 year',
            location: 'Lugoj',
            image: '/images/mittens.jpg',
        },
    ]);

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
                        <AnimalCard key={animal.id} animal={animal} />
                    ))}
                </div>
            </main>
        </div>
    );
}