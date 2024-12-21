"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const Breadcrumb = () => {
  const pathname = usePathname();

  const pathSegments = pathname.split("/").filter((segment) => segment !== "");

  const breadcrumbPaths = pathSegments.map((segment, index) => {
    const url = "/" + pathSegments.slice(0, index + 1).join("/");
    return {
      label: decodeURIComponent(
        segment.charAt(0).toUpperCase() + segment.slice(1)
      ),
      url,
    };
  });

  const pageHeading =
    breadcrumbPaths.length > 0
      ? breadcrumbPaths[breadcrumbPaths.length - 1].label
      : "Home";

  return (
    <nav className="font-semibold text-background z-[1000] select-none">
      <h2 className="sr-only">Breadcrumb</h2>
      {/* Page Heading */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
        {pageHeading}
      </h1>

      {/* Breadcrumb List */}
      <ol className="flex space-x-2">
        <li>
          <Link href="/" className="link">
            Home
          </Link>
          {pathSegments.length > 0 && <span className="mx-2"> / </span>}
        </li>
        {breadcrumbPaths.map((path, index) => (
          <li key={index} className="flex items-center">
            {index !== 0 && <span className="mx-2"> / </span>}
            {index === breadcrumbPaths.length - 1 ? (
              <span className="">{path.label}</span>
            ) : (
              <Link href={path.url} className="link">
                {path.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
