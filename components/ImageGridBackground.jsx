"use client";

/**
 * ImageGridBackground
 *
 * LAYER 1 — sits at z-index 0 inside the hero section.
 * Renders a horizontal collage of finance-related images in uneven widths.
 * Driven by the CSS keyframe "animation1" (defined in globals.css).
 * The strip is tripled so the 33.333% translateX loop is perfectly seamless.
 */

// Six professional finance/tax/office Unsplash images (CORS-friendly)
const images = [
  {
    src: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=65",
    alt: "Tax paperwork on desk",
    width: 440,
  },
  {
    src: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=900&q=65",
    alt: "Business team meeting",
    width: 340,
  },
  {
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=65",
    alt: "Financial analytics screen",
    width: 480,
  },
  {
    src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=65",
    alt: "Accountant at desk",
    width: 360,
  },
  {
    src: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=900&q=65",
    alt: "Finance team discussion",
    width: 420,
  },
  {
    src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=65",
    alt: "Signing financial documents",
    width: 380,
  },
];

// Triple the array — the 33.333% translate loops over exactly one copy
const allImages = [...images, ...images, ...images];

export default function ImageGridBackground() {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* collage-marquee applies the "animation1" keyframe from globals.css */}
      <div className="collage-marquee">
        {allImages.map((img, i) => (
          <div
            key={i}
            className="relative flex-shrink-0"
            style={{
              width: `${img.width}px`,
              height: "100vh",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.alt}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                filter: "grayscale(30%) brightness(0.58) contrast(0.9) saturate(0.75)",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
