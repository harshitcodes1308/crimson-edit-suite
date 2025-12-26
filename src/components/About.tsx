import { useEffect, useRef } from 'react';

const skills = [
  "Video Editing",
  "Color Grading",
  "Sound Design",
  "Motion Graphics",
  "Visual Storytelling"
];

const About = () => {
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
      id="about"
      ref={sectionRef}
      className="relative bg-secondary/30 py-24 lg:py-32"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Left column */}
          <div>
            <div className="fade-element mb-8 flex items-center gap-4 opacity-0 translate-y-8 transition-all duration-700">
              <div className="h-6 w-0.5 bg-primary" />
              <h2 className="font-display text-sm uppercase tracking-[0.3em] text-muted-foreground">
                About
              </h2>
            </div>

            <h3 className="fade-element mb-6 font-display text-3xl font-bold leading-tight text-foreground opacity-0 translate-y-8 transition-all duration-700 delay-100 sm:text-4xl lg:text-5xl">
              Crafting visual 
              <span className="text-gradient-red"> narratives</span>
            </h3>

            <p className="fade-element font-body text-base leading-relaxed text-muted-foreground opacity-0 translate-y-8 transition-all duration-700 delay-200 lg:text-lg">
              I'm a video editor and visual storyteller based in the heart of the creative industry. 
              With years of experience working alongside filmmakers, agencies, and brands, 
              I bring stories to life through precise cuts, atmospheric sound design, and cinematic color grading.
            </p>

            <p className="fade-element mt-4 font-body text-base leading-relaxed text-muted-foreground opacity-0 translate-y-8 transition-all duration-700 delay-300 lg:text-lg">
              From social media content to feature films — I tackle every project with dedication 
              until the result exceeds expectations.
            </p>
          </div>

          {/* Right column - Skills */}
          <div className="flex flex-col justify-center">
            <div className="fade-element mb-6 opacity-0 translate-y-8 transition-all duration-700 delay-300">
              <span className="font-body text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Expertise
              </span>
            </div>

            <div className="space-y-4">
              {skills.map((skill, index) => (
                <div
                  key={skill}
                  className="fade-element group flex items-center gap-4 opacity-0 translate-y-8 transition-all duration-700"
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <div className="h-px w-8 bg-muted transition-all group-hover:w-12 group-hover:bg-primary" />
                  <span className="font-display text-lg font-medium text-foreground/80 transition-colors group-hover:text-foreground sm:text-xl">
                    {skill}
                  </span>
                </div>
              ))}
            </div>

            {/* Tools */}
            <div className="fade-element mt-12 opacity-0 translate-y-8 transition-all duration-700 delay-700">
              <span className="font-body text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Tools
              </span>
              <p className="mt-3 font-body text-sm text-muted-foreground">
                DaVinci Resolve • Premiere Pro • After Effects • Pro Tools
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
