"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumb";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <>
      {!isHomePage && (
        <div
          className="relative h-56 lg:h-64 mx-auto"
          aria-label="Hero section">
          <Image
            src="/header.jpg"
            alt="Hero background"
            fill
            objectFit="cover"
            quality={100}
            priority
            className="select-none"
          />
          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex w-[90vw] md:w-[80vw]">
            <Breadcrumb />
          </div>
        </div>
      )}
      {children}
    </>
  );
}
