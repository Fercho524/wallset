import fs from "fs";
import path from "path";
import os from "os";
import { BrowserWindow } from "electron";

let timeout: NodeJS.Timeout | null = null;

export function watchWalColors(mainWindow: BrowserWindow) {
  const walPath = path.join(
    os.homedir(),
    ".cache",
    "wal",
    "colors.json"
  );

  if (!fs.existsSync(walPath)) return;

  fs.watch(walPath, () => {
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      mainWindow.webContents.send("wal-colors-updated");
    }, 200);
  });
}
