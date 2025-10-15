import './SearchEngineHome.css';
import { useNavigate } from 'react-router-dom';

function SearchEngineHome() {
    const navigate = useNavigate();

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const input = form.querySelector('input[name="q"]') as HTMLInputElement | null;
        const q = (input?.value ?? '').trim();
        if (q) navigate(`/search/results?q=${encodeURIComponent(q)}`);
    }

    return (
        <div className="search-engine-home">
            <header className="search-header">
                <h1 className="search-title">{/* 搜索引擎名称待定 */}</h1>
            </header>

            <main className="search-main">
                <form className="search-container" onSubmit={onSubmit} role="search">
                    <input name="q" type="text" className="search-input" placeholder="Search the web..." />
                    <button className="search-button" type="submit">Search</button>
                </form>
            </main>

            <footer className="search-footer">
                <p>© 2025 Search Engine. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default SearchEngineHome;
