import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-6 md:px-6 md:py-8 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          &copy; 2024 AI Explorer. All rights reserved.
        </div>
        <nav className="flex items-center gap-4">
          <Link
            href="#"
            className="text-muted-foreground hover:text-foreground"
            prefetch={false}
          >
            Privacy
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:text-foreground"
            prefetch={false}
          >
            Terms
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:text-foreground"
            prefetch={false}
          >
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
