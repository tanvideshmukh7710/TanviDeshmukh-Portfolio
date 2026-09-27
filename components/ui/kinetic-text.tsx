"use client"

import React, { useState } from "react"
import { cn } from "@/lib/utils"

type As = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span"

export interface KineticTextProps extends React.HTMLAttributes<HTMLElement> {
  text: string
  as?: As
}

export function KineticText({
  text,
  as: Tag = "h1",
  className = "",
  style,
  ...rest
}: KineticTextProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const mergedStyle = {
    "--hover-padding": "calc(1em / 12)",
    "--text-stroke-width": "calc(1em * 125 / 6000)",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    ...(style as React.CSSProperties | undefined),
  } as React.CSSProperties

  const letters = text.split("")

  return (
    <Tag
      {...rest}
      className={cn("kinetic-text flex flex-wrap font-[300] select-none [font-optical-sizing:auto]", className)}
      style={mergedStyle}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {letters.map((letter, i) => {
        let weight = 300
        let scale = 1
        let translateY = 0
        let paddingInline = "0px"
        let strokeColor = "transparent"
        let strokeWidth = "var(--text-stroke-width)"

        if (hoveredIndex !== null) {
          const dist = Math.abs(i - hoveredIndex)
          if (dist === 0) {
            weight = 900
            scale = 1.08
            translateY = -3
            paddingInline = "var(--hover-padding)"
            strokeColor = "currentColor"
            strokeWidth = "calc(var(--text-stroke-width) * 2)"
          } else if (dist === 1) {
            weight = 600
            scale = 1.04
            translateY = -1.5
            paddingInline = "calc(var(--hover-padding) * 0.75)"
          } else if (dist === 2) {
            weight = 400
            scale = 1.02
            translateY = -0.5
          }
        }

        return (
          <span
            key={i}
            aria-hidden="true"
            onMouseEnter={() => setHoveredIndex(i)}
            className="kinetic-text-letter inline-block cursor-pointer select-none transition-all duration-300 ease-out"
            style={{
              fontWeight: weight,
              transform: translateY !== 0 || scale !== 1 ? `translateY(${translateY}px) scale(${scale})` : "none",
              paddingInline,
              WebkitTextStrokeColor: strokeColor,
              WebkitTextStrokeWidth: strokeWidth,
              willChange: "transform, font-weight, padding",
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        )
      })}
      <span className="sr-only">{text}</span>
    </Tag>
  )
}

export default KineticText
