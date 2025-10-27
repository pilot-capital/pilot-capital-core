import React, { useState } from "react";
import { createBlogPost } from "../../api/blogApi";
import { useNavigate } from "react-router-dom";

const BlogCreatePage: React.FC = () => {
    const [topic, setTopic] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await createBlogPost(topic, description);
            navigate("/blog");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Create Blog Post</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Topic:</label>
                    <input
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    Create
                </button>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        </div>
    );
};

export default BlogCreatePage;
