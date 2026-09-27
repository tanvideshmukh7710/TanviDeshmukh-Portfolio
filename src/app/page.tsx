import { PortfolioHeroCarousel } from "@/components/ui/portfolio-hero-carousel"

export default function Page() {
  return (
    <main className="w-screen h-screen overflow-hidden bg-white">
      <PortfolioHeroCarousel
        portraitImageUrl="/images/girl-portrait.png"
      />
    </main>
  )
}
