"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const images = [
  "https://assets-news.housing.com/news/wp-content/uploads/2022/06/02085815/Advance-tax-payment-Your-guide-to-advance-tax-and-advance-tax-payment-online.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_DX9sdBJH4Se8oFSXG_A9LtClVpcn6iH77g&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9V1n9oBDzCzEoZeK74tcUix1D9ZQA2qpTvQ&s",
];

export default function KeyFeatures() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-[#5f7f99] py-24 overflow-visible">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-0 px-6 items-center">

        {/* LEFT CONTENT */}
        <div className="relative z-10">
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

        {/* RIGHT — single image box, slightly overlapping left */}
        <div className="relative flex justify-center lg:-ml-16 z-20">
          <div
            className="relative rounded-2xl overflow-hidden shadow-2xl"
            style={{ width: 520, height: 400 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
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

            {/* Dot indicators */}
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-10">
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
        </div>

      </div>
    </section>
  );
}
