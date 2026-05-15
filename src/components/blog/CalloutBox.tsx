import type { ReactNode } from 'react';
import { Info, AlertTriangle, CheckCircle2, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

type CalloutType = 'info' | 'warning' | 'success' | 'tip';

interface CalloutBoxProps {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}

const STYLES: Record<CalloutType, { wrap: string; icon: typeof Info; label: string }> = {
  info: { wrap: 'border-primary/30 bg-primary/5 text-foreground', icon: Info, label: 'Note' },
  warning: { wrap: 'border-amber-500/40 bg-amber-50 text-foreground', icon: AlertTriangle, label: 'Heads up' },
  success: { wrap: 'border-emerald-600/40 bg-emerald-50 text-foreground', icon: CheckCircle2, label: 'Verified' },
  tip: { wrap: 'border-violet-500/40 bg-violet-50 text-foreground', icon: Lightbulb, label: 'Tip' },
};

export default function CalloutBox({ type = 'info', title, children }: CalloutBoxProps) {
  const { wrap, icon: Icon, label } = STYLES[type];
  return (
    <aside className={cn('my-10 border-l-4 p-6 md:p-8 flex gap-5', wrap)}>
      <Icon className="h-5 w-5 mt-1 shrink-0 text-primary" aria-hidden />
      <div className="space-y-2 text-base md:text-lg font-light leading-[1.75]">
        <span className="text-[10px] font-sans font-semibold tracking-[0.35em] uppercase text-primary block">
          {title ?? label}
        </span>
        <div className="[&_p]:mb-3 [&_strong]:font-semibold [&_strong]:text-foreground">{children}</div>
      </div>
    </aside>
  );
}
