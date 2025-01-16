import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Profile.module.css';
import Navbar from '../components/Navbar';

export default function Profile() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [notifications, setNotifications] = useState([]);

    // Fetch user data from the backend
    useEffect(() => {
        fetch('/api/users/1') // Replace '1' with the actual user ID
            .then((response) => response.json())
            .then((data) => {
                setName(data.name);
                setEmail(data.email);
                setBio(data.bio);
                setNotifications(data.notifications);
            });
    }, []);

    const handleSaveProfile = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/users/1', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, bio }),
            });
            if (response.ok) {
                alert('Profile saved successfully!');
            }
        } catch (error) {
            console.error('Error saving profile:', error);
        }
    };

    const markAsRead = async (id) => {
        try {
            const response = await fetch(`/api/users/1/notifications/${id}`, {
                method: 'PUT',
            });
            if (response.ok) {
                setNotifications(notifications.map((notification) =>
                    notification.id === id ? { ...notification, read: true } : notification
                ));
            }
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Profile - Pet Adoption Platform</title>
                <meta name="description" content="Edit your profile and view notifications on the Pet Adoption Platform." />
            </Head>

            <Navbar />

            <main className={styles.main}>
                <h1 className={styles.title}>Profile</h1>

                {/* Edit Profile Section */}
                <div className={styles.profileSection}>
                    <h2>Edit Profile</h2>
                    <form onSubmit={handleSaveProfile} className={styles.profileForm}>
                        <div className={styles.formGroup}>
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="bio">Bio:</label>
                            <textarea
                                id="bio"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                rows="4"
                            />
                        </div>
                        <button type="submit" className={styles.saveButton}>
                            Save Profile
                        </button>
                    </form>
                </div>

                {/* Notifications Section */}
                <div className={styles.notificationsSection}>
                    <h2>Notifications</h2>
                    {notifications.length > 0 ? (
                        <ul className={styles.notificationsList}>
                            {notifications.map((notification) => (
                                <li key={notification.id} className={styles.notificationItem}>
                                    <span className={notification.read ? styles.read : styles.unread}>
                                        {notification.message}
                                    </span>
                                    {!notification.read && (
                                        <button
                                            onClick={() => markAsRead(notification.id)}
                                            className={styles.markAsReadButton}
                                        >
                                            Mark as Read
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No new notifications.</p>
                    )}
                </div>
            </main>
        </div>
    );
}