import React, { useState } from 'react';
import { SCORING_TIERS } from '../constants';

const ICONS: { [key: string]: string } = {
  fields: '🚜',
  pastures: '🚧',
  grain: '🌾',
  veg: '🥕',
  sheep: '🐑',
  boar: '🐗',
  cow: '🐮',
};

const LABELS: { [key: string]: string } = {
  fields: 'Fields',
  pastures: 'Pastures',
  grain: 'Grain',
  veg: 'Vegetables',
  sheep: 'Sheep',
  boar: 'Boar',
  cow: 'Cattle',
};

const SCORES = [-1, 1, 2, 3, 4];

const getRange = (category: string, score: number) => {
  const tiers = SCORING_TIERS[category];
  const indices = tiers
    .map((s, i) => (s === score ? i : -1))
    .filter((i) => i !== -1);

  if (indices.length === 0) return '-';

  const isMax = indices[indices.length - 1] === tiers.length - 1;
  const min = indices[0];
  const max = indices[indices.length - 1];

  if (isMax) {
      // For the last tier, it means "min or more"
      return `${min}+`;
  }
  
  if (min === max) return `${min}`;
  return `${min}-${max}`;
};

const ScoringTable: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-slate-800 rounded-lg border-2 border-stone-700 shadow-xl overflow-hidden mt-2">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-stone-900 p-2 cursor-pointer flex justify-between items-center hover:bg-stone-800 transition-colors"
        title="Click to toggle scoring table"
      >
        <span className="font-bold text-gray-200 text-xs uppercase tracking-widest flex items-center gap-2">
            🏆 Scoring Guide
        </span>
        <span className="text-xs text-gray-400">{isOpen ? '▼' : '▶'}</span>
      </div>
      
      {isOpen && (
        <div className="p-2 overflow-x-auto bg-stone-800/50">
            <table className="w-full text-center border-collapse text-[10px]">
            <thead>
                <tr className="text-gray-400 border-b border-white/10">
                <th className="p-1 text-left">Res</th>
                {SCORES.map((s) => (
                    <th key={s} className={`p-1 font-bold ${s < 0 ? 'text-red-400' : 'text-green-400'}`}>
                        {s}
                    </th>
                ))}
                </tr>
            </thead>
            <tbody>
                {Object.keys(SCORING_TIERS).map((cat) => (
                <tr
                    key={cat}
                    className="hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                >
                    <td className="p-1 text-left font-bold text-gray-300 whitespace-nowrap flex items-center gap-1">
                        <span className="text-base">{ICONS[cat]}</span>
                        <span className="opacity-50 text-[9px] uppercase hidden sm:inline">{LABELS[cat]}</span>
                    </td>
                    {SCORES.map((s) => (
                    <td key={s} className="p-1 text-gray-300">
                        {getRange(cat, s)}
                    </td>
                    ))}
                </tr>
                ))}
            </tbody>
            </table>
            <div className="mt-2 text-[9px] text-gray-500 text-center italic">
                 Unused spaces: -1 pt
            </div>
        </div>
      )}
    </div>
  );
};

export default ScoringTable;