import HeroSection from "@/app/page/landingPage/HeroSection";
import Problem from "@/app/page/landingPage/Problem";
import KeyFeatures from "@/app/page/landingPage/keyFeatures";
import HowItWorks from "@/app/page/landingPage/working";

export default function Home() {
  return (
    <div className="relative">
      {/* Hero — base layer */}
      <div className="relative z-10">
        <HeroSection />
      </div>

      {/* Problem — overlaps Hero by 48px */}
      <div className="relative z-20 -mt-12 rounded-t-[2.5rem] overflow-hidden shadow-[0_-8px_32px_rgba(0,0,0,0.18)]">
        <Problem />
      </div>

      {/* KeyFeatures — overlaps Problem */}
      <div className="relative z-30 -mt-12 rounded-t-[2.5rem] overflow-hidden shadow-[0_-8px_32px_rgba(0,0,0,0.18)]">
        <KeyFeatures />
      </div>

      {/* HowItWorks — overlaps KeyFeatures */}
      <div className="relative z-40 -mt-12 rounded-t-[2.5rem] overflow-hidden shadow-[0_-8px_32px_rgba(0,0,0,0.18)]">
        <HowItWorks />
      </div>
    </div>
  );
}

