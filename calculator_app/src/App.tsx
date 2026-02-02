
import React, { useState, useCallback } from 'react';
import { Calculator as CalculatorIcon, Sparkles } from 'lucide-react';
import { CalcMode, CalculationHistory } from './types';
import Calculator from './components/Calculator';
import HistoryPanel from './components/HistoryPanel';



const App: React.FC = () => {
  const [mode, setMode] = useState<CalcMode>(CalcMode.STANDARD);
  const [history, setHistory] = useState<CalculationHistory[]>([]);

  const addToHistory = useCallback((expression: string, result: string) => {
    const newEntry: CalculationHistory = {
      id: Math.random().toString(36).substr(2, 9),
      expression,
      result,
      timestamp: Date.now()
    };
    setHistory(prev => [newEntry, ...prev].slice(0, 50));
  }, []);

  const clearHistory = () => setHistory([]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 animate-in fade-in duration-700">
      {/* Background Orbs */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[150px]"></div>
      </div>

      <header className="mb-8 text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="bg-indigo-500/20 p-2 rounded-xl border border-indigo-500/30">
            <CalculatorIcon className="w-8 h-8 text-indigo-400" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            MathFlow
          </h1>
        </div>
        <p className="text-slate-400 text-sm font-medium">Precision calculation with a modern touch.</p>
      </header>

      <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Sidebar (Desktop) / Toggle (Mobile) */}
        <nav className="lg:col-span-2 flex flex-row lg:flex-col gap-2 p-1 bg-slate-900/40 rounded-2xl border border-slate-800 backdrop-blur-sm">
          <button 
            onClick={() => setMode(CalcMode.STANDARD)}
            className={`flex-1 lg:flex-none flex items-center justify-center lg:justify-start gap-3 px-4 py-3 rounded-xl transition-all ${mode === CalcMode.STANDARD ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' : 'text-slate-400 hover:bg-white/5'}`}
          >
            <CalculatorIcon size={20} />
            <span className="hidden lg:inline font-medium">Standard</span>
          </button>
          <button 
            onClick={() => setMode(CalcMode.SCIENTIFIC)}
            className={`flex-1 lg:flex-none flex items-center justify-center lg:justify-start gap-3 px-4 py-3 rounded-xl transition-all ${mode === CalcMode.SCIENTIFIC ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' : 'text-slate-400 hover:bg-white/5'}`}
          >
            <Sparkles size={20} />
            <span className="hidden lg:inline font-medium">Scientific</span>
          </button>
        </nav>

        {/* Main Content Area */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <Calculator mode={mode} onResult={addToHistory} />
        </div>

        {/* Side Panel: History */}
        <aside className="lg:col-span-3 flex flex-col h-full max-h-[600px]">
          <HistoryPanel 
            history={history} 
            onClear={clearHistory} 
            onSelect={(_entry: CalculationHistory) => {/* Reuse history logic could go here */}}
          />
        </aside>
      </main>

      <footer className="mt-12 text-slate-500 text-xs flex items-center gap-4">
        <span>&copy; 2024 MathFlow</span>
        <div className="w-1 h-1 bg-slate-700 rounded-full"></div>
        <span>High-performance computation</span>
      </footer>
    </div>
  );
};

export default App;
