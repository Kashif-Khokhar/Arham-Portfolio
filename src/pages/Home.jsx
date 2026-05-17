import { useState, useEffect } from 'react';
import { apiFetch } from '../services/api';
import BlogCard from '../components/BlogCard';
import BlogModal from '../components/BlogModal';

const Home = ({ onNavigate }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await apiFetch('/blogs?limit=3');
        setBlogs(data.blogs || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const handleBlogClick = async (id) => {
    try {
      const data = await apiFetch(`/blogs/${id}`);
      setSelectedBlog(data);
    } catch (err) {
      console.error('Error fetching blog details:', err);
    }
  };

  return (
    <div className="animate-fade-in-up">
      {/* Hero */}
      <section className="min-h-[calc(100vh-70px)] flex items-center justify-center relative overflow-hidden text-center pt-[60px] pb-[120px] px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(0,212,255,0.08)_0%,transparent_70%),radial-gradient(ellipse_60%_40%_at_80%_80%,rgba(139,92,246,0.06)_0%,transparent_60%)] pointer-events-none" />
        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-cyan/10 border border-cyan-border rounded-full px-5 py-2 font-mono text-xs text-cyan tracking-[0.1em] mb-7 animate-fade-in-down">
            <span className="w-1.5 h-1.5 bg-cyan rounded-full animate-pulse-dot" />
            FULL-STACK DEVELOPER TOOLS PLATFORM
          </div>
          <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-black leading-[1.05] mb-6 animate-fade-in-up">
            <span className="block text-text-bright">BUILD SMARTER.</span>
            <span className="block text-gradient">CODE FASTER.</span>
          </h1>
          <p className="text-[1.1rem] text-text-secondary max-w-[600px] mx-auto mb-10 leading-[1.7] animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Arham Tech Zone delivers powerful developer utilities and in-depth technical articles —
            all powered by a real Node.js backend API.
          </p>
          <div className="flex gap-4 justify-center flex-wrap animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <button 
              className="inline-flex items-center gap-2 px-9 py-4 rounded-md font-mono text-[0.95rem] font-medium tracking-[0.05em] transition-all duration-250 bg-cyan text-void shadow-[0_0_20px_rgba(0,212,255,0.3)] hover:bg-text-bright hover:shadow-[0_0_30px_rgba(0,212,255,0.5)] hover:-translate-y-0.5"
              onClick={() => onNavigate('tools')}
            >
              ⚡ Try Tools
            </button>
            <button 
              className="inline-flex items-center gap-2 px-9 py-4 rounded-md font-mono text-[0.95rem] font-medium tracking-[0.05em] transition-all duration-250 bg-transparent text-cyan border border-cyan-border hover:bg-cyan-glow hover:-translate-y-0.5"
              onClick={() => onNavigate('blog')}
            >
              📖 Read Blog
            </button>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 font-mono text-[0.7rem] text-text-muted tracking-[0.1em] animate-bounce-soft">
          SCROLL
          <span className="text-[1.2rem] text-cyan">↓</span>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-ui-border border border-ui-border rounded-xl overflow-hidden my-[60px]">
          {[
            { num: '3', label: 'Dev Tools' },
            { num: '6', label: 'Blog Posts' },
            { num: 'REST', label: 'API Backend' },
            { num: '100%', label: 'Free to Use' },
          ].map((stat, i) => (
            <div key={i} className="bg-surface p-7 text-center transition-colors hover:bg-elevated">
              <span className="font-display text-[2rem] font-bold text-cyan block leading-none mb-1.5">{stat.num}</span>
              <span className="text-[0.78rem] text-text-muted font-mono tracking-[0.05em]">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Featured Tools */}
        <section className="py-20 relative z-10">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 font-mono text-[0.72rem] text-cyan tracking-[0.2em] uppercase mb-4 before:content-['//'] before:opacity-50 after:content-['//'] after:opacity-50">Tools</div>
            <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-text-bright mb-4">Featured Utilities</h2>
            <p className="text-base text-text-secondary max-w-[560px] mx-auto">Every tool is powered by a dedicated backend API endpoint. Zero frontend logic duplication.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card border border-ui-border rounded-xl p-7 transition-all duration-300 hover:border-cyan-border hover:-translate-y-1 hover:shadow-card hover:shadow-cyan cursor-pointer" onClick={() => onNavigate('tools')}>
              <span className="w-11 h-11 bg-cyan/10 border border-cyan-border rounded-md flex items-center justify-center text-[1.3rem] mb-4">🔐</span>
              <div className="font-display text-[0.9rem] font-semibold text-text-bright tracking-[0.05em] mb-1">PASSWORD GENERATOR</div>
              <p className="text-[0.78rem] text-text-muted">Cryptographically secure passwords via <code className="text-cyan text-[0.75rem]">/api/tools/password</code></p>
            </div>
            <div className="bg-card border border-ui-border rounded-xl p-7 transition-all duration-300 hover:border-cyan-border hover:-translate-y-1 hover:shadow-card hover:shadow-cyan cursor-pointer" onClick={() => onNavigate('tools')}>
              <span className="w-11 h-11 bg-purple-glow border border-purple/30 rounded-md flex items-center justify-center text-[1.3rem] mb-4">📱</span>
              <div className="font-display text-[0.9rem] font-semibold text-text-bright tracking-[0.05em] mb-1">QR CODE MAKER</div>
              <p className="text-[0.78rem] text-text-muted">Generate scannable QR codes via <code className="text-cyan text-[0.75rem]">/api/tools/qr</code></p>
            </div>
            <div className="bg-card border border-ui-border rounded-xl p-7 transition-all duration-300 hover:border-cyan-border hover:-translate-y-1 hover:shadow-card hover:shadow-cyan cursor-pointer" onClick={() => onNavigate('tools')}>
              <span className="w-11 h-11 bg-green-glow border border-green/30 rounded-md flex items-center justify-center text-[1.3rem] mb-4">🎂</span>
              <div className="font-display text-[0.9rem] font-semibold text-text-bright tracking-[0.05em] mb-1">AGE CALCULATOR</div>
              <p className="text-[0.78rem] text-text-muted">Precise age data with zodiac via <code className="text-cyan text-[0.75rem]">/api/tools/age</code></p>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20 relative z-10">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 font-mono text-[0.72rem] text-cyan tracking-[0.2em] uppercase mb-4 before:content-['//'] before:opacity-50 after:content-['//'] after:opacity-50">Architecture</div>
            <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-text-bright mb-4">How It Works</h2>
            <p className="text-base text-text-secondary max-w-[560px] mx-auto">A clean full-stack architecture with the frontend consuming all data from a dedicated Express REST API.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            <div className="bg-card border border-ui-border rounded-xl p-7 text-center transition-all duration-300 hover:border-cyan-border hover:-translate-y-1 hover:shadow-card hover:shadow-cyan relative overflow-hidden group">
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="text-[2rem] mb-3">🌐</div>
              <h4 className="text-text-bright mb-2 font-display text-[0.85rem] tracking-[0.05em]">FRONTEND</h4>
              <p className="text-[0.82rem] text-text-secondary">React single-page app. All dynamic data fetched from backend.</p>
            </div>
            <div className="bg-card border border-ui-border rounded-xl p-7 text-center transition-all duration-300 hover:border-cyan-border hover:-translate-y-1 hover:shadow-card hover:shadow-cyan relative overflow-hidden group">
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="text-[2rem] mb-3">⚡</div>
              <h4 className="text-text-bright mb-2 font-display text-[0.85rem] tracking-[0.05em]">REST API</h4>
              <p className="text-[0.82rem] text-text-secondary">Node.js + Express server with API endpoints for tools and blogs.</p>
            </div>
            <div className="bg-card border border-ui-border rounded-xl p-7 text-center transition-all duration-300 hover:border-cyan-border hover:-translate-y-1 hover:shadow-card hover:shadow-cyan relative overflow-hidden group">
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="text-[2rem] mb-3">🔒</div>
              <h4 className="text-text-bright mb-2 font-display text-[0.85rem] tracking-[0.05em]">SECURE</h4>
              <p className="text-[0.82rem] text-text-secondary">Password generation uses Node.js crypto module. Cryptographically random.</p>
            </div>
            <div className="bg-card border border-ui-border rounded-xl p-7 text-center transition-all duration-300 hover:border-cyan-border hover:-translate-y-1 hover:shadow-card hover:shadow-cyan relative overflow-hidden group">
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="text-[2rem] mb-3">📦</div>
              <h4 className="text-text-bright mb-2 font-display text-[0.85rem] tracking-[0.05em]">DATA LAYER</h4>
              <p className="text-[0.82rem] text-text-secondary">Blog content served from JSON file — swappable with MongoDB in production.</p>
            </div>
          </div>
        </section>

        <div className="w-full h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)] my-10"></div>

        {/* Latest Blogs */}
        <section className="py-20 relative z-10">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 font-mono text-[0.72rem] text-cyan tracking-[0.2em] uppercase mb-4 before:content-['//'] before:opacity-50 after:content-['//'] after:opacity-50">Latest Posts</div>
            <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-text-bright mb-4">From the Blog</h2>
            <p className="text-base text-text-secondary max-w-[560px] mx-auto">Technical articles fetched live from <code className="text-cyan">/api/blogs</code></p>
          </div>
          
          {loading ? (
            <div className="w-8 h-8 border-2 border-ui-border border-t-cyan rounded-full animate-spin mx-auto my-10"></div>
          ) : error ? (
            <p className="text-text-muted font-mono text-sm text-center">Failed to load blogs: {error}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blogs.map(blog => (
                <BlogCard key={blog.id} blog={blog} onClick={handleBlogClick} />
              ))}
            </div>
          )}
          
          <div className="text-center mt-10">
            <button 
              className="inline-flex items-center gap-2 px-7 py-3 rounded-md font-mono text-[0.85rem] font-medium tracking-[0.05em] transition-all duration-250 bg-transparent text-cyan border border-cyan-border hover:bg-cyan-glow hover:-translate-y-0.5"
              onClick={() => onNavigate('blog')}
            >
              View All Posts →
            </button>
          </div>
        </section>
      </div>

      {selectedBlog && (
        <BlogModal blog={selectedBlog} onClose={() => setSelectedBlog(null)} />
      )}
    </div>
  );
};

export default Home;
