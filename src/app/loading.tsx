"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { quotes } from "@/data/data";
import Image from "next/image";

export default function Loading() {
  const [progress, setProgress] = useState(0);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [loadingComplete, setLoadingComplete] = useState(false);

  const updateProgress = useCallback(() => {
    setProgress((prevProgress) => {
      if (prevProgress >= 100) {
        setLoadingComplete(true);
        return 100;
      }
      return prevProgress + 1;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(updateProgress, 30);
    return () => clearInterval(interval);
  }, [updateProgress]);

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 7000);
    return () => clearInterval(quoteInterval);
  }, []);

  if (loadingComplete) return null;

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-[1000] flex flex-col justify-center items-center bg-other">
      <motion.div
        className="absolute top-0 left-0 h-2 bg-destructive"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ type: "spring", stiffness: 50 }}
      />
      <div className="space-y-2 my-16 text-center">
        <div className="flex items-center justify-center text-4xl sm:text-5xl font-extrabold">
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}>
            <Image src="/logo.png" alt="logo" width={128} height={128} />
          </motion.span>
        </div>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-2xl sm:text-4xl font-extrabold text-destructive">
          Sapplinns
        </motion.div>
      </div>
      <div className="max-w-2xl px-4 space-y-1 text-center text-balance text-primary">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentQuoteIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
            className="text-lg font-semibold leading-snug">
            {quotes[currentQuoteIndex].quote}
          </motion.p>
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.p
            key={currentQuoteIndex}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{
              duration: 0.5,
              delay: 0.1,
              ease: "easeInOut",
            }}
            className="text-right italic">
            - {quotes[currentQuoteIndex].author}
          </motion.p>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
