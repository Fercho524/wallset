import React, { useEffect, useState } from "react";

interface Imagen {
    name: string;
    original: string;
    thumbnail: string;
}

declare global {
    interface Window {
        api: {
            obtenerMiniaturas: (rutaBase: string) => Promise<Imagen[]>;
            changeBackground: (rutaBase: string) => void;
        };
    }
}



const Gallery: React.FC = () => {
    const [imagenes, setImagenes] = useState<Imagen[]>([]);

    useEffect(() => {
        async function cargar() {
            const data = await window.api.obtenerMiniaturas("/home/fercho/Imágenes/Wallpapers");
            setImagenes(data);
            console.log(data)
        }
        cargar();
    }, []);

    async function cambiarFondo(img:string) {
        await window.api.changeBackground(img);
    }

    return (
        <div className="grid grid-cols-4 gap-4 p-4">
            {imagenes.map((img) => (
                <div key={img.original} className="text-center">
                    <img
                        src={`file:///${img.thumbnail}`}
                        alt={img.name}
                        onClick={()=>{cambiarFondo(img.original)}}
                        className="rounded-lg shadow-md w-full h-32 object-cover"
                    />
                    <p className="text-sm mt-1 truncate">{img.name}</p>
                </div>
            ))}
        </div>
    );
};

export default Gallery;
