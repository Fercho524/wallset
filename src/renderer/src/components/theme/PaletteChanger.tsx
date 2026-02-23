import React, { useState, useRef, useEffect } from "react";

import { usePaletteContext } from "@renderer/theme/PaletteProvider";
import { useWalPalette } from "@renderer/hooks/useWalPalette";
import { walToPalette } from "@renderer/theme/WalToPalette";

const PaletteSelector: React.FC = () => {
    const {
        paletteName,
        changePalette,
        palettes,
        setDynamicPalette,
    } = usePaletteContext();

    const walPalette = useWalPalette();

    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // 🔥 integrar pywal
   


    useEffect(() => {
        if (!walPalette) return;

        const palette = walToPalette(walPalette);
        console.log("[palette] applying pywal");

        if (paletteName === "pywal") {
            setDynamicPalette("pywal", palette);
        }

    }, [walPalette, setDynamicPalette, changePalette]);

    // cerrar al hacer click afuera
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={ref} className="relative w-full">
            {/* BOTÓN PRINCIPAL */}
            <button
                onClick={() => setOpen((o) => !o)}
                className="
          w-full px-4 py-2 rounded-lg border
          flex items-center justify-between
          bg-[var(--surface)] 
          border-[var(--outline)]
          hover:opacity-90 transition
        "
            >
                <span className="capitalize">{paletteName}</span>
            </button>

            {/* DROPDOWN */}
            {open && (
                <div
                    className="
            absolute left-1/2 -top-64 -translate-x-1/2
            mt-2
            w-56
            p-3 rounded-xl shadow-lg
            bg-[var(--surface)] border border-[var(--outline)]
            z-30 flex flex-col gap-3
            max-h-60 overflow-y-auto custom-scroll
          "
                >
                    {Object.entries(palettes).map(([key, pal]) => (
                        <button
                            key={key}
                            onClick={() => {
                                changePalette(key);
                                setOpen(false);
                            }}
                            className="
                w-full flex flex-col gap-2 p-2 rounded-lg
                hover:bg-[var(--surface-variant)] transition
              "
                        >
                            <span className="font-medium capitalize">{key}</span>

                            <div className="grid grid-cols-5 gap-1">
                                <div className="h-4 rounded" style={{ background: pal.light.primary }} />
                                <div className="h-4 rounded" style={{ background: pal.light.secondary }} />
                                <div className="h-4 rounded" style={{ background: pal.light.surface }} />
                                <div className="h-4 rounded" style={{ background: pal.light.background }} />
                                <div className="h-4 rounded" style={{ background: pal.light.text }} />
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PaletteSelector;
