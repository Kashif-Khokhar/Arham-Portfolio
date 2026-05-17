import { useState, useEffect } from 'react';
import { apiFetch } from '../services/api';
import BlogCard from '../components/BlogCard';
import BlogModal from '../components/BlogModal';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tags, setTags] = useState([]);
  const [activeTag, setActiveTag] = useState('All');
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await apiFetch('/blogs');
        setBlogs(data.blogs || []);
        
        // Extract unique tags
        const allTags = [...new Set(data.blogs.flatMap(b => b.tags))].sort();
        setTags(['All', ...allTags]);
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

  const filteredBlogs = activeTag === 'All' 
    ? blogs 
    : blogs.filter(b => b.tags.includes(activeTag));

  return (
    <div className="animate-fade-in-up">
      <div className="max-w-[1200px] mx-auto px-6">
        
        <div className="text-center mb-14 mt-10">
          <div className="inline-flex items-center gap-2 font-mono text-[0.72rem] text-cyan tracking-[0.2em] uppercase mb-4 before:content-['//'] before:opacity-50 after:content-['//'] after:opacity-50">Knowledge Base</div>
          <h1 className="text-[clamp(1.8rem,4vw,3rem)] font-bold text-text-bright mb-4">Tech Blog</h1>
          <p className="text-base text-text-secondary max-w-[560px] mx-auto">Deep dives into web development, APIs, security, and developer tooling.</p>
        </div>

        {/* Tags Filter */}
        {!loading && !error && tags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {tags.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-4 py-2 rounded-md font-mono text-[0.78rem] tracking-[0.05em] transition-all border ${
                  activeTag === tag 
                    ? 'border-cyan-border text-cyan bg-cyan-glow' 
                    : 'border-ui-border text-text-secondary bg-transparent hover:border-cyan-border hover:text-text-primary'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="w-8 h-8 border-2 border-ui-border border-t-cyan rounded-full animate-spin mx-auto my-10"></div>
        ) : error ? (
          <p className="text-text-muted font-mono text-sm text-center">Failed to load blogs: {error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map(blog => (
              <BlogCard key={blog.id} blog={blog} onClick={handleBlogClick} />
            ))}
          </div>
        )}
        
      </div>

      {selectedBlog && (
        <BlogModal blog={selectedBlog} onClose={() => setSelectedBlog(null)} />
      )}
    </div>
  );
};

export default Blog;
