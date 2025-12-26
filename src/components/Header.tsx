import { useState, useEffect } from 'react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-40 transition-all duration-500 ${
        isScrolled ? 'bg-background/80 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between px-6 py-4 lg:px-12">
        <div className="flex flex-col">
          <span className="font-display text-xl font-bold tracking-tight text-foreground lg:text-2xl">
            REDDOT
          </span>
          <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Freelance Video Editor
          </span>
        </div>

        <nav className="flex items-center gap-6">
          <button
            onClick={() => scrollToSection('work')}
            className="text-xs font-medium uppercase tracking-wider text-foreground/80 transition-colors hover:text-foreground"
          >
            Work
          </button>
          <span className="hidden h-4 w-px bg-border sm:block" />
          <a
            href="https://wa.me/918006798525"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-primary transition-colors hover:text-primary/80 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              window.open('https://wa.me/918006798525', '_blank');
            }}
          >
            <span className="h-2 w-2 rounded-full bg-primary" />
            Contact Me
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
