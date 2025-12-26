const Purpose = () => {
  return (
    <section
      id="purpose"
      className="relative flex min-h-screen flex-col items-center justify-center bg-background px-6 py-24"
    >
      {/* Handwritten label */}
      <span 
        className="mb-8 font-handwritten text-xl text-muted-foreground"
        style={{ fontFamily: "'Caveat', cursive" }}
      >
        purpose
      </span>

      <div className="max-w-3xl text-center">
        <blockquote>
          <p className="font-display text-2xl font-bold uppercase leading-tight tracking-wide text-foreground sm:text-3xl lg:text-4xl xl:text-5xl">
            „SUSTAINABILITY IS A SUBJECT CLOSE TO MY HEART.."
          </p>
        </blockquote>

        <p className="mx-auto mt-8 max-w-lg text-sm leading-relaxed text-muted-foreground lg:text-base">
          Environmentally-conscious projects deserve special attention and will be met by me in this way. Get in touch so we can work out a tailored offer.
        </p>
      </div>
    </section>
  );
};

export default Purpose;
