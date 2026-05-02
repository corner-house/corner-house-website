// Google Analytics 4 helpers for Corner House.
// Mirrors the Soul Infinity analytics.ts pattern: production hostname guard,
// DNT respected, no-op when gtag.js is not on the page (dev, preview, staging).

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const PRODUCTION_HOSTNAME = 'cornerhouse.co.in';

const isDntEnabled = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  const nav = navigator as Navigator & { msDoNotTrack?: string };
  const win = typeof window !== 'undefined' ? (window as Window & { doNotTrack?: string }) : undefined;
  return nav.doNotTrack === '1' || nav.msDoNotTrack === '1' || win?.doNotTrack === '1';
};

const isProduction = (): boolean => {
  return typeof window !== 'undefined' && window.location.hostname === PRODUCTION_HOSTNAME;
};

const canTrack = (): boolean => {
  if (!isProduction()) return false;
  if (isDntEnabled()) return false;
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
};

export const trackPageView = (path: string, title?: string): void => {
  if (!canTrack()) return;
  window.gtag!('event', 'page_view', {
    page_path: path,
    page_title: title ?? document.title,
    page_location: window.location.href,
  });
};

export const trackEvent = (
  eventName: string,
  params?: Record<string, unknown>,
): void => {
  if (!canTrack()) return;
  window.gtag!('event', eventName, params);
};
