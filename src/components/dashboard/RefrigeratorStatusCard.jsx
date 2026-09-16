// client/src/components/dashboard/RefrigeratorStatusCard.jsx
// Visual "digital twin" card of the fridge, modelled on the reference photo.
// NOTE: totalIngredients/categoriesCount come from the real inventory API.
// Temperature/humidity/door-state are NOT backed by a sensor endpoint in
// this backend (it's an inventory app, not connected IoT hardware), so
// they're shown as an illustrative/demo reading — see the change notes for
// how to wire real telemetry in if a sensor API is added later.
import { Thermometer, Droplets, DoorClosed } from 'lucide-react';
import refrigeratorImg from '../../assets/refrigerator.png';

export default function RefrigeratorStatusCard({ totalIngredients = 0 }) {
  return (
    <div className="bg-[var(--color-surface)] rounded-2xl shadow-sm border border-[var(--color-border)] overflow-hidden transition-colors">
      <div className="px-5 py-3.5 border-b border-[var(--color-border)] flex justify-between items-center">
        <h3 className="font-semibold text-base font-serif text-[var(--color-text)]">Refrigerator Status</h3>
        <span className="flex items-center text-[11px] font-bold text-[var(--color-success)] bg-[var(--color-success-soft)] px-2.5 py-1 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)] mr-1.5 animate-pulse" />
          Online
        </span>
      </div>
      <div className="p-4 flex flex-col sm:flex-row items-center gap-4">
        <div className="w-36 h-44 flex-shrink-0 flex items-center justify-center">
          <img
            src={refrigeratorImg}
            alt="Smart refrigerator"
            className="max-h-full max-w-full object-contain drop-shadow-lg"
          />
        </div>
        <div className="flex-1 w-full grid grid-cols-3 gap-2.5">
          <div className="bg-[var(--color-surface-alt)] rounded-xl p-3 text-center border border-[var(--color-border)]/40">
            <Thermometer className="w-4 h-4 mx-auto mb-1 text-[var(--color-primary)]" />
            <p className="text-sm font-bold text-[var(--color-text)]">3°C</p>
            <p className="text-[10px] text-[var(--color-text-muted)]">Fridge</p>
          </div>
          <div className="bg-[var(--color-surface-alt)] rounded-xl p-3 text-center border border-[var(--color-border)]/40">
            <Droplets className="w-4 h-4 mx-auto mb-1 text-[var(--color-primary)]" />
            <p className="text-sm font-bold text-[var(--color-text)]">62%</p>
            <p className="text-[10px] text-[var(--color-text-muted)]">Humidity</p>
          </div>
          <div className="bg-[var(--color-surface-alt)] rounded-xl p-3 text-center border border-[var(--color-border)]/40">
            <DoorClosed className="w-4 h-4 mx-auto mb-1 text-[var(--color-primary)]" />
            <p className="text-sm font-bold text-[var(--color-text)]">Closed</p>
            <p className="text-[10px] text-[var(--color-text-muted)]">Door</p>
          </div>
        </div>
      </div>
      <div className="px-4.5 pb-4">
        <p className="text-[10px] text-[var(--color-text-muted)] text-center">
          {totalIngredients} items tracked · demo sensor reading (no hardware connected)
        </p>
      </div>
    </div>
  );
}
