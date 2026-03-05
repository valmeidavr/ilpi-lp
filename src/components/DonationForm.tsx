"use client";

import Image from "next/image";

export default function DonationForm() {
  return (
    <div className="space-y-6 text-center">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-1">
          Doe via PIX
        </h3>
        <p className="text-gray-500 text-sm">
          Escaneie o QR Code abaixo com o app do seu banco
        </p>
      </div>

      <div className="relative w-52 h-52 sm:w-60 sm:h-60 mx-auto rounded-xl overflow-hidden">
        <Image
          src="/pix.jpg"
          alt="QR Code PIX para doação"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}
