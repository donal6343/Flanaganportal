"use client"

import { HttpTypes } from "@medusajs/types"
import Image from "next/image"
import { useRef, useState } from "react"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const thumbnailRef = useRef<HTMLDivElement>(null)

  const activeImage = images[activeIndex]

  const scrollThumbnails = (direction: "left" | "right") => {
    if (!thumbnailRef.current) return
    const scrollAmount = 200
    thumbnailRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })
  }

  if (!images.length) return null

  return (
    <div className="flex flex-col items-center w-full px-4 small:px-8 mt-5">
      <div
        className="relative overflow-hidden bg-ui-bg-subtle rounded-xl"
        style={{ width: "100%", maxWidth: 500, aspectRatio: "1 / 1" }}
      >
        {!!activeImage?.url && (
          <Image
            src={activeImage.url}
            priority
            className="absolute inset-0 rounded-xl"
            alt={`Product image ${activeIndex + 1}`}
            fill
            sizes="500px"
            style={{ objectFit: "cover" }}
          />
        )}
      </div>

      <div className="relative flex items-center gap-2 mt-5 w-full" style={{ maxWidth: 500 }}>
        <button
          onClick={() => scrollThumbnails("left")}
          className="shrink-0 w-7 h-7 flex items-center justify-center rounded-full border border-grey-20 bg-white hover:bg-grey-5 transition-colors"
          aria-label="Scroll thumbnails left"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 text-grey-60">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>

        <div
          ref={thumbnailRef}
          className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth"
        >
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setActiveIndex(index)}
              className={`relative shrink-0 w-16 h-16 overflow-hidden rounded border-2 transition-all ${
                index === activeIndex
                  ? "border-flanagan-orange"
                  : "border-grey-20 hover:border-grey-40"
              }`}
            >
              {!!image.url && (
                <Image
                  src={image.url}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  sizes="64px"
                  style={{ objectFit: "cover" }}
                />
              )}
            </button>
          ))}
        </div>

        <button
          onClick={() => scrollThumbnails("right")}
          className="shrink-0 w-7 h-7 flex items-center justify-center rounded-full border border-grey-20 bg-white hover:bg-grey-5 transition-colors"
          aria-label="Scroll thumbnails right"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 text-grey-60">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default ImageGallery
