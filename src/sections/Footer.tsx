"use client";

import { AiOutlineSend } from "react-icons/ai";
import Link from "next/link";
import { bottomLinks, footerLinks } from "@/data/data";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import axios from "axios";

export default function Footer() {
  const [mail, setMail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/send-email", {
        name: mail,
        email: mail,
        message: `Newsletter Subscription for ${mail}`,
      });

      if (!response.data) {
        throw new Error("Failed to send email");
      }

      toast("Message Sent", {
        description: "Thank you for your message. We'll get back to you soon!",
      });
      setMail("");
    } catch {
      toast("Error", {
        description: `There was an error sending your message. Please try again. If the problem persists, please contact us directly at ${process.env.NEXT_PUBLIC_ADMIN_MAIL}.`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="select-none bg-primary">
      <div className="p-12 text-background text-base ">
        <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4 text-center md:text-left">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link
              href="/"
              className="text-3xl text-other hover:underline underline-offset-4 font-[750]">
              Sapplinns
            </Link>
            <p className="md:max-w-xs max-w-sm mx-auto md:mx-0">
              A digital platform designed to evaluate cigarette addiction levels
              and the influence of neuromarketing strategies, empowering users
              with personalized insights and actionable guidance.
            </p>
          </div>

          {/* Dynamic Sections */}
          {footerLinks.map(({ title, links }) => (
            <div key={title}>
              <h5 className="text-lg font-bold uppercase mb-3 text-other">
                {title}
              </h5>
              <ul className="space-y-1">
                {links.map(({ title, href }) => (
                  <li key={title}>
                    <Link
                      href={href}
                      className="underline-offset-2 hover:underline">
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter Section */}
          <div>
            <h5 className="text-lg font-bold uppercase mb-3 text-other">
              Newsletter
            </h5>
            <p className="max-w-xs mx-auto md:mx-0">
              Stay updated on the latest news and events. Subscribe now!
            </p>
            <form
              onSubmit={handleSubmit}
              className="mt-4 flex items-stretch justify-center">
              <input
                type="email"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                placeholder="Your email address"
                disabled={loading}
                className="flex-1 p-3 text-foreground max-w-sm border-2"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="px-4 bg-black flex items-center justify-center active:scale-95 group">
                {loading ? (
                  <Loader className="animate-spin" />
                ) : (
                  <AiOutlineSend />
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-other py-2 rounded-t-2xl lg:rounded-t-3xl text-center flex flex-col-reverse gap-2 md:flex-row justify-around items-center">
        <p>
          All rights are reserved by&nbsp;
          <Link href="/" className="hover:underline">
            Sapplinns
          </Link>
          &nbsp;&copy;&nbsp;{new Date().getFullYear()}
        </p>
        <ul className="grid grid-cols-3 gap-2">
          {bottomLinks.map(({ title, href }) => (
            <li key={title}>
              <Link href={href} className="hover:underline">
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
