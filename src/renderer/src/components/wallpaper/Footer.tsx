import React from 'react'


import Icon from '../shared/Icon'
import PaletteSelector from '../theme/PaletteChanger'
import ThemeToggle from '../theme/ThemeToggle'

interface FooterProps {
  backend: string;
  onBackendChange: (v: string) => void;

  monitors: string;
  onMonitorsChange: (v: string) => void;

  fit: string;
  onFitChange: (v: string) => void;

  onApply: () => void;
}


export default function Footer({
  backend,
  onBackendChange,
  monitors,
  onMonitorsChange,
  fit,
  onFitChange,
  onApply,
}: FooterProps) {
  return (
    <div className="flex-[1] flex">
      <div className="rounded-md px-4 bg-[var(--surface)] flex items-center gap-6 w-full h-full">

        <PaletteSelector />
        <ThemeToggle />

        <select value={backend} onChange={e => onBackendChange(e.target.value)}>
          <option value="swaybg">Swaybg</option>
        </select>

        <select value={monitors} onChange={e => onMonitorsChange(e.target.value)}>
          <option value="all">All</option>
        </select>

        <select value={fit} onChange={e => onFitChange(e.target.value)}>
          <option value="fill">Fill</option>
          <option value="contain">Contain</option>
        </select>

        <button
          onClick={onApply}
          className="h-9 px-4 rounded-md bg-[var(--primary)] text-[var(--onPrimary)]"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
