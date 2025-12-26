import { Play } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  role: string;
  collaborators?: string[];
  index: number;
}

const ProjectCard = ({ title, description, role, collaborators = [], index }: ProjectCardProps) => {
  return (
    <div 
      className="group fade-element opacity-0 translate-y-8 transition-all duration-700"
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Video Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-card">
        {/* Placeholder state */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-card to-secondary/30">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-primary/30 transition-all duration-300 group-hover:border-primary group-hover:scale-110">
            <Play className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
          </div>
          <span className="font-body text-xs uppercase tracking-widest text-muted-foreground">
            Video Project Placeholder
          </span>
          <span className="mt-1 font-body text-xs text-muted-foreground/60">
            Link will be added later
          </span>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Red accent corner */}
        <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-red transition-all duration-500 group-hover:w-full" />
      </div>

      {/* Project info */}
      <div className="mt-6 space-y-3">
        <h3 className="font-display text-xl font-semibold uppercase tracking-wide text-foreground transition-colors group-hover:text-primary sm:text-2xl">
          {title}
        </h3>
        
        <p className="font-body text-sm leading-relaxed text-muted-foreground lg:text-base">
          {description}
        </p>

        <div className="space-y-2 pt-2">
          <p className="font-body text-sm text-foreground/80">
            <span className="text-primary">Role:</span> {role}
          </p>
          
          {collaborators.length > 0 && (
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {collaborators.map((collab, i) => (
                <span key={i} className="font-body text-xs text-muted-foreground">
                  {collab}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
