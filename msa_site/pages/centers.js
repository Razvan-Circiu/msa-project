import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Centers.module.css';
import Navbar from '../components/Navbar';

export default function Centers() {
    const [adoptionCenters, setAdoptionCenters] = useState([]);

    // Fetch adoption centers from the backend
    useEffect(() => {
        fetch('/api/centers')
            .then((response) => response.json())
            .then((data) => setAdoptionCenters(data));
    }, []);

    return (
        <div className={styles.container}>
            <Head>
                <title>Adoption Centers - PetConnect</title>
                <meta name="description" content="Find adoption centers near you and connect with them." />
            </Head>

            <Navbar />

            <main className={styles.main}>
                <h1>Adoption Centers</h1>

                {/* List of Adoption Centers */}
                <div className={styles.grid}>
                    {adoptionCenters.map((center) => (
                        <div key={center._id} className={styles.card}>
                            <h2>{center.name}</h2>
                            <p><strong>Location:</strong> {center.location}</p>
                            <p><strong>Phone:</strong> {center.phone}</p>
                            <p><strong>Email:</strong> {center.email}</p>
                            <a
                                href={center.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.link}
                            >
                                Visit Website
                            </a>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}