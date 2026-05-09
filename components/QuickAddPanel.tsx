'use client';

import { useState } from 'react';
import { PRESET_CATEGORIES } from '@/lib/presets';
import type { PresetJob } from '@/lib/presets';

interface Props {
  onAdd: (job: PresetJob) => void;
}

export default function QuickAddPanel({ onAdd }: Props) {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const toggle = (name: string) =>
    setOpenCategory((prev) => (prev === name ? null : name));

  return (
    <div className="space-y-1.5">
      {PRESET_CATEGORIES.map((cat) => {
        const isOpen = openCategory === cat.name;
        return (
          <div key={cat.name} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggle(cat.name)}
              className="w-full flex items-center justify-between px-4 py-2.5 bg-gray-50 hover:bg-gray-100 text-left transition-colors"
            >
              <span className="font-medium text-sm text-gray-700">
                {cat.emoji} {cat.name}
              </span>
              <span className="text-gray-400 text-xs">{isOpen ? '▲' : '▼'}</span>
            </button>

            {isOpen && (
              <div className="p-3 grid grid-cols-2 gap-2 bg-white">
                {cat.jobs.map((job, i) => (
                  <div
                    key={i}
                    className="border border-gray-100 rounded-lg p-2.5 flex flex-col gap-2 bg-gray-50 hover:bg-white hover:border-gray-200 transition-colors"
                  >
                    <p className="text-xs text-gray-700 leading-snug flex-1">{job.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-400">
                        {job.qty} ·{' '}
                        <span className="font-semibold text-gray-600">${job.price}</span>
                      </div>
                      <button
                        onClick={() => onAdd(job)}
                        className="bg-blue-600 text-white px-2.5 py-1 rounded text-xs font-medium hover:bg-blue-700 active:bg-blue-800 transition-colors"
                      >
                        + Add
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
