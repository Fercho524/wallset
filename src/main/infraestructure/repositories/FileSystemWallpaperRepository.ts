import path from "path";
import { listarArchivos, filtrarArchivos, ordenarArchivos } from "./utils/FileUtils";
import { crearThumbnails } from "./utils/Tumbnails";
import { WallpaperRepository } from "../../domain/repositories/wallpaperRepository";
import { Wallpaper } from "../../domain/entities/Wallpaper";

const IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "gif", "webp", "bmp"];

export class FileSystemWallpaperRepository
  implements WallpaperRepository
{
  constructor(private readonly thumbnailDir: string) {}

  async list({
    dir,
    recursive = true,
    sortBy = "name",
    order = "asc",
    withThumbnails = true,
  }): Promise<Wallpaper[]> {
    // 1️⃣ Listar archivos
    let files = listarArchivos({
      dir,
      recursive,
      includeCreationDate: true,
      includeLastModDate: true,
    });

    // 2️⃣ Filtrar imágenes
    files = filtrarArchivos(files, IMAGE_EXTENSIONS, false);

    // 3️⃣ Ordenar
    files = ordenarArchivos(files, sortBy, order);

    // 4️⃣ Thumbnails (opcional)
    if (withThumbnails) {
      const thumbs = await crearThumbnails(files, {
        outputDir: this.thumbnailDir,
        height: 200,
        overwrite: false,
      });

      return thumbs.map((t) => ({
        name: t.name,
        original: t.original,
        thumbnail: t.thumbnail,
      }));
    }

    // 5️⃣ Sin thumbnails
    return files.map((f) => ({
      name: path.basename(f.name, path.extname(f.name)),
      original: f.path,
      thumbnail: "",
      createdAt: f.createdAt,
      modifiedAt: f.modifiedAt,
    }));
  }
}
