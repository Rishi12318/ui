"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function FogBackground() {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    if (!vantaEffect) {
      import("vanta/dist/vanta.fog.min").then((VANTA) => {
        setVantaEffect(
          VANTA.default({
            el: vantaRef.current,
            THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,

            // 🎨 Your colors
            highlightColor: 0xffffff,   // white
            midtoneColor: 0x6b99cc,     // blue gray
            lowlightColor: 0x5c7fa3,    // deeper blue gray
            baseColor: 0x6f8fb3,        // soft blue

            blurFactor: 0.6,
            speed: 1.0,
            zoom: 1.1,
          })
        );
      });
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div
      ref={vantaRef}
      className="absolute inset-0 -z-10"
    />
  );
}