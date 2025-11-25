import React from 'react';
import { HARVEST_ROUNDS } from '../constants';

interface Props {
  currentRound: number;
}

const STAGES = [
  { id: 1, rounds: [1, 2, 3, 4] },
  { id: 2, rounds: [5, 6, 7] },
  { id: 3, rounds: [8, 9] },
  { id: 4, rounds: [10, 11] },
  { id: 5, rounds: [12, 13] },
  { id: 6, rounds: [14] },
];

const RoundTracker: React.FC<Props> = ({ currentRound }) => {
  return (
    <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-thin pb-2 px-1 max-w-full">
      {STAGES.map((stage) => {
          const isActiveStage = currentRound >= stage.rounds[0] && currentRound <= stage.rounds[stage.rounds.length-1];
          const isPastStage = currentRound > stage.rounds[stage.rounds.length-1];
          
          return (
            <div key={stage.id} className={`flex flex-col items-center transition-opacity duration-500 flex-shrink-0 ${isPastStage ? 'opacity-50 grayscale' : 'opacity-100'}`}>
            <div className={`flex items-center gap-0.5 sm:gap-1 px-1.5 py-1 rounded-xl border ${
                isActiveStage 
                ? 'bg-stone-800 border-stone-500 shadow-lg' 
                : 'bg-black/20 border-white/5'
            }`}>
                {stage.rounds.map(r => {
                    const isPast = r < currentRound;
                    const isCurrent = r === currentRound;
                    const isHarvest = HARVEST_ROUNDS.includes(r);

                    return (
                        <div key={r} className="relative flex flex-col items-center mx-0.5">
                            <div 
                                className={`
                                w-5 h-5 sm:w-7 sm:h-7 flex items-center justify-center rounded-full text-[10px] sm:text-xs font-bold border transition-all duration-300
                                ${isCurrent 
                                    ? 'bg-amber-500 text-black border-amber-300 scale-110 z-10 shadow-[0_0_8px_rgba(245,158,11,0.5)]' 
                                    : isPast 
                                    ? 'bg-stone-700 text-stone-500 border-stone-600' 
                                    : 'bg-stone-900 text-stone-700 border-stone-800'
                                }
                                `}
                            >
                                {r}
                            </div>
                            {isHarvest && (
                                <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 text-[8px] sm:text-[10px] leading-none ${isCurrent ? 'animate-bounce' : ''}`} title="Harvest Phase">
                                    🌾
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            <div className={`text-[8px] uppercase font-bold mt-1 tracking-wider ${isActiveStage ? 'text-amber-500/80' : 'text-stone-600'}`}>
                Stage {stage.id}
            </div>
            </div>
        );
      })}
    </div>
  );
};

export default RoundTracker;