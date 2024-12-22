"use client";

import axios from "axios";
import { FormEvent, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/send-email", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.data) {
        throw new Error("Failed to send email");
      }

      toast("Message Sent", {
        description: "Thank you for your message. We'll get back to you soon!",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch {
      toast("Error", {
        description: `There was an error sending your message. Please try again. If the problem persists, please contact us directly at ${process.env.NEXT_PUBLIC_ADMIN_MAIL}.`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="md:w-[500px] h-fit bg-muted rounded-xl p-4 py-10 sm:m-0">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 mx-auto max-w-[450px]">
        <Input
          disabled={loading}
          id="name"
          name="name"
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
          className="w-full"
          required
        />
        <Input
          disabled={loading}
          id="email"
          name="email"
          type="email"
          placeholder="Your email"
          value={formData.email}
          onChange={handleChange}
          className="w-full"
          required
        />
        <Textarea
          disabled={loading}
          id="message"
          name="message"
          placeholder="Your message"
          value={formData.message}
          onChange={handleChange}
          className="w-full min-h-[150px]"
          required
        />
        <Button type="submit" className="text-muted" disabled={loading}>
          {loading ? (
            <>
              <Loader className="mr-2 animate-spin" />
              Sending
            </>
          ) : (
            <>
              <FaPaperPlane className="mr-2" /> Contact Me
            </>
          )}
        </Button>
      </form>
    </motion.div>
  );
}
