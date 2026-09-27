"use client"

import React, { memo, useEffect, useLayoutEffect, useState } from "react"
import {
  motion,
  AnimatePresence,
  useMotionValue,
  animate,
} from "framer-motion"
import { PdfPortfolioModal, PortfolioProject } from "./pdf-portfolio-modal"
import { Tabs, ITab } from "./tabs"
import { AboutSection } from "./about-section"
import { FlipLink } from "./flip-links"
import { ThemeToggle } from "./theme-toggle"
import { Skiper49 } from "./skiper49"
import { KineticText } from "./kinetic-text"

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

type UseMediaQueryOptions = {
  defaultValue?: boolean
  initializeWithValue?: boolean
}

const IS_SERVER = typeof window === "undefined"

export function useMediaQuery(
  query: string,
  {
    defaultValue = false,
    initializeWithValue = true,
  }: UseMediaQueryOptions = {}
): boolean {
  const getMatches = (query: string): boolean => {
    if (IS_SERVER) return defaultValue
    return window.matchMedia(query).matches
  }

  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) return getMatches(query)
    return defaultValue
  })

  const handleChange = () => setMatches(getMatches(query))

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query)
    handleChange()
    matchMedia.addEventListener("change", handleChange)
    return () => matchMedia.removeEventListener("change", handleChange)
  }, [query])

  return matches
}

export const NAV_TABS: ITab[] = [
  { title: "Home", value: "home" },
  { title: "Projects", value: "projects" },
  { title: "About", value: "about" },
  { title: "Contact", value: "contact" },
]

export const DEFAULT_PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "bmw",
    shortTitle: "BMW X3 M401",
    title: "BMW X3 M401 — Unleash Performance",
    subtitle: "Automotive Digital Experience & Telemetry",
    category: "AUTOMOTIVE UI/UX",
    image: "/images/art-bmw.png",
    description:
      "Interactive digital platform for the BMW X3 M401 showcasing titanium materials, engineering telemetry, driver-focused cockpit, and bespoke customizer.",
    tags: ["Automotive", "UI/UX", "CMF", "Performance"],
    caseStudyImages: ["/case-studies/bmw_case_study.png"],
  },
  {
    id: "zentra",
    shortTitle: "Zentra",
    title: "Zentra — Transit Pulse Ahmedabad",
    subtitle: "Multimodal Urban Mobility Assistant",
    category: "MOBILE APP DESIGN",
    image: "/images/art-transit.png",
    description:
      "Connected multimodal transit app simplifying transfers between AMTS, BRTS, and Metro with live station gates, weather guidance, and safety telemetry.",
    tags: ["Transit", "Mobile UI", "Navigation", "Wayfinding"],
    caseStudyImages: ["/case-studies/zentra_case_study.png"],
  },
  {
    id: "loopra",
    shortTitle: "Loopra",
    title: "Loopra — Design for Circular Living",
    subtitle: "Plastic Packaging Converter & Dispenser",
    category: "INDUSTRIAL DESIGN",
    image: "/images/art-dispenser.png",
    description:
      "A compact mechanical system converting discarded flexible plastic packaging into continuous, reusable weaving strips for sustainable material lifecycles.",
    tags: ["Hardware", "Industrial Design", "Sustainability", "Circularity"],
    caseStudyImages: ["/case-studies/loopra_case_study.png"],
  },
  {
    id: "survival",
    shortTitle: "The Survival Game",
    title: "The Survival — Design for Inclusion",
    subtitle: "Tactile Braille Adventure Board Game",
    category: "PACKAGING & ACCESSIBILITY",
    image: "/images/art-survival.png",
    description:
      "Tactile board game enabling visually impaired children to play intuitively via touch, textured tokens, Braille cards, and sensory mechanics.",
    tags: ["Packaging", "Accessibility", "Inclusive Design", "Sensory"],
    caseStudyImages: ["/case-studies/survival_case_study.png"],
  },
  {
    id: "pradam",
    shortTitle: "Pradam",
    title: "Pradam — Design for Trust",
    subtitle: "Artisanal Kolhapuri Footwear Experience",
    category: "UI/UX & E-COMMERCE",
    image: "/images/art-pradam.png",
    description:
      "A digital platform giving credit and visibility back to indigenous Kolhapuri artisans with verified provenance and tactile material customizer.",
    tags: ["UI/UX", "Mobile", "Cultural Design", "Trust"],
    caseStudyImages: ["/case-studies/pradam_case_study.png"],
  },
  {
    id: "bmw-2",
    shortTitle: "BMW X3 M401",
    title: "BMW X3 M401 — Titanium & Cockpit",
    subtitle: "Precision Engineering & CMF Configuration",
    category: "AUTOMOTIVE UI/UX",
    image: "/images/art-bmw.png",
    description:
      "Detailed chassis assembly, titanium wheel configurator, and ergonomic panoramic sky lounge interface design.",
    tags: ["Automotive", "Engineering", "Interface"],
    caseStudyImages: ["/case-studies/bmw_case_study.png"],
  },
  {
    id: "loopra-2",
    shortTitle: "Loopra",
    title: "Loopra — Slit & Wind Mechanism",
    subtitle: "Continuous Winding & Slitter Assembly",
    category: "INDUSTRIAL DESIGN",
    image: "/images/art-dispenser.png",
    description:
      "Detailed view of precision roller mechanism and ergonomic tactile feedback dial for controlled dispensing.",
    tags: ["Hardware", "CAD", "Detailing"],
    caseStudyImages: ["/case-studies/loopra_case_study.png"],
  },
  {
    id: "survival-2",
    shortTitle: "The Survival Game",
    title: "The Survival — Tactile Sensory Box",
    subtitle: "Inclusive Sensory Token System",
    category: "PACKAGING DESIGN",
    image: "/images/art-survival.png",
    description:
      "Complete rulebook iconography and die-line packaging specifications for sensory-inclusive gameplay.",
    tags: ["Print Production", "Identity", "Braille"],
    caseStudyImages: ["/case-studies/survival_case_study.png"],
  },
]

interface CarouselProps {
  projects: PortfolioProject[]
  onSelectProject: (project: PortfolioProject) => void
  onHoverProject: (title: string) => void
  isCarouselActive: boolean
}

const CarouselBehindSubject = memo(
  ({ projects, onSelectProject, onHoverProject, isCarouselActive }: CarouselProps) => {
    const isScreenSm = useMediaQuery("(max-width: 640px)")
    const isScreenMd = useMediaQuery("(max-width: 1024px)")

    const cylinderWidth = isScreenSm ? 1500 : isScreenMd ? 2100 : 2650
    const faceCount = projects.length
    const faceWidth = cylinderWidth / faceCount
    const radius = cylinderWidth / (2 * Math.PI)
    const rotation = useMotionValue(0)

    // Continuous smooth auto-rotation and interactive inertia
    useEffect(() => {
      if (!isCarouselActive) return

      let animation: any = null

      const startAutoSpin = () => {
        animation = animate(rotation, rotation.get() + 360, {
          duration: 55,
          ease: "linear",
          repeat: Infinity,
        })
      }

      startAutoSpin()

      return () => {
        if (animation) animation.stop()
      }
    }, [isCarouselActive, rotation])

    // Update active project title dynamically as carousel turns (DOM update to prevent 60fps React re-renders)
    useEffect(() => {
      let lastIndex = -1
      const unsubscribe = rotation.on("change", (latest: number) => {
        const normalizedAngle = ((-latest % 360) + 360) % 360
        const anglePerCard = 360 / faceCount
        const activeIndex = Math.round(normalizedAngle / anglePerCard) % faceCount
        if (activeIndex !== lastIndex && projects[activeIndex]) {
          lastIndex = activeIndex
          const el = document.getElementById("activeProjectTitle")
          if (el) {
            el.textContent = projects[activeIndex].title
          }
        }
      })
      return () => unsubscribe()
    }, [rotation, faceCount, projects])

    useEffect(() => {
      const handleWheel = (e: WheelEvent) => {
        if (!isCarouselActive) return
        const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
        rotation.set(rotation.get() + delta * 0.16)
      }
      window.addEventListener("wheel", handleWheel, { passive: true })
      return () => window.removeEventListener("wheel", handleWheel)
    }, [isCarouselActive, rotation])

    return (
      <div
        className="flex h-full w-full items-center justify-center select-none"
        style={{
          perspective: "1500px",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        <motion.div
          drag={isCarouselActive ? "x" : false}
          className="relative flex h-full origin-center cursor-grab justify-center items-center active:cursor-grabbing"
          style={{
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          onDrag={(_, info) => {
            if (isCarouselActive) {
              rotation.set(rotation.get() + info.offset.x * 0.06)
            }
          }}
          onDragEnd={(_, info) => {
            if (isCarouselActive) {
              animate(rotation, rotation.get() + info.velocity.x * 0.12, {
                type: "spring",
                stiffness: 95,
                damping: 24,
                mass: 0.14,
                onComplete: () => {
                  animate(rotation, rotation.get() + 360, {
                    duration: 55,
                    ease: "linear",
                    repeat: Infinity,
                  })
                },
              })
            }
          }}
        >
          {projects.map((proj, i) => (
            <motion.div
              key={`proj-${proj.id}-${i}`}
              className="absolute flex flex-col items-center justify-center origin-center group"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${
                  i * (360 / faceCount)
                }deg) translateZ(${radius}px)`,
                backfaceVisibility: "visible",
              }}
            >
              {/* PURE BORDERLESS SQUARED IMAGE WITH SLIGHTLY ROUNDED CORNERS */}
              <button
                type="button"
                onMouseEnter={() => {
                  const el = document.getElementById("activeProjectTitle")
                  if (el) el.textContent = proj.title
                }}
                onClick={(e) => {
                  e.stopPropagation()
                  onSelectProject(proj)
                }}
                className="w-[210px] h-[210px] sm:w-[250px] sm:h-[250px] md:w-[280px] md:h-[280px] rounded-2xl sm:rounded-3xl shadow-[0_16px_40px_rgba(0,0,0,0.15)] hover:shadow-[0_24px_55px_rgba(0,0,0,0.25)] hover:scale-105 transition-all duration-300 overflow-hidden cursor-pointer select-none border-0 p-0 m-0 outline-none pointer-events-auto bg-transparent"
                aria-label={`View Case Study for ${proj.title}`}
              >
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover rounded-2xl sm:rounded-3xl border-0 pointer-events-none block"
                  loading="eager"
                />
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    )
  }
)

interface PortfolioHeroCarouselProps {
  projects?: PortfolioProject[]
  portraitImageUrl?: string
  className?: string
}

export function PortfolioHeroCarousel({
  projects = DEFAULT_PORTFOLIO_PROJECTS,
  portraitImageUrl = "/images/girl-portrait.png",
  className = "",
}: PortfolioHeroCarouselProps) {
  const [selectedTab, setSelectedTab] = useState<string>("home")
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null)
  const [activeTitle, setActiveTitle] = useState<string>(projects[0]?.title || "")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [contactModalType, setContactModalType] = useState<"email" | "phone" | null>(null)
  const [copiedText, setCopiedText] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    const saved = typeof window !== "undefined" ? (localStorage.getItem("portfolio-theme") as "light" | "dark" | null) : null
    const prefersDark = typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches
    const initialTheme = saved || (prefersDark ? "dark" : "light")
    setTheme(initialTheme)
    if (typeof document !== "undefined") {
      if (initialTheme === "dark") {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    }
  }, [])

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark"
    setTheme(next)
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio-theme", next)
    }
    if (typeof document !== "undefined") {
      if (next === "dark") {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    }
  }

  const handleSelectProject = (project: PortfolioProject) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div
      className={`relative w-screen h-screen overflow-hidden bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 flex flex-col transition-colors duration-300 ${className}`}
    >
      {/* Brand Logo: Top-Left Corner (Transparent TD Logo) */}
      <div className="fixed top-3 sm:top-4 left-4 sm:left-6 z-50">
        <button 
          type="button" 
          onClick={() => setSelectedTab("home")}
          className="h-9 sm:h-11 w-auto block focus:outline-none transition-transform hover:scale-105 cursor-pointer"
          aria-label="Home"
        >
          <img 
            src="/images/td-logo.png" 
            alt="TD Logo" 
            className="h-9 sm:h-11 w-auto object-contain"
          />
        </button>
      </div>

      {/* Theme Switcher: Top-Right Corner */}
      <div className="fixed top-3 sm:top-4 right-4 sm:right-6 z-50">
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </div>

      {/* ========================================================= */}
      {/* TOP NAVIGATION BAR: Centered Tabs (Home, About, Contact)  */}
      {/* ========================================================= */}
      <nav className="w-full z-40 pt-4 pb-2 flex items-center justify-center shrink-0 bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-md transition-colors duration-300">
        <Tabs
          selected={selectedTab}
          setSelected={(val: string) => setSelectedTab(val)}
          tabs={NAV_TABS}
          variant="primary"
        />
      </nav>

      {/* ========================================================= */}
      {/* TAB 1: HOME (Hero, 3D Carousel Behind Subject, Portrait)  */}
      {/* ========================================================= */}
      {selectedTab === "home" && (
        <div className="relative flex-1 w-full h-full overflow-hidden">
          {/* Header Image: "Tanvi Deshmukh's PORTFOLIO" and Active Product Name between PORTFOLIO and Carousel */}
          <header 
            className="absolute top-1.5 sm:top-2 md:top-3 left-0 right-0 z-30 flex flex-col items-center justify-center pointer-events-none select-none px-4 space-y-1 sm:space-y-1.5"
            style={{ zIndex: 35 }}
          >
            {/* Small text "Tanvi Deshmukh's" above "PORTFOLIO" */}
            <span className="text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase text-[#3c3939] dark:text-zinc-300 font-sans pointer-events-none">
              Tanvi Deshmukh&apos;s
            </span>
            {/* Kinetic Text "PORTFOLIO" Wordmark with Magic UI dynamic font-weight wave on hover */}
            <div 
              data-cursor="explore" 
              className="relative pointer-events-auto flex items-center justify-center py-1 sm:py-2 cursor-pointer z-40"
              style={{ zIndex: 40 }}
            >
              <KineticText
                text="PORTFOLIO"
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans tracking-[0.16em] sm:tracking-[0.2em] uppercase justify-center items-center text-[#8b0a0a] dark:text-[#ef4444] transition-colors duration-300 [font-optical-sizing:auto]"
              />
            </div>
            {/* ACTIVE TITLE: Clean, Centered, between "PORTFOLIO" and the Carousel */}
            <p 
              id="activeProjectTitle" 
              className="text-sm sm:text-base md:text-lg font-semibold text-zinc-900 dark:text-zinc-100 tracking-normal text-center transition-all duration-300 font-sans pointer-events-none"
            >
              {projects[0]?.title || ""}
            </p>
          </header>

          {/* LAYER 2: 3D Carousel (Appears BEHIND the foreground girl) */}
          <div 
            className="absolute inset-0 z-10 flex items-center justify-center pointer-events-auto"
            style={{ zIndex: 10 }}
          >
            <CarouselBehindSubject
              projects={projects}
              onSelectProject={handleSelectProject}
              onHoverProject={setActiveTitle}
              isCarouselActive={!isModalOpen}
            />
          </div>

          {/* LAYER 3: Centered Resized Portrait Cutout (Overlay on the carousel) */}
          <img
            src={portraitImageUrl}
            alt="Tanvi Deshmukh"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 pointer-events-none select-none h-[64vh] sm:h-[68vh] md:h-[72vh] max-h-[680px] w-auto object-contain object-bottom filter-none"
            style={{ zIndex: 20 }}
          />
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: PROJECTS (Skiper49 Swiper Coverflow Carousel)       */}
      {/* ========================================================= */}
      {selectedTab === "projects" && (
        <section className="relative flex-1 w-full h-full flex flex-col items-center justify-center overflow-hidden z-20">
          <div className="w-full flex-1 flex items-center justify-center">
            <Skiper49
              projects={projects}
              onSelectProject={(proj) => {
                const found = projects.find((p) => p.id === proj.id) || (proj as PortfolioProject)
                handleSelectProject(found)
              }}
              showNavigation={true}
            />
          </div>
        </section>
      )}

      {/* ========================================================= */}
      {/* TAB 3: ABOUT (Faithful to Attached About Sheet)           */}
      {/* ========================================================= */}
      {selectedTab === "about" && (
        <div className="flex-1 w-full overflow-y-auto bg-transparent p-4 sm:p-8">
          <AboutSection />
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: CONTACT (Animated FlipLinks & Direct Popups)       */}
      {/* ========================================================= */}
      {selectedTab === "contact" && (
        <div className="flex-1 w-full overflow-y-auto bg-transparent p-6 sm:p-12 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 text-center select-none py-8">
            <FlipLink
              href="https://www.linkedin.com/in/tanvi-deshmukh-95646341a/"
              target="_blank"
              className="text-5xl sm:text-7xl md:text-8xl lg:text-[105px]"
            >
              Linkedin
            </FlipLink>

            <FlipLink
              href="https://www.instagram.com/damn.tanvi/"
              target="_blank"
              className="text-5xl sm:text-7xl md:text-8xl lg:text-[105px]"
            >
              Instagram
            </FlipLink>

            <FlipLink
              onClick={() => {
                window.location.href = "mailto:tanvideshmukh7710@gmail.com"
                setContactModalType("email")
              }}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-[105px] cursor-pointer"
            >
              Gmail
            </FlipLink>

            <FlipLink
              onClick={() => setContactModalType("phone")}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-[105px] cursor-pointer"
            >
              Phone
            </FlipLink>
          </div>
        </div>
      )}

      {/* DIRECT CASE STUDY PNG MODAL */}
      <PdfPortfolioModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedProject={selectedProject}
      />

      {/* INTERACTIVE POPUP FOR GMAIL & PHONE NUMBER */}
      {contactModalType && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => {
            setContactModalType(null)
            setCopiedText(false)
          }}
        >
          <div
            className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-zinc-200 dark:border-zinc-800 text-center space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            {contactModalType === "email" ? (
              <>
                <div className="w-14 h-14 rounded-2xl bg-[#8b0a0a]/10 dark:bg-red-500/15 text-[#8b0a0a] dark:text-red-400 flex items-center justify-center text-2xl mx-auto">
                  ✉️
                </div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight uppercase text-zinc-900 dark:text-white font-sans">
                  Send an Email
                </h3>
                <p className="text-sm sm:text-base font-semibold text-zinc-800 dark:text-zinc-200 break-all bg-zinc-50 dark:bg-zinc-800/80 py-3 px-4 rounded-xl border border-zinc-200 dark:border-zinc-700 select-all">
                  tanvideshmukh7710@gmail.com
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <a
                    href="mailto:tanvideshmukh7710@gmail.com"
                    className="flex-1 py-3 px-4 rounded-xl bg-[#8b0a0a] hover:bg-[#a10d0d] text-white font-bold text-sm transition-colors flex items-center justify-center"
                  >
                    Compose Email
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText("tanvideshmukh7710@gmail.com")
                      setCopiedText(true)
                      setTimeout(() => setCopiedText(false), 2000)
                    }}
                    className="flex-1 py-3 px-4 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-bold text-sm transition-colors flex items-center justify-center"
                  >
                    {copiedText ? "Copied! ✓" : "Copy Address"}
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="w-14 h-14 rounded-2xl bg-[#8b0a0a]/10 dark:bg-red-500/15 text-[#8b0a0a] dark:text-red-400 flex items-center justify-center text-2xl mx-auto">
                  📞
                </div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight uppercase text-zinc-900 dark:text-white font-sans">
                  Phone Number
                </h3>
                <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100 bg-zinc-50 dark:bg-zinc-800/80 py-3 px-4 rounded-xl border border-zinc-200 dark:border-zinc-700 select-all">
                  +91 7030352999
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <a
                    href="tel:+917030352999"
                    className="flex-1 py-3 px-4 rounded-xl bg-[#8b0a0a] hover:bg-[#a10d0d] text-white font-bold text-sm transition-colors flex items-center justify-center"
                  >
                    Call Now
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText("+917030352999")
                      setCopiedText(true)
                      setTimeout(() => setCopiedText(false), 2000)
                    }}
                    className="flex-1 py-3 px-4 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-bold text-sm transition-colors flex items-center justify-center"
                  >
                    {copiedText ? "Copied! ✓" : "Copy Number"}
                  </button>
                </div>
              </>
            )}
            <button
              type="button"
              onClick={() => {
                setContactModalType(null)
                setCopiedText(false)
              }}
              className="text-xs text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors uppercase tracking-wider font-semibold block mx-auto pt-1 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
