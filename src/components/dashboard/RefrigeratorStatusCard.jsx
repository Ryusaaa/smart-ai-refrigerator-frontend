import React from 'react';
import { Thermometer, Droplets, DoorClosed, ChevronRight, Snowflake } from 'lucide-react';
import refrigeratorImg from '../../assets/refrigerator.png';

export default function RefrigeratorStatusCard({ totalIngredients = 0 }) {
  return (
    <div className="bg-[var(--color-surface)] rounded-2xl shadow-[var(--shadow-card)] border border-[var(--color-card-border)] overflow-hidden transition-colors flex flex-col justify-between">
      {/* Header */}
      <div className="px-5 py-3.5 border-b border-[var(--color-border)] flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h3 className="font-semibold text-base font-serif text-[var(--color-text)]">
            Refrigerator Status
          </h3>
          <span className="flex items-center text-[11px] font-bold text-[var(--color-success)] bg-[var(--color-success-soft)] px-2.5 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)] mr-1.5 animate-pulse" />
            Online
          </span>
        </div>
        <ChevronRight className="w-4 h-4 text-[var(--color-text-muted)] cursor-pointer hover:text-[var(--color-text)] transition-colors" />
      </div>

      {/* Body: Large Refrigerator Asset on Left + Telemetry on Right */}
      <div className="p-5 flex flex-col sm:flex-row items-center gap-6">
        {/* Large Prominent Refrigerator Image */}
        <div className="w-36 sm:w-44 h-56 sm:h-64 flex-shrink-0 flex items-center justify-center p-1 bg-[var(--color-surface-alt)]/30 rounded-2xl border border-[var(--color-border)]/40">
          <img
            src={refrigeratorImg}
            alt="Samsung Smart Refrigerator"
            className="h-full w-auto max-w-full object-contain drop-shadow-xl transition-transform hover:scale-105 duration-300"
          />
        </div>

        {/* Right Info Section */}
        <div className="flex-1 w-full flex flex-col justify-between space-y-4">
          {/* Main Temperature Display */}
          <div className="flex items-center space-x-3.5 bg-[var(--color-surface-alt)]/60 rounded-2xl p-3.5 border border-[var(--color-border)]/40">
            <div className="w-12 h-12 rounded-2xl bg-[var(--color-primary)]/15 text-[var(--color-primary)] flex items-center justify-center flex-shrink-0 shadow-2xs">
              <Snowflake className="w-6 h-6 animate-spin" style={{ animationDuration: '20s' }} />
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--color-text)] font-heading leading-none">
                3°C
              </div>
              <p className="text-xs text-[var(--color-text-muted)] font-medium mt-1">
                Current Temperature
              </p>
            </div>
          </div>

          {/* 3 Mini Sensor Tiles in a Row */}
          <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
            {/* Freezer */}
            <div className="bg-[var(--color-surface-alt)] rounded-xl p-2.5 text-center border border-[var(--color-border)]/40 hover:border-[var(--color-primary)]/30 transition-colors">
              <Snowflake className="w-4 h-4 mx-auto mb-1 text-[var(--color-primary)]" />
              <p className="text-xs sm:text-sm font-bold text-[var(--color-text)]">-18°C</p>
              <p className="text-[10px] text-[var(--color-text-muted)] font-medium">Freezer</p>
            </div>

            {/* Humidity */}
            <div className="bg-[var(--color-surface-alt)] rounded-xl p-2.5 text-center border border-[var(--color-border)]/40 hover:border-[var(--color-primary)]/30 transition-colors">
              <Droplets className="w-4 h-4 mx-auto mb-1 text-[var(--color-primary)]" />
              <p className="text-xs sm:text-sm font-bold text-[var(--color-text)]">62%</p>
              <p className="text-[10px] text-[var(--color-text-muted)] font-medium">Humidity</p>
            </div>

            {/* Door */}
            <div className="bg-[var(--color-surface-alt)] rounded-xl p-2.5 text-center border border-[var(--color-border)]/40 hover:border-[var(--color-primary)]/30 transition-colors">
              <DoorClosed className="w-4 h-4 mx-auto mb-1 text-[var(--color-success)]" />
              <p className="text-xs sm:text-sm font-bold text-[var(--color-text)]">Closed</p>
              <p className="text-[10px] text-[var(--color-text-muted)] font-medium">Door</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Status */}
      <div className="px-5 py-2.5 border-t border-[var(--color-border)]/60 bg-[var(--color-surface-alt)]/30">
        <p className="text-[11px] text-[var(--color-text-muted)] text-center font-medium">
          {totalIngredients} items tracked · Smart Cooling Active · Auto-defrost Standby
        </p>
      </div>
    </div>
  );
}
