"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ThemeToggleProps {
  theme: "light" | "dark";
  onToggle: () => void;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  theme,
  onToggle,
  className,
}) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className={cn(
        "relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border focus:outline-none shadow-sm cursor-pointer select-none",
        theme === "dark"
          ? "bg-zinc-900/90 border-zinc-800 text-yellow-400 hover:bg-zinc-800 hover:border-zinc-700 shadow-zinc-950/40"
          : "bg-zinc-100/90 border-zinc-200/80 text-zinc-700 hover:bg-zinc-200/90 hover:text-zinc-950 shadow-black/5",
        className
      )}
    >
      <Sun
        className={cn(
          "w-4 h-4 transition-all duration-300 absolute",
          theme === "dark"
            ? "scale-100 rotate-0 opacity-100 text-amber-400"
            : "scale-0 -rotate-90 opacity-0"
        )}
      />
      <Moon
        className={cn(
          "w-4 h-4 transition-all duration-300 absolute",
          theme === "dark"
            ? "scale-0 rotate-90 opacity-0"
            : "scale-100 rotate-0 opacity-100 text-zinc-700"
        )}
      />
    </button>
  );
};

export default ThemeToggle;
