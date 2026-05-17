const BlogCard = ({ blog, onClick }) => {
  return (
    <div 
      className="bg-card border border-ui-border rounded-xl overflow-hidden cursor-pointer transition-all duration-300 flex flex-col hover:border-cyan-border hover:-translate-y-1 hover:shadow-cyan"
      onClick={() => onClick(blog.id)}
    >
      <div className="p-7 pb-5 bg-surface border-b border-ui-border flex items-start gap-4">
        <span className="text-[2rem] leading-none shrink-0">{blog.image}</span>
        <div className="flex flex-col">
          <span className="text-xs text-text-secondary font-mono tracking-wider">{blog.date}</span>
          <span className="text-xs text-text-muted font-mono">{blog.readTime}</span>
        </div>
      </div>
      <div className="p-6 flex-1">
        <h3 className="font-display text-lg font-bold text-text-bright mb-3">{blog.title}</h3>
        <p className="text-sm text-text-secondary line-clamp-3 leading-relaxed">{blog.excerpt}</p>
      </div>
      <div className="p-6 pt-0 mt-auto flex items-center justify-between">
        <div className="flex gap-2 overflow-hidden">
          {blog.tags.slice(0, 3).map((tag, idx) => (
            <span key={idx} className="text-[0.7rem] px-2 py-1 bg-void border border-ui-border rounded text-text-muted font-mono whitespace-nowrap">
              {tag}
            </span>
          ))}
        </div>
        <span className="text-xs text-cyan font-mono font-bold whitespace-nowrap ml-4 hover:text-text-bright transition-colors">
          Read →
        </span>
      </div>
    </div>
  );
};

export default BlogCard;
