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
        isScrolled ? 'bg-background/90 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-5 lg:px-12">
        <div className="flex flex-col">
          <span className="font-display text-lg font-bold tracking-tight text-foreground lg:text-xl">
            [EDITOR NAME]
          </span>
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Video Editor
          </span>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          <button
            onClick={() => scrollToSection('work')}
            className="line-accent text-sm font-medium uppercase tracking-wider text-foreground/80 transition-colors hover:text-foreground"
          >
            Work
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="line-accent text-sm font-medium uppercase tracking-wider text-foreground/80 transition-colors hover:text-foreground"
          >
            About
          </button>
          <span className="h-4 w-px bg-border" />
          <button
            onClick={() => scrollToSection('contact')}
            className="group flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-foreground/80 transition-colors hover:text-foreground"
          >
            <span className="h-2 w-2 rounded-full bg-primary transition-transform group-hover:scale-125" />
            Contact Me
          </button>
        </nav>

        {/* Mobile menu button */}
        <button
          className="flex h-10 w-10 items-center justify-center md:hidden"
          onClick={() => scrollToSection('contact')}
        >
          <span className="h-2 w-2 rounded-full bg-primary" />
        </button>
      </div>
    </header>
  );
};

export default Header;
