import { useState, useEffect, useRef, createContext, useContext } from 'react';
import { ExternalLink, Volume2, VolumeX } from 'lucide-react';

// Import local video files
import reel01 from '@/assets/videos/reel-01.mp4';
import reel02 from '@/assets/videos/reel-02.mp4';
import reel03 from '@/assets/videos/reel-03.mp4';
import reel04 from '@/assets/videos/reel-04.mp4';

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
  platform: 'youtube' | 'local';
  isReversed?: boolean;
  isHorizontal?: boolean;
}

const getYouTubeEmbedUrl = (url: string) => {
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

const getExternalUrl = (url: string, platform: 'youtube' | 'local') => {
  if (platform === 'youtube') {
    const shortsMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/);
    if (shortsMatch) return `https://youtube.com/shorts/${shortsMatch[1]}`;
    const regularMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    if (regularMatch) return `https://youtube.com/watch?v=${regularMatch[1]}`;
  }
  return url;
};

const Project = ({ id, title, description, videoUrl, platform, isReversed = false, isHorizontal = false }: ProjectProps) => {
  const [isInView, setIsInView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
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
    : videoUrl;

  const externalUrl = getExternalUrl(videoUrl, platform);

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    if (platform === 'local' && videoRef.current) {
      videoRef.current.muted = !isMuted;
    } else if (platform === 'youtube' && iframeRef.current) {
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
      <div className={`relative ${isHorizontal ? 'aspect-video w-full max-w-[560px]' : 'aspect-[9/16] w-full max-w-[300px] lg:max-w-[280px]'} mx-auto flex-shrink-0`}>
        <div className="group relative h-full w-full overflow-hidden bg-card rounded-lg">
          {isInView && platform === 'local' && (
            <video
              ref={videoRef}
              src={videoUrl}
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              loop
              muted={isMuted}
              playsInline
            />
          )}
          {isInView && platform === 'youtube' && (
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
            
            {/* Bottom controls - only show for YouTube */}
            {platform === 'youtube' && (
              <a
                href={externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-medium uppercase tracking-wider text-primary-foreground transition-all hover:bg-primary/90"
              >
                <span>Open on YouTube</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
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
    title: "YOUTUBE SHORT 01 (ED-TECH SHORT)",
    description: "An educational short edited for clarity and retention, using clean cuts, on-screen text, and paced visuals to communicate concepts effectively within a short-form format.",
    videoUrl: "https://www.youtube.com/shorts/mJJOzByneGg",
    platform: 'youtube' as const,
  },
  {
    id: 'project-2',
    title: "YOUTUBE SHORT 02 (ED-TECH SHORT)",
    description: "A short-form ed-tech edit focused on structured delivery, visual emphasis, and timing, designed to make academic content engaging and easy to consume on YouTube Shorts.",
    videoUrl: "https://www.youtube.com/shorts/NU5WRrqj0tM",
    platform: 'youtube' as const,
  },
  {
    id: 'project-3',
    title: "REEL EDIT 01 (3D REEL)",
    description: "A minimal 3D short built around controlled camera movement, depth, and timing. Focused on clean composition, smooth zooms, and visual rhythm without relying on human subjects.",
    videoUrl: reel01,
    platform: 'local' as const,
  },
  {
    id: 'project-4',
    title: "REEL EDIT 02 (3D REEL)",
    description: "A stylized 3D edit exploring form, motion, and spatial flow. Designed with precise camera animation and subtle visual transitions to create impact through simplicity.",
    videoUrl: reel02,
    platform: 'local' as const,
  },
  {
    id: 'project-5',
    title: "REEL EDIT 03 (ARCHITECT / VISUAL EDIT)",
    description: "Short-form edit crafted for an architectural brand, combining visual elements, structured pacing, and sound design to enhance spatial storytelling and mood.",
    videoUrl: reel03,
    platform: 'local' as const,
  },
  {
    id: 'project-6',
    title: "REEL EDIT 04 (ARCHITECT / VISUAL EDIT)",
    description: "A visually driven reel edited with layered elements, dynamic cuts, and sound design to complement architectural visuals and deliver a polished, cinematic feel.",
    videoUrl: reel04,
    platform: 'local' as const,
    isHorizontal: true,
  },
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
              isHorizontal={'isHorizontal' in project && project.isHorizontal}
            />
          ))}
        </div>
      </section>
    </VideoFocusContext.Provider>
  );
};

export default Work;
