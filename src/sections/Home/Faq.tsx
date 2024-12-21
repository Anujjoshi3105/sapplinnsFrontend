"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQItems } from "@/data/data";
import Heading from "@/components/Heading";

type FAQItem = {
  question: string;
  answer: string;
};

const animationVariants = {
  hidden: (direction: "left" | "right") => ({
    opacity: 0,
    x: direction === "left" ? -100 : 100,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 150,
    },
  },
};

export default function FAQ({ faqItems = FAQItems }: { faqItems?: FAQItem[] }) {
  return (
    <section className="max-w-3xl overflow-clip mx-auto py-24 px-6 space-y-6 md:space-y-12">
      <Heading
        title="Frequently Asked Questions"
        subtitle="Explore Commonly Asked Questions"
      />
      <Accordion type="single" collapsible className="w-full">
        {faqItems.map((item, index) => {
          const direction = index % 2 === 0 ? "left" : "right";
          return (
            <AccordionItem key={index} value={`item-${index}`}>
              <motion.div
                custom={direction}
                initial="hidden"
                whileInView="visible"
                variants={animationVariants}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </motion.div>
            </AccordionItem>
          );
        })}
      </Accordion>
    </section>
  );
}
