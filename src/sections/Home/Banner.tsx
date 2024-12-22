import SubscribeBtn from "@/components/SubscribeBtn";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export default function Banner() {
  return (
    <section className="bg-center bg-cover bg-no-repeat bg-[url('/banner.jpg')] bg-fixed flex flex-col lg:flex-row items-center justify-around gap-6 md:gap-12 mx-auto bg-black/50 bg-blend-multiply px-4 p-12 md:py-24">
      <p className="font-bold text-3xl lg:text-4xl lg:border-l-4 lg:pl-8 md:max-w-2xl lg:leading-[1.4] text-background text-center lg:text-left">
        Supporting farmers through intelligent agriculture
      </p>
      <div className="flex flex-row gap-4 mt-4">
        <Button
          effect="expandIcon"
          icon={ArrowRightIcon}
          iconPlacement="right"
          variant="outline"
          asChild>
          <Link href="/services">Learn More</Link>
        </Button>
        <SubscribeBtn variant="transparent">Contact Us</SubscribeBtn>
      </div>
    </section>
  );
}
