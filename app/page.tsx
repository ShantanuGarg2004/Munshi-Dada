import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { BuiltForSection } from "@/components/built-for-section"
import { WhyTeamsSection } from "@/components/why-teams-section"
import { MunshiDadaModesSection } from "@/components/munshi-dada-modes-section"
import { NoNewAppSection } from "@/components/no-new-app-section"
import { FeaturesSection } from "@/components/features-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { GetStartedSection } from "@/components/get-started-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <BuiltForSection />
      <WhyTeamsSection />
      <MunshiDadaModesSection />
      <NoNewAppSection />
      <FeaturesSection />
      <HowItWorksSection />
      <GetStartedSection />
      <Footer />
    </main>
  )
}
