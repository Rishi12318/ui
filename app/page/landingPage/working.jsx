"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const steps = [
  {
    step: "01",
    title: "Enter PAN & Salary",
    desc: "Securely add your PAN details and salary structure to get started.",
    image:
      "https://www.shutterstock.com/image-photo/efiling-taxpayer-using-laptop-file-260nw-2483807269.jpg",
    direction: "left",
  },
  {
    step: "02",
    title: "Get Smart Insights",
    desc: "Instant insights into deductions, exemptions, and tax liabilities.",
    image:
      "https://www.shutterstock.com/image-photo/payment-income-tax-annual-calculation-260nw-2648866665.jpg",
    direction: "right",
  },
  {
    step: "03",
    title: "Optimize & File",
    desc: "Optimize your taxes and file your ITR seamlessly with compliance checks.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_DX9sdBJH4Se8oFSXG_A9LtClVpcn6iH77g&s",
    direction: "left",
  },
  {
    step: "04",
    title: "Get Your Refund",
    desc: "Track refunds and receive timely updates directly on your dashboard.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9V1n9oBDzCzEoZeK74tcUix1D9ZQA2qpTvQ&s",
    direction: "right",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-[#5f7f99] py-28">
      <div className="max-w-7xl mx-auto px-6">

        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-white/70 uppercase tracking-wider text-sm">
            How It Works
          </p>
          <h2 className="text-4xl font-bold text-white mt-3">
            Simple &amp; Transparent Tax Process
          </h2>
          <p className="text-white/80 mt-4">
            File your taxes in just a few easy steps — no confusion, no stress.
          </p>
        </div>

        {/* STEPS */}
        <div className="space-y-28">
          {steps.map((item, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                x: item.direction === "left" ? -80 : 80,
              }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              viewport={{ once: true }}
              className={`grid lg:grid-cols-2 gap-14 items-center ${
                index % 2 !== 0 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              {/* TEXT CARD */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-10 text-white shadow-xl">
                <span className="text-sm font-semibold text-yellow-400">
                  STEP {item.step}
                </span>
                <h3 className="text-2xl font-bold mt-4">{item.title}</h3>
                <p className="text-white/80 mt-4">{item.desc}</p>
              </div>

              {/* IMAGE */}
              <motion.div
                initial={{ scale: 0.95 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="rounded-2xl overflow-hidden shadow-2xl"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={520}
                  height={360}
                  className="object-cover w-full"
                  unoptimized
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
