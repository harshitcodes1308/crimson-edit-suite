import { useEffect, useRef, useState } from 'react';
import heroPortrait from '@/assets/hero-portrait.jpg';
import { Mail } from 'lucide-react';

const Contact = () => {
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
      id="contact"
      className={`relative flex min-h-screen flex-col items-center justify-center bg-background px-6 py-24 transition-all duration-700 ${
        isVisible ? 'opacity-100 blur-0' : 'opacity-0 blur-md'
      }`}
    >
      {/* Handwritten label */}
      <span className="mb-8 font-handwritten text-xl text-muted-foreground">
        contact
      </span>

      {/* Avatar */}
      <div className="mb-8 h-24 w-24 overflow-hidden rounded-full bg-primary">
        <img
          src={heroPortrait}
          alt="REDDOT"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Heading */}
      <h2 className="mb-6 text-center font-display text-3xl font-bold uppercase tracking-wide text-foreground sm:text-4xl lg:text-5xl">
        GOT A PROJECT? LET'S CONNECT.
      </h2>

      {/* Description */}
      <p className="mb-8 max-w-md text-center text-sm leading-relaxed text-muted-foreground lg:text-base">
        If you'd like to talk about a project just drop me a message. I'm currently available.
      </p>

      {/* CTA Button */}
      <a
        href="https://wa.me/918006798525"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-primary px-8 py-4 text-sm font-medium uppercase tracking-wider text-primary-foreground transition-all hover:bg-primary/90 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          window.open('https://wa.me/918006798525', '_blank');
        }}
      >
        <span className="relative z-10">Get in Touch</span>
        <span className="relative z-10 h-2 w-2 rounded-full bg-primary-foreground" />
      </a>

      {/* Email */}
      <div className="mt-6 flex items-center gap-2 text-sm text-primary">
        <Mail className="h-4 w-4" />
        <span>red.dot.visuals.8@gmail.com</span>
      </div>
    </section>
  );
};

export default Contact;
