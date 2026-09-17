// client/src/components/dashboard/TemperatureTrendCard.jsx
// 7-day temperature telemetry chart matching the reference dashboard photo
import React, { useState } from 'react';
import { Thermometer, ChevronDown } from 'lucide-react';

const DAYS_DATA = [
  { day: 'Apr 20', fridge: 3.1, freezer: -18.2 },
  { day: 'Apr 21', fridge: 2.9, freezer: -18.0 },
  { day: 'Apr 22', fridge: 3.2, freezer: -18.4 },
  { day: 'Apr 23', fridge: 3.0, freezer: -17.9 },
  { day: 'Apr 24', fridge: 2.8, freezer: -18.1 },
  { day: 'Apr 25', fridge: 3.1, freezer: -18.3 },
  { day: 'Apr 26', fridge: 3.0, freezer: -18.0 },
];

export default function TemperatureTrendCard() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  // SVG Chart Dimensions
  const width = 460;
  const height = 150;
  const padding = { top: 20, right: 20, bottom: 25, left: 38 };

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Range: -20 to 10 degrees
  const minTemp = -20;
  const maxTemp = 10;
  const tempRange = maxTemp - minTemp;

  const getY = (temp) => {
    const norm = (temp - minTemp) / tempRange;
    return padding.top + chartHeight - norm * chartHeight;
  };

  const getX = (index) => {
    return padding.left + (index / (DAYS_DATA.length - 1)) * chartWidth;
  };

  // Build SVG paths for Fridge (around 3C) and Freezer (around -18C)
  const fridgePoints = DAYS_DATA.map((d, i) => `${getX(i)},${getY(d.fridge)}`).join(' ');
  const freezerPoints = DAYS_DATA.map((d, i) => `${getX(i)},${getY(d.freezer)}`).join(' ');

  const yLabels = [10, 5, 0, -5, -10, -15, -20];

  return (
    <div className="bg-[var(--color-surface)] rounded-2xl shadow-sm border border-[var(--color-border)] overflow-hidden transition-colors flex flex-col justify-between">
      {/* Header */}
      <div className="px-5 py-3.5 border-b border-[var(--color-border)] flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Thermometer className="w-4 h-4 text-[var(--color-primary)]" />
          <h3 className="font-semibold text-base font-serif text-[var(--color-text)]">
            Temperature Trend
          </h3>
        </div>
        <button
          type="button"
          className="flex items-center text-xs font-semibold px-2.5 py-1 rounded-lg bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-primary-soft)] transition-colors"
        >
          <span>7 Days</span>
          <ChevronDown className="w-3.5 h-3.5 ml-1 text-[var(--color-text-muted)]" />
        </button>
      </div>

      {/* Legend */}
      <div className="px-5 pt-3 flex items-center justify-end space-x-4 text-xs">
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#4F5BFF]" />
          <span className="text-[var(--color-text-muted)] text-[11px] font-medium">Fridge (3°C)</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#A76CFF]" />
          <span className="text-[var(--color-text-muted)] text-[11px] font-medium">Freezer (-18°C)</span>
        </div>
      </div>

      {/* SVG Line Chart */}
      <div className="px-4 py-2 w-full">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible select-none">
          {/* Grid lines & Y Axis */}
          {yLabels.map((val) => {
            const y = getY(val);
            return (
              <g key={val}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke="var(--color-border)"
                  strokeDasharray="3 3"
                  strokeOpacity={0.5}
                />
                <text
                  x={padding.left - 6}
                  y={y + 3}
                  textAnchor="end"
                  fontSize="9"
                  fill="var(--color-text-muted)"
                  className="font-mono"
                >
                  {val > 0 ? `+${val}°` : `${val}°`}
                </text>
              </g>
            );
          })}

          {/* Fridge line (Blue) */}
          <polyline
            fill="none"
            stroke="#4F5BFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={fridgePoints}
          />

          {/* Freezer line (Purple) */}
          <polyline
            fill="none"
            stroke="#A76CFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={freezerPoints}
          />

          {/* Data Points */}
          {DAYS_DATA.map((d, i) => {
            const x = getX(i);
            const yFridge = getY(d.fridge);
            const yFreezer = getY(d.freezer);
            const isHovered = hoveredIdx === i;

            return (
              <g key={i} onMouseEnter={() => setHoveredIdx(i)} onMouseLeave={() => setHoveredIdx(null)}>
                {/* Vertical hover line */}
                {isHovered && (
                  <line
                    x1={x}
                    y1={padding.top}
                    x2={x}
                    y2={height - padding.bottom}
                    stroke="var(--color-primary)"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                  />
                )}

                {/* Fridge point */}
                <circle
                  cx={x}
                  cy={yFridge}
                  r={isHovered ? 5 : 3.5}
                  fill="#4F5BFF"
                  stroke="var(--color-surface)"
                  strokeWidth="2"
                  className="transition-all cursor-pointer"
                />

                {/* Freezer point */}
                <circle
                  cx={x}
                  cy={yFreezer}
                  r={isHovered ? 5 : 3.5}
                  fill="#A76CFF"
                  stroke="var(--color-surface)"
                  strokeWidth="2"
                  className="transition-all cursor-pointer"
                />

                {/* X Axis Labels */}
                <text
                  x={x}
                  y={height - 6}
                  textAnchor="middle"
                  fontSize="9"
                  fill={isHovered ? 'var(--color-primary)' : 'var(--color-text-muted)'}
                  fontWeight={isHovered ? 'bold' : 'normal'}
                >
                  {d.day}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Interactive Tooltip bar at bottom */}
      <div className="px-5 py-2 border-t border-[var(--color-border)]/60 bg-[var(--color-surface-alt)]/30 flex justify-between items-center text-xs">
        <span className="text-[11px] text-[var(--color-text-muted)] font-medium">
          {hoveredIdx !== null ? `${DAYS_DATA[hoveredIdx].day}:` : 'Stability Status:'}
        </span>
        <span className="text-[11px] font-semibold text-[var(--color-success)]">
          {hoveredIdx !== null
            ? `Fridge ${DAYS_DATA[hoveredIdx].fridge}°C · Freezer ${DAYS_DATA[hoveredIdx].freezer}°C`
            : '✓ Temperature Optimal (±0.4°C variance)'}
        </span>
      </div>
    </div>
  );
}
