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

  // Create dynamic gradient based on scroll position with more visible colors
  const getGradientStyle = () => {
    const phase = scrollProgress;
    
    // More intense, visible gradients
    const redIntensity = 0.3 + Math.sin(phase * Math.PI) * 0.5;
    const goldIntensity = 0.2 + Math.sin((phase - 0.2) * Math.PI * 1.5) * 0.4;
    const darkRedIntensity = 0.4 + phase * 0.3;
    
    // Moving positions
    const redX = 20 + phase * 60;
    const redY = 20 + phase * 30;
    const goldX = 80 - phase * 50;
    const goldY = 70 - phase * 20;
    
    return {
      background: `
        radial-gradient(
          ellipse 120% 80% at ${redX}% ${redY}%,
          hsla(348, 90%, 25%, ${redIntensity}) 0%,
          hsla(348, 80%, 15%, ${redIntensity * 0.5}) 30%,
          transparent 60%
        ),
        radial-gradient(
          ellipse 100% 70% at ${goldX}% ${goldY}%,
          hsla(35, 85%, 35%, ${goldIntensity}) 0%,
          hsla(25, 70%, 20%, ${goldIntensity * 0.6}) 25%,
          transparent 50%
        ),
        radial-gradient(
          ellipse 150% 100% at 50% 120%,
          hsla(348, 80%, 18%, ${darkRedIntensity}) 0%,
          hsla(348, 70%, 10%, ${darkRedIntensity * 0.7}) 40%,
          transparent 70%
        ),
        radial-gradient(
          circle at ${30 + phase * 40}% ${50 - phase * 20}%,
          hsla(30, 70%, 25%, ${goldIntensity * 0.6}) 0%,
          transparent 35%
        ),
        linear-gradient(
          180deg,
          hsl(0, 0%, 0%) 0%,
          hsl(348, 20%, 3%) 40%,
          hsl(25, 15%, 4%) 70%,
          hsl(0, 0%, 0%) 100%
        )
      `,
    };
  };

  return (
    <div 
      className="fixed inset-0 -z-10"
      style={getGradientStyle()}
    />
  );
};

export default GradientBackground;
