import Link from "next/link";
import React from "react";
import Button from "../button";

const Header = () => {
  return (
    <header className="bg-background border-b shadow-sm">
      <div className="container mx-auto px-4 py-4 md:px-6 md:py-5 flex items-center justify-between">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          {/* <BotIcon className="w-6 h-6" /> */}
          <span className="text-xl font-bold">AI Explorer</span>
        </Link>
        <nav className="hidden md:flex items-center gap-4">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground"
            prefetch={false}
          >
            Home
          </Link>
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground"
            prefetch={false}
          >
            Models
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:text-foreground"
            prefetch={false}
          >
            About
          </Link>
        </nav>
        {/* <div className="flex items-center gap-2">
          <Button className="rounded-full">
            <SearchIcon className="w-5 h-5" />
            test
          </Button>
          <Button >Sign In</Button>
          <Button>Sign Up</Button>
        </div> */}
      </div>
    </header>
  );
};

export default Header;
