import { useCallback, useEffect, useState } from 'react';

export const LEAD_STORAGE_KEY = 'corner_home_lead_captured';

export interface LeadGate {
  captured: boolean;
  ready: boolean;
  markCaptured: () => void;
}

function readStoredCaptured(): boolean {
  try {
    if (typeof window === 'undefined') return false;

    const url = new URL(window.location.href);
    if (url.searchParams.has('reset-lead-gate')) {
      window.sessionStorage.removeItem(LEAD_STORAGE_KEY);
      return false;
    }

    return window.sessionStorage.getItem(LEAD_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

function exposeDebugHook() {
  if (typeof window === 'undefined') return;
  (window as unknown as { __cornerClearLeadGate?: () => void }).__cornerClearLeadGate = () => {
    try {
      window.sessionStorage.removeItem(LEAD_STORAGE_KEY);
      console.info('[lead-gate] sessionStorage cleared. Reload to see the modal.');
    } catch (err) {
      console.warn('[lead-gate] could not clear sessionStorage:', err);
    }
  };
}

export function useLeadGate(): LeadGate {
  const [state, setState] = useState<{ captured: boolean; ready: boolean }>({
    captured: false,
    ready: false,
  });

  useEffect(() => {
    const captured = readStoredCaptured();
    setState({ captured, ready: true });
    exposeDebugHook();

    if (typeof console !== 'undefined') {
      console.info('[lead-gate] mount', {
        captured,
        sessionStorageValue: (() => {
          try {
            return window.sessionStorage.getItem(LEAD_STORAGE_KEY);
          } catch {
            return '<blocked>';
          }
        })(),
        href: window.location.href,
        timestamp: new Date().toISOString(),
      });
    }
  }, []);

  const markCaptured = useCallback(() => {
    try {
      window.sessionStorage.setItem(LEAD_STORAGE_KEY, 'true');
    } catch {
      // ignore
    }
    setState((s) => ({ ...s, captured: true }));
  }, []);

  return { captured: state.captured, ready: state.ready, markCaptured };
}
