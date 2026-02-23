import * as fs from "fs/promises";
import * as path from "path";
import sharp from "sharp";
import os from "os";
import { File } from "../../../domain/entities/File";
import { ThumbnailOptions } from "../../../application/dto/ThumbnailOptions";
import { Wallpaper } from "../../../domain/entities/Wallpaper";

const extensionesImagen = new Set([
  "jpg",
  "jpeg",
  "png",
  "gif",
  "webp",
  "bmp",
]);

export async function crearThumbnails(
  files: File[],
  options: ThumbnailOptions
): Promise<Wallpaper[]> {
  const {
    outputDir,
    height = 200,
    overwrite = false,
  } = options;

  await fs.mkdir(outputDir, { recursive: true });

  const results: Wallpaper[] = [];

  const CONCURRENCY = Math.max(2, os.cpus().length - 1);
  let index = 0;

  async function worker() {
    while (true) {
      const currentIndex = index++;
      if (currentIndex >= files.length) break;

      const file = files[currentIndex];
      const ext = path.extname(file.name).slice(1).toLowerCase();
      if (!extensionesImagen.has(ext)) continue;

      const baseName = path.basename(file.name, path.extname(file.name));
      const nombreThumb = `${baseName}_thumb.webp`;
      const rutaThumb = path.resolve(outputDir, nombreThumb);

      if (!overwrite) {
        try {
          await fs.access(rutaThumb);
          results[currentIndex] = {
            name: baseName,
            original: file.path,
            thumbnail: rutaThumb,
          };
          continue;
        } catch { }
      }

      try {
        await sharp(file.path, { failOnError: false })
          .resize({
            height,
            fit: "inside",
            withoutEnlargement: true,
          })
          .webp({ quality: 75, effort: 4 })
          .toFile(rutaThumb);

        results[currentIndex] = {
          name: baseName,
          original: file.path,
          thumbnail: rutaThumb,
        };
      } catch (err) {
        console.error(`Thumbnail error: ${file.path}`, err);
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  // Filtramos huecos (archivos no-imagen)
  return results.filter(Boolean);
}
