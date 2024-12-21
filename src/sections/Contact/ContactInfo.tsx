"use client";

import { motion } from "framer-motion";
import { ContactCard } from "@/components/Cards";
import { contactDetails } from "@/data/data";

export default function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="md:w-1/2 my-auto flex flex-col justify-between h-full">
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 w-full">
        {contactDetails.map((contact) => (
          <ContactCard key={contact.title} contact={contact} />
        ))}
      </div>
    </motion.div>
  );
}
