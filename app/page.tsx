import { PortfolioHeroCarousel } from "@/components/ui/portfolio-hero-carousel"

export default function Page() {
  return (
    <main className="w-full h-screen overflow-hidden bg-white dark:bg-[#09090b]">
      <PortfolioHeroCarousel
        portraitImageUrl="/images/girl-portrait.png"
      />
    </main>
  )
}
