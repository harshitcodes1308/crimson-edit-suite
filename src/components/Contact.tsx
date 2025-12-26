import { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';

const Contact = () => {
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
      id="contact"
      ref={sectionRef}
      className="relative bg-background py-32 lg:py-40"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left side */}
          <div>
            <div className="fade-element mb-8 flex items-center gap-4 opacity-0 translate-y-8 transition-all duration-700">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="font-body text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Available for projects
              </span>
            </div>

            <h2 className="fade-element mb-6 font-display text-4xl font-bold leading-tight text-foreground opacity-0 translate-y-8 transition-all duration-700 delay-100 sm:text-5xl lg:text-6xl">
              Let's
              <span className="text-gradient-red"> work</span>
            </h2>

            <p className="fade-element max-w-md font-body text-base leading-relaxed text-muted-foreground opacity-0 translate-y-8 transition-all duration-700 delay-200 lg:text-lg">
              Have a project in mind? I'm always open to discussing new opportunities and creative collaborations.
            </p>
          </div>

          {/* Right side - CTA */}
          <div className="flex flex-col justify-center">
            <a
              href="mailto:hello@editor.com"
              className="fade-element group inline-flex items-center gap-4 opacity-0 translate-y-8 transition-all duration-700 delay-300"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/30 transition-all group-hover:border-primary group-hover:bg-primary/10 sm:h-20 sm:w-20">
                <ArrowUpRight className="h-6 w-6 text-primary transition-transform group-hover:rotate-45 sm:h-8 sm:w-8" />
              </div>
              <div>
                <span className="block font-display text-xl font-semibold text-foreground transition-colors group-hover:text-primary sm:text-2xl">
                  Get in touch
                </span>
                <span className="block font-body text-sm text-muted-foreground">
                  hello@editor.com
                </span>
              </div>
            </a>

            {/* Social links */}
            <div className="fade-element mt-12 flex items-center gap-6 opacity-0 translate-y-8 transition-all duration-700 delay-400">
              <a
                href="#"
                className="line-accent font-body text-sm uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
              >
                Vimeo
              </a>
              <a
                href="#"
                className="line-accent font-body text-sm uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
              >
                LinkedIn
              </a>
              <a
                href="#"
                className="line-accent font-body text-sm uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
