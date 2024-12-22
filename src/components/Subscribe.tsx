"use client";

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
import { X } from "lucide-react";
import { useSubscribe } from "@/contexts/SubscribeContext";
import { useSubscriptionForm } from "@/hooks/useSubscribe";

export default function Subscribe() {
  const { showSubscribe, setShowSubscribe } = useSubscribe();
  const {
    name,
    setName,
    email,
    setEmail,
    isLoading,
    isSuccess,
    handleSubmit,
    resetForm,
  } = useSubscriptionForm();

  const handleClose = () => {
    setShowSubscribe(false);
    resetForm();
  };

  if (!showSubscribe) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-[4px] flex items-center justify-center"
      onClick={handleClose}>
      <Card
        className="w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()}>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2"
          onClick={handleClose}>
          <X className="h-4 w-4" />
        </Button>
        {isSuccess ? (
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold text-center mb-4">Thank You!</h2>
            <p className="text-center">
              You have successfully subscribed to our service.
            </p>
            <Button onClick={handleClose} className="mt-4 w-full">
              Close
            </Button>
          </CardContent>
        ) : (
          <>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Subscribe</CardTitle>
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
          </>
        )}
      </Card>
    </div>
  );
}
