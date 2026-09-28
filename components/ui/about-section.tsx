"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { CustomCursorTarget } from "./custom-cursor"
import { 
  Mail, 
  Phone, 
  ArrowUpRight,
  Copy,
  Check,
  Download,
  FileText
} from "lucide-react"

// Authentic Skills directly matching Tanvi Deshmukh's portfolio sheet
const ANALOGOUS_SKILLS = [
  "Sketching",
  "Prototyping",
  "Ideation",
  "CAD Modeling",
  "Visualization",
  "Rendering / CMF",
  "User Research",
  "Branding"
]

const SOFT_SKILLS = [
  "Empathy",
  "Communication",
  "Adaptability",
  "Leadership"
]

const SOFTWARE_SKILLS = [
  "Figma",
  "Fusion 360",
  "SolidWorks",
  "KeyShot",
  "Cinema 4D",
  "Adobe Photoshop",
  "Adobe Illustrator",
  "Adobe InDesign",
  "Unity",
  "Vizcom"
]

// Professional Experience matching Tanvi's exact background
const EXPERIENCES = [
  {
    company: "WE HEAR INNOVATIONS PVT. LTD.",
    role: "Design Intern & Portfolio Support",
    period: "Internship",
    description:
      "Guided aspiring design students in strengthening their portfolios through structured feedback on projects, storytelling, layouts, and presentations. Worked closely with students to simplify complex design concepts and improve how they communicated their work.",
    takeaway:
      "Developed mentoring, design critique, visual storytelling, and communication skills while learning how to evaluate design from a recruiter's perspective."
  },
  {
    company: "GURUMANTRA ACADEMICS PVT. LTD.",
    role: "Product Design Mentorship (UI/UX & Product Design)",
    period: "Mentorship",
    description:
      "Contributed to product design initiatives by working on user-centric design tasks, creating wireframes and UI concepts, iterating designs based on feedback, and collaborating with the team throughout the design process.",
    takeaway:
      "Gained hands-on experience in professional design workflows, iterative problem-solving, collaboration with teams, and translating user needs into practical design solutions."
  }
]

// Education items
const EDUCATION_ITEMS = [
  {
    institution: "ANANT NATIONAL UNIVERSITY",
    degree: "Bachelor of Design (BDes.) in Product Design",
    status: "Currently Studying",
    current: true
  },
  {
    institution: "DR. D.Y.P COLLEGE, KOLHAPUR",
    degree: "Junior College in Commerce",
    status: "Completed",
    current: false
  },
  {
    institution: "SHANTINIKETAN SCHOOL, KOLHAPUR",
    degree: "Schooling & Foundational Education",
    status: "Completed",
    current: false
  }
]

