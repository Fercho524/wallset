import { WalColors } from "@renderer/interfaces/WalColors";

import { useEffect, useState } from "react";

export function useWalPalette() {
    const [palette, setPalette] = useState<any | null>(null);

    useEffect(() => {
        window.api.getWalColors().then((data) => {
            console.log("[wal] initial load");
            setPalette(data);
        });

        const handler = (data: any) => {
            console.log("[wal] updated");
            setPalette(data);
        };

        window.api.onWalColorsUpdated(handler);

        return () => {
            window.api.offWalColorsUpdated(handler);
        };
    }, []);


    return palette;
}
