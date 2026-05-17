const Footer = ({ onNavigate }) => {
  return (
    <footer className="bg-surface border-t border-ui-border py-12 px-6 mt-20">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan to-purple rounded-md flex items-center justify-center text-sm">
                ⚡
              </div>
              <span className="font-display text-[1.1rem] text-text-bright tracking-[0.1em] font-bold">
                ARHAM <span className="text-cyan">TECH</span> ZONE
              </span>
            </div>
            <p className="text-text-secondary text-sm max-w-[400px]">
              A full-stack developer tools platform. Frontend connected to a real Node.js + Express REST API backend.
            </p>
          </div>
          
          <div>
            <h4 className="text-text-bright mb-4 font-semibold">Navigation</h4>
            <ul className="flex flex-col gap-2 list-none">
              <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="text-sm text-text-secondary hover:text-cyan transition-colors">Home</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('tools'); }} className="text-sm text-text-secondary hover:text-cyan transition-colors">Tools</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('blog'); }} className="text-sm text-text-secondary hover:text-cyan transition-colors">Blog</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }} className="text-sm text-text-secondary hover:text-cyan transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-text-bright mb-4 font-semibold">API Endpoints</h4>
            <ul className="flex flex-col gap-2 list-none font-mono">
              <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('tools'); }} className="text-xs text-text-secondary hover:text-cyan transition-colors">/api/tools/password</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('tools'); }} className="text-xs text-text-secondary hover:text-cyan transition-colors">/api/tools/qr</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('tools'); }} className="text-xs text-text-secondary hover:text-cyan transition-colors">/api/tools/age</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('blog'); }} className="text-xs text-text-secondary hover:text-cyan transition-colors">/api/blogs</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-6 border-t border-ui-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-muted font-mono">
          <span>© 2025 <span className="text-text-secondary">Arham Tech Zone</span>. Built with ⚡ and React</span>
          <span>Full-Stack · REST API · Dark Theme</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
