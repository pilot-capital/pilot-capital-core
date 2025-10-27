import React, { useEffect, useState } from "react";
import { fetchBlogPosts } from "../../api/blogApi";
import "./BlogListPage.css";

const BlogListPage: React.FC = () => {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchBlogPosts()
            .then(setPosts)
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="blog-list-container">
            <h1 style={{ color: "black" }}>Blog Posts</h1>
            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
            <ul className="blog-list">
                {posts.map((post) => (
                    <li key={post.id} className="blog-list-item">
                        <div className="blog-header">
                            <span className="blog-topic">{post.topic}</span>
                            <span className="blog-author">
                                by {post.author}
                            </span>
                        </div>
                        <div className="blog-description">
                            {post.description}
                        </div>
                        <div className="blog-date">
                            {new Date(post.created_at).toLocaleString()}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BlogListPage;
