import path from "path";
import { filtrarArchivos, listarArchivos, ordenarArchivos } from "../sources/filesystem/getFileList";
import { crearThumbnails } from "../sources/filesystem/thumbnails";


export async function obtenerMiniaturas(rutaBase: string) {
    const archivos = listarArchivos(rutaBase, true, true, true);
    const imagenes = filtrarArchivos(archivos, ["jpg", "jpeg", "png", "gif", "webp"]);
    const ordenadas = ordenarArchivos(imagenes, "name", "asc");

    const thumbs = await crearThumbnails(ordenadas, {
        outputDir: "./thumbnails",
        width: 150,
        height: 150,
        overwrite: false,
    });

    return thumbs.map((thumb, i) => {
        const dir = path.dirname(thumb);
        const base = path.basename(thumb);
        const encoded = encodeURIComponent(base); // 👈 codifica solo el nombre
        const safePath = path.join(dir, encoded).replace(/\\/g, "/");

        return {
            original: ordenadas[i].path,
            thumbnail: safePath,
            name: ordenadas[i].name,
        };
    });
}