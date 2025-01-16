import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '../../styles/ListingDetails.module.css';
import Navbar from '../../components/Navbar';

const ListingDetails = () => {
    const router = useRouter();
    const { id } = router.query;

    const [listing, setListing] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Fetch listing details from the backend
    useEffect(() => {
        if (id) {
            fetch(`/api/animals/${id}`)
                .then((response) => response.json())
                .then((data) => setListing(data));
        }
    }, [id]);

    if (!listing) {
        return <div>Loading...</div>;
    }

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % listing.images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? listing.images.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>{listing.name} - Pet Adoption Platform</title>
                <meta name="description" content={`Learn more about ${listing.name}, a ${listing.species} available for adoption.`} />
            </Head>

            <Navbar />

            <main className={styles.main}>
                <h1>{listing.name}</h1>

                {/* Image Carousel */}
                <div className={styles.carousel}>
                    <div className={styles.imageContainer}>
                        <img
                            src={listing.images[currentImageIndex]}
                            alt={listing.name}
                            className={styles.image}
                        />
                    </div>

                    {/* Arrow Buttons (only show if there are multiple images) */}
                    {listing.images.length > 1 && (
                        <>
                            <button className={styles.prevButton} onClick={prevImage}>
                                &#10094; {/* Left arrow */}
                            </button>
                            <button className={styles.nextButton} onClick={nextImage}>
                                &#10095; {/* Right arrow */}
                            </button>
                        </>
                    )}
                </div>

                {/* Description */}
                <div className={styles.description}>
                    <h2>About {listing.name}</h2>
                    <p><strong>Species:</strong> {listing.species}</p>
                    <p><strong>Gender:</strong> {listing.gender}</p>
                    <p><strong>Age:</strong> {listing.age}</p>
                    <p><strong>Location:</strong> {listing.location}</p>
                    <p>{listing.description}</p>
                </div>

                {/* Chat Button */}
                <button className={styles.chatButton} onClick={() => alert('Chat feature coming soon!')}>
                    Chat with Owner
                </button>
            </main>
        </div>
    );
};

export default ListingDetails;