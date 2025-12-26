const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background py-6">
      <div className="flex flex-col items-center justify-between gap-4 px-6 sm:flex-row lg:px-12">
        <div className="flex items-center gap-2">
          <span className="font-display text-sm font-medium text-foreground">
            REDDOT
          </span>
          <span className="text-xs text-muted-foreground">
            — Video Editor
          </span>
        </div>

        <span className="text-xs text-muted-foreground">
          © {currentYear} All rights reserved
        </span>
      </div>
    </footer>
  );
};

export default Footer;
