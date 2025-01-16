import Head from 'next/head';
import styles from '../styles/About.module.css';
import Navbar from '../components/Navbar';

export default function About() {
    return (
        <div className={styles.container}>
            <Head>
                <title>About Us - Pet Adoption Platform</title>
                <meta name="description" content="Learn more about the creators of the Pet Adoption Platform and how we built this app for the MSA project at university." />
            </Head>

            <Navbar />

            <main className={styles.main}>
                <h1 className={styles.title}>About Us</h1>

                {/* Light purple box with the team description */}
                <div className={styles.teamBox}>
                    <p>
                        Hello there! We are <strong>Dan Lăcrămioara</strong> and <strong>Cîrciu Răzvan</strong>, a team of passionate developers who created this app as part of our MSA (Mobile systems and applications) project at university. Our goal is to help animals in our community find loving homes and connect people with adoption centers.
                    </p>
                </div>

                {/* Centered contact information */}
                <div className={styles.contactInfo}>
                    <h2>Contact Us</h2>
                    <p>
                        If you have any questions or feedback, feel free to reach out to us at:
                    </p>
                    <ul>
                        <li>Email: <a href="mailto:contact@petconnect.com">contact@petconnect.com</a></li>
                        <li>Phone: +40 123 456 789</li>
                    </ul>
                </div>
            </main>

        </div>
    );
}