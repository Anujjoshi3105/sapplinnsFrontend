"use client";

import { ServiceCard } from "@/components/Cards";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { servicesInfo } from "@/data/data";
import { PhoneCallIcon } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
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

export default function Services() {
  return (
    <section className="px-4 sm:px-8 lg:px-12 py-24 space-y-8">
      {/* Heading Section */}
      <Heading title="Agricultural Services" subtitle="What We Offer" />

      {/* Services Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 "
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.2 }}>
        {servicesInfo.map((service, index) => (
          <motion.div key={index} variants={cardVariants}>
            {ServiceCard({ service })}
          </motion.div>
        ))}
      </motion.div>

      {/* Consultation Section */}
      <motion.div
        className="text-center mt-12 space-y-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}>
        <p className="mx-auto max-w-xl text-muted-foreground my-4">
          Customized solutions for modern farming. Contact us for personalized
          pricing based on your farm&apos;s size and specific needs.
        </p>
        <Link href="/contact">
          <Button variant="other">
            <PhoneCallIcon /> Schedule a Consultation
          </Button>
        </Link>
      </motion.div>
    </section>
  );
}
