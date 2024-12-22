"use client";

import Image from "next/image";
import { useCallback } from "react";
import { FaArrowDownLong } from "react-icons/fa6";
import { ArrowRightIcon, PhoneCall, PhoneCallIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RoundBtn } from "@/components/animate/roundBtn";
import { contactInfo } from "@/data/data";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSubscribe } from "@/contexts/SubscribeContext";

export default function Hero() {
  const { setShowSubscribe } = useSubscribe();
  const scrollDown = useCallback(() => {
    window.scrollTo({
      top: window.innerHeight * 2.5,
      behavior: "smooth",
    });
  }, []);

  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.3, ease: "easeOut" },
    },
  };

  const contactLinkVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };
  return (
    <section className="relative flex flex-col justify-between min-h-screen">
      <div className="relative flex-grow h-[94vh]" aria-label="Hero section">
        <Image
          src="/hero.jpg"
          alt="Hero background"
          fill
          objectFit="cover"
          quality={100}
          priority
          className="select-none"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative flex flex-col items-center justify-center h-full text-center py-12">
          {/* Hero Heading */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={headingVariants}
            className="space-y-4 py-24 text-background max-w-5xl px-4 mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold md:text-balance mb-4">
              Empowering Farmers with Precision Technology
            </h1>
            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl text-balance mb-6">
              Grow smarter, greener, and more resilient with Sapplinns
            </h2>
          </motion.div>

          {/* Buttons Section */}
          <motion.div
            className="flex flex-wrap gap-4 md:gap-6 justify-center items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={buttonVariants}>
            <Button
              effect="expandIcon"
              icon={ArrowRightIcon}
              iconPlacement="right"
              aria-label="Learn more about our services"
              asChild>
              <Link href="/services">Learn More</Link>
            </Button>
            <Button
              effect="expandIcon"
              icon={PhoneCall}
              iconPlacement="right"
              variant="outline"
              aria-label="Contact us for more information"
              onClick={() => setShowSubscribe(true)}>
              Contact Us
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="relative w-full z-10 bg-other rounded-b-[36px] font-bold text-sm">
        <div className="max-w-full p-2 md:p-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 place-items-center">
            {/* Contact Information */}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={contactInfo[0].href}
              className="flex items-center space-x-2 p-4 hover:scale-105 ease-in-out duration-200 transition-all text-sm sm:text-base md:text-left text-center"
              aria-label="Contact us for more information">
              <PhoneCallIcon
                className="w-5 h-5 sm:w-6 sm:h-6"
                aria-hidden="true"
              />
              <div>
                <p>{contactInfo[0].label}</p>
                <p className="underline underline-offset-4 font-semibold">
                  {contactInfo[0].value}
                </p>
              </div>
            </a>

            {/* Scroll Down Button */}
            <motion.div
              className="md:flex hidden justify-center"
              aria-label="Scroll down"
              onClick={scrollDown}
              initial="hidden"
              whileInView="visible"
              variants={contactLinkVariants}>
              <RoundBtn text="• FARMING • AGRICULTURE • SUSTAINABILITY ">
                <FaArrowDownLong />
              </RoundBtn>
            </motion.div>

            {/* Additional Contact Links */}
            <nav className="flex flex-wrap justify-center md:justify-end gap-6">
              {contactInfo.slice(1).map((info) => (
                <motion.div
                  key={info.href}
                  initial="hidden"
                  whileInView="visible"
                  variants={contactLinkVariants}>
                  <ContactLink key={info.href} {...info} />
                </motion.div>
              ))}
            </nav>
          </div>
        </div>
      </footer>
    </section>
  );
}

function ContactLink({
  href,
  icon: Icon,
  label,
  value,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      key={href}
      href={href}
      className="flex items-center space-x-2 p-2 hover:scale-110 ease-in-out duration-200 transition-all">
      <Icon className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
      <div>
        <p className="text-sm">{label}</p>
        <p className="text-xs font-semibold underline underline-offset-4">
          {value}
        </p>
      </div>
    </a>
  );
}
