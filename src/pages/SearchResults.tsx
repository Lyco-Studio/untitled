import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SearchResults.css';
import defaultResultsData from '../config/defaultResults.json';

interface ResultItem {
  title: string;
  url: string;
  description: string;
  displayUrl?: string;
}

// DuckDuckGo response typing
interface DDGTopic { Text?: string; FirstURL?: string }
interface DDGResponse { RelatedTopics?: DDGTopic[]; AbstractText?: string; AbstractURL?: string }

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

async function fetchWithDuckDuckGo(query: string): Promise<ResultItem[]> {
  if (!query) return [];
  const resp = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_redirect=1&no_html=1&skip_disambig=1`);
  if (!resp.ok) return [];
  const json = (await resp.json()) as unknown as DDGResponse;
  const items: ResultItem[] = [];
  if (json.AbstractText && json.AbstractURL) {
    items.push({ title: query, url: json.AbstractURL, description: json.AbstractText });
  }
  (json.RelatedTopics ?? []).forEach(t => {
    if (t.Text && t.FirstURL) items.push({ title: t.Text, url: t.FirstURL, description: '' });
  });
  return items.slice(0, 10);
}

async function fetchWithWikipedia(query: string): Promise<ResultItem[]> {
  if (!query) return [];
  const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch=${encodeURIComponent(query)}&srlimit=10`;
  const resp = await fetch(endpoint);
  if (!resp.ok) return [];
  const json = await resp.json();
  type WikipediaSearchItem = { title: string; snippet: string };
  const searchResults: WikipediaSearchItem[] = json.query?.search ?? [];
  return searchResults.map((item) => ({
    title: item.title,
    url: `https://en.wikipedia.org/wiki/${encodeURIComponent(item.title)}`,
    description: item.snippet.replace(/<[^>]+>/g, '')
  }));
}

async function fetchDefaultResults(query: string): Promise<ResultItem[]> {
  let domain: string | null = null;
  let actualQuery = query.trim();
  // 检查限定搜索前缀，如 blog:xxx
  const domainMatch = actualQuery.match(/^([a-zA-Z0-9_-]+):(.+)$/);
  if (domainMatch) {
    domain = domainMatch[1].toLowerCase();
    actualQuery = domainMatch[2].trim();
  }
  const lowerQuery = actualQuery.toLowerCase();
  // @ts-ignore
  return defaultResultsData.filter((item: any) => {
    if (domain && item.domain !== domain) return false;
    return (
      item.title.toLowerCase().includes(lowerQuery) ||
      item.description.toLowerCase().includes(lowerQuery)
    );
  });
}

async function fetchResults(query: string): Promise<ResultItem[]> {
  // 检查是否为限定搜索（如 blog:xxx）
  const domainMatch = query.trim().match(/^([a-zA-Z0-9_-]+):(.+)$/);
  if (domainMatch) {
    // 限定搜索时只查找 default 部分
    return await fetchDefaultResults(query);
  }
  // 非限定搜索时查找 default + 外部
  const defaultResults = await fetchDefaultResults(query);
  const ddgResults = await fetchWithDuckDuckGo(query);
  const wikipediaResults = await fetchWithWikipedia(query);
  return [...defaultResults, ...ddgResults, ...wikipediaResults];
}

export default function SearchResults() {
  const q = useQuery().get('q') ?? '';
  const navigate = useNavigate();
  const [externalResults, setExternalResults] = useState<ResultItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      const data = await fetchResults(q);
      if (active) setExternalResults(data);
      setLoading(false);
    })();
    return () => { active = false };
  }, [q]);

  const allResults = [...externalResults];

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.querySelector('input[name="q"]') as HTMLInputElement | null;
    const next = (input?.value ?? '').trim();
    if (!next) {
      alert('请输入搜索内容');
      return;
    }
    navigate(`/search/results?q=${encodeURIComponent(next)}`);
  }

  return (
    <div className="search-results">
      <header className="sr-header">
        <form className="sr-searchbar" onSubmit={onSubmit} role="search">
          <input name="q" defaultValue={q} className="sr-input" placeholder="搜索内容..." />
          <button className="sr-button" type="submit">搜索</button>
        </form>
      </header>

      <main className="sr-main">
        {loading && <div className="sr-status">正在加载结果...</div>}
        {!loading && allResults.length === 0 && (
          <div className="sr-status">无结果。</div>
        )}
        <ol className="sr-list">
          {allResults.map((r, idx) => (
            <li key={`${r.url}-${idx}`} className="sr-item">
              <a className="sr-title" href={r.url}>{r.title}</a>
              <div className="sr-link">{r.displayUrl ?? r.url}</div>
              <p className="sr-desc">{r.description}</p>
            </li>
          ))}
        </ol>
      </main>
      <footer className="sr-footer">
        <nav className="sr-nav">
          <a href="/search/about">关于页面</a>
          <a href="/search/privacy">隐私政策</a>
        </nav>
      </footer>
    </div>
  );
}
