"use client";

import Image from "next/image";
import { ArrowRightIcon, Check } from "lucide-react";
import Heading from "@/components/Heading";
import { about } from "@/data/data";
import { motion } from "framer-motion";
import SubscribeBtn from "@/components/SubscribeBtn";
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function About() {
  return (
    <section className="mx-auto px-4 py-8 md:p-8 lg:p-16">
      <div className="grid gap-8 md:gap-12 lg:grid-cols-2">
        {/* Image Grid */}
        <motion.div
          className="relative grid gap-4 grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}>
          <motion.div
            variants={itemVariants}
            className="col-span-2 overflow-hidden rounded-2xl">
            <Image
              src="/about1.jpg"
              alt="Organic farming field"
              width={600}
              height={300}
              className="w-full h-[300px] object-cover"
            />
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="overflow-hidden rounded-2xl">
            <Image
              src="/about2.jpg"
              alt="Sustainable farming practices"
              width={250}
              height={250}
              className="w-full h-[250px] object-cover"
            />
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="overflow-hidden rounded-2xl">
            <Image
              src="/about3.jpg"
              alt="Fresh organic produce"
              width={250}
              height={250}
              className="w-full h-[250px] object-cover"
            />
          </motion.div>
        </motion.div>

        {/* Content Section */}
        <motion.div
          className="flex flex-col justify-center space-y-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}>
          <motion.div variants={itemVariants}>
            <Heading
              title="Nurturing Nature, Growing Together"
              subtitle="About Our Mission"
            />
          </motion.div>
          <motion.p
            variants={itemVariants}
            className="text-muted-foreground text-lg">
            At our farm, we believe in cultivating a better future with
            sustainable, organic, and innovative farming practices that benefit
            the planet and its people.
          </motion.p>

          <motion.ul variants={containerVariants} className="space-y-4">
            {about.map((feature) => (
              <motion.li
                key={feature.title}
                variants={itemVariants}
                className="flex items-start gap-3">
                <span className="rounded-full bg-emerald-100 p-1">
                  <Check className="h-5 w-5 text-emerald-600" />
                </span>
                <div>
                  <h4 className="text-lg font-semibold">{feature.title}</h4>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div variants={itemVariants}>
            <SubscribeBtn variant="other" className="w-fit mt-4">
              Try Now
              <ArrowRightIcon />
            </SubscribeBtn>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
