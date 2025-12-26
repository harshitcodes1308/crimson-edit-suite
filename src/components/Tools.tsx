import afterEffects from '@/assets/tools/after-effects.svg';
import canva from '@/assets/tools/canva.svg';
import chatgpt from '@/assets/tools/chatgpt.svg';
import davinciResolve from '@/assets/tools/davinci-resolve.svg';
import gemini from '@/assets/tools/gemini.svg';
import perplexity from '@/assets/tools/perplexity.svg';
import sora from '@/assets/tools/sora.svg';

const tools = [
  { name: 'DaVinci Resolve', src: davinciResolve },
  { name: 'After Effects', src: afterEffects },
  { name: 'Canva', src: canva },
  { name: 'ChatGPT', src: chatgpt },
  { name: 'Gemini', src: gemini },
  { name: 'Perplexity', src: perplexity },
  { name: 'Sora', src: sora },
];

const Tools = () => {
  return (
    <section id="tools" className="relative overflow-hidden border-t border-border/30 py-16">
      <div className="container mx-auto mb-10 px-6">
        <h2 className="text-center font-display text-4xl tracking-wide text-foreground sm:text-5xl">
          TOOLS
        </h2>
      </div>

      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-28 bg-gradient-to-r from-background/80 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-28 bg-gradient-to-l from-background/80 to-transparent" />

        <div className="flex items-center">
          <div className="flex animate-scroll items-center py-4">
            {/* First set */}
            {tools.map((tool) => (
              <div key={`first-${tool.name}`} className="mx-10 flex shrink-0 items-center">
                <img
                  src={tool.src}
                  alt={`${tool.name} logo`}
                  loading="lazy"
                  className="h-12 w-12 opacity-80 brightness-0 invert transition-opacity duration-300 hover:opacity-100 md:h-14 md:w-14"
                />
              </div>
            ))}

            {/* Second set for seamless loop */}
            {tools.map((tool) => (
              <div key={`second-${tool.name}`} className="mx-10 flex shrink-0 items-center">
                <img
                  src={tool.src}
                  alt={`${tool.name} logo`}
                  loading="lazy"
                  className="h-12 w-12 opacity-80 brightness-0 invert transition-opacity duration-300 hover:opacity-100 md:h-14 md:w-14"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="sr-only">Tools I work with: {tools.map((t) => t.name).join(', ')}.</p>
    </section>
  );
};

export default Tools;

