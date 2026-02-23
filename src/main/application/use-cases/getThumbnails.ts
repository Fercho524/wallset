import path from "path";
import { crearThumbnails } from "../../infraestructure/repositories/utils/Tumbnails";
import { filtrarArchivos, listarArchivos, ordenarArchivos } from "../../infraestructure/repositories/utils/FileUtils";


export async function obtenerMiniaturas(rutaBase: string) {
    const archivos = listarArchivos({ dir: rutaBase, recursive: true, includeCreationDate: true, includeLastModDate: true });
    const imagenes = filtrarArchivos(archivos, ["jpg", "jpeg", "png", "gif", "webp"]);
    const ordenadas = ordenarArchivos(imagenes, "name", "asc");

    const thumbs = await crearThumbnails(ordenadas, {
        outputDir: "./thumbnails",
        overwrite: true,
    });

    return thumbs.map((thumb, i) => {
        const dir = path.dirname(thumb.thumbnail);
        const base = path.basename(thumb.thumbnail);
        const encoded = encodeURIComponent(base);
        const safePath = path.join(dir, encoded).replace(/\\/g, "/");

        return {
            original: ordenadas[i].path,
            thumbnail: safePath,
            name: ordenadas[i].name,
            createdAt: ordenadas[i].createdAt,
            modifiedAt: ordenadas[i].modifiedAt
        };
    });
}