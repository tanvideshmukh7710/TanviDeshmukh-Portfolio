"use client";

import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React from "react";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css";

import { cn } from "@/lib/utils";

export interface SkiperProjectItem {
  id?: string;
  shortTitle?: string;
  src?: string;
  image?: string;
  alt?: string;
  title?: string;
  subtitle?: string;
  category?: string;
  description?: string;
  tags?: string[];
  caseStudyImages?: string[];
  [key: string]: any;
}

export function getCleanProjectName(item: SkiperProjectItem): string {
  if (item.shortTitle) return item.shortTitle;
  if (!item.title) return item.alt || "Project";
  
  const base = item.title.split(/ [—–-] /)[0].trim();
  if (base.toLowerCase().includes("survival")) return "The Survival Game";
  return base;
}

const DEFAULT_IMAGES: SkiperProjectItem[] = [
  {
    src: "https://cdn.21st.dev/assets/localized/4a5d625e1432b674a463e803e9fe672f362ad7b1b267b16c8bb0793a5c81747d.jpg",
    title: "Project Alpha",
  },
  {
    src: "https://cdn.21st.dev/assets/localized/75561b1340c3d6965831289a69c3b61286af703f407eda10f5c21201f54586a7.jpg",
    title: "Project Beta",
  },
  {
    src: "https://cdn.21st.dev/assets/localized/89112484e2896a033a8e70574c9187cd06bb596347e408d57f7a6f7cbf8513f7.jpg",
    title: "Project Gamma",
  },
  {
    src: "https://cdn.21st.dev/assets/localized/0a5524b3d86b18bb2252a030e513f1836e329cd1ea2af1cdeebc4c4ceee25776.jpg",
    title: "Project Delta",
  },
];

interface Skiper49Props {
  projects?: SkiperProjectItem[];
  onSelectProject?: (project: SkiperProjectItem) => void;
  className?: string;
  showNavigation?: boolean;
}

const Skiper49: React.FC<Skiper49Props> = ({
  projects,
  onSelectProject,
  className = "",
  showNavigation = true,
}) => {
  const displayItems = projects && projects.length > 0 
    ? projects.map(p => ({
        ...p,
        src: p.src || p.image || "",
        alt: p.alt || p.title || "Portfolio Project",
      }))
    : DEFAULT_IMAGES.map(p => ({
        ...p,
        src: p.src || "",
        alt: p.title || "Project",
      }));

  return (
    <div className={cn("flex h-full w-full items-center justify-center overflow-hidden bg-transparent select-none", className)}>
      <Carousel_003 
        images={displayItems} 
        onSelectProject={onSelectProject}
        showNavigation={showNavigation}
        loop={displayItems.length > 2} 
      />
    </div>
  );
};

export { Skiper49 };

const Carousel_003 = ({
  images,
  className,
  showNavigation = true,
  loop = true,
  autoplay = false,
  spaceBetween = 24,
  onSelectProject,
}: {
  images: (SkiperProjectItem & { src: string; alt: string })[];
  className?: string;
  showNavigation?: boolean;
  loop?: boolean;
  autoplay?: boolean;
  spaceBetween?: number;
  onSelectProject?: (item: any) => void;
}) => {
  const css = `
  .Carousal_003 {
    width: 100%;
    height: 420px;
    padding-top: 15px;
    padding-bottom: 25px !important;
  }
  
  .Carousal_003 .swiper-slide {
    width: 280px;
    height: 360px;
    border-radius: 0 !important;
    box-shadow: none !important;
    filter: none !important;
    background: transparent !important;
  }

  @media (min-width: 640px) {
    .Carousal_003 .swiper-slide {
      width: 320px;
      height: 390px;
    }
  }

  .Carousal_003 .swiper-slide-active {
    box-shadow: none !important;
    filter: none !important;
  }

  .swiper-button-prev, .swiper-button-next {
    width: 42px;
    height: 42px;
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 9999px;
    box-shadow: none !important;
    color: #18181b !important;
    transition: transform 0.2s ease;
  }

  .dark .swiper-button-prev, .dark .swiper-button-next {
    background: rgba(24, 24, 27, 0.9);
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: #f4f4f5 !important;
    box-shadow: none !important;
  }

  .swiper-button-prev:hover, .swiper-button-next:hover {
    transform: scale(1.08);
  }

  .swiper-button-prev:after, .swiper-button-next:after {
    font-size: 15px !important;
    font-weight: bold;
  }
`;

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 15 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.3,
        delay: 0.1,
      }}
      className={cn("relative w-full max-w-5xl px-4 sm:px-8", className)}
    >
      <style>{css}</style>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full relative"
      >
        <Swiper
          observer={true}
          observeParents={true}
          spaceBetween={spaceBetween}
          autoplay={
            autoplay
              ? {
                  delay: 2500,
                  disableOnInteraction: true,
                }
              : false
          }
          effect="coverflow"
          grabCursor={true}
          slidesPerView="auto"
          centeredSlides={true}
          loop={loop}
          coverflowEffect={{
            rotate: 28,
            stretch: 0,
            depth: 90,
            modifier: 1,
            slideShadows: false, // NO SHADOWS
          }}
          pagination={false} // NO PAGE INDICATOR
          navigation={
            showNavigation
              ? {
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }
              : false
          }
          className="Carousal_003"
          modules={[EffectCoverflow, Autoplay, Navigation]}
        >
          {images.map((image, index) => {
            const projectName = getCleanProjectName(image);
            return (
              <SwiperSlide 
                key={index} 
                className="cursor-pointer group select-none flex flex-col items-center shadow-none border-none bg-transparent"
                onClick={() => onSelectProject?.(image)}
              >
                {/* Square image with NO rounded corners and NO shadows */}
                <div className="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] aspect-square overflow-hidden bg-zinc-100 dark:bg-zinc-800 rounded-none shadow-none border-0">
                  <img
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 pointer-events-none rounded-none shadow-none block"
                    src={image.src}
                    alt={projectName}
                  />
                </div>
                
                {/* Clean Project Name ONLY, Centered Below the Project */}
                <p className="mt-3.5 text-center font-sans font-semibold text-sm sm:text-base text-zinc-900 dark:text-zinc-100 tracking-tight transition-colors group-hover:text-[#8b0a0a] dark:group-hover:text-[#ef4444]">
                  {projectName}
                </p>
              </SwiperSlide>
            );
          })}
          {showNavigation && (
            <>
              <div className="swiper-button-prev after:hidden flex items-center justify-center">
                <ChevronLeftIcon className="h-5 w-5" />
              </div>
              <div className="swiper-button-next after:hidden flex items-center justify-center">
                <ChevronRightIcon className="h-5 w-5" />
              </div>
            </>
          )}
        </Swiper>
      </motion.div>
    </motion.div>
  );
};

export { Carousel_003 };
export default Skiper49;
