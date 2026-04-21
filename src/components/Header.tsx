"use client";

import { useEffect, useState } from "react";
import { Github, Star, MessageCircle } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [stars, setStars] = useState<number | null>(null);
  const [error, setError] = useState<boolean>(false);
  const pathname = usePathname();
  const isChatPage = pathname === "/chat";

  useEffect(() => {
    const fetchStars = async () => {
      try {
        const response = await fetch("/api/github-stars");
        if (response.ok) {
          const data = await response.json();
          setStars(data.stars);
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      }
    };
    fetchStars();
  }, []);

  if (isChatPage) return null;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-br from-primary/5 via-background/95 to-accent/5 backdrop-blur-xl border-b border-border/30 shadow-sm h-16">
        <div className="grid grid-cols-3 h-full items-center px-4 max-w-5xl mx-auto">
          <Link
            href="/"
            className="font-bold text-lg tracking-tight text-foreground hover:text-primary transition-colors lowercase"
          >
            penguin
          </Link>

          <nav className="hidden md:flex items-center justify-center gap-6 col-start-2">
         
            <Link
              href="/chat"
              className="text-muted-foreground hover:text-foreground px-2 py-1 rounded transition-colors lowercase"
            >
              chat
            </Link>
          </nav>

          <div className="flex items-center gap-2 justify-end col-start-3">
            {/* mobile chat link button */}
            <Link
              href="/chat"
              className="md:hidden inline-flex items-center justify-center rounded p-2 text-foreground hover:bg-muted transition-colors"
              aria-label="Open chat"
            >
              <MessageCircle className="h-6 w-6" />
            </Link>

            <div className="hidden md:flex items-center gap-3">
              <a
                href="https://github.com/sirajahmedx/portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-2 py-1 rounded text-muted-foreground hover:text-foreground transition-colors lowercase"
                aria-label="View portfolio repository on GitHub"
                title={`stars on portfolio repo: ${stars !== null ? stars.toLocaleString() : "..."}`}
              >
                <Github className="h-5 w-5" />
                <span className="font-mono text-sm min-w-[32px] text-center">
                  {error ? (
                    <span className="text-destructive">--</span>
                  ) : stars !== null ? (
                    stars.toLocaleString()
                  ) : (
                    <span className="animate-pulse">...</span>
                  )}
                </span>
                <Star className="h-4 w-4 text-yellow-500" />
              </a>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
