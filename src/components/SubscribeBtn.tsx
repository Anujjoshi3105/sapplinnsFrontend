"use client";

import { useSubscribe } from "@/contexts/SubscribeContext";
import { Button } from "./ui/button";
export default function SubscribeBtn({
  variant,
  className,
  children,
}: {
  variant?: "default" | "outline" | "transparent" | "secondary" | "other";
  className?: string;
  children: React.ReactNode;
}) {
  const { setShowSubscribe } = useSubscribe();
  return (
    <Button
      variant={variant}
      className={className}
      onClick={() => setShowSubscribe(true)}>
      {children}
    </Button>
  );
}
