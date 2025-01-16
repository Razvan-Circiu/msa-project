import Link from 'next/link';
import styles from '../styles/Listings.module.css';

export default function AnimalCard({ animal }) {
    return (
        <div className={styles.card}>
            {animal.image && (
                <div className={styles.imageContainer}>
                    <img src={animal.image} alt={animal.name} className={styles.image} />
                </div>
            )}
            <div className={styles.details}>
                <h2>{animal.name}</h2>
                <p><strong>Species:</strong> {animal.species}</p>
                <p><strong>Gender:</strong> {animal.gender}</p>
                <p><strong>Age:</strong> {animal.age}</p>
                <p><strong>Location:</strong> {animal.location}</p>
                <Link href={`/listings/${animal.id}`} className={styles.viewDetailsButton}>
                    View Details
                </Link>
            </div>
        </div>
    );
}
