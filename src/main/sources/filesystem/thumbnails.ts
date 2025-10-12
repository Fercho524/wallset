import * as fs from "fs";
import * as path from "path";
import sharp from "sharp";
import { ArchivoInfo } from "./getFileList";

export interface ThumbnailOptions {
  outputDir: string;  // dónde guardar los thumbnails
  width?: number;
  height?: number;
  overwrite?: boolean;
}

/**
 * Crea thumbnails de archivos de imagen.
 */
export async function crearThumbnails(
  files: ArchivoInfo[],
  options: ThumbnailOptions
): Promise<string[]> {
  const { outputDir, width = 200, height = 200, overwrite = false } = options;

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const extensionesImagen = ["jpg", "jpeg", "png", "gif", "webp", "bmp"];
  const thumbnails: string[] = [];

  for (const file of files) {
    console.log(`file ${file} of ${files.length}`)
    const ext = path.extname(file.name).slice(1).toLowerCase();
    if (!extensionesImagen.includes(ext)) continue;

    const nombreThumb = path.basename(file.name, path.extname(file.name)) + "_thumb.webp";
    //const rutaThumb = path.join(outputDir, nombreThumb);
    const rutaThumb = path.resolve(outputDir, nombreThumb);

    if (!overwrite && fs.existsSync(rutaThumb)) {
      thumbnails.push(rutaThumb);
      continue;
    }

    try {
      await sharp(file.path)
        .resize(width, height, { fit: "cover" })
        .toFormat("webp")
        .toFile(rutaThumb);

      thumbnails.push(rutaThumb);
    } catch (error) {
      console.error(`Error generando thumbnail para ${file.path}:`, error);
    }
  }

  return thumbnails;
}