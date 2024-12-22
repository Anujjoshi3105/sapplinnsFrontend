"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Breadcrumb({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const { breadcrumbPaths, pageHeading } = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    const paths = segments.map((segment, index) => ({
      label: segment.charAt(0).toUpperCase() + segment.slice(1),
      url: `/${segments.slice(0, index + 1).join("/")}`,
    }));
    return {
      breadcrumbPaths: paths,
      pageHeading: paths.length > 0 ? paths[paths.length - 1].label : "Home",
    };
  }, [pathname]);

  if (isHomePage) {
    return <>{children}</>;
  }

  return (
    <>
      <section className="relative h-56 lg:h-64" aria-label="Page header">
        <Image
          src="/header.jpg"
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-x-0 bottom-4 mx-auto w-[90vw] md:w-[80vw]">
          <nav aria-label="Breadcrumb" className="text-background">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
              {pageHeading}
            </h1>
            <ol className="flex flex-wrap items-center gap-x-2">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              {breadcrumbPaths.map((path, index) => (
                <li key={path.url} className="flex items-center">
                  <span className="mx-2">/</span>
                  {index === breadcrumbPaths.length - 1 ? (
                    <span aria-current="page">{path.label}</span>
                  ) : (
                    <Link href={path.url} className="hover:underline">
                      {path.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>
      {children}
    </>
  );
}
