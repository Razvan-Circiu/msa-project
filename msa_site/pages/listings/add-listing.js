import { useState } from 'react';
import Head from 'next/head';
import styles from '../../styles/AddListing.module.css';
import Navbar from '../../components/Navbar';
import { useRouter } from 'next/router';

export default function AddListing() {
    const router = useRouter();

    const [newAnimal, setNewAnimal] = useState({
        name: '',
        species: '',
        gender: '',
        age: '',
        location: '',
        description: '',
        images: [],
    });

    const [imagePreviews, setImagePreviews] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAnimal({
            ...newAnimal,
            [name]: value,
        });
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            const readers = files.map((file) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreviews((prev) => [...prev, reader.result]);
                };
                reader.readAsDataURL(file);
                return reader;
            });

            setNewAnimal({
                ...newAnimal,
                images: files,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            newAnimal.name &&
            newAnimal.species &&
            newAnimal.gender &&
            newAnimal.age &&
            newAnimal.location &&
            newAnimal.description &&
            newAnimal.images.length > 0
        ) {
            const formData = new FormData();
            formData.append('name', newAnimal.name);
            formData.append('species', newAnimal.species);
            formData.append('gender', newAnimal.gender);
            formData.append('age', newAnimal.age);
            formData.append('location', newAnimal.location);
            formData.append('description', newAnimal.description);
            newAnimal.images.forEach((image) => formData.append('images', image));

            try {
                const response = await fetch('/api/animals', {
                    method: 'POST',
                    body: formData,
                });
                if (response.ok) {
                    alert('Listing added successfully!');
                    router.push('/listings/listings');
                }
            } catch (error) {
                console.error('Error adding listing:', error);
            }
        } else {
            alert('Please fill out all fields and upload at least one image.');
        }
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Add Listing</title>
                <meta name="description" content="Add a new animal listing for adoption." />
            </Head>

            <Navbar />

            <main className={styles.main}>
                <h1>Add a New Listing</h1>

                {/* Add Listing Form */}
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={newAnimal.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="species">Species:</label>
                        <input
                            type="text"
                            id="species"
                            name="species"
                            value={newAnimal.species}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="gender">Gender:</label>
                        <input
                            type="text"
                            id="gender"
                            name="gender"
                            value={newAnimal.gender}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="age">Age:</label>
                        <input
                            type="text"
                            id="age"
                            name="age"
                            value={newAnimal.age}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="location">Location:</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={newAnimal.location}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={newAnimal.description}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="images">Images:</label>
                        <input
                            type="file"
                            id="images"
                            name="images"
                            accept="image/*"
                            onChange={handleImageUpload}
                            multiple
                            required
                        />
                    </div>
                    {imagePreviews.length > 0 && (
                        <div className={styles.imagePreviews}>
                            {imagePreviews.map((preview, index) => (
                                <img key={index} src={preview} alt={`Preview ${index}`} className={styles.imagePreview} />
                            ))}
                        </div>
                    )}
                    <button type="submit" className={styles.submitButton}>
                        Add Listing
                    </button>
                </form>
            </main>
        </div>
    );
}