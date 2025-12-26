import { useEffect, useState } from 'react';

const sections = [
  { id: 'philosophy', label: 'philosophy' },
  { id: 'work', label: 'work' },
  { id: 'purpose', label: 'purpose' },
  { id: 'contact', label: 'contact' },
];

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(scrollPercent);

      // Determine active section
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveSection(section.id);
          }
        }
      });
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-8 left-0 right-0 z-50 hidden lg:block">
      <div className="container mx-auto px-12">
        <div className="relative flex items-center justify-between">
          {/* Progress line background */}
          <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-muted-foreground/30" />
          
          {/* Active progress line */}
          <div 
            className="absolute left-0 top-1/2 h-px -translate-y-1/2 bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />

          {/* Progress indicator */}
          <div 
            className="absolute top-1/2 h-4 w-0.5 -translate-y-1/2 bg-primary transition-all duration-300"
            style={{ left: `${progress}%` }}
          />

          {/* Section markers */}
          {sections.map((section, index) => {
            const position = ((index + 1) / (sections.length + 1)) * 100;
            const isPassed = progress >= position - 5;
            
            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="group relative z-10 flex flex-col items-center"
                style={{ position: 'absolute', left: `${position}%`, transform: 'translateX(-50%)' }}
              >
                {/* Label */}
                <span 
                  className={`mb-3 font-handwritten text-sm transition-colors ${
                    activeSection === section.id ? 'text-foreground' : 'text-muted-foreground'
                  } group-hover:text-foreground`}
                  style={{ fontFamily: "'Caveat', cursive" }}
                >
                  {section.label}
                </span>
                
                {/* X marker */}
                <div className={`relative h-4 w-4 transition-colors ${isPassed ? 'text-primary' : 'text-muted-foreground/50'}`}>
                  <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 rotate-45 bg-current" />
                  <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 -rotate-45 bg-current" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ScrollProgress;
