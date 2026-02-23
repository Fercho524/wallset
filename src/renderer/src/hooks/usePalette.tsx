import { useLayoutEffect, useState, useCallback, useMemo } from "react";
import {
  PaletteVariant,
  PaletteName,
  palettes as staticPalettes,
  applyPaletteVars,
} from "../theme/colors";

import type { PaletteDefinition } from "../theme/colors";

export function usePalette() {
  const [paletteName, setPaletteName] = useState<PaletteName>(() => {
    return (localStorage.getItem("paletteName") as PaletteName) || "default";
  });

  const [variant, setVariant] = useState<PaletteVariant>(() => {
    return (
      (localStorage.getItem("paletteVariant") as PaletteVariant) || "light"
    );
  });

  // 🔥 paletas dinámicas
  const [dynamicPalettes, setDynamicPalettes] = useState<
    Record<string, PaletteDefinition>
  >({});

  // 🔗 paletas finales
  const palettes = useMemo(
    () => ({
      ...staticPalettes,
      ...dynamicPalettes,
    }),
    [dynamicPalettes]
  );

  const paletteSet = palettes[paletteName];
  const currentPalette =
    paletteSet?.[variant] ?? staticPalettes.default.light;

  // Aplicar paleta (sin FOUC)
  useLayoutEffect(() => {
    applyPaletteVars(currentPalette);
  }, [currentPalette]);

  // Persistencia
  useLayoutEffect(() => {
    localStorage.setItem("paletteName", paletteName);
    localStorage.setItem("paletteVariant", variant);
  }, [paletteName, variant]);

  const changePalette = useCallback((name: PaletteName) => {
    setPaletteName(name);
  }, []);

  const toggleVariant = useCallback(() => {
    setVariant((v) => (v === "light" ? "dark" : "light"));
  }, []);

  // ✅ registrar paleta dinámica (CORRECTO)
  const setDynamicPalette = useCallback(
    (name: string, palette: PaletteDefinition) => {
      setDynamicPalettes((prev) => ({
        ...prev,
        [name]: palette,
      }));
    },
    []
  );

  return {
    paletteName,
    variant,
    currentPalette,
    palettes,

    changePalette,
    toggleVariant,
    setDynamicPalette,
  };
}
