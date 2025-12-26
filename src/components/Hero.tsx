import { useEffect, useRef } from 'react';

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = heroRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen items-center overflow-hidden bg-background"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }}
      />

      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
          {/* Left content */}
          <div className="flex flex-col justify-center pt-20 lg:pt-0">
            <h1 className="animate-on-scroll mb-6 animate-fade-up font-display text-5xl font-bold leading-[0.95] tracking-tight text-foreground opacity-0 sm:text-6xl lg:text-7xl xl:text-8xl">
              CUTS<span className="text-primary">.</span>
              <br />
              EDITS<span className="text-primary">.</span>
              <br />
              <span className="text-gradient-red">STORIES</span>
              <span className="text-primary">.</span>
            </h1>

            <p className="animate-on-scroll max-w-lg animate-fade-up font-body text-base leading-relaxed text-muted-foreground opacity-0 animation-delay-200 sm:text-lg">
              As a video editor, I help filmmakers, brands, and creatives bring their visions to life. 
              Through <span className="text-foreground">precise editing</span>, 
              <span className="text-foreground"> sound design</span>, and 
              <span className="text-foreground"> color grading</span>, we craft stories that resonate.
            </p>

            {/* Section markers - inspired by reference */}
            <div className="animate-on-scroll mt-16 flex items-center gap-8 opacity-0 animation-delay-300 lg:mt-24">
              <div className="flex items-center gap-3">
                <div className="h-6 w-0.5 bg-primary" />
                <span className="font-body text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  philosophy
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-body text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  work
                </span>
              </div>
              <div className="hidden items-center gap-3 sm:flex">
                <span className="font-body text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  contact
                </span>
              </div>
            </div>
          </div>

          {/* Right visual element */}
          <div className="relative hidden items-center justify-center lg:flex">
            <div className="animate-on-scroll relative aspect-[3/4] w-full max-w-md animate-fade-up opacity-0 animation-delay-300">
              {/* Red accent block */}
              <div className="absolute -right-4 top-1/4 h-2/3 w-1/2 bg-gradient-red opacity-80" />
              
              {/* Main placeholder block */}
              <div className="relative z-10 flex h-full w-full items-center justify-center bg-card/50 backdrop-blur-sm">
                <div className="text-center">
                  <div className="mb-4 h-16 w-16 mx-auto rounded-full border border-primary/30 flex items-center justify-center">
                    <div className="h-3 w-3 rounded-full bg-primary animate-pulse" />
                  </div>
                  <span className="font-body text-sm uppercase tracking-widest text-muted-foreground">
                    Video Reel
                  </span>
                </div>
              </div>

              {/* Decorative corner */}
              <div className="absolute -bottom-4 -left-4 h-24 w-24 border-b-2 border-l-2 border-primary/40" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <span className="font-body text-xs uppercase tracking-widest text-muted-foreground">
            Scroll
          </span>
          <div className="h-8 w-px bg-gradient-to-b from-primary to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
