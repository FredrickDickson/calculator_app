
export interface CalculationHistory {
  id: string;
  expression: string;
  result: string;
  timestamp: number;
}

export enum CalcMode {
  STANDARD = 'STANDARD',
  SCIENTIFIC = 'SCIENTIFIC'
}

// Fixed missing interface for AI math solutions
export interface AISolution {
  answer: string;
  steps: string[];
  explanation: string;
}
