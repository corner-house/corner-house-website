import { useCallback, useEffect, useRef, useState } from 'react';

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
    } catch {
      // ignore
    }
  };
}

export function useLeadGate(): LeadGate {
  const [state, setState] = useState<{ captured: boolean; ready: boolean }>({
    captured: false,
    ready: false,
  });
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    const captured = readStoredCaptured();
    setState({ captured, ready: true });
    exposeDebugHook();
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
