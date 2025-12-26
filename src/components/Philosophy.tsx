import { useEffect, useRef, useState } from 'react';

const Philosophy = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className={`relative flex min-h-screen flex-col items-center justify-center bg-background px-6 py-24 transition-all duration-700 ${
        isVisible ? 'opacity-100 blur-0' : 'opacity-0 blur-md'
      }`}
    >
      {/* Handwritten label */}
      <span className="mb-8 font-handwritten text-xl text-muted-foreground">
        philosophy
      </span>

      <div className="max-w-4xl text-center">
        <blockquote>
          <p className="font-display text-2xl font-bold uppercase leading-tight tracking-wide text-foreground sm:text-3xl lg:text-4xl xl:text-5xl">
            „THE WAY YOU CAN AWAKEN FEELINGS JUST BY PUTTING ONE PICTURE AFTER THE OTHER IS MAGICAL TO ME."
          </p>
        </blockquote>

        <p className="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground lg:text-base">
          Consciously looking for these moments, internalizing them and learning from them gets me excited in a way that I just need to do this for the rest of my life.
        </p>
      </div>
    </section>
  );
};

export default Philosophy;
