import fs from "fs";
import path from "path";
import os from "os";

/**
 * Interfaces base (puedes importar estas desde tu archivo actual)
 */
export interface Config {
  explorerOptions: ExplorerOptions;
  ajustOptions: AjustOptions;
  wallpaperOptions: WallpaperOptions;
  presentationOptions: PresentationOptions;
  general: General;
}

export interface ExplorerOptions {
  folder: string;
  sortBy: "date" | "name";
  order: "asc" | "desc";
  foldersFirst: boolean;
  recursive: boolean;
  showHidden: boolean;
  viewType: "grid" | "list";
  showFilenames: boolean;
}

export type AjustType = "zoomed" | "filled" | "center" | "fit" | "stretch";
export type ScreenTarget = "all" | "monitor1" | "monitor2";

export interface AjustOptions {
  ajust: AjustType;
  screen: ScreenTarget;
}

export type WallpaperBackend = "hyprpaper" | "swaybg" | "gnome";
export type WallpaperType = "image" | "presentation" | "color";

export interface WallpaperOptions {
  backend: WallpaperBackend;
  type: WallpaperType;
}

export interface PresentationOptions {
  changeEachMinutes: number;
  sortBy: "date" | "name";
  order: "asc" | "desc";
  random: boolean;
}

export interface General {
  language: string;
  postCommand: string;
  currentWallpaper: string;
}

/**
 * Ruta por defecto de configuración
 */
const CONFIG_DIR = path.join(os.homedir(), ".config", "wallpaperapp");
const CONFIG_PATH = path.join(CONFIG_DIR, "config.json");

/**
 * Configuración por defecto
 */
export const defaultConfig: Config = {
  explorerOptions: {
    folder: path.join(os.homedir(), "Imágenes", "Wallpapers"),
    sortBy: "date",
    order: "asc",
    foldersFirst: true,
    recursive: true,
    showHidden: true,
    viewType: "grid",
    showFilenames: true,
  },
  ajustOptions: {
    ajust: "filled",
    screen: "all",
  },
  wallpaperOptions: {
    backend: "swaybg",
    type: "image",
  },
  presentationOptions: {
    changeEachMinutes: 30,
    sortBy: "date",
    order: "asc",
    random: true,
  },
  general: {
    language: "es",
    postCommand: "~/.bin/theme/wal.sh",
    currentWallpaper: "imagen.png",
  },
};

/**
 * Carga el archivo de configuración o crea uno nuevo si no existe
 */
export function loadConfig(): Config {
  try {
    if (!fs.existsSync(CONFIG_PATH)) {
      saveConfig(defaultConfig);
      return defaultConfig;
    }

    const raw = fs.readFileSync(CONFIG_PATH, "utf-8");
    const parsed = JSON.parse(raw);

    // Mezcla la configuración cargada con los valores por defecto
    return { ...defaultConfig, ...parsed };
  } catch (err) {
    console.error("Error al cargar la configuración:", err);
    return defaultConfig;
  }
}

/**
 * Guarda la configuración actual en el archivo JSON
 */
export function saveConfig(config: Config): void {
  try {
    if (!fs.existsSync(CONFIG_DIR)) {
      fs.mkdirSync(CONFIG_DIR, { recursive: true });
    }

    fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 4), "utf-8");
  } catch (err) {
    console.error("Error al guardar la configuración:", err);
  }
}

/**
 * Devuelve la ruta absoluta al archivo de configuración
 */
export function getConfigPath(): string {
  return CONFIG_PATH;
}
