import Footer from "@renderer/components/wallpaper/Footer";
import Gallery from "@renderer/components/wallpaper/Gallery";
import Sidebar from "@renderer/components/wallpaper/Sidebar";
import TopBar from "@renderer/components/wallpaper/TopBar";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Imagen } from "@renderer/interfaces/Imagen";

function ordenarImagenes(imagenes: Imagen[], sort: string): Imagen[] {
    const copia = [...imagenes];

    switch (sort) {
        case "name-asc":
            return copia.sort((a, b) => a.name.localeCompare(b.name));

        case "name-desc":
            return copia.sort((a, b) => b.name.localeCompare(a.name));

        case "created-desc":
            return copia.sort(
                (a, b) =>
                    (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0)
            );

        case "created-asc":
            return copia.sort(
                (a, b) =>
                    (a.createdAt?.getTime() ?? 0) - (b.createdAt?.getTime() ?? 0)
            );

        case "modified-desc":
            return copia.sort(
                (a, b) =>
                    (b.modifiedAt?.getTime() ?? 0) - (a.modifiedAt?.getTime() ?? 0)
            );

        case "modified-asc":
            return copia.sort(
                (a, b) =>
                    (a.modifiedAt?.getTime() ?? 0) - (b.modifiedAt?.getTime() ?? 0)
            );

        default:
            return copia;
    }
}

export default function WallpaperList() {
    const { t } = useTranslation();

    // Filtros
    const [search, setSearch] = useState("");
    const [sortFilter, setSortFilter] = useState("name-asc");

    // Imágenes
    const [imagenes, setImagenes] = useState<Imagen[]>([]);
    const [selectedImage, setSelectedImage] = useState("");
    const [loading, setLoading] = useState(false);

    // Ajustes
    const [wallpaperDir, setWallpaperDir] = useState<string | null>(null);
    const [backend, setBackend] = useState("swaybg");
    const [monitors, setMonitors] = useState("all");
    const [fit, setFit] = useState("fill");

    const cargar = async () => {
        if (!wallpaperDir) return;

        setLoading(true);
        try {
            const data = await window.api.obtenerMiniaturas(wallpaperDir);

            const normalizadas: Imagen[] = data.map((img) => ({
                ...img,
                createdAt: img.createdAt ? new Date(img.createdAt) : undefined,
                modifiedAt: img.modifiedAt ? new Date(img.modifiedAt) : undefined,
            }));

            setImagenes(normalizadas);
        } finally {
            setLoading(false);
        }
    };

    const seleccionarCarpeta = async () => {
        const dir = await window.api.selectFolder();
        if (dir) {
            setWallpaperDir(dir);
        }
    };

    useEffect(() => {
        if (wallpaperDir) {
            cargar();
        }
    }, [wallpaperDir]);

    // 🔹 Filtros + orden derivados
    const imagenesProcesadas = useMemo(() => {
        const filtradas = imagenes.filter((img) =>
            img.name.toLowerCase().includes(search.toLowerCase())
        );

        return ordenarImagenes(filtradas, sortFilter);
    }, [imagenes, search, sortFilter]);

    return (
        <div className="w-full h-screen bg-[var(--background)] text-[var(--text)] flex transition-colors overflow-hidden">
            <Sidebar onSelectFolder={seleccionarCarpeta} />

            <div className="flex-1 py-4 pr-4 transition-colors flex flex-col min-h-0 gap-4">
                <TopBar
                    search={search}
                    onSearchChange={setSearch}
                    sort={sortFilter}
                    onSortChange={setSortFilter}
                    onReload={cargar}
                    onClear={() => setSearch("")}
                    onRandom={() => {
                        if (imagenesProcesadas.length === 0) return;
                        const random =
                            imagenesProcesadas[
                            Math.floor(Math.random() * imagenesProcesadas.length)
                            ];
                        window.api.changeBackground(random.original);
                        setSelectedImage(random.original);
                    }}
                />

                <Gallery
                    imagenes={imagenesProcesadas}
                    loading={loading}
                    hasFolder={Boolean(wallpaperDir)}
                    onSelect={(img) => {
                        setSelectedImage(img);
                        window.api.changeBackground(img);
                    }}
                />

                <Footer
                    backend={backend}
                    onBackendChange={setBackend}
                    monitors={monitors}
                    onMonitorsChange={setMonitors}
                    fit={fit}
                    onFitChange={setFit}
                    onApply={() => {
                        console.log({
                            backend,
                            monitors,
                            fit,
                            selectedImage,
                        });
                    }}
                />
            </div>
        </div>
    );
}
