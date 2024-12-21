"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FaBars, FaX } from "react-icons/fa6";
import { useState } from "react";
import { navLinks } from "@/data/data";
import { containerVars, menuVars, mobileLinkVars } from "@/data/animate";
import Link from "next/link";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";

export default function Header() {
  const [open, setOpen] = useState(false);
  const toggleMenu = () => setOpen((prevOpen) => !prevOpen);
  const closeMenu = () => setOpen(false);

  return (
    <header className="select-none absolute z-[1000] top-5 left-0 right-0">
      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="origin-top fixed z-[100] top-0 left-0 h-screen w-screen bg-secondary text-center font-semibold uppercase">
            <Button
              onClick={toggleMenu}
              variant="ghost"
              size="icon"
              className="absolute right-10 top-8 rounded-full active:scale-50 transition-transform duration-150 ease-in-out">
              <FaX />
            </Button>
            <motion.div
              variants={containerVars}
              initial="initial"
              animate="open"
              exit="initial"
              className="flex flex-col tracking-wide justify-center items-center h-full gap-8 md:gap-10 text-xl sm:text-2xl lg:text-3xl">
              {navLinks.map((link) => (
                <motion.div key={link.href} variants={mobileLinkVars}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className="link"
                    rel="noopener noreferrer">
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Desktop Menu */}

      <nav className="p-4 border-b-[1px] relative left-1/2 transform -translate-x-1/2 w-[90vw] md:w-[80vw] flex items-center justify-between">
        <Link
          href="/"
          className="hover:scale-110 transition-transform duration-150">
          <Image src="/logo.png" alt="logo" width={60} height={60} priority />
        </Link>
        <div className="uppercase absolute left-1/2 transform -translate-x-1/2 lg:flex hidden gap-12 text-background font-semibold items-baseline">
          {navLinks.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              className="link"
              rel="noopener noreferrer">
              {link.name}
            </Link>
          ))}
        </div>
        <Button
          onClick={toggleMenu}
          variant="ghost"
          size="icon"
          className="lg:hidden rounded-full text-background">
          <FaBars />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="hidden lg:flex hover:scale-[1.2] hover:bg-other">
          <FaSearch />
        </Button>
      </nav>
    </header>
  );
}
