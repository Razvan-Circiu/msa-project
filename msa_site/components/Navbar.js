import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <Link href="/">PetConnect</Link>
            </div>
            <ul className={styles.navLinks}>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/listings/listings">Listings</Link>
                </li>
                <li>
                    <Link href="/centers">Adoption Centers</Link>
                </li>
                <li>
                    <Link href="/chat/chat">Community Chat</Link>
                </li>
                <li>
                    <Link href="/about">About Us</Link>
                </li>
            </ul>
        </nav>
    );
}
