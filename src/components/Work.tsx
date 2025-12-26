import { Play } from 'lucide-react';

interface ProjectProps {
  title: string;
  description: string;
  credits: { role: string; name: string }[];
  isReversed?: boolean;
}

const Project = ({ title, description, credits, isReversed = false }: ProjectProps) => {
  return (
    <div className={`flex flex-col gap-8 lg:flex-row lg:gap-12 ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
      {/* Video placeholder */}
      <div className="relative aspect-video w-full flex-shrink-0 lg:w-[60%]">
        <div className="group relative h-full w-full overflow-hidden bg-card">
          {/* Video thumbnail placeholder */}
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-card to-muted/30">
            <div className="flex flex-col items-center">
              <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full border border-foreground/20 transition-all group-hover:border-foreground/40 group-hover:scale-110">
                <Play className="h-6 w-6 text-foreground/60 transition-colors group-hover:text-foreground" />
              </div>
              <span className="text-xs text-muted-foreground">Video Placeholder</span>
            </div>
          </div>
          
          {/* Vimeo-style controls bar */}
          <div className="absolute bottom-0 left-0 right-0 flex items-center gap-4 bg-gradient-to-t from-background/80 to-transparent p-4">
            <Play className="h-4 w-4 text-foreground/80" />
            <div className="h-1 flex-1 rounded-full bg-foreground/20">
              <div className="h-full w-1/3 rounded-full bg-primary" />
            </div>
            <span className="text-xs text-foreground/60">00:00 / 03:42</span>
          </div>
        </div>
      </div>

      {/* Project info */}
      <div className="flex flex-col justify-center lg:w-[40%]">
        <h3 className="mb-4 font-display text-xl font-bold uppercase tracking-wide text-foreground lg:text-2xl">
          {title}
        </h3>
        
        <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>

        <div className="space-y-1">
          {credits.map((credit, index) => (
            <p key={index} className="text-xs text-muted-foreground">
              <span className="text-foreground/60">{credit.role}:</span> {credit.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

const projects = [
  {
    title: "EUPHORIA",
    description: "The ongoing short film series was created through a purely improvisational approach. There were and are no scripts, pre-developed story elements, or meticulously planned camera setups. Instead, each chapter emerges from the spontaneous, unfiltered collaboration of all participants—driven by creative openness and the synergy of artistic spontaneity.",
    credits: [
      { role: "Director & DP", name: "Matt Schoemer" },
      { role: "Production", name: "Atelier hayuma" },
      { role: "Editor", name: "REDDOT" },
      { role: "Colorgrading", name: "Johan Nurmilehto" },
      { role: "Sound Design", name: "Julian Lindenmann" },
      { role: "Music", name: "Marcel Hieß" },
      { role: "Talents", name: "Hanna Erz, Yulef Bopp" },
    ]
  },
  {
    title: "SEEING INTO THE MIND'S EYE",
    description: "In this Spec Marcus Sies and Flo Nick check out the C500 MarkII. Inspired by one of the most influential photographers they capture a stunning journey from underneath the water to above the clouds.",
    credits: [
      { role: "Director", name: "Marcus Sies" },
      { role: "Director of Photography", name: "Florian Nick" },
      { role: "Underwater camera", name: "Nicolai Deutsch & Sarah Gauthier" },
      { role: "Editing", name: "REDDOT" },
      { role: "Sounddesign", name: "Romain Kuhn" },
      { role: "Music", name: "Maxime Lacoste-Lebuis" },
    ]
  },
  {
    title: "HUBER – IRRITIERENDE VERFREMDUNG",
    description: "Origin shining light and casting shadows. The accomplished german artist Stephan Huber lets us take a look behind the curtains. Director Matt Schömer and DoP Josua Stäbler convert the information in stunning visual style.",
    credits: [
      { role: "Director", name: "Matt Schömer" },
      { role: "Director of Photography", name: "Josua Stäbler" },
      { role: "Editing", name: "REDDOT" },
      { role: "Colorgrading", name: "fatrat Color Grading" },
      { role: "Sounddesign", name: "REDDOT" },
      { role: "Soundmixing", name: "PeterHacker" },
      { role: "Talent", name: "Stephan Huber" },
    ]
  },
  {
    title: "CHRISTOPHER ROWNES | PASSION FOR MOVEMENT",
    description: "When passion leads through life, everything can change and yet remain connected in a set of parallels. It won't be the passion that changes but only the appearance of that passion.",
    credits: [
      { role: "Production Company", name: "FLYFOCUS" },
      { role: "Producer", name: "Benjamin Laschett" },
      { role: "Director", name: "Marcus Sies" },
      { role: "Director of Photography", name: "Marcus Sies" },
      { role: "Editing", name: "REDDOT" },
      { role: "Colorgrading", name: "Marcus Sies" },
      { role: "Sounddesign", name: "Julian Lindenmann" },
    ]
  }
];

const Work = () => {
  return (
    <section
      id="work"
      className="relative bg-background px-6 py-24 lg:px-12 lg:py-32"
    >
      {/* Handwritten label */}
      <div className="mb-8 text-center">
        <span 
          className="font-handwritten text-xl text-muted-foreground"
          style={{ fontFamily: "'Caveat', cursive" }}
        >
          work
        </span>
      </div>

      {/* Section title */}
      <h2 className="mb-16 text-center font-display text-3xl font-bold uppercase tracking-wide text-foreground lg:text-4xl">
        LATEST PROJECTS
      </h2>

      {/* Projects */}
      <div className="mx-auto max-w-6xl space-y-24 lg:space-y-32">
        {projects.map((project, index) => (
          <Project
            key={project.title}
            title={project.title}
            description={project.description}
            credits={project.credits}
            isReversed={index % 2 !== 0}
          />
        ))}
      </div>
    </section>
  );
};

export default Work;
