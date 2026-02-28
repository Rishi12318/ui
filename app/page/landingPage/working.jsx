"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const fromLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const fromRight = {
  hidden: { opacity: 0, x: 80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#f5f9fc] py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* GRID */}
        <div className="grid grid-cols-12 gap-0 rounded-[28px] overflow-hidden shadow-xl">

          {/* LEFT TOP BLUE CARD — slides from left */}
          <motion.div
            className="col-span-12 md:col-span-4 bg-[#4a7fa5] text-white p-10 flex flex-col justify-between"
            variants={fromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div>
              <span className="text-sm font-semibold opacity-80">01</span>
              <h3 className="text-2xl font-bold mt-4">Enter PAN &amp; Salary</h3>
              <p className="mt-4 text-white/90">
                Securely enter your PAN and salary details to begin your tax planning journey.
              </p>
            </div>
          </motion.div>

          {/* RIGHT TOP WHITE CONTENT — slides from right */}
          <motion.div
            className="col-span-12 md:col-span-8 bg-white p-14 rounded-bl-[120px]"
            variants={fromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <p className="text-sm text-blue-600 font-medium">How It Works</p>
            <h2 className="text-4xl font-bold mt-4 text-gray-900">
              Our Simple &amp; Transparent <br /> Tax Filing Process
            </h2>
            <p className="text-gray-600 mt-6 max-w-xl">
              We simplify tax planning with a clear, step-by-step process &#8212; from insights to filing and refunds.
            </p>
          </motion.div>

          {/* LEFT IMAGE — slides from left */}
          <motion.div
            className="col-span-12 md:col-span-6 bg-white p-8"
            variants={fromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="rounded-2xl overflow-hidden">
              <Image
                src="https://www.shutterstock.com/image-photo/efiling-taxpayer-using-laptop-file-260nw-2483807269.jpg"
                alt="Tax Filing"
                width={600}
                height={420}
                className="object-cover w-full"
                unoptimized
              />
            </div>
          </motion.div>

          {/* RIGHT BLUE CARD — slides from right */}
          <motion.div
            className="col-span-12 md:col-span-6 bg-[#4a7fa5] text-white p-10 flex flex-col justify-center"
            variants={fromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <span className="text-sm font-semibold opacity-80">02</span>
            <h3 className="text-2xl font-bold mt-4">Analyze &amp; Optimize</h3>
            <p className="mt-4 text-white/90 max-w-md">
              Our system analyzes deductions, exemptions, and slabs to optimize your tax outcome instantly.
            </p>
          </motion.div>

          {/* LEFT BOTTOM IMAGE — slides from left */}
          <motion.div
            className="col-span-12 md:col-span-6 bg-white p-8"
            variants={fromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="rounded-2xl overflow-hidden">
              <Image
                src="https://www.shutterstock.com/image-photo/payment-income-tax-annual-calculation-260nw-2648866665.jpg"
                alt="Tax Calculation"
                width={600}
                height={420}
                className="object-cover w-full"
                unoptimized
              />
            </div>
          </motion.div>

          {/* RIGHT BOTTOM BLUE CARD — slides from right */}
          <motion.div
            className="col-span-12 md:col-span-6 bg-[#4a7fa5] text-white p-10 rounded-tr-[120px] flex flex-col justify-center"
            variants={fromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <span className="text-sm font-semibold opacity-80">03</span>
            <h3 className="text-2xl font-bold mt-4">File &amp; Get Refund</h3>
            <p className="mt-4 text-white/90 max-w-md">
              File your ITR with confidence and track refunds through a centralized dashboard.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
