import { useCallback, useEffect, useState } from 'react';

export const LEAD_STORAGE_KEY = 'corner_home_lead_captured';

export interface LeadGate {
  captured: boolean;
  ready: boolean;
  markCaptured: () => void;
}

export function useLeadGate(): LeadGate {
  const [captured, setCaptured] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = window.sessionStorage.getItem(LEAD_STORAGE_KEY) === 'true';
      setCaptured(stored);
    } catch {
      // sessionStorage unavailable (SSR shell, privacy mode, etc.)
    }
    setReady(true);
  }, []);

  const markCaptured = useCallback(() => {
    try {
      window.sessionStorage.setItem(LEAD_STORAGE_KEY, 'true');
    } catch {
      // ignore
    }
    setCaptured(true);
  }, []);

  return { captured, ready, markCaptured };
}
