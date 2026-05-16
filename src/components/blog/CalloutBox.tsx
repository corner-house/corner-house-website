import type { ReactNode, CSSProperties } from 'react';
import { Info, AlertTriangle, CheckCircle2, Lightbulb, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

type CalloutType = 'info' | 'warning' | 'success' | 'tip' | 'harera';

interface CalloutBoxProps {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}

interface CalloutStyle {
  wrap: string;
  icon: typeof Info;
  label: string;
  iconColor?: string;
  badge?: string;
  customStyle?: CSSProperties;
}

const STYLES: Record<CalloutType, CalloutStyle> = {
  info: {
    wrap: 'border-primary/30 bg-primary/5 text-foreground',
    icon: Info,
    label: 'Note',
  },
  warning: {
    wrap: 'border-amber-500/40 bg-amber-50 text-foreground',
    icon: AlertTriangle,
    label: 'Heads up',
  },
  success: {
    wrap: 'border-emerald-600/40 bg-emerald-50 text-foreground',
    icon: CheckCircle2,
    label: 'Verified',
  },
  tip: {
    wrap: 'border-violet-500/40 bg-violet-50 text-foreground',
    icon: Lightbulb,
    label: 'Tip',
  },
  // HARERA Verified Review treatment per FIX 9 — 6px gold left border, light gold tint,
  // shield icon, VERIFIED ribbon in the top-right corner.
  harera: {
    wrap: 'text-foreground border-l-[6px]',
    icon: ShieldCheck,
    label: 'HARERA Verified Review',
    iconColor: '#C9933A',
    badge: 'Verified',
    customStyle: {
      backgroundColor: 'rgba(201, 147, 58, 0.08)',
      borderLeftColor: '#C9933A',
      borderTopColor: 'rgba(201, 147, 58, 0.30)',
      borderRightColor: 'rgba(201, 147, 58, 0.30)',
      borderBottomColor: 'rgba(201, 147, 58, 0.30)',
      borderTopWidth: 1,
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderStyle: 'solid',
    },
  },
};

export default function CalloutBox({ type = 'info', title, children }: CalloutBoxProps) {
  const styleDef = STYLES[type];
  const { wrap, icon: Icon, label, iconColor, badge, customStyle } = styleDef;
  const displayTitle = title ?? label;

  return (
    <aside
      className={cn('not-prose relative my-10 p-6 md:p-8 flex gap-5', !customStyle && 'border-l-4', wrap)}
      style={customStyle}
    >
      {badge && (
        <span
          className="absolute top-3 right-4 text-[9px] font-sans font-semibold tracking-[0.3em] uppercase px-2.5 py-1"
          style={{ backgroundColor: '#C9933A', color: '#0D1F3C' }}
        >
          {badge}
        </span>
      )}
      <Icon
        className="h-5 w-5 mt-1 shrink-0"
        style={iconColor ? { color: iconColor } : { color: 'var(--primary)' }}
        aria-hidden
      />
      <div className="space-y-2 text-base md:text-lg font-light leading-[1.75] flex-1">
        <span
          className="text-[10px] font-sans font-semibold tracking-[0.35em] uppercase block"
          style={iconColor ? { color: iconColor } : { color: 'var(--primary)' }}
        >
          {displayTitle}
        </span>
        <div className="[&_p]:mb-3 [&_strong]:font-semibold [&_strong]:text-foreground">
          {children}
        </div>
      </div>
    </aside>
  );
}
