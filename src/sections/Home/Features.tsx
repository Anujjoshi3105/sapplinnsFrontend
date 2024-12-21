"use client";

import { FeatureCard } from "@/components/Cards";
import Heading from "@/components/Heading";
import { features } from "@/data/data";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function Features() {
  return (
    <div className="container mx-auto p-6 md:p-16">
      {/* Heading Section */}
      <Heading title="Products From Scratch" subtitle="FEATURES WE OFFER" />

      {/* Features Grid */}
      <motion.div
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}>
        {features.map((feature, index) => (
          <motion.div key={index} variants={cardVariants}>
            <FeatureCard feature={feature} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
