"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParallax } from "@/app/hooks/useParallax";

const images = [
  "https://img.jagranjosh.com/images/2025/07/05/article/image/taxpayingcompanies-1751721967354.webp",
  "https://cdn.finshots.app/images/2022/08/COV100.png",
  "https://img.freepik.com/premium-vector/tax-payment-government-state-taxes-concept_8251-274.jpg",
  "https://akm-img-a-in.tosshub.com/businesstoday/images/story/202306/tax-sixteen_nine.jpg?size=948:533",
];

export default function KeyFeatures() {
  const [current, setCurrent] = useState(0);
  const { sectionRef, bgRef } = useParallax(40);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#5f7f99] overflow-hidden min-h-screen flex items-center">

      {/* RIGHT — full-height image panel covering entire right half */}
      <div ref={bgRef} className="absolute top-0 right-0 w-1/2 h-full z-0" style={{ willChange: "transform", transformOrigin: "center center" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={images[current]}
              alt="Tax feature"
              fill
              className="object-cover"
              unoptimized
            />
          </motion.div>
        </AnimatePresence>

        {/* Left-edge blend so image doesn't hard-cut into text */}
        <div
          className="absolute inset-y-0 left-0 w-24 z-10"
          style={{
            background: "linear-gradient(to right, #5f7f99 0%, transparent 100%)",
          }}
        />

        {/* Dot indicators */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: i === current ? "20px" : "8px",
                height: "8px",
                borderRadius: "4px",
                background: i === current ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.4)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>

      {/* LEFT CONTENT — sits on top, constrained to left half */}
      <div className="relative z-10 w-1/2 py-24 px-10 lg:px-16">
        <h2 className="text-4xl font-bold text-white leading-tight">
          Key Features that make <br />
          <span className="text-yellow-400">Tax Planning Simple</span>
        </h2>

        <p className="mt-4 text-white/80 max-w-lg">
          Everything you need to optimize salary, maximize refunds, and stay compliant —
          all in one intelligent dashboard.
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            {
              title: "Salary Optimizer",
              desc: "Compare fixed vs optimized salary structures to maximize take-home pay.",
            },
            {
              title: "Tax Refund Calculator",
              desc: "Get instant refund estimates based on real tax rules.",
            },
            {
              title: "Auto ITR Filing",
              desc: "One-click filing with a real-time compliance dashboard.",
            },
            {
              title: "Deadline Alerts",
              desc: "Never miss a tax deadline with smart mobile notifications.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-5 text-white"
            >
              <h4 className="font-semibold text-lg">{item.title}</h4>
              <p className="text-sm text-white/80 mt-2">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}
