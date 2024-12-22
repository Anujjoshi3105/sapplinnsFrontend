"use client";

import { useState } from "react";
import { toast } from "sonner";

export const useSubscriptionForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
        toast("Subscription Successful", {
          description: "Thank you for subscribing to our service!",
        });
      } else {
        throw new Error("Failed to subscribe");
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      toast("Subscription Failed", {
        description:
          "There was an error processing your subscription. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setIsSuccess(false);
  };

  return {
    name,
    setName,
    email,
    setEmail,
    isLoading,
    isSuccess,
    handleSubmit,
    resetForm,
  };
};
