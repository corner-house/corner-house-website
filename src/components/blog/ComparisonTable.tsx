import {
  CheckCircle,
  Building2,
  Users,
  Calendar,
  IndianRupee,
  Award,
  Hammer,
} from 'lucide-react';
import { motion } from 'motion/react';
import type { ReactNode } from 'react';

interface PhaseRows {
  status: string;
  harera: string;
  towers: string;
  config: string;
  possession: string;
  price: string;
  architect: string;
  developer: string;
}

interface Phase {
  name: string;
  sub: string;
  /** Tailwind classes applied to mobile card outer wrapper (light/dark surface). */
  cardClass: string;
  /** Tailwind classes for the small status pill. */
  badge: string;
  badgeLabel: string;
  icon: ReactNode;
  /** True when the card uses a dark surface so we flip text colour. */
  dark?: boolean;
  rows: PhaseRows;
}

const phases: Phase[] = [
  {
    name: 'Waterfall',
    sub: 'Phase 1',
    cardClass: 'bg-green-50 border-green-400',
    badge: 'bg-green-100 text-green-800',
    badgeLabel: 'Delivered',
    icon: <CheckCircle className="w-5 h-5 text-green-600" />,
    rows: {
      status: 'Delivered on time',
      harera: 'Separate registration',
      towers: 'Completed',
      config: '2 BHK, 3 BHK',
      possession: 'Delivered',
      price: 'Resale market only',
      architect: 'Nikken Sekkei',
      developer: 'Krisumi Corporation',
    },
  },
  {
    name: 'Waterside',
    sub: 'Phases 3 and 4',
    cardClass: 'bg-amber-50 border-amber-400',
    badge: 'bg-amber-100 text-amber-800',
    badgeLabel: 'Under Construction',
    icon: <Hammer className="w-5 h-5 text-amber-600" />,
    rows: {
      status: 'Under construction',
      harera: 'Separate registration',
      towers: 'Under construction',
      config: '2 LDK, 3 LDK',
      possession: 'On request',
      price: 'On request',
      architect: 'Nikken Sekkei',
      developer: 'Krisumi Corporation',
    },
  },
  {
    name: 'Forest Reserve',
    sub: 'Phases 5 and 6',
    cardClass: 'bg-[#0D1F3C] border-[#C9933A]',
    badge: 'bg-[#C9933A] text-white',
    badgeLabel: 'New Launch',
    icon: <Award className="w-5 h-5 text-[#C9933A]" />,
    dark: true,
    rows: {
      status: 'Under construction',
      harera: 'GGM/944/676 and /945/677',
      towers: '3 towers, 30 floors each',
      config: '2, 3, 4 LDK + Penthouses',
      possession: 'November 2030',
      price: 'On request (premium)',
      architect: 'Nikken Sekkei',
      developer: 'Krisumi Corporation',
    },
  },
];

interface RowMeta {
  key: keyof PhaseRows;
  label: string;
  icon: ReactNode;
}

const rowLabels: RowMeta[] = [
  { key: 'status', label: 'Status', icon: <CheckCircle className="w-4 h-4" /> },
  { key: 'harera', label: 'HARERA', icon: <Award className="w-4 h-4" /> },
  { key: 'towers', label: 'Towers', icon: <Building2 className="w-4 h-4" /> },
  { key: 'config', label: 'Configuration', icon: <Users className="w-4 h-4" /> },
  { key: 'possession', label: 'Possession', icon: <Calendar className="w-4 h-4" /> },
  { key: 'price', label: 'Price', icon: <IndianRupee className="w-4 h-4" /> },
  { key: 'architect', label: 'Architecture', icon: <Award className="w-4 h-4" /> },
  { key: 'developer', label: 'Developer', icon: <Building2 className="w-4 h-4" /> },
];

export function ComparisonTable() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="not-prose my-10"
    >
      <p className="font-caveat text-xl mb-4 text-center" style={{ color: '#C9933A' }}>
        All three phases. One master plan.
      </p>

      {/* Mobile: stacked cards, one per phase. */}
      <div className="block md:hidden space-y-4">
        {phases.map((phase) => (
          <div key={phase.name} className={`rounded-xl border-2 p-5 ${phase.cardClass}`}>
            <div className="flex items-center gap-3 mb-4">
              {phase.icon}
              <div>
                <p
                  className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full inline-block ${phase.badge}`}
                >
                  {phase.badgeLabel}
                </p>
                <h3
                  className={`font-playfair text-lg font-bold mt-1 ${phase.dark ? 'text-white' : 'text-[#0D1F3C]'}`}
                >
                  Krisumi {phase.name}
                </h3>
                <p
                  className={`text-sm ${phase.dark ? 'text-gray-300' : 'text-gray-600'}`}
                >
                  {phase.sub}
                </p>
              </div>
            </div>
            {rowLabels.map((row) => (
              <div
                key={row.key}
                className={`flex justify-between items-start py-2 border-b last:border-0 ${phase.dark ? 'border-white/15' : 'border-black/10'}`}
              >
                <span
                  className={`text-xs font-semibold uppercase tracking-wide flex items-center gap-1 ${phase.dark ? 'text-white/60' : 'text-gray-600'}`}
                >
                  {row.icon}
                  {row.label}
                </span>
                <span
                  className={`text-sm font-medium text-right max-w-[55%] ${phase.dark ? 'text-white' : 'text-[#0D1F3C]'}`}
                >
                  {phase.rows[row.key]}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Desktop: 4-column comparison grid (label column + one per phase). */}
      <div className="hidden md:block overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
        {/* Header row */}
        <div className="grid grid-cols-4" style={{ backgroundColor: '#0D1F3C' }}>
          <div className="p-4" />
          {phases.map((phase) => (
            <div key={phase.name} className="p-4 text-center border-l border-white/10">
              <div className="flex justify-center mb-2">{phase.icon}</div>
              <span
                className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${phase.badge}`}
              >
                {phase.badgeLabel}
              </span>
              <p className="font-playfair text-white text-lg font-bold mt-2">
                Krisumi {phase.name}
              </p>
              <p className="text-gray-400 text-xs mt-0.5">{phase.sub}</p>
            </div>
          ))}
        </div>

        {/* Data rows */}
        {rowLabels.map((row, idx) => (
          <div
            key={row.key}
            className={`grid grid-cols-4 border-t border-gray-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
          >
            <div className="p-4 flex items-center gap-2 font-semibold text-sm text-[#0D1F3C]">
              <span style={{ color: '#C9933A' }}>{row.icon}</span>
              {row.label}
            </div>
            {phases.map((phase) => (
              <div
                key={phase.name}
                className="p-4 text-sm text-center border-l border-gray-100 text-gray-700"
              >
                {phase.rows[row.key]}
              </div>
            ))}
          </div>
        ))}
      </div>

      <p className="text-center font-caveat text-base text-gray-500 mt-3">
        Verify HARERA numbers on haryanarera.gov.in before booking
      </p>
    </motion.div>
  );
}
