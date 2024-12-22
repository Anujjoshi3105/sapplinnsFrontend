"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface SubscribeContextType {
  showSubscribe: boolean;
  setShowSubscribe: (show: boolean) => void;
}

const SubscribeContext = createContext<SubscribeContextType | undefined>(
  undefined
);

export const SubscribeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [showSubscribe, setShowSubscribe] = useState(false);

  return (
    <SubscribeContext.Provider value={{ showSubscribe, setShowSubscribe }}>
      {children}
    </SubscribeContext.Provider>
  );
};

export const useSubscribe = () => {
  const context = useContext(SubscribeContext);
  if (context === undefined) {
    throw new Error("useSubscribe must be used within a SubscribeProvider");
  }
  return context;
};
