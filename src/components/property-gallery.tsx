"use client";

import Image from "next/image";
import { useState } from "react";

export function PropertyGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);

  return (
    <div className="grid gap-4">
      <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-slate-200 shadow-premium">
        <Image src={images[active]} alt={`${title} gallery image`} fill priority sizes="100vw" className="object-cover" />
      </div>
      <div className="grid grid-cols-3 gap-3">
        {images.map((image, index) => (
          <button
            key={image}
            aria-label={`Show gallery image ${index + 1}`}
            onClick={() => setActive(index)}
            className={`focus-ring relative aspect-[4/3] overflow-hidden rounded-lg border-2 ${active === index ? "border-gold" : "border-transparent"}`}
          >
            <Image src={image} alt={`${title} thumbnail ${index + 1}`} fill sizes="30vw" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
