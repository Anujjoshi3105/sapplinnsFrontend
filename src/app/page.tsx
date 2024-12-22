import About from "@/sections/Home/About";
import Banner from "@/sections/Home/Banner";
import FAQ from "@/sections/Home/Faq";
import Hero from "@/sections/Home/Hero";
import Predictor from "@/sections/Predictor/Predictor";
import Features from "@/sections/Home/Features";
import { Pricing } from "@/sections/Home/Pricing";
import Loading from "./loading";

export default function Home() {
  return (
    <main className="space-y-12 md:space-y-24">
      <Loading />
      <Hero />
      <About />
      <Predictor />
      <Features />
      <Banner />
      <Pricing />
      <FAQ />
    </main>
  );
}
