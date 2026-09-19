import { useEffect, useRef, useState } from 'react';
import { Refrigerator, ChefHat, Leaf } from 'lucide-react';
import { useGSAP, gsap } from '../../lib/gsap';
import ThemeToggle from '../common/ThemeToggle';
import Aurora from '../common/Aurora';

const AURORA_DARK = ['#3f3f70', '#d3d3e6', '#7070a3'];
const AURORA_LIGHT = ['#6c6cc4', '#b4b4ea', '#8a8ad8'];

function useIsDark() {
  const read = () => document.documentElement.getAttribute('data-theme') === 'dark';
  const [isDark, setIsDark] = useState(read);

  useEffect(() => {
    const observer = new MutationObserver(() => setIsDark(read()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  return isDark;
}

const FEATURES = [
  { icon: Refrigerator, label: 'Know what\u2019s inside.' },
  { icon: ChefHat, label: 'Get personalized recipes.' },
  { icon: Leaf, label: 'Reduce food waste.' },
];

function Brand() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary)] text-[var(--color-bg)] shadow-sm">
        <Refrigerator size={18} />
      </div>
      <div className="leading-tight">
        <p className="text-sm font-bold tracking-wide text-[var(--color-text)]">SMARTAI</p>
        <p className="text-xs text-[var(--color-text-muted)]">Refrigerator</p>
      </div>
    </div>
  );
}

export default function AuthLayout({ heading, tagline, children }) {
  const cardRef = useRef(null);
  const isDark = useIsDark();
  const [reduceMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useGSAP(
    () => {
      if (!cardRef.current) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      gsap.from(cardRef.current, { opacity: 0, y: 16, duration: 0.45, ease: 'power2.out' });
    },
    { scope: cardRef }
  );

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[var(--color-bg)]">
      {/* Aurora: mode terang memakai lightMode (opaque, dasar putih),
          mode gelap transparan di atas var(--color-bg). */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Aurora
          colorStops={isDark ? AURORA_DARK : AURORA_LIGHT}
          lightMode={!isDark}
          blend={0.5}
          amplitude={1.0}
          speed={reduceMotion ? 0 : 0.5}
        />
      </div>

      <div className="absolute right-4 top-4 z-20 sm:right-8 sm:top-6">
        <ThemeToggle />
      </div>

      <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 gap-10 px-4 py-16 sm:px-8 lg:grid-cols-2 lg:px-12 lg:py-12">
        {/* Panel brand (desktop) */}
        <aside className="hidden flex-col justify-between py-4 lg:flex">
          <Brand />

          <div className="max-w-md">
            <h1 className="font-serif text-5xl font-extrabold leading-[1.05] text-[var(--color-text)]">
              {heading}
            </h1>
            <p className="mt-4 text-lg text-[var(--color-text-muted)]">{tagline}</p>

            <ul className="mt-8 space-y-3">
              {FEATURES.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)]">
                    <Icon size={16} />
                  </span>
                  <span className="text-sm text-[var(--color-text)]">{label}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-xs text-[var(--color-text-muted)]">Smarter Food / Healthier You</p>
        </aside>

        {/* Kolom kartu */}
        <main className="flex flex-col items-center justify-center gap-6 lg:items-end">
          <div className="lg:hidden">
            <Brand />
          </div>

          <div
            ref={cardRef}
            className="w-full max-w-[420px] rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-2xl sm:p-8"
          >
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}