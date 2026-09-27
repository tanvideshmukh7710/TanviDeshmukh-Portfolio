"use client"

import React, { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export interface PortfolioProject {
  id: string
  title: string
  shortTitle?: string
  subtitle: string
  category: string
  image: string
  description: string
  tags: string[]
  caseStudyImages?: string[]
}

interface PdfPortfolioModalProps {
  isOpen: boolean
  onClose: () => void
  selectedProject: PortfolioProject | null
}

export function PdfPortfolioModal({
  isOpen,
  onClose,
  selectedProject,
}: PdfPortfolioModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      document.body.style.overflow = "hidden"
      window.addEventListener("keydown", handleKeyDown)
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, onClose])

  const imagesToShow = selectedProject?.caseStudyImages && selectedProject.caseStudyImages.length > 0
    ? selectedProject.caseStudyImages
    : [selectedProject?.image || ""]

  return (
    <AnimatePresence>
      {isOpen && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 backdrop-blur-md">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            className="relative z-10 w-full max-w-5xl h-[95vh] bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-zinc-100"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/90 shrink-0">
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8b0a0a]">
                  {selectedProject.category}
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-tight">
                  {selectedProject.title}
                </h3>
                <p className="text-xs text-zinc-400">
                  {selectedProject.subtitle}
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <span className="hidden sm:inline-block text-xs text-zinc-400">
                  Scroll down to read full case study
                </span>
                <button
                  onClick={onClose}
                  className="p-2 text-zinc-400 hover:text-white bg-zinc-800 hover:bg-[#8b0a0a] rounded-xl transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Direct High-Resolution PNG Images (One below another) */}
            <div className="flex-1 overflow-y-auto bg-zinc-900/40 p-3 sm:p-6 flex flex-col items-center space-y-6">
              <div className="w-full max-w-4xl flex flex-col items-center space-y-4">
                {imagesToShow.map((imgSrc, idx) => (
                  <img
                    key={`${selectedProject.id}-page-${idx}`}
                    src={imgSrc}
                    alt={`${selectedProject.title} - Sheet ${idx + 1}`}
                    className="w-full h-auto rounded-xl shadow-2xl border border-zinc-800 bg-white object-contain"
                    loading="eager"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