export function AboutSection() {
  const [copiedType, setCopiedType] = useState<"email" | "phone" | null>(null)
  const [downloadState, setDownloadState] = useState<"idle" | "downloading" | "downloaded">("idle")

  const handleCopy = (text: string, type: "email" | "phone") => {
    navigator.clipboard.writeText(text)
    setCopiedType(type)
    setTimeout(() => setCopiedType(null), 2000)
  }

  const handleDownload = () => {
    setDownloadState("downloading")
    setTimeout(() => {
      setDownloadState("downloaded")
      setTimeout(() => {
        setDownloadState("idle")
      }, 2500)
    }, 600)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pt-6 sm:pt-10 pb-28 sm:pb-36 text-zinc-900 dark:text-zinc-100"
    >
      {/* 2-Column Minimal Editorial Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-14 items-start">
        
        {/* ========================================================= */}
        {/* LEFT COLUMN: Editorial Portrait & Fast Contact Info       */}
        {/* ========================================================= */}
        <aside className="md:col-span-5 lg:col-span-4 md:sticky md:top-6 flex flex-col space-y-6">
          {/* Authentic Portrait Image Frame with grayscale-to-color hover interaction */}
          <CustomCursorTarget size="lg">
            <div className="relative aspect-[2/3] sm:aspect-[3/4] w-full rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 shadow-sm group cursor-pointer">
              <img
                src="/images/tanvi-about-profile.jpg"
                alt="Tanvi Deshmukh"
                className="w-full h-full object-cover object-center select-none grayscale contrast-[1.05] brightness-95 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 group-hover:scale-[1.03] transition-all duration-500 ease-out filter"
              />
            </div>
          </CustomCursorTarget>

          {/* Designer Bio Meta */}
          <div className="space-y-1">
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white font-sans">
              Tanvi Deshmukh
            </h2>
            <p className="text-xs uppercase tracking-wider font-semibold text-[#8b0a0a] dark:text-[#ef4444]">
              Product & Industrial Designer
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Ahmedabad &bull; Kolhapur, India
            </p>
          </div>

          {/* Minimalist Contact Card */}
          <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block font-sans">
              Get in Touch
            </span>

            <div className="space-y-2">
              {/* Email */}
              <div className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-800">
                <a 
                  href="mailto:tanvideshmukh7710@gmail.com" 
                  className="flex items-center gap-2 truncate hover:text-[#8b0a0a] dark:hover:text-[#ef4444] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                  <span className="truncate">tanvideshmukh7710@gmail.com</span>
                </a>
                <button
                  type="button"
                  onClick={() => handleCopy("tanvideshmukh7710@gmail.com", "email")}
                  className="p-1 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                  title="Copy email"
                  aria-label="Copy email"
                >
                  {copiedType === "email" ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* Phone */}
              <div className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-800">
                <a 
                  href="tel:+919106013651" 
                  className="flex items-center gap-2 hover:text-[#8b0a0a] dark:hover:text-[#ef4444] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                  <span>+91 9106013651</span>
                </a>
                <button
                  type="button"
                  onClick={() => handleCopy("+919106013651", "phone")}
                  className="p-1 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                  title="Copy phone"
                  aria-label="Copy phone"
                >
                  {copiedType === "phone" ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* Download Resume Action (Directly below phone number) */}
              <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
                <CustomCursorTarget size="md">
                  <motion.a
                    href="/Tanvi_Deshmukh_Resume.pdf"
                    download="Tanvi_Deshmukh_Resume.pdf"
                    onClick={handleDownload}
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-xs font-medium shadow-sm hover:bg-[#8b0a0a] dark:hover:bg-[#ef4444] dark:hover:text-white transition-all duration-300 group overflow-hidden cursor-pointer select-none border border-transparent dark:border-zinc-700/50"
                    title="Download Tanvi Deshmukh's Resume (PDF)"
                  >
                    {/* Hover light beam effect */}
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 dark:via-black/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

                    <div className="flex items-center gap-2 relative z-10">
                      {downloadState === "downloaded" ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-400 dark:text-emerald-600 stroke-[2.5]" />
                          <span className="text-emerald-400 dark:text-emerald-600 font-semibold">Resume Downloaded!</span>
                        </>
                      ) : downloadState === "downloading" ? (
                        <>
                          <svg className="animate-spin w-4 h-4 text-zinc-300 dark:text-zinc-600" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span className="font-medium">Downloading...</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                          <span className="font-semibold">Download Resume</span>
                        </>
                      )}
                    </div>

                    <span className="relative z-10 text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/15 dark:bg-zinc-900/10 group-hover:bg-white/25 dark:group-hover:bg-white/20 transition-colors">
                      PDF
                    </span>
                  </motion.a>
                </CustomCursorTarget>
              </div>
            </div>
          </div>
        </aside>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: Narrative, Skills, Experience, Education    */}
        {/* ========================================================= */}
        <main className="md:col-span-7 lg:col-span-8 space-y-10">
          
          {/* Statement & Philosophy */}
          <section className="space-y-4">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white font-sans">
              About Me
            </h1>
            <p className="text-sm sm:text-base leading-relaxed text-zinc-700 dark:text-zinc-300 font-sans font-normal">
              Hello, I&apos;m Tanvi. I&apos;m drawn to problems that sit between people, products and systems. Whether it&apos;s making play more inclusive for visually impaired children, helping commuters navigate a city, or giving discarded packaging a second life, I enjoy turning complex challenges into simple, usable experiences.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-zinc-700 dark:text-zinc-300 font-sans font-normal">
              I work through research, prototyping and iteration, believing that the strongest ideas emerge when form, function and empathy evolve together.
            </p>
          </section>

          {/* Skills Breakdown (Direct from Tanvi's Authentic Sheet) */}
          <section className="space-y-6 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white font-sans uppercase">
              Skills & Expertise
            </h2>

            {/* Analogous Skills */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-sans">
                Analogous Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {ANALOGOUS_SKILLS.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-xs font-medium rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 text-zinc-800 dark:text-zinc-200 select-none"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Soft Skills */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-sans">
                Soft Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {SOFT_SKILLS.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-xs font-medium rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 text-zinc-800 dark:text-zinc-200 select-none"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Software Skills */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-sans">
                Software & Digital Tools
              </h3>
              <div className="flex flex-wrap gap-2">
                {SOFTWARE_SKILLS.map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1 text-xs font-medium rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 text-zinc-800 dark:text-zinc-200 hover:border-[#8b0a0a] dark:hover:border-[#ef4444] transition-colors select-none"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Professional Experience */}
          <section className="space-y-6 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white font-sans uppercase">
              Experience
            </h2>

            <div className="space-y-6">
              {EXPERIENCES.map((exp) => (
                <div
                  key={exp.company}
                  className="space-y-2 pb-6 border-b border-zinc-100 dark:border-zinc-800/80 last:border-b-0 last:pb-0"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white font-sans">
                      {exp.company}
                    </h3>
                    <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-semibold text-[#8b0a0a] dark:text-[#ef4444]">
                    {exp.role}
                  </p>

                  <p className="text-xs sm:text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                    {exp.description}
                  </p>

                  <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400 pt-1">
                    <span className="font-semibold text-zinc-700 dark:text-zinc-300">Key Learning: </span>
                    {exp.takeaway}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="space-y-6 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white font-sans uppercase">
              Education
            </h2>

            <div className="space-y-4">
              {EDUCATION_ITEMS.map((edu, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 py-1"
                >
                  <div>
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-white font-sans">
                      {edu.institution}
                    </h3>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400">
                      {edu.degree}
                    </p>
                  </div>
                  <span className={`text-[11px] font-semibold uppercase tracking-wider shrink-0 ${
                    edu.current 
                      ? "text-[#8b0a0a] dark:text-[#ef4444]" 
                      : "text-zinc-500 dark:text-zinc-400"
                  }`}>
                    {edu.status}
                  </span>
                </div>
              ))}
            </div>
          </section>

        </main>
      </div>

      {/* Blank space at the end of the section for breathing room */}
      <div className="h-16 sm:h-24 w-full" aria-hidden="true" />
    </motion.div>
  )
}

export default AboutSection
