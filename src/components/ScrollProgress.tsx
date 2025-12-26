import { useEffect, useState, useCallback } from 'react';

const sections = [
  { id: 'philosophy', label: 'philosophy' },
  { id: 'work', label: 'work' },
  { id: 'purpose', label: 'purpose' },
  { id: 'tools', label: 'tools' },
  { id: 'contact', label: 'contact' },
];

interface SectionPosition {
  id: string;
  label: string;
  start: number; // percentage position on the page
  markerPos: number; // percentage position on the progress bar
}

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const [sectionPositions, setSectionPositions] = useState<SectionPosition[]>([]);

  // Calculate section positions based on actual DOM positions
  const calculateSectionPositions = useCallback(() => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;

    const positions: SectionPosition[] = [];
    
    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        const rect = element.getBoundingClientRect();
        const elementTop = window.scrollY + rect.top;
        // Calculate where this section starts as a percentage of total scrollable area
        const startPercent = Math.min((elementTop / docHeight) * 100, 100);
        
        positions.push({
          id: section.id,
          label: section.label,
          start: startPercent,
          markerPos: startPercent,
        });
      }
    });

    setSectionPositions(positions);
  }, []);

  useEffect(() => {
    // Initial calculation
    calculateSectionPositions();
    
    // Recalculate on resize
    window.addEventListener('resize', calculateSectionPositions);
    
    // Recalculate after a short delay to ensure DOM is ready
    const timeout = setTimeout(calculateSectionPositions, 500);

    return () => {
      window.removeEventListener('resize', calculateSectionPositions);
      clearTimeout(timeout);
    };
  }, [calculateSectionPositions]);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(scrollPercent);

      // Determine active section based on viewport center
      let currentActive = '';
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Section is active when its top half is in view
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 4) {
            currentActive = section.id;
          }
        }
      });
      setActiveSection(currentActive);
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
            className="absolute left-0 bottom-0 h-px bg-primary transition-all duration-150 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />

          {/* Section markers - positioned based on actual section positions */}
          {sectionPositions.map((section) => {
            const isPassed = progress >= section.markerPos - 5; // Small threshold for smoother activation
            const isActive = activeSection === section.id;
            
            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="group absolute bottom-0 flex flex-col items-center"
                style={{ left: `${section.markerPos}%`, transform: 'translateX(-50%)' }}
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
                <span 
                  className={`font-handwritten text-2xl leading-none mb-[-4px] transition-all duration-300 ${
                    isPassed ? 'text-foreground' : 'text-muted-foreground/50'
                  } ${isActive ? 'scale-125' : ''} group-hover:text-foreground`}
                >
                  x
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ScrollProgress;
