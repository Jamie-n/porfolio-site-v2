"use client";

import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

type DevModeContextType = {
  devMode: boolean;
  setDevMode: Dispatch<SetStateAction<boolean>>;
};

const DevModeContext = createContext<DevModeContextType | undefined>(undefined);

export function DevModeProvider({ children }: { children: React.ReactNode }) {
  const [devMode, setDevMode] = useState(false);

  return (
    <DevModeContext.Provider value={{ devMode, setDevMode }}>
      {children}
    </DevModeContext.Provider>
  );
}

export function useDevMode() {
  const ctx = useContext(DevModeContext);
  if (!ctx) {
    throw new Error("useDevMode must be used within a DevModeProvider");
  }
  return ctx;
}
