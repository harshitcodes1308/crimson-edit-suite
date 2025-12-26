import afterEffects from '@/assets/tools/after-effects.svg';
import canva from '@/assets/tools/canva.svg';
import chatgpt from '@/assets/tools/chatgpt.svg';
import davinciResolve from '@/assets/tools/davinci-resolve.svg';
import gemini from '@/assets/tools/gemini.svg';
import perplexity from '@/assets/tools/perplexity.svg';
import sora from '@/assets/tools/sora.svg';
const tools = [{
  name: 'DaVinci Resolve',
  src: davinciResolve
}, {
  name: 'After Effects',
  src: afterEffects
}, {
  name: 'Canva',
  src: canva
}, {
  name: 'ChatGPT',
  src: chatgpt
}, {
  name: 'Gemini',
  src: gemini
}, {
  name: 'Perplexity',
  src: perplexity
}, {
  name: 'Sora',
  src: sora
}];
const Tools = () => {
  return <section id="tools" className="relative overflow-hidden border-t border-border/30 py-20 lg:py-28">
      {/* Handwritten label */}
      <div className="mb-4 text-center">
        
      </div>

      {/* Section title - regular font like other titles */}
      <h2 className="mb-16 text-center font-handwritten text-4xl text-foreground lg:text-5xl">
        tools i work with
      </h2>

      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background to-transparent md:w-40" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background to-transparent md:w-40" />

        <div className="flex items-center justify-center overflow-hidden">
          <div className="flex animate-marquee items-center">
            {/* First set */}
            {tools.map(tool => <div key={`first-${tool.name}`} className="mx-8 flex shrink-0 flex-col items-center gap-3 md:mx-12">
                <div className="flex h-14 w-14 items-center justify-center md:h-16 md:w-16">
                  <img src={tool.src} alt={`${tool.name} logo`} loading="lazy" className="h-full w-full object-contain opacity-70 brightness-0 invert transition-all duration-300 hover:opacity-100 hover:scale-110" />
                </div>
              </div>)}

            {/* Second set for seamless loop */}
            {tools.map(tool => <div key={`second-${tool.name}`} className="mx-8 flex shrink-0 flex-col items-center gap-3 md:mx-12">
                <div className="flex h-14 w-14 items-center justify-center md:h-16 md:w-16">
                  <img src={tool.src} alt={`${tool.name} logo`} loading="lazy" className="h-full w-full object-contain opacity-70 brightness-0 invert transition-all duration-300 hover:opacity-100 hover:scale-110" />
                </div>
              </div>)}
          </div>
        </div>
      </div>
    </section>;
};
export default Tools;