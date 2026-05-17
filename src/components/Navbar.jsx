import { useState } from 'react';

const Navbar = ({ currentPage, onNavigate, isScrolled }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'tools', label: 'Tools' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNav = (id) => {
    onNavigate(id);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[1000] px-6 h-[70px] flex items-center bg-[#050508D9] backdrop-blur-[20px] border-b transition-colors duration-300 ${isScrolled ? 'border-cyan-border' : 'border-ui-border'}`}>
      <div className="max-w-[1200px] mx-auto w-full flex items-center justify-between">
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); handleNav('home'); }}
          className="flex items-center gap-2.5 font-display text-[1.1rem] font-bold text-text-bright tracking-[0.1em]"
        >
          <div className="w-9 h-9 bg-gradient-to-br from-cyan to-purple rounded-lg flex items-center justify-center text-base">
            ⚡
          </div>
          <span>ARHAM <span className="text-cyan">TECH</span> ZONE</span>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-2 list-none">
          {navLinks.map(link => (
            <li key={link.id}>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); handleNav(link.id); }}
                className={`font-mono text-[0.8rem] px-4 py-2 rounded-md border border-transparent transition-all duration-200 tracking-[0.05em] ${currentPage === link.id ? 'text-cyan border-cyan-border bg-cyan-glow' : 'text-text-secondary hover:text-cyan hover:border-cyan-border hover:bg-cyan-glow'}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden bg-transparent border border-cyan-border text-cyan px-3 py-2 rounded-md cursor-pointer text-[1.1rem]"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-[70px] left-0 w-full bg-surface border-b border-ui-border p-4 flex flex-col gap-2 md:hidden">
          {navLinks.map(link => (
            <a
              key={link.id}
              href="#"
              onClick={(e) => { e.preventDefault(); handleNav(link.id); }}
              className={`font-mono text-sm px-4 py-3 rounded-md border border-transparent transition-all duration-200 ${currentPage === link.id ? 'text-cyan border-cyan-border bg-cyan-glow' : 'text-text-secondary hover:text-cyan hover:border-cyan-border hover:bg-cyan-glow'}`}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
