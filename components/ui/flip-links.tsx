"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface FlipLinkProps {
  children: string;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  className?: string;
  target?: string;
  rel?: string;
}

export const FlipLink = ({
  children,
  href,
  onClick,
  className,
  target,
  rel,
}: FlipLinkProps) => {
  const content = (
    <>
      <div className="flex">
        {children.split("").map((letter, i) => (
          <span
            key={i}
            className="inline-block transition-transform duration-300 ease-in-out group-hover:-translate-y-[110%]"
            style={{
              transitionDelay: `${i * 25}ms`,
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </div>
      <div className="absolute inset-0 flex">
        {children.split("").map((letter, i) => (
          <span
            key={i}
            className="inline-block translate-y-[110%] transition-transform duration-300 ease-in-out group-hover:translate-y-0"
            style={{
              transitionDelay: `${i * 25}ms`,
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </div>
    </>
  );

  const baseClasses = cn(
    "group text-zinc-900 dark:text-zinc-100 hover:text-[#8b0a0a] dark:hover:text-[#ef4444] relative block overflow-hidden whitespace-nowrap text-4xl font-black uppercase sm:text-7xl md:text-8xl lg:text-9xl transition-colors duration-300",
    className
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        target={target}
        rel={rel ?? (target === "_blank" ? "noopener noreferrer" : undefined)}
        data-cursor="target"
        className={baseClasses}
        style={{
          lineHeight: 0.85,
        }}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      data-cursor="target"
      className={baseClasses}
      style={{
        lineHeight: 0.85,
      }}
    >
      {content}
    </button>
  );
};

export const Component = () => {
  return (
    <section className="grid place-content-center gap-4 bg-background w-full h-full min-h-[70vh] text-black">
      <FlipLink href="https://www.linkedin.com/in/tanvi-deshmukh-95646341a/" target="_blank">
        Linkedin
      </FlipLink>
      <FlipLink href="https://www.instagram.com/damn.tanvi/" target="_blank">
        Instagram
      </FlipLink>
      <FlipLink href="mailto:tanvideshmukh7710@gmail.com">
        Gmail
      </FlipLink>
      <FlipLink href="tel:+917030352999">
        Phone
      </FlipLink>
    </section>
  );
};

export default Component;
