import ContactForm from "@/sections/Contact/ContactForm";
import ContactInfo from "@/sections/Contact/ContactInfo";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Heading from "@/components/Heading";

export default function Page() {
  return (
    <div className="p-4 sm:px-8 md:px-12 lg:px-28 py-12 md:py-16 md:space-y-16 space-y-12">
      <Heading title="Contact Us" subtitle="Let's talk about everything!" />
      <div className="flex md:flex-row-reverse flex-col gap-4 justify-between">
        <ContactInfo />
        <Suspense
          fallback={
            <Skeleton className="md:w-[600px] w-full h-[400px] flex items-center justify-center">
              <div className="h-20 w-20 animate-spin rounded-full border-4 border-t-primary" />
            </Skeleton>
          }>
          <ContactForm />
        </Suspense>
      </div>
    </div>
  );
}
