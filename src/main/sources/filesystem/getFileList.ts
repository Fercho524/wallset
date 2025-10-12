import * as fs from "fs";
import * as path from "path";


export type SortBy = "name" | "createdAt" | "modifiedAt";
export type SortOrder = "asc" | "desc";


export interface ArchivoInfo {
  path: string;
  name: string;
  createdAt?: Date;
  modifiedAt?: Date;
}


export function listarArchivos(
  dir: string,
  recursive: boolean = true,
  includeCreationDate: boolean = false,
  includeLastModDate: boolean = false
): ArchivoInfo[] {
  let resultados: ArchivoInfo[] = [];

  const elementos = fs.readdirSync(dir, { withFileTypes: true });

  for (const elemento of elementos) {
    const rutaCompleta = path.join(dir, elemento.name);

    if (elemento.isDirectory() && recursive) {
      resultados = resultados.concat(
        listarArchivos(rutaCompleta, recursive, includeCreationDate, includeLastModDate)
      );
    } else if (elemento.isFile()) {
      const info: ArchivoInfo = {
        path: rutaCompleta,
        name: elemento.name,
      };

      if (includeCreationDate || includeLastModDate) {
        const stats = fs.statSync(rutaCompleta);
        if (includeCreationDate) info.createdAt = stats.birthtime;
        if (includeLastModDate) info.modifiedAt = stats.mtime;
      }

      resultados.push(info);
    }
  }

  return resultados;
}


export function filtrarArchivos(
  files: ArchivoInfo[],
  extensions?: string[],
  showHidden: boolean = false
): ArchivoInfo[] {
  return files.filter((file) => {
    const esOculto = file.name.startsWith(".");
    if (!showHidden && esOculto) return false;

    if (extensions && extensions.length > 0) {
      const ext = path.extname(file.name).slice(1).toLowerCase();
      return extensions.includes(ext);
    }

    return true;
  });
}


export function ordenarArchivos(
  files: ArchivoInfo[],
  sortBy: SortBy = "name",
  order: SortOrder = "asc"
): ArchivoInfo[] {
  const factor = order === "asc" ? 1 : -1;

  return [...files].sort((a, b) => {
    let valA: string | number | Date | undefined;
    let valB: string | number | Date | undefined;

    switch (sortBy) {
      case "name":
        valA = a.name.toLowerCase();
        valB = b.name.toLowerCase();
        break;
      case "createdAt":
        valA = a.createdAt || 0;
        valB = b.createdAt || 0;
        break;
      case "modifiedAt":
        valA = a.modifiedAt || 0;
        valB = b.modifiedAt || 0;
        break;
    }

    if (valA! < valB!) return -1 * factor;
    if (valA! > valB!) return 1 * factor;
    return 0;
  });
}