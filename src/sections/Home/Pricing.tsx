"use client";

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlanProps, plans, PopularPlan } from "@/data/data";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
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

export const Pricing = () => {
  return (
    <section className="container px-6 sm:px-12 py-24 sm:py-32">
      <Heading
        title="Agricultural Plans"
        subtitle="PERFORMANCE OPTIMISATION PLANS"
      />

      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.2 }}>
        {plans.map(
          ({
            title,
            popular,
            price,
            description,
            buttonText,
            benefitList,
          }: PlanProps) => (
            <motion.div key={title} variants={cardVariants}>
              <Card
                className={
                  popular === PopularPlan.YES
                    ? "drop-shadow-xl border-[1.5px] border-primary lg:scale-[1.1]"
                    : ""
                }>
                <CardHeader>
                  <CardTitle className="pb-2">{title}</CardTitle>

                  <CardDescription className="pb-4">
                    {description}
                  </CardDescription>

                  <div>
                    <span className="text-3xl font-bold">${price}</span>
                    <span className="text-muted-foreground"> /month</span>
                  </div>
                </CardHeader>

                <CardContent className="flex">
                  <div className="space-y-4">
                    {benefitList.map((benefit) => (
                      <span key={benefit} className="flex">
                        <Check className="text-primary mr-2" />
                        <h3>{benefit}</h3>
                      </span>
                    ))}
                  </div>
                </CardContent>

                <CardFooter>
                  <Button
                    variant={
                      popular === PopularPlan.YES ? "default" : "secondary"
                    }
                    className="w-full"
                    asChild>
                    <Link href="/contact">{buttonText}</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )
        )}
      </motion.div>
    </section>
  );
};
