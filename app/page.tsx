import HeroSection from "@/app/page/landingPage/HeroSection";
import Problem from "@/app/page/landingPage/Problem";
import KeyFeatures from "@/app/page/landingPage/keyFeatures";
import HowItWorks from "@/app/page/landingPage/working";

export default function Home() {
  return (
    <div style={{ position: "relative", overflow: "visible" }}>

      {/* Section A: Hero — base layer, sits at the bottom of the stack */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <HeroSection />
      </div>

      {/* Section B: Problem — pulls up over Hero */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          marginTop: "-3rem",
          borderRadius: "2.5rem 2.5rem 0 0",
          overflow: "hidden",
          boxShadow: "0 -6px 40px rgba(0,0,0,0.20)",
        }}
      >
        <Problem />
      </div>

      {/* Section C: KeyFeatures — pulls up over Problem */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          marginTop: "-3rem",
          borderRadius: "2.5rem 2.5rem 0 0",
          overflow: "hidden",
          boxShadow: "0 -6px 40px rgba(0,0,0,0.20)",
        }}
      >
        <KeyFeatures />
      </div>

      {/* Section D: HowItWorks — pulls up over KeyFeatures */}
      <div
        style={{
          position: "relative",
          zIndex: 4,
          marginTop: "-3rem",
          borderRadius: "2.5rem 2.5rem 0 0",
          overflow: "hidden",
          boxShadow: "0 -6px 40px rgba(0,0,0,0.20)",
        }}
      >
        <HowItWorks />
      </div>

    </div>
  );
}

