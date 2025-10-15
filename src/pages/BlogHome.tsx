import { useNavigate } from 'react-router-dom';
import './BlogHome.css';
import { useRef } from 'react';

function BlogHome() {
    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement>(null);

    function handleSearch(e: React.FormEvent) {
        e.preventDefault();
        const value = inputRef.current?.value.trim();
        if (!value) {
            alert('请输入搜索内容');
            return;
        }
        // 自动加 blog: 前缀
        navigate(`/search/results?q=${encodeURIComponent('blog:' + value)}`);
    }

    return (
        <div className="blog-home">
            <header className="blog-header">
                <h1 className="blog-title">{/* 博客名称待定 */}</h1>
                <form className="search-container" onSubmit={handleSearch}>
                    <input type="text" className="search-input" placeholder="Search..." ref={inputRef} />
                    <button className="search-button" type="submit">Search</button>
                </form>
            </header>

            <main className="blog-content">
                <article className="blog-post">
                    <h2 className="post-title">Hello World</h2>
                    <p className="post-content">
                        Welcome to my blog! This is a placeholder article to demonstrate the layout of the blog homepage.
                    </p>
                </article>
            </main>

            <footer className="blog-footer">
                <p>© 2025 My Blog. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default BlogHome;
