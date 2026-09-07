'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const SwiperInit = dynamic(() => import('./SwiperInit'), { ssr: false, loading: () => null });
const OwlCarouselInit = dynamic(() => import('./OwlCarouselInit'), { ssr: false, loading: () => null });
const CounterInit = dynamic(() => import('./CounterInit'), { ssr: false, loading: () => null });
const ReadMoreInit = dynamic(() => import('./ReadMoreInit'), { ssr: false, loading: () => null });
const MobileMenuInit = dynamic(() => import('./MobileMenuInit'), { ssr: false, loading: () => null });
const MobileSearchInit = dynamic(() => import('./MobileSearchInit'), { ssr: false, loading: () => null });
const SearchBoxInit = dynamic(() => import('./SearchBoxInit'), { ssr: false, loading: () => null });
const LottieInit = dynamic(() => import('./LottieInit'), { ssr: false, loading: () => null });
const VideoPopupInit = dynamic(() => import('./VideoPopupInit'), { ssr: false, loading: () => null });
const PopoverInit = dynamic(() => import('./PopoverInit'), { ssr: false, loading: () => null });
const GridOverlayInit = dynamic(() => import('./GridOverlayInit'), { ssr: false, loading: () => null });
const PluginStyles = dynamic(() => import('./PluginStyles'), { ssr: false, loading: () => null });

export default function InitializerComponents() {
  const [loadDeferredInitializers, setLoadDeferredInitializers] = useState(false);

  useEffect(() => {
    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    const loadInitializers = () => setLoadDeferredInitializers(true);
    const idleCallbackId = idleWindow.requestIdleCallback?.(loadInitializers, { timeout: 3000 });
    const timeoutId =
      idleCallbackId === undefined ? window.setTimeout(loadInitializers, 1800) : undefined;

    return () => {
      if (idleCallbackId !== undefined) idleWindow.cancelIdleCallback?.(idleCallbackId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      <MobileMenuInit />
      <MobileSearchInit />
      <SearchBoxInit />
      <VideoPopupInit />
      <SwiperInit />
      {loadDeferredInitializers && (
        <>
          <OwlCarouselInit />
          <CounterInit />
          <LottieInit />
          <PopoverInit />
          <ReadMoreInit />
          <GridOverlayInit />
          <PluginStyles />
        </>
      )}
    </>
  );
}
