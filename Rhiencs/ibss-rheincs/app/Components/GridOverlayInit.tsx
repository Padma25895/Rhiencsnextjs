'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function generateGridCells(overlayEl: HTMLElement): void {
  if (!overlayEl) return;

  const parent = overlayEl.parentElement;
  if (!parent) return;

  const CELL_WIDTH = 120;
  const CELL_HEIGHT = 150;

  const parentRect = parent.getBoundingClientRect();
  const cols = Math.max(1, Math.ceil(parentRect.width / CELL_WIDTH));
  const rows = Math.max(1, Math.ceil(parentRect.height / CELL_HEIGHT));
  const totalCells = cols * rows;

  overlayEl.innerHTML = '';

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    fragment.appendChild(cell);
  }
  overlayEl.appendChild(fragment);
}

function addTouchEffects(overlay: HTMLElement): void {
  if (overlay.dataset.touchInit === 'true') return;
  overlay.dataset.touchInit = 'true';

  overlay.addEventListener(
    'touchstart',
    (e: Event) => {
      const touch = (e as TouchEvent).touches?.[0];
      if (!touch) return;
      const target = document.elementFromPoint(touch.clientX, touch.clientY) as HTMLElement | null;
      const cell = target?.closest?.('.cell') as HTMLElement | null;
      if (cell && cell.parentElement === overlay) {
        cell.classList.add('cell-active');
      }
    },
    { passive: true }
  );

  overlay.addEventListener(
    'touchend',
    () => {
      overlay.querySelectorAll('.cell-active').forEach((c) => c.classList.remove('cell-active'));
    },
    { passive: true }
  );

  overlay.addEventListener(
    'touchmove',
    (e: Event) => {
      const touch = (e as TouchEvent).touches?.[0];
      if (!touch) return;
      const target = document.elementFromPoint(touch.clientX, touch.clientY) as HTMLElement | null;
      const cell = target?.closest?.('.cell') as HTMLElement | null;
      overlay.querySelectorAll('.cell-active').forEach((c) => {
        if (c !== cell) c.classList.remove('cell-active');
      });
      if (cell && cell.parentElement === overlay) {
        cell.classList.add('cell-active');
      }
    },
    { passive: true }
  );
}

export function initGridOverlays(): void {
  if (typeof document === 'undefined') return;

  const overlays = document.querySelectorAll('.grid-overlay');
  overlays.forEach((overlay) => {
    const htmlEl = overlay as HTMLElement;
    const alreadyReady =
      htmlEl.dataset.gridInit === 'true' &&
      htmlEl.children.length > 0 &&
      htmlEl.dataset.touchInit === 'true';

    if (htmlEl.children.length === 0 || htmlEl.dataset.gridInit !== 'true') {
      generateGridCells(htmlEl);
      htmlEl.dataset.gridInit = 'true';
    }
    addTouchEffects(htmlEl);
  });
}

if (typeof window !== 'undefined') {
  (window as any).initGridOverlays = initGridOverlays;
  (window as any).generateGridCells = generateGridCells;
}

export default function GridOverlayInit() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const runInit = () => {
      try {
        initGridOverlays();
      } catch (err) {
        console.error('❌ [GridOverlayInit] Error:', err);
      }
    };

    runInit();

    const retries = [
      setTimeout(runInit, 200),
      setTimeout(runInit, 600),
      setTimeout(runInit, 1200),
      setTimeout(runInit, 2000),
    ];

    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        document.querySelectorAll('.grid-overlay').forEach((overlay) => {
          (overlay as HTMLElement).dataset.gridInit = '';
        });
        runInit();
      }, 250);
    };

    window.addEventListener('resize', handleResize);

    const handleReinit = () => {
      setTimeout(runInit, 150);
      setTimeout(runInit, 600);
    };

    window.addEventListener('owlCarouselLoaded', handleReinit);
    window.addEventListener('swiperReinit', handleReinit);

    return () => {
      retries.forEach(clearTimeout);
      if (resizeTimer) clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('owlCarouselLoaded', handleReinit);
      window.removeEventListener('swiperReinit', handleReinit);
    };
  }, [pathname]);

  return null;
}

