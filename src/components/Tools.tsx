const tools = [
  { name: 'DaVinci Resolve', icon: '🎬' },
  { name: 'After Effects', icon: '✨' },
  { name: 'Canva', icon: '🎨' },
  { name: 'ChatGPT', icon: '🤖' },
  { name: 'Gemini', icon: '💎' },
  { name: 'Perplexity', icon: '🔍' },
  { name: 'Sora', icon: '🎥' },
];

const Tools = () => {
  return (
    <section className="relative overflow-hidden border-t border-border/30 py-16">
      {/* Section label */}
      <div className="container mx-auto mb-8 px-6">
        <span className="font-handwritten text-xl text-muted-foreground">tools I work with</span>
      </div>

      {/* Infinite scroll container */}
      <div className="relative">
        {/* Gradient overlays for fade effect */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-background to-transparent" />

        {/* Scrolling track */}
        <div className="flex animate-scroll">
          {/* First set of tools */}
          {tools.map((tool, index) => (
            <div
              key={`first-${index}`}
              className="group mx-8 flex shrink-0 items-center gap-3 transition-all duration-300 hover:scale-110"
            >
              <span className="text-3xl opacity-60 transition-opacity group-hover:opacity-100">
                {tool.icon}
              </span>
              <span className="whitespace-nowrap font-display text-2xl tracking-wide text-muted-foreground transition-colors group-hover:text-primary md:text-3xl">
                {tool.name}
              </span>
            </div>
          ))}
          
          {/* Duplicate set for seamless loop */}
          {tools.map((tool, index) => (
            <div
              key={`second-${index}`}
              className="group mx-8 flex shrink-0 items-center gap-3 transition-all duration-300 hover:scale-110"
            >
              <span className="text-3xl opacity-60 transition-opacity group-hover:opacity-100">
                {tool.icon}
              </span>
              <span className="whitespace-nowrap font-display text-2xl tracking-wide text-muted-foreground transition-colors group-hover:text-primary md:text-3xl">
                {tool.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tools;
