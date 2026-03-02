"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  Trash2,
  Save,
  Loader2,
  Check,
} from "lucide-react";

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  order: number;
  visible: boolean;
}

export default function AdminGaleria() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const fetchImages = () => {
    fetch("/api/admin/gallery?all=true")
      .then((r) => r.json())
      .then(setImages)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const toggleVisibility = async (img: GalleryImage) => {
    setSaving(img.id);
    await fetch("/api/admin/gallery", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: img.id, visible: !img.visible }),
    });
    setImages((prev) =>
      prev.map((i) => (i.id === img.id ? { ...i, visible: !i.visible } : i))
    );
    setSaving(null);
  };

  const updateAlt = async (img: GalleryImage, alt: string) => {
    await fetch("/api/admin/gallery", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: img.id, alt }),
    });
  };

  const moveImage = async (img: GalleryImage, direction: "up" | "down") => {
    const sorted = [...images].sort((a, b) => a.order - b.order);
    const idx = sorted.findIndex((i) => i.id === img.id);
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;

    if (swapIdx < 0 || swapIdx >= sorted.length) return;

    const current = sorted[idx];
    const swap = sorted[swapIdx];

    await Promise.all([
      fetch("/api/admin/gallery", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: current.id, order: swap.order }),
      }),
      fetch("/api/admin/gallery", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: swap.id, order: current.order }),
      }),
    ]);

    setImages((prev) =>
      prev
        .map((i) => {
          if (i.id === current.id) return { ...i, order: swap.order };
          if (i.id === swap.id) return { ...i, order: current.order };
          return i;
        })
        .sort((a, b) => a.order - b.order)
    );
  };

  const deleteImage = async (img: GalleryImage) => {
    if (!confirm("Tem certeza que deseja excluir esta imagem?")) return;

    await fetch("/api/admin/gallery", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: img.id }),
    });

    setImages((prev) => prev.filter((i) => i.id !== img.id));
  };

  if (loading) {
    return (
      <div className="p-6 lg:p-8">
        <p className="text-gray-500">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Galeria</h1>
        <p className="text-gray-500 text-sm mt-1">
          Gerencie as imagens que aparecem na galeria do site ({images.length}{" "}
          imagens)
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images
          .sort((a, b) => a.order - b.order)
          .map((img) => (
            <div
              key={img.id}
              className={`bg-white rounded-2xl border overflow-hidden transition-opacity ${
                img.visible
                  ? "border-gray-200"
                  : "border-gray-200 opacity-50"
              }`}
            >
              <div className="relative aspect-square">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {!img.visible && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="bg-black/60 text-white text-xs px-3 py-1 rounded-full">
                      Oculta
                    </span>
                  </div>
                )}
              </div>

              <div className="p-3 space-y-2">
                <input
                  type="text"
                  defaultValue={img.alt}
                  onBlur={(e) => updateAlt(img, e.target.value)}
                  placeholder="Texto alternativo"
                  className="w-full text-sm px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 text-gray-900"
                />

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => toggleVisibility(img)}
                    className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      img.visible
                        ? "bg-green-50 text-green-700 hover:bg-green-100"
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    }`}
                  >
                    {saving === img.id ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : img.visible ? (
                      <Eye className="w-3 h-3" />
                    ) : (
                      <EyeOff className="w-3 h-3" />
                    )}
                    {img.visible ? "Visível" : "Oculta"}
                  </button>

                  <button
                    onClick={() => moveImage(img, "up")}
                    className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                    title="Mover para cima"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => moveImage(img, "down")}
                    className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                    title="Mover para baixo"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex-1" />

                  <button
                    onClick={() => deleteImage(img)}
                    className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                    title="Excluir"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
