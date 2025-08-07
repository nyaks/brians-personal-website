'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { ThemeToggle } from "@/components/ThemeToggle";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-3xl px-4">
      <div className="bg-background/80 backdrop-blur-2xl border border-border/30 rounded-full px-6 py-2 flex items-center justify-between gap-4 backdrop-saturate-150">
        {/* Logo */}
        <div className="relative group flex-shrink-0">
          <Link
            href="/"
            className={`flex items-center transition-all duration-200 p-1 rounded-full ${pathname === '/'
              ? 'opacity-100'
              : 'hover:opacity-80 hover:bg-secondary/50 hover:scale-110'
              }`}
            aria-label="Home"
          >
            <Image
              src="/ghcat.png"
              alt="Brian Barongo"
              width={32}
              height={32}
              className="h-8 w-auto rounded-sm transition-transform duration-200 group-hover:scale-125"
              priority
            />
          </Link>
          <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-2 py-1 text-xs rounded bg-secondary text-secondary-foreground opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 whitespace-nowrap">
            Home
          </span>
        </div>

        {/* Navigation - Show all links */}
        <nav className="flex items-center justify-center flex-grow">
          <div className="flex gap-4 items-center">
            <a href="mailto:nyakerib@gmail.com" className="font-minecraft uppercase tracking-widest text-xs text-muted-foreground hover:text-foreground transition-colors hover:scale-110 transition-transform duration-200">Contact</a>
            <a href="https://www.linkedin.com/in/brian-barongo-a6995b354/" target="_blank" rel="noopener noreferrer" className="font-minecraft uppercase tracking-widest text-xs text-muted-foreground hover:text-foreground transition-colors hover:scale-110 transition-transform duration-200">LinkedIn</a>
            <a href="https://github.com/nyaks" target="_blank" rel="noopener noreferrer" className="font-minecraft uppercase tracking-widest text-xs text-muted-foreground hover:text-foreground transition-colors hover:scale-110 transition-transform duration-200">GitHub</a>
          </div>
        </nav>

        {/* Theme Toggle */}
        <div className="flex-shrink-0">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
