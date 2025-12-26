import heroPortrait from '@/assets/hero-portrait.jpg';
const Hero = () => {
  return <section className="relative min-h-screen">
      <div className="flex min-h-screen flex-col lg:flex-row">
        {/* Left side - Black with text */}
        <div className="relative flex flex-1 flex-col justify-center bg-background px-6 py-24 lg:px-12 lg:py-0">
          <div className="max-w-xl">
            <h1 className="animate-fade-up font-display text-6xl font-bold leading-[0.9] tracking-tight text-foreground opacity-0 sm:text-7xl lg:text-8xl xl:text-9xl">CUTS. EDITS. STORIES.
​<br />
              ​STORIES
            </h1>

            <p className="mt-8 animate-fade-up text-sm leading-relaxed text-muted-foreground opacity-0 animation-delay-200 lg:text-base">
              As an editor I help agencies, filmmakers and creatives in achieving their goals. 
              Tools like <span className="text-foreground">video editing</span>, 
              <span className="text-foreground"> sounddesign</span> and 
              <span className="text-foreground"> color correction</span> empower us in telling your story. 
              From social media content to feature films: I will tackle every obstacle with you until the result is satisfying.
            </p>
          </div>
        </div>

        {/* Right side - Orange with portrait */}
        <div className="relative flex-1 bg-primary">
          <img src={heroPortrait} alt="REDDOT - Video Editor Portrait" className="h-full w-full object-cover object-top" />
        </div>
      </div>
    </section>;
};
export default Hero;