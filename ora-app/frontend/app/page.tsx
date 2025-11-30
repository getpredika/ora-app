import { LandingFeatures } from "@/components/ui/landing-features"
import LandingFooter from "@/components/ui/landing-footer"
import  DemoHeroGeometric  from "@/pages/landing-page"

export default function LandingPage() {
  return (
    <>
      <DemoHeroGeometric />
      <LandingFeatures />
       <LandingFooter />
    </>
  )
}
