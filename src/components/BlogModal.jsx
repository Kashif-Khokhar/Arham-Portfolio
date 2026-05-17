import { useEffect } from 'react';

const BlogModal = ({ blog, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!blog) return null;

  return (
    <div 
      className="fixed inset-0 z-[2000] bg-void/80 backdrop-blur-sm flex items-center justify-center p-4 opacity-100 transition-opacity duration-300"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-card border border-ui-border rounded-xl w-full max-w-[800px] max-h-[90vh] overflow-y-auto relative p-8 md:p-12 shadow-card shadow-purple/10 transform transition-transform duration-300 scale-100">
        <button 
          className="absolute top-6 right-6 bg-surface border border-ui-border text-text-secondary w-10 h-10 rounded-full flex items-center justify-center text-lg cursor-pointer transition-all hover:bg-hover hover:text-text-bright hover:border-cyan-border hover:shadow-cyan"
          onClick={onClose}
        >
          ✕
        </button>
        
        <div id="blog-modal-content-area">
          <span className="text-[3rem] block mb-6 leading-none">{blog.image}</span>
          <h2 className="font-display text-[2rem] font-bold text-text-bright mb-6 leading-tight">{blog.title}</h2>
          
          <div className="flex flex-wrap gap-4 font-mono text-sm mb-8 pb-6 border-b border-ui-border">
            <span className="text-text-secondary">✍️ {blog.author}</span>
            <span className="text-cyan">📅 {blog.date}</span>
            <span className="text-text-secondary">⏱ {blog.readTime}</span>
          </div>
          
          <div 
            className="text-text-primary text-[1.05rem] leading-relaxed [&>h3]:text-text-bright [&>h3]:font-display [&>h3]:text-xl [&>h3]:mt-8 [&>h3]:mb-4 [&>p]:mb-6 [&>ul]:pl-6 [&>ul]:mb-6 [&>ul>li]:mb-2 [&>pre]:bg-void [&>pre]:p-4 [&>pre]:rounded-md [&>pre]:overflow-x-auto [&>pre]:border [&>pre]:border-ui-border [&>pre]:mb-6 [&>pre>code]:text-cyan"
            dangerouslySetInnerHTML={{ __html: blog.content }} 
          />
          
          <div className="mt-8 flex flex-wrap gap-2">
            {blog.tags.map((t, idx) => (
              <span key={idx} className="text-xs px-2 py-1 bg-surface border border-ui-border rounded text-text-muted font-mono mr-1.5">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogModal;
