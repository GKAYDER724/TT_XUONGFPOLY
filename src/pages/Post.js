import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from './sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';

const Article = () => {
    const { id } = useParams();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/categories/${id}/posts`, {
                    method: 'POST',
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log(data);

                setPosts(data.posts);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="d-flex">
        <Sidebar />
        <div className="container ms-3 col-md-9 p-4"> {/* Thêm khoảng cách bên trái */}
            <h1 className="mt-6">Bài viết</h1>
            {posts.map((post) => (
                <div key={post.id} className="card mb-4 shadow-sm">
                    <div className="card-body">
                        <h3 className="card-title" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{post.title}</h3>
                        <p className="card-text">{post.content}</p> 
                    </div>
                </div>
            ))}
        </div>
    </div>
    
    );
};

export default Article;
