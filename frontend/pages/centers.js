import Head from 'next/head';
import styles from '../styles/Centers.module.css'; // Create this CSS file
import Navbar from '../components/Navbar';

export default function Centers() {
    // Mock data for adoption centers
    const adoptionCenters = [
        {
            id: 1,
            name: 'Happy Paws Shelter',
            location: 'Timișoara',
            website: 'https://happypaws.ro',
            phone: '+40 123 456 789',
            email: 'info@happypaws.ro',
        },
        {
            id: 2,
            name: 'Furry Friends Rescue',
            location: 'Lugoj',
            website: 'https://furryfriendsrescue.ro',
            phone: '+40 987 654 321',
            email: 'contact@furryfriendsrescue.ro',
        },
        {
            id: 3,
            name: 'Pawfect Haven',
            location: 'Arad',
            website: 'https://pawfecthaven.ro',
            phone: '+40 555 123 456',
            email: 'support@pawfecthaven.ro',
        },
    ];

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
                        <div key={center.id} className={styles.card}>
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