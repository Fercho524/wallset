import { usePalette } from "@renderer/hooks/usePalette";
import { createContext, useContext } from "react";


const PaletteContext = createContext(null);

export function PaletteProvider({ children }) {
  const palette = usePalette();
  return (
    <PaletteContext.Provider value={palette}>
      {children}
    </PaletteContext.Provider>
  );
}

export function usePaletteContext() {
  const ctx = useContext(PaletteContext);
  if (!ctx) throw new Error("PaletteContext must be used inside PaletteProvider");
  return ctx;
}
