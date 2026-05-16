import { useEffect, useState, type ReactNode } from 'react';
import { RoughNotation } from 'react-rough-notation';

interface MarkProps {
  children: ReactNode;
  // Annotation type from react-rough-notation. Defaults to highlight (yellow marker style).
  type?: 'highlight' | 'underline' | 'box' | 'circle' | 'strike-through' | 'crossed-off' | 'bracket';
  color?: string;
  // Delay (ms) before the annotation begins drawing after mount.
  animationDelay?: number;
}

// Inline annotation wrapper for editorial emphasis (HARERA registered, on time, etc).
//
// RoughNotation measures DOM geometry to position the SVG path, so it cannot run during SSG
// (no DOM). We render the bare child server-side and only show the annotation after mount —
// no hydration mismatch (the DOM produced by both passes is identical until useEffect runs).
export default function Mark({
  children,
  type = 'highlight',
  color = '#F5E4C0',
  animationDelay = 200,
}: MarkProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <RoughNotation
      type={type}
      color={color}
      show={mounted}
      animationDelay={animationDelay}
      multiline
      iterations={2}
    >
      <span>{children}</span>
    </RoughNotation>
  );
}
