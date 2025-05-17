import React, { useState } from "react";
import "./ProcessGallery.css";

type ProcessImage = {
  url: string;
  alt?: string;
  description?: string;
};

type Props = {
  images: ProcessImage[];
};

export default function ProcessGallery({ images }: Props) {
  const [active, setActive] = useState<null | ProcessImage>(null);

  return (
    <>
      <div className="scroll-strip">
        {images.map((img, index) => (
          <div className="image-wrapper" key={index} onClick={() => setActive(img)}>
            <img src={img.url} alt={img.alt || ""} />
            <div className="fade-out" />
          </div>
        ))}
      </div>

      {active && (
        <div className="lightbox" onClick={() => setActive(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={active.url} alt={active.alt || ""} />
            {active.description && <p className="caption">{active.description}</p>}
          </div>
        </div>
      )}
    </>
  );
}
