import { PaletteDefinition } from "./colors";
import { WalColors } from "@renderer/interfaces/WalColors";


export function walToPalette(wal: WalColors): PaletteDefinition {
  return {
    light: {
      primary: wal.colors.color4,
      onPrimary: wal.special.background,

      secondary: wal.colors.color6,
      onSecondary: wal.special.background,

      outline: wal.colors.color8,

      background: wal.special.background,
      surface: wal.colors.color0,
      text: wal.special.foreground,
    },

    dark: {
      primary: wal.colors.color4,
      onPrimary: wal.special.foreground,

      secondary: wal.colors.color6,
      onSecondary: wal.special.background,

      outline: wal.colors.color8,

      background: wal.special.background,
      surface: wal.colors.color0,
      text: wal.special.foreground,
    },
  };
}
