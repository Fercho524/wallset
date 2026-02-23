import React, { createContext, useContext, useLayoutEffect, useState } from 'react';


import type { PaletteDefinition } from './colors';

interface PaletteContextType {
  paletteName: string;
  variant: "light" | "dark";
  currentPalette: PaletteDefinition;

  palettes: Record<string, PaletteDefinition>;

  changePalette: (name: string) => void;
  toggleVariant: () => void;
  setDynamicPalette: (name: string, palette: PaletteDefinition) => void;
}

const PaletteContext = createContext<PaletteContextType | null>(null);

export function usePaletteContext() {
  const ctx = useContext(PaletteContext);
  if (!ctx) throw new Error("PaletteContext must be used inside PaletteProvider");
  return ctx;
}

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => { },
});


export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const stored = localStorage.getItem('theme') as Theme | null;
      const prefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      return (stored ?? (prefersDark ? 'dark' : 'light')) as Theme;
    } catch {
      return 'light';
    }
  });

  // APLICAR LA CLASE EN useLayoutEffect para que ocurra antes del paint
  useLayoutEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {
      console.log("Error al cambiar el tema")
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeContext;