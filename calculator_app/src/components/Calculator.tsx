
import React, { useState, useEffect } from 'react';
import { CalcMode } from '../types';
import { Delete, RotateCcw, Percent, Divide, X, Minus, Plus, Equal } from 'lucide-react';

interface CalculatorProps {
  mode: CalcMode;
  onResult: (expr: string, res: string) => void;
}

const Calculator: React.FC<CalculatorProps> = ({ mode, onResult }) => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [isNewNumber, setIsNewNumber] = useState(true);

  const handleNumber = (num: string) => {
    if (isNewNumber) {
      setDisplay(num);
      setIsNewNumber(false);
    } else {
      setDisplay(prev => prev === '0' ? num : prev + num);
    }
  };

  const handleOperator = (op: string) => {
    setEquation(display + ' ' + op + ' ');
    setIsNewNumber(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
    setIsNewNumber(true);
  };

  const handleDelete = () => {
    if (display.length > 1) {
      setDisplay(prev => prev.slice(0, -1));
    } else {
      setDisplay('0');
      setIsNewNumber(true);
    }
  };

  const calculate = () => {
    try {
      const fullExpr = equation + display;
      // Note: In a production app, use a safe math parser library. 
      // This is a simple implementation for demo purposes.
      const safeExpr = fullExpr.replace('×', '*').replace('÷', '/');
      const result = eval(safeExpr); 
      const resultStr = Number.isInteger(result) ? result.toString() : result.toFixed(8).replace(/\.?0+$/, "");
      
      onResult(fullExpr, resultStr);
      setDisplay(resultStr);
      setEquation('');
      setIsNewNumber(true);
    } catch (e) {
      setDisplay('Error');
      setTimeout(handleClear, 1500);
    }
  };

  const handleSci = (fn: string) => {
    try {
      let result = 0;
      const val = parseFloat(display);
      switch(fn) {
        case 'sin': result = Math.sin(val); break;
        case 'cos': result = Math.cos(val); break;
        case 'tan': result = Math.tan(val); break;
        case 'log': result = Math.log10(val); break;
        case 'sqrt': result = Math.sqrt(val); break;
        case 'sq': result = Math.pow(val, 2); break;
      }
      const resStr = result.toFixed(8).replace(/\.?0+$/, "");
      onResult(`${fn}(${display})`, resStr);
      setDisplay(resStr);
      setIsNewNumber(true);
    } catch {
      setDisplay('Error');
    }
  };

  return (
    <div className="glass w-full max-w-[400px] rounded-[2.5rem] p-6 shadow-2xl overflow-hidden relative border border-white/10 group">
      {/* Glossy Overlay */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>

      {/* Screen */}
      <div className="mb-6 px-4 py-8 flex flex-col items-end justify-end bg-black/20 rounded-3xl min-h-[140px] border border-white/5">
        <div className="text-slate-500 text-sm mono h-6 overflow-hidden text-right w-full">
          {equation}
        </div>
        <div className="text-white text-5xl font-light mono mt-2 tracking-tighter truncate w-full text-right">
          {display}
        </div>
      </div>

      {/* Scientific Grid */}
      {mode === CalcMode.SCIENTIFIC && (
        <div className="grid grid-cols-4 gap-3 mb-4 animate-in slide-in-from-top-4 duration-300">
          <SciBtn onClick={() => handleSci('sin')}>sin</SciBtn>
          <SciBtn onClick={() => handleSci('cos')}>cos</SciBtn>
          <SciBtn onClick={() => handleSci('tan')}>tan</SciBtn>
          <SciBtn onClick={() => handleSci('log')}>log</SciBtn>
          <SciBtn onClick={() => handleSci('sqrt')}>&radic;x</SciBtn>
          <SciBtn onClick={() => handleSci('sq')}>x&sup2;</SciBtn>
          <SciBtn onClick={() => handleNumber('3.14159')}>&pi;</SciBtn>
          <SciBtn onClick={() => handleNumber('2.71828')}>e</SciBtn>
        </div>
      )}

      {/* Standard Grid */}
      <div className="grid grid-cols-4 gap-3">
        <ControlBtn onClick={handleClear} color="text-rose-400"><RotateCcw size={20}/></ControlBtn>
        <ControlBtn onClick={handleDelete} color="text-amber-400"><Delete size={20}/></ControlBtn>
        <ControlBtn onClick={() => handleOperator('%')} color="text-indigo-400"><Percent size={20}/></ControlBtn>
        <OpBtn onClick={() => handleOperator('÷')}><Divide size={24}/></OpBtn>

        <NumBtn onClick={() => handleNumber('7')}>7</NumBtn>
        <NumBtn onClick={() => handleNumber('8')}>8</NumBtn>
        <NumBtn onClick={() => handleNumber('9')}>9</NumBtn>
        <OpBtn onClick={() => handleOperator('×')}><X size={24}/></OpBtn>

        <NumBtn onClick={() => handleNumber('4')}>4</NumBtn>
        <NumBtn onClick={() => handleNumber('5')}>5</NumBtn>
        <NumBtn onClick={() => handleNumber('6')}>6</NumBtn>
        <OpBtn onClick={() => handleOperator('-')}><Minus size={24}/></OpBtn>

        <NumBtn onClick={() => handleNumber('1')}>1</NumBtn>
        <NumBtn onClick={() => handleNumber('2')}>2</NumBtn>
        <NumBtn onClick={() => handleNumber('3')}>3</NumBtn>
        <OpBtn onClick={() => handleOperator('+')}><Plus size={24}/></OpBtn>

        <NumBtn onClick={() => handleNumber('0')} className="col-span-2">0</NumBtn>
        <NumBtn onClick={() => handleNumber('.')}>.</NumBtn>
        <button 
          onClick={calculate}
          className="calc-btn flex items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-900/40 hover:bg-indigo-500"
        >
          <Equal size={28} />
        </button>
      </div>
    </div>
  );
};

const NumBtn: React.FC<{ children: React.ReactNode; onClick: () => void; className?: string }> = ({ children, onClick, className = '' }) => (
  <button 
    onClick={onClick}
    className={`calc-btn h-16 flex items-center justify-center rounded-2xl bg-white/5 hover:bg-white/10 text-white text-xl font-medium border border-white/5 ${className}`}
  >
    {children}
  </button>
);

const OpBtn: React.FC<{ children: React.ReactNode; onClick: () => void }> = ({ children, onClick }) => (
  <button 
    onClick={onClick}
    className="calc-btn h-16 flex items-center justify-center rounded-2xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/20"
  >
    {children}
  </button>
);

const ControlBtn: React.FC<{ children: React.ReactNode; onClick: () => void; color?: string }> = ({ children, onClick, color = 'text-white' }) => (
  <button 
    onClick={onClick}
    className={`calc-btn h-16 flex items-center justify-center rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 ${color}`}
  >
    {children}
  </button>
);

const SciBtn: React.FC<{ children: React.ReactNode; onClick: () => void }> = ({ children, onClick }) => (
  <button 
    onClick={onClick}
    className="calc-btn h-10 flex items-center justify-center rounded-xl bg-indigo-500/5 hover:bg-indigo-500/10 text-indigo-300 text-sm font-medium border border-indigo-500/10"
  >
    {children}
  </button>
);

export default Calculator;
