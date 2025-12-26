import { useState, useEffect, useRef, createContext, useContext } from 'react';
import { ExternalLink, Volume2, VolumeX } from 'lucide-react';

// Context for blur effect
const VideoFocusContext = createContext<{
  focusedVideo: string | null;
  setFocusedVideo: (id: string | null) => void;
}>({
  focusedVideo: null,
  setFocusedVideo: () => {},
});

interface ProjectProps {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  platform: 'youtube' | 'instagram';
  isReversed?: boolean;
}

const getYouTubeEmbedUrl = (url: string) => {
  // Supports Shorts, watch URLs, youtu.be, and existing /embed links.
  const idMatch = url.match(
    /(?:youtube\.com\/(?:shorts\/|watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/
  );
  const videoId = idMatch?.[1];

  if (!videoId) return url;

  const params = new URLSearchParams({
    enablejsapi: '1',
    autoplay: '1',
    mute: '1',
    playsinline: '1',
    controls: '0',
    rel: '0',
    modestbranding: '1',
    loop: '1',
    playlist: videoId,
  });

  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
};

const getInstagramEmbedUrl = (url: string) => {
  // Extract Instagram reel ID and create embed URL
  const match = url.match(/instagram\.com\/reel\/([a-zA-Z0-9_-]+)/);
  if (match) {
    return `https://www.instagram.com/reel/${match[1]}/embed`;
  }
  return url;
};

const getExternalUrl = (url: string, platform: 'youtube' | 'instagram') => {
  if (platform === 'youtube') {
    const shortsMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/);
    if (shortsMatch) return `https://youtube.com/shorts/${shortsMatch[1]}`;
    const regularMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    if (regularMatch) return `https://youtube.com/watch?v=${regularMatch[1]}`;
  }
  return url;
};

const Project = ({ id, title, description, videoUrl, platform, isReversed = false }: ProjectProps) => {
  const [isInView, setIsInView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { focusedVideo, setFocusedVideo } = useContext(VideoFocusContext);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting) {
          setFocusedVideo(id);
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [id, setFocusedVideo]);

  const embedUrl = platform === 'youtube' 
    ? getYouTubeEmbedUrl(videoUrl)
    : getInstagramEmbedUrl(videoUrl);

  const externalUrl = getExternalUrl(videoUrl, platform);

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    // For YouTube, we can control via postMessage
    if (platform === 'youtube' && iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage(
        JSON.stringify({ event: 'command', func: isMuted ? 'unMute' : 'mute' }),
        '*'
      );
    }
  };

  const isFocused = focusedVideo === id;

  return (
    <div 
      ref={containerRef}
      className={`flex flex-col gap-8 lg:flex-row lg:gap-12 transition-all duration-500 ${
        isReversed ? 'lg:flex-row-reverse' : ''
      } ${focusedVideo && !isFocused ? 'opacity-30 blur-sm' : 'opacity-100 blur-0'}`}
      onMouseEnter={() => {
        setIsHovered(true);
        setFocusedVideo(id);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      {/* Video container */}
      <div className="relative aspect-[9/16] w-full max-w-[300px] mx-auto flex-shrink-0 lg:max-w-[280px]">
        <div className="group relative h-full w-full overflow-hidden bg-card rounded-lg">
          {isInView && (
            <iframe
              ref={iframeRef}
              src={embedUrl}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={title}
            />
          )}
          
          {/* Overlay controls */}
          <div 
            className={`absolute inset-0 flex flex-col items-center justify-between p-4 bg-gradient-to-t from-background/80 via-transparent to-background/40 transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Top controls */}
            <div className="flex w-full justify-end">
              <button
                onClick={handleMuteToggle}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-background/60 backdrop-blur-sm transition-all hover:bg-background/80"
              >
                {isMuted ? (
                  <VolumeX className="h-5 w-5 text-foreground" />
                ) : (
                  <Volume2 className="h-5 w-5 text-foreground" />
                )}
              </button>
            </div>
            
            {/* Bottom controls */}
            <a
              href={externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-medium uppercase tracking-wider text-primary-foreground transition-all hover:bg-primary/90"
            >
              <span>Open on {platform === 'youtube' ? 'YouTube' : 'Instagram'}</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Project info */}
      <div className="flex flex-col justify-center lg:flex-1">
        <h3 className="mb-4 font-display text-xl font-bold uppercase tracking-wide text-foreground lg:text-2xl">
          {title}
        </h3>
        
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
};

const projects = [
  {
    id: 'project-1',
    title: "TOPPER VS AVERAGE STUDENT",
    description: "Short-form edit created for social platforms. ICSE Tips and strategies for Class 10 students.",
    videoUrl: "https://www.youtube.com/shorts/mJJOzByneGg",
    platform: 'youtube' as const,
  },
  {
    id: 'project-2',
    title: "HOW TO COMPLETE SYLLABUS",
    description: "Short-form edit created for social platforms. ICSE strategy and tips for December completion.",
    videoUrl: "https://www.youtube.com/shorts/NU5WRrqj0tM",
    platform: 'youtube' as const,
  },
  {
    id: 'project-3',
    title: "REEL EDIT 1",
    description: "Short-form edit created for social platforms.",
    videoUrl: "https://www.instagram.com/reel/DSUSTJOkxjC/",
    platform: 'instagram' as const,
  },
  {
    id: 'project-4',
    title: "REEL EDIT 2",
    description: "Short-form edit created for social platforms.",
    videoUrl: "https://www.instagram.com/reel/DSC2dOYE6Q1/",
    platform: 'instagram' as const,
  },
  {
    id: 'project-5',
    title: "REEL EDIT 3",
    description: "Short-form edit created for social platforms.",
    videoUrl: "https://www.instagram.com/reel/DSfMrI_E4fj/",
    platform: 'instagram' as const,
  }
];

const Work = () => {
  const [focusedVideo, setFocusedVideo] = useState<string | null>(null);

  return (
    <VideoFocusContext.Provider value={{ focusedVideo, setFocusedVideo }}>
      <section
        id="work"
        className="relative bg-background px-6 py-24 lg:px-12 lg:py-32"
      >
        {/* Handwritten label */}
        <div className="mb-8 text-center">
          <span className="font-handwritten text-xl text-muted-foreground">
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
              key={project.id}
              id={project.id}
              title={project.title}
              description={project.description}
              videoUrl={project.videoUrl}
              platform={project.platform}
              isReversed={index % 2 !== 0}
            />
          ))}
        </div>
      </section>
    </VideoFocusContext.Provider>
  );
};

export default Work;
