const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background py-8">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-6 sm:flex-row lg:px-12">
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <span className="font-display text-sm font-medium text-foreground">
            [EDITOR NAME]
          </span>
          <span className="font-body text-xs text-muted-foreground">
            Video Editor & Visual Storyteller
          </span>
        </div>

        <span className="font-body text-xs text-muted-foreground">
          © {currentYear} All rights reserved
        </span>
      </div>
    </footer>
  );
};

export default Footer;
