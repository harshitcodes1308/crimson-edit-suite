import { useEffect, useState } from 'react';

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(scrollPercent);
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed left-0 top-0 z-50 h-1 w-full bg-muted/30">
      <div
        className="h-full bg-gradient-red transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ScrollProgress;
