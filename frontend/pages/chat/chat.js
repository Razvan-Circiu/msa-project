import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../../styles/Chat.module.css';
import Navbar from '../../components/Navbar';
import Link from 'next/link';

export default function Chat() {
    const [posts, setPosts] = useState([]);
    const [newComment, setNewComment] = useState({ postId: null, text: '' });

    // Load posts from localStorage on component mount
    useEffect(() => {
        const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
        setPosts(savedPosts);
    }, []);

    // Save posts to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('posts', JSON.stringify(posts));
    }, [posts]);

    // Add a new comment to a post
    const addComment = (postId) => {
        if (newComment.text.trim()) {
            const updatedPosts = posts.map((post) =>
                post.id === postId
                    ? { ...post, comments: [...post.comments, { text: newComment.text, sender: 'user' }] }
                    : post
            );
            setPosts(updatedPosts);
            setNewComment({ postId: null, text: '' });
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
                        <div key={post.id} className={styles.post}>
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
                                    value={newComment.postId === post.id ? newComment.text : ''}
                                    onChange={(e) => setNewComment({ postId: post.id, text: e.target.value })}
                                />
                                <button onClick={() => addComment(post.id)}>Comment</button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
