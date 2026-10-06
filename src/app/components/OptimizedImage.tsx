import { useState } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  /** Set true for above-the-fold images — loads eagerly with high fetchpriority */
  priority?: boolean;
  /** Responsive sizes hint, e.g. "(max-width: 768px) 100vw, 50vw" */
  sizes?: string;
  style?: React.CSSProperties;
  objectFit?: "cover" | "contain";
  objectPosition?: string;
}

/**
 * Generates a multi-resolution srcset for Unsplash images, requesting WebP.
 * Falls back to undefined for non-Unsplash or local asset URLs.
 */
function buildUnsplashSrcSet(src: string): string | undefined {
  if (!src.includes("images.unsplash.com")) return undefined;
  try {
    const url = new URL(src);
    url.searchParams.delete("w");
    url.searchParams.delete("h");
    url.searchParams.set("fm", "webp");
    url.searchParams.set("fit", "crop");
    url.searchParams.set("auto", "format");
    const base = url.toString();
    return [480, 800, 1200, 1600, 2400]
      .map((w) => `${base}&w=${w} ${w}w`)
      .join(", ");
  } catch {
    return undefined;
  }
}

/**
 * Drop-in <img> replacement that adds:
 * - WebP srcset for Unsplash photos (multi-resolution)
 * - Lazy loading + async decoding by default
 * - High fetch priority for above-the-fold (priority prop)
 * - Smooth fade-in on load with a warm placeholder while loading
 *
 * For local imported assets (e.g. from /src/imports/), pass the imported
 * module value as `src` — Vite resolves it to a hashed URL at build time.
 */
export function OptimizedImage({
  src,
  alt,
  className = "",
  priority = false,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  style,
  objectFit = "cover",
  objectPosition = "center",
}: OptimizedImageProps) {
  // Skip fade-in for priority (above-fold) images to avoid CLS flash
  const [loaded, setLoaded] = useState(priority);
  const srcSet = buildUnsplashSrcSet(src);

  return (
    <div className={`relative overflow-hidden ${className}`} style={style}>
      {/* Warm skeleton shown while image loads */}
      <div
        className="absolute inset-0 bg-muted transition-opacity duration-700 pointer-events-none"
        style={{ opacity: loaded ? 0 : 1 }}
        aria-hidden
      />
      <img
        src={src}
        srcSet={srcSet}
        sizes={srcSet ? sizes : undefined}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className="w-full h-full"
        style={{
          objectFit,
          objectPosition,
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      />
    </div>
  );
}
