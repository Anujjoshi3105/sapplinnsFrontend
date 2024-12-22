"use client";

import Heading from "@/components/Heading";
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
import SubscribeBtn from "@/components/SubscribeBtn";

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
    <section className="container mx-auto px-6 sm:px-12 md:px-16 py-24 sm:py-32 space-y-8">
      <Heading title="Agricultural Plans" subtitle="Choose Your Plan" />

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
                  <CardTitle className="text-xl">{title}</CardTitle>
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
                  <SubscribeBtn
                    className="w-full"
                    variant={
                      popular === PopularPlan.YES ? "default" : "secondary"
                    }>
                    {buttonText}
                  </SubscribeBtn>
                </CardFooter>
              </Card>
            </motion.div>
          )
        )}
      </motion.div>
    </section>
  );
};
