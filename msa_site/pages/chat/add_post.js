import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '../../styles/Chat.module.css';
import Navbar from '../../components/Navbar';

export default function AddPost() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title.trim() && content.trim()) {
            try {
                const response = await fetch('http://localhost:3000/api/posts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ title, content }),
                });
                if (response.ok) {
                    router.push('/chat/chat');
                }
            } catch (error) {
                console.error('Error creating post:', error);
            }
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