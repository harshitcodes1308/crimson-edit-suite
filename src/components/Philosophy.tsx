import { useEffect, useRef } from 'react';

const Philosophy = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = sectionRef.current?.querySelectorAll('.fade-element');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-background py-32 lg:py-40"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-8">
          {/* Quote */}
          <div className="lg:col-span-8 lg:col-start-3">
            <blockquote className="fade-element opacity-0 translate-y-8 transition-all duration-1000">
              <p className="font-display text-2xl font-medium leading-relaxed text-foreground sm:text-3xl lg:text-4xl">
                <span className="text-primary">"</span>
                The way you can awaken feelings just by putting one picture after another is 
                <span className="text-gradient-red"> magical </span>
                to me.
                <span className="text-primary">"</span>
              </p>
            </blockquote>

            <p className="fade-element mt-8 max-w-2xl opacity-0 translate-y-8 transition-all duration-1000 delay-200 font-body text-base leading-relaxed text-muted-foreground lg:text-lg">
              Consciously looking for these moments, internalizing them and learning from them 
              gets me excited in a way that I just need to do this for the rest of my life.
            </p>

            {/* Decorative line */}
            <div className="fade-element mt-12 flex items-center gap-4 opacity-0 translate-y-8 transition-all duration-1000 delay-300">
              <div className="h-px w-16 bg-primary" />
              <span className="font-body text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Philosophy
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
