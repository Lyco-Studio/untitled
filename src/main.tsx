import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import BlogHome from './pages/BlogHome';
import SearchEngineHome from './pages/SearchEngineHome';
import SearchResults from './pages/SearchResults';
import Privacy from "./pages/Privacy.tsx";
import About from "./pages/About.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/blog" element={<BlogHome />} />
        <Route path="/intro" element={<App />} />
          <Route path="/search/privacy" element={<Privacy/>}/>
          <Route path="/search/about" element={<About/>}/>
          <Route path="/search" element={<SearchEngineHome />} />
        <Route path="/search/results" element={<SearchResults />} />
      </Routes>
    </Router>
  </StrictMode>,
);
