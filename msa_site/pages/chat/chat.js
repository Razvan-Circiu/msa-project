import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../../styles/Chat.module.css';
import Navbar from '../../components/Navbar';
import Link from 'next/link';

export default function Chat() {
    const [posts, setPosts] = useState([]);
    const [newComment, setNewComment] = useState({ postId: null, text: '' });

    // Fetch posts from the backend
    useEffect(() => {
        fetch('/api/posts')
            .then((response) => response.json())
            .then((data) => setPosts(data));
    }, []);

    // Add a new comment to a post
    const addComment = async (postId) => {
        if (newComment.text.trim()) {
            try {
                const response = await fetch(`/api/posts/${postId}/comments`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ text: newComment.text, sender: 'user' }),
                });
                const updatedPost = await response.json();
                setPosts(posts.map((post) => (post.id === postId ? updatedPost : post)));
                setNewComment({ postId: null, text: '' });
            } catch (error) {
                console.error('Error adding comment:', error);
            }
        }
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Community Chat</title>
                <meta name="description" content="Join the conversation and get pet advice." />
            </Head>

            <Navbar />

            <main className={styles.main}>
                <h1>Community Chat</h1>

                {/* Link to Add Post Page */}
                <Link href="/chat/add_post" passHref>
                    <a className={styles.addPostButton}>Add a New Post</a>
                </Link>

                {/* Display all posts */}
                <div className={styles.posts}>
                    {posts.map((post) => (
                        <div key={post._id} className={styles.post}>
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>

                            {/* Display comments for the post */}
                            <div className={styles.comments}>
                                {post.comments.map((comment, index) => (
                                    <div key={index} className={styles.comment}>
                                        <strong>{comment.sender}:</strong> {comment.text}
                                    </div>
                                ))}
                            </div>

                            {/* Form to add a new comment */}
                            <div className={styles.commentForm}>
                                <input
                                    type="text"
                                    placeholder="Add a comment..."
                                    value={newComment.postId === post._id ? newComment.text : ''}
                                    onChange={(e) => setNewComment({ postId: post._id, text: e.target.value })}
                                />
                                <button onClick={() => addComment(post._id)}>Comment</button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}