"use client";

import { SproutIcon } from "lucide-react";
import { motion } from "framer-motion";
export default function Heading({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-8 space-y-0.5">
      <div className="flex items-center justify-center gap-2 text-primary">
        <SproutIcon className="h-5 w-5" />
        <span className="text-lg font-medium tracking-wide">{subtitle}</span>
      </div>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
        {title}
      </h1>
    </motion.div>
  );
}
