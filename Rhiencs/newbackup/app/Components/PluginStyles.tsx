'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const pluginStyles = [
  {
    href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css',
    selector: '.wow, [class*="fadeIn"], [class*="animate__"]',
  },
  {
    href: 'https://cdnjs.cloudflare.com/ajax/libs/bxslider/4.2.12/jquery.bxslider.min.css',
    selector: '.bxslider, .bx-wrapper',
  },
  {
    href: 'https://cdn.jsdelivr.net/jquery.slick/1.5.9/slick.css',
    selector: '.slick-slider, .slick-list, .slick-track',
  },
  {
    href: '/css/swiper-bundle.min.css',
    selector: '.swiper',
  },
  {
    href: '/css/owl.carousel.css',
    selector: '.owl-carousel',
  },
  {
    href: '/css/magnific-popup.css',
    selector: '.popup-video, .gallery-items',
  },
  {
    href: '/css/slicknav.min.css',
    selector: '.slicknav_btn, #menu',
  },
];

const loadStyle = (href: string) => {
  if (typeof document === 'undefined') return;
  if (document.querySelector(`link[href="${href}"]`)) return;

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  link.media = 'print';
  link.onload = () => {
    link.media = 'all';
  };

  document.head.appendChild(link);
};

const tryLoadStyles = () => {
  if (typeof document === 'undefined') return;

  pluginStyles.forEach((plugin) => {
    if (document.querySelector(plugin.selector)) {
      loadStyle(plugin.href);
    }
  });
};

export default function PluginStyles() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    tryLoadStyles();

    const timeouts = [
      window.setTimeout(tryLoadStyles, 100),
      window.setTimeout(tryLoadStyles, 500),
      window.setTimeout(tryLoadStyles, 1000),
    ];

    return () => {
      timeouts.forEach((timeout) => window.clearTimeout(timeout));
    };
  }, [pathname]);

  return null;
}
