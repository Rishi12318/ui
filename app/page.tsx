import HeroSection from "@/app/page/landingPage/HeroSection";
import Problem from "@/app/page/landingPage/Problem";
import KeyFeatures from "@/app/page/landingPage/keyFeatures";
import HowItWorks from "@/app/page/landingPage/working";
import SocialProof from "@/app/page/landingPage/socialProof";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <Problem />
      <KeyFeatures />
      <HowItWorks />
      <SocialProof />
    </div>
  );
}

