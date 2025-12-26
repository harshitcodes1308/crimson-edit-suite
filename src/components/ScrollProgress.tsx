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
    <div className="fixed bottom-6 left-0 right-0 z-50 hidden lg:block">
      <div className="mx-auto max-w-5xl px-16">
        <div className="relative h-16">
          {/* Progress line background */}
          <div className="absolute left-0 right-0 bottom-0 h-px bg-muted-foreground/40" />
          
          {/* Active progress line */}
          <div 
            className="absolute left-0 bottom-0 h-px bg-primary transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />

          {/* Section markers */}
          {sections.map((section, index) => {
            const position = ((index + 1) / (sections.length + 1)) * 100;
            const isPassed = progress >= position;
            const isActive = activeSection === section.id;
            
            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="group absolute bottom-0 flex flex-col items-center"
                style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
              >
                {/* Handwritten label */}
                <span 
                  className={`mb-2 font-handwritten text-lg tracking-wide transition-all duration-300 ${
                    isActive ? 'text-foreground scale-110' : 'text-muted-foreground/70'
                  } group-hover:text-foreground`}
                >
                  {section.label}
                </span>
                
                {/* X cross marker - handwritten style */}
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 16 16" 
                  className={`mb-[-1px] transition-all duration-300 ${
                    isPassed ? 'text-foreground' : 'text-muted-foreground/50'
                  } ${isActive ? 'scale-125' : ''} group-hover:text-foreground`}
                >
                  <line 
                    x1="2" y1="2" x2="14" y2="14" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round"
                    style={{ 
                      strokeDasharray: isPassed ? '0' : '20',
                      transition: 'stroke-dasharray 0.5s ease-out'
                    }}
                  />
                  <line 
                    x1="14" y1="2" x2="2" y2="14" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round"
                    style={{ 
                      strokeDasharray: isPassed ? '0' : '20',
                      transition: 'stroke-dasharray 0.5s ease-out'
                    }}
                  />
                </svg>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ScrollProgress;
