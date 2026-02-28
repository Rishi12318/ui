"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const images = {
  main: "https://assets-news.housing.com/news/wp-content/uploads/2022/06/02085815/Advance-tax-payment-Your-guide-to-advance-tax-and-advance-tax-payment-online.jpg",
  small1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_DX9sdBJH4Se8oFSXG_A9LtClVpcn6iH77g&s",
  small2: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9V1n9oBDzCzEoZeK74tcUix1D9ZQA2qpTvQ&s",
};

export default function KeyFeatures() {
  return (
    <section className="relative bg-[#5f7f99] py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 px-6 items-center">

        {/* LEFT CONTENT */}
        <div>
          <h2 className="text-4xl font-bold text-white leading-tight">
            Key Features that make <br />
            <span className="text-yellow-400">Tax Planning Simple</span>
          </h2>

          <p className="mt-4 text-white/80 max-w-lg">
            Everything you need to optimize salary, maximize refunds, and stay compliant —
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

        {/* RIGHT IMAGE STACK */}
        <div className="relative flex justify-center">

          {/* MAIN IMAGE */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 rounded-xl overflow-hidden shadow-2xl"
          >
            <Image
              src={images.main}
              alt="Tax Planning"
              width={520}
              height={420}
              className="object-cover"
              priority
              unoptimized
            />
          </motion.div>

          {/* SMALL IMAGE 1 */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-10 top-12 z-20 rounded-xl overflow-hidden shadow-xl"
          >
            <Image
              src={images.small1}
              alt="Tax calculation"
              width={200}
              height={140}
              className="object-cover"
              unoptimized
            />
          </motion.div>

          {/* SMALL IMAGE 2 */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-[-40px] bottom-12 z-20 rounded-xl overflow-hidden shadow-xl"
          >
            <Image
              src={images.small2}
              alt="Financial planning"
              width={180}
              height={130}
              className="object-cover"
              unoptimized
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
