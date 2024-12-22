import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default function notFound() {
  return (
    <div className="w-full h-screen flex flex-col lg:flex-row items-center justify-center space-y-16 lg:space-y-0 space-x-8 2xl:space-x-0">
      <div className="w-full flex flex-col items-center justify-center lg:px-2 xl:px-0 text-center">
        <div className="my-12">
          <p className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-wider text-primary">
            404
          </p>
          <p className="text-4xl md:text-5xl lg:text-6xl tracking-wider mt-2">
            Page Not Found
          </p>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-500 my-4">
            Sorry, the page you are looking for could not be found.
          </p>
        </div>
        <Button asChild>
          <Link href="/" title="Return Home">
            <ArrowLeftIcon />
            Return Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
