export type Variant = "light" | "dark";

export type PaletteVariant = {
  primary: string;
  onPrimary: string;

  secondary: string;
  onSecondary: string;
  outline: string;

  background: string;
  surface: string;
  text: string;
};

export type PaletteDefinition = {
  light: PaletteVariant;
  dark: PaletteVariant;
};


export const defaultPalette: PaletteDefinition = {
  light: {
    primary: "#5B6FFF",
    onPrimary: "#ffffff",

    secondary: "#4DB6AC",
    onSecondary: "#00201C",
    outline: "#4DB6AC",

    background: "#F7F9FC",
    surface: "#FFFFFF",
    text: "#1B1D1F",
  },

  dark: {
    primary: "#AEC2FF",
    onPrimary: "#151A30",

    secondary: "#9DE1D9",
    onSecondary: "#E6F7F5",
    outline: "#4DB6AC",

    background: "#0F1117",
    surface: "#1A1C20",
    text: "#ECECEE",
  },
};

export const oneDarkPalette: PaletteDefinition = {
  light: {
    primary: "#3B74C5",
    onPrimary: "#ffffff",

    secondary: "#A854C8",
    onSecondary: "#300033",
    outline: "#6DA56F",

    background: "#F5F7FA",
    surface: "#FFFFFF",
    text: "#1C1F24",
  },

  dark: {
    primary: "#61AFEF",
    onPrimary: "#0B0E14",

    secondary: "#C678DD",
    onSecondary: "#F8E7FF",
    outline: "#98C379",

    background: "#282C34",
    surface: "#2F333D",
    text: "#ABB2BF",
  },
};

export const nordPalette: PaletteDefinition = {
  light: {
    primary: "#5E81AC",
    onPrimary: "#ffffff",

    secondary: "#88C0D0",
    onSecondary: "#2E3440",
    outline: "#81A1C1",

    background: "#ECEFF4",
    surface: "#E5E9F0",
    text: "#2E3440",
  },

  dark: {
    primary: "#88C0D0",
    onPrimary: "#2E3440",

    secondary: "#A3BE8C",
    onSecondary: "#1E232A",
    outline: "#81A1C1",

    background: "#2E3440",
    surface: "#3B4252",
    text: "#ECEFF4",
  },
};

export const tokyoNightPalette: PaletteDefinition = {
  light: {
    primary: "#34548A",
    onPrimary: "#ECEFF4",

    secondary: "#C0A6F0",
    onSecondary: "#2E3440",
    outline: "#7E9CD8",

    background: "#E6E8EB",
    surface: "#F0F1F4",
    text: "#24283B",
  },

  dark: {
    primary: "#7AA2F7",
    onPrimary: "#1A1B26",

    secondary: "#BB9AF7",
    onSecondary: "#1A1B26",
    outline: "#565F89",

    background: "#1A1B26",
    surface: "#24283B",
    text: "#A9B1D6",
  },
};

export const iosPalette: PaletteDefinition = {
  light: {
    primary: "#007AFF",
    onPrimary: "#ffffff",

    secondary: "#34C759",
    onSecondary: "#ffffff",
    outline: "rgba(0,0,0,0.15)",

    background: "#F2F2F7",
    surface: "#ffffff",
    text: "#1C1C1E",
  },

  dark: {
    primary: "#0A84FF",
    onPrimary: "#ffffff",

    secondary: "#30D158",
    onSecondary: "#000000",
    outline: "rgba(255,255,255,0.2)",

    background: "#1C1C1E",
    surface: "#2C2C2E",
    text: "#F2F2F7",
  },
};

export const yaruPalette: PaletteDefinition = {
  light: {
    primary: "#E95420",
    onPrimary: "#ffffff",

    secondary: "#772953",
    onSecondary: "#ffffff",
    outline: "rgba(0,0,0,0.15)",

    background: "#FAFAFA",
    surface: "#ffffff",
    text: "#2C2C2C",
  },

  dark: {
    primary: "#E95420",
    onPrimary: "#ffffff",

    secondary: "#C061CB",
    onSecondary: "#000000",
    outline: "rgba(255,255,255,0.2)",

    background: "#2C001E",
    surface: "#3B0F2C",
    text: "#F5F5F5",
  },
};


export const gnomePalette: PaletteDefinition = {
  light: {
    primary: "#3584E4",
    onPrimary: "#ffffff",

    secondary: "#3D3846",
    onSecondary: "#ffffff",
    outline: "rgba(0,0,0,0.15)",

    background: "#F6F5F4",
    surface: "#ffffff",
    text: "#1E1E1E",
  },

  dark: {
    primary: "#62A0EA",
    onPrimary: "#000000",

    secondary: "#9A9996",
    onSecondary: "#000000",
    outline: "rgba(255,255,255,0.2)",

    background: "#1E1E1E",
    surface: "#2E2E2E",
    text: "#FFFFFF",
  },
};


export const gruvboxPalette: PaletteDefinition = {
  light: {
    primary: "#D65D0E",
    onPrimary: "#ffffff",

    secondary: "#98971A",
    onSecondary: "#000000",
    outline: "rgba(0,0,0,0.2)",

    background: "#FBF1C7",
    surface: "#F2E5BC",
    text: "#3C3836",
  },

  dark: {
    primary: "#FE8019",
    onPrimary: "#000000",

    secondary: "#B8BB26",
    onSecondary: "#000000",
    outline: "rgba(255,255,255,0.2)",

    background: "#282828",
    surface: "#3C3836",
    text: "#EBDBB2",
  },
};


export const shadesOfPurplePalette: PaletteDefinition = {
  light: {
    primary: "#7B3FE4",
    onPrimary: "#ffffff",

    secondary: "#43D9AD",
    onSecondary: "#000000",
    outline: "rgba(0,0,0,0.15)",

    background: "#F8F5FF",
    surface: "#FFFFFF",
    text: "#2D1B55",
  },

  dark: {
    primary: "#B362FF",
    onPrimary: "#000000",

    secondary: "#43D9AD",
    onSecondary: "#000000",
    outline: "rgba(255,255,255,0.25)",

    background: "#1E1E3F",
    surface: "#2A2A5E",
    text: "#EDE7FF",
  },
};


export const palettes = {
  default: defaultPalette,
  onedark: oneDarkPalette,
  nord: nordPalette,
  ios: iosPalette,
  tokyo: tokyoNightPalette,
  shades: shadesOfPurplePalette,
  gruvbox: gruvboxPalette,
  yaru: yaruPalette,
  gnome: gnomePalette
} as const;


export type PaletteName = keyof typeof palettes | "pywal";

export function applyPaletteVars(palette: PaletteVariant | null) {
  if (!palette) return;

  const root = document.documentElement;
  Object.entries(palette).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value);
  });
}
