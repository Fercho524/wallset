import React, { useEffect, useState } from "react";
import { Loading } from "../shared/Loading";

import { Imagen } from "@renderer/interfaces/Imagen";

interface GalleryProps {
  imagenes: Imagen[];
  loading: boolean;
  onReload?: () => void;
  hasFolder: boolean;
  onSelect?: (originalPath: string) => void;
}

export default function Gallery({
  imagenes,
  loading,
  onReload,
  hasFolder,
  onSelect,
}: GalleryProps) {
  return (
    <div className="flex-[10] min-h-0 flex">
      <div className="rounded-md bg-[var(--surface)] w-full h-full flex relative">



        {/* Loading overlay */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--surface)]/70 z-10">
            <Loading />
          </div>
        )}

        {!hasFolder && !loading && (
          <div className="flex flex-1 items-center justify-center text-sm opacity-60">
            Selecciona una carpeta para mostrar wallpapers
          </div>
        )}

        {hasFolder && imagenes.length === 0 && !loading && (
          <div className="flex flex-1 items-center justify-center text-sm opacity-60">
            No se encontraron imágenes en esta carpeta
          </div>
        )}

        {/* Contenido */}
        {hasFolder && imagenes.length > 0 && !loading && (
          <div className="flex-1 min-h-0 w-full custom-scroll overflow-y-auto p-4">
            <div className="grid gap-4 p-4 grid-cols-[repeat(auto-fit,minmax(256px,1fr))]">
              {imagenes.map((img) => (
                <div key={img.original} className="text-center">
                  <img
                    src={`file:///${img.thumbnail}`}
                    alt={img.name}
                    onClick={() => onSelect?.(img.original)}
                    className="rounded-lg shadow-md w-full h-auto object-contain cursor-pointer"
                  />
                  <p className="text-sm mt-1 truncate">{img.name}</p>
                </div>
              ))}
            </div>
          </div>
        )

        }

      </div>
    </div>
  );
}

