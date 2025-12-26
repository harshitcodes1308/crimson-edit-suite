const Purpose = () => {
  return <section id="purpose" className="relative flex min-h-screen flex-col items-center justify-center bg-background px-6 py-24">
      {/* Handwritten label */}
      <span className="mb-8 font-handwritten text-xl text-muted-foreground" style={{
      fontFamily: "'Caveat', cursive"
    }}>
        purpose
      </span>

      <div className="max-w-3xl text-center">
        <blockquote>
          <p className="font-display text-2xl font-bold uppercase leading-tight tracking-wide text-foreground sm:text-3xl lg:text-4xl xl:text-5xl">„TURNING RAW FOOTAGE INTO SCROLL-STOPPING STORIES.."</p>
        </blockquote>

        <p className="mx-auto mt-8 max-w-lg text-sm leading-relaxed text-muted-foreground lg:text-base">I craft high-energy, clean, and engaging edits that boost retention, elevate brands, and convert viewers into followers.</p>
      </div>
    </section>;
};
export default Purpose;