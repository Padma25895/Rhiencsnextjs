"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const HERO_POSTER = "/images/hero-bg1.jpg";

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
      <Image
        src={HERO_POSTER}
        alt=""
        width={1920}
        height={1080}
        priority
        fetchPriority="high"
        unoptimized
        sizes="(max-width: 991px) 100vw, 70vw"
        className="hero-poster"
      />
      {shouldLoadVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={HERO_POSTER}
        >
          <source src="/videos/banner.mp4" type="video/mp4" />
        </video>
      )}
    </div>
  );
}
