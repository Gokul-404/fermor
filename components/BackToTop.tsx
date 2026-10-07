"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling past 350px
      if (window.scrollY > 350) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Scroll back to top"
      className={`fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white/95 text-muted shadow-md backdrop-blur transition-all duration-300 hover:border-accent hover:bg-white hover:text-accent hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <ArrowUp size={18} />
    </button>
  );
}
