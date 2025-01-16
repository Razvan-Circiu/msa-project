import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '../../styles/Chat.module.css';
import Navbar from '../../components/Navbar';

export default function AddPost() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim() && content.trim()) {
            const newPost = {
                id: Date.now(),
                title,
                content,
                comments: [],
            };

            // Retrieve existing posts from localStorage
            const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
            const updatedPosts = [...savedPosts, newPost];

            // Save updated posts to localStorage
            localStorage.setItem('posts', JSON.stringify(updatedPosts));

            // Redirect to the chat page
            router.push('/chat/chat');
        }
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Add Post - Community Chat</title>
                <meta name="description" content="Create a new post in the community chat." />
            </Head>

            <Navbar />

            <main className={styles.main}>
                <h1>Create a New Post</h1>

                <form onSubmit={handleSubmit} className={styles.postForm}>
                    <input
                        type="text"
                        placeholder="Post Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Post Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                    <button type="submit">Submit Post</button>
                </form>
            </main>
        </div>
    );
}
