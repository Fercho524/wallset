import { WalColors } from "@renderer/interfaces/WalColors";
import { Imagen } from "../interfaces/Imagen"

declare global {
    interface Window {
        api: {
            loadConfig(): unknown;
            obtenerMiniaturas: (rutaBase: string) => Promise<Imagen[]>;
            changeBackground: (rutaBase: string) => void;
            selectFolder: () => Promise<string | null>;
            getWalColors: () => Promise<WalColors | null>;

            onWalColorsUpdated: (handler: () => void) => void;
            offWalColorsUpdated: (handler: () => void) => void;

        };
    }
}