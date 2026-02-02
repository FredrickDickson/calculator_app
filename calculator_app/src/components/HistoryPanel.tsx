
import React from 'react';
import { CalculationHistory } from '../types';
import { History, Trash2, Clock } from 'lucide-react';

interface HistoryPanelProps {
  history: CalculationHistory[];
  onClear: () => void;
  onSelect: (entry: CalculationHistory) => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onClear, onSelect }) => {
  return (
    <div className="glass rounded-[2rem] p-6 h-full border border-white/10 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <History className="text-indigo-400" size={18} />
          <h3 className="text-lg font-semibold text-white">History</h3>
        </div>
        {history.length > 0 && (
          <button 
            onClick={onClear}
            className="text-slate-500 hover:text-rose-400 transition-colors"
            title="Clear history"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {history.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center opacity-30 text-center px-4">
            <Clock size={48} className="mb-4" />
            <p className="text-sm">No calculations yet</p>
          </div>
        ) : (
          history.map((entry) => (
            <div 
              key={entry.id}
              onClick={() => onSelect(entry)}
              className="group cursor-pointer bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl p-4 transition-all"
            >
              <div className="text-xs text-slate-500 mono mb-1 group-hover:text-indigo-300 transition-colors">
                {entry.expression}
              </div>
              <div className="text-lg font-bold text-white mono truncate">
                = {entry.result}
              </div>
              <div className="text-[10px] text-slate-600 mt-2">
                {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistoryPanel;
