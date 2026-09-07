"use client";

import { useEffect, useState } from "react";

// NOTE: We intentionally use a NATIVE <picture> + <img> here instead of
// next/image. The reason is next/image injects a style="color:transparent"
// and a client-side hydration fade/reveal that causes ~2.3s of Element
// Render Delay in Lighthouse. Using a plain <img> with fetchpriority="high"
// and decoding="sync" paints the LCP image immediately on first paint,
// which is the #1 factor for improving LCP (and mobile score above 80).
const HERO_POSTER_WEBP = "/images/hero-bg.webp";
const HERO_POSTER_JPG = "/images/hero-bg.optimized.webp";
const HERO_POSTER_FALLBACK = "/images/hero-bg.webp";
// Responsive srcset lets the browser choose a smaller file when DPR or
// viewport doesn't need the full 1920w master file.
// Same physical file with explicit width descriptors keeps CDN caching simple.
// const HERO_WEBP_SRCSET =
//   "/images/hero-bg.webp 640w, /images/hero-bg.webp 1024w, /images/hero-bg.webp 1280w, /images/hero-bg.webp 1920w";
// const HERO_JPG_SRCSET =
//   "/images/hero-bg.optimized.webp 640w, /images/hero-bg.optimized.webp 1024w, /images/hero-bg.optimized.webp 1280w, /images/hero-bg.optimized.webp 1920w";
// const HERO_SIZES =
//   "(max-width: 575px) 100vw, (max-width: 991px) 100vw, (max-width: 1199px) 56vw, 1075px";

export default function HomepageHeroMedia() {
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    const idleWindow = window as Window & {
      requestIdleCallback?: (
        callback: IdleRequestCallback,
        options?: IdleRequestOptions,
      ) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    if (window.matchMedia("(max-width: 991px)").matches) return;

    const loadVideo = () => setShouldLoadVideo(true);
    const idleCallbackId = idleWindow.requestIdleCallback?.(loadVideo, {
      timeout: 2500,
    });
    const timeoutId =
      idleCallbackId === undefined ? window.setTimeout(loadVideo, 1500) : undefined;

    return () => {
      if (idleCallbackId !== undefined) {
        idleWindow.cancelIdleCallback?.(idleCallbackId);
      }
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <div className="hero-bg-video">
      {/* Native picture: WebP first → optimized JPG → fallback JPG.
          Responsive srcset + sizes keeps LCP image delivery efficient on mobile and desktop. */}
      {/* <picture>
        <source srcSet={HERO_WEBP_SRCSET} sizes={HERO_SIZES} type="image/webp" />
        <source srcSet={HERO_JPG_SRCSET} sizes={HERO_SIZES} type="image/jpeg" />
        <img
          src={HERO_POSTER_FALLBACK}
          alt=""
          srcSet={HERO_JPG_SRCSET}
          sizes={HERO_SIZES}
          width="1920"
          height="1080"
          fetchPriority="high"
          decoding="sync"
          loading="eager"
          className="hero-poster"
        />
      </picture> */}
      {shouldLoadVideo && (
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
        >
          <source src="/videos/banner.mp4" type="video/mp4" />
        </video>
      )}
    </div>
  );
}
