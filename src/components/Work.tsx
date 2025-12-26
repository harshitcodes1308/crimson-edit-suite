import { useEffect, useRef } from 'react';
import ProjectCard from './ProjectCard';

const projects = [
  {
    title: "EUPHORIA",
    description: "An improvisational short film series created without scripts or pre-developed story elements. Each chapter emerges from the spontaneous collaboration of all participants.",
    role: "Editor",
    collaborators: ["Director: Matt Schoemer", "Colorgrading: Johan Nurmilehto", "Sound Design: Julian Lindenmann"]
  },
  {
    title: "INTO THE MIND'S EYE",
    description: "A stunning visual journey from underwater depths to above the clouds. Inspired by one of the most influential photographers of our time.",
    role: "Editor",
    collaborators: ["Director: Marcus Sies", "DP: Florian Nick", "Sound Design: Romain Kuhn"]
  },
  {
    title: "IRRITATING ALIENATION",
    description: "An intimate portrait of accomplished German artist Stephan Huber. Origin shining light and casting shadows behind the curtains.",
    role: "Editor & Sound Design",
    collaborators: ["Director: Matt Schömer", "DP: Josua Stäbler", "Colorgrading: fatrat"]
  },
  {
    title: "PASSION FOR MOVEMENT",
    description: "A cinematic exploration of motion and the human body in its most expressive form. Capturing the essence of movement through dynamic visual storytelling.",
    role: "Editor",
    collaborators: ["Director: Marcus Sies", "Talent: Christopher Rownes"]
  }
];

const Work = () => {
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
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.fade-element');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative bg-background py-24 lg:py-32"
    >
      {/* Section indicator */}
      <div className="container mx-auto px-6 lg:px-12">
        <div className="fade-element mb-16 flex items-center gap-4 opacity-0 translate-y-8 transition-all duration-700">
          <div className="h-px flex-1 bg-border" />
          <h2 className="font-display text-sm uppercase tracking-[0.3em] text-muted-foreground">
            Latest Projects
          </h2>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Projects grid */}
        <div className="grid gap-16 md:grid-cols-2 lg:gap-x-12 lg:gap-y-20">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              role={project.role}
              collaborators={project.collaborators}
              index={index}
            />
          ))}
        </div>

        {/* View all link */}
        <div className="fade-element mt-20 flex justify-center opacity-0 translate-y-8 transition-all duration-700 delay-500">
          <button className="group flex items-center gap-3 font-body text-sm uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground">
            <span>View All Projects</span>
            <div className="h-px w-8 bg-muted-foreground transition-all group-hover:w-12 group-hover:bg-primary" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Work;
