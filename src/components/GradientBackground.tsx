import { useEffect, useState } from 'react';

const GradientBackground = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Create dynamic gradient based on scroll position
  const getGradientStyle = () => {
    // Color stops: Black -> Crimson Red -> Deep Gold -> Black
    const phase = scrollProgress;
    
    // Animate the gradient position based on scroll
    const angle = 135 + (phase * 45); // Rotate from 135deg to 180deg
    
    // Dynamic opacity and color mixing
    const redIntensity = Math.sin(phase * Math.PI) * 0.4;
    const goldIntensity = Math.sin((phase - 0.3) * Math.PI) * 0.3;
    
    return {
      background: `
        radial-gradient(
          ellipse 80% 50% at ${50 + phase * 20}% ${30 + phase * 40}%,
          hsla(348, 83%, 35%, ${redIntensity}) 0%,
          transparent 50%
        ),
        radial-gradient(
          ellipse 60% 40% at ${70 - phase * 30}% ${60 + phase * 20}%,
          hsla(38, 80%, 45%, ${goldIntensity}) 0%,
          transparent 45%
        ),
        radial-gradient(
          ellipse 100% 80% at 50% 100%,
          hsla(348, 83%, 20%, ${0.3 + phase * 0.2}) 0%,
          transparent 60%
        ),
        linear-gradient(
          ${angle}deg,
          hsl(0, 0%, 0%) 0%,
          hsl(0, 0%, 2%) 30%,
          hsl(348, 30%, ${4 + phase * 3}%) 60%,
          hsl(0, 0%, 0%) 100%
        )
      `,
    };
  };

  return (
    <div 
      className="fixed inset-0 -z-10 transition-all duration-700 ease-out"
      style={getGradientStyle()}
    />
  );
};

export default GradientBackground;
