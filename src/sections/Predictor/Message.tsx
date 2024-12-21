"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function Subscribe() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message: "Subscribe to our service",
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        toast({
          title: "Subscription Successful",
          description: "Thank you for subscribing to our service!",
        });
      } else {
        throw new Error("Failed to subscribe");
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      toast({
        title: "Subscription Failed",
        description:
          "There was an error processing your subscription. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="absolute z-[1000] h-full w-full backdrop-blur-[2px] flex items-center justify-center">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold text-center mb-4">Thank You!</h2>
            <p className="text-center">
              You have successfully subscribed to our service.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="absolute z-[1000] h-full w-full backdrop-blur-[2px] flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Subscribe to Our Service
          </CardTitle>
          <CardDescription>
            Enter your details to receive updates and access our services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-2">
            <div className="space-y-0.5">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-0.5">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
            onClick={handleSubmit}>
            {isLoading ? "Subscribing..." : "Subscribe"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
