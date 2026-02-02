export interface CalculationHistory {
  id: string
  expression: string
  result: string
  timestamp: number
}

export const CalcMode = {
  STANDARD: 'STANDARD',
  SCIENTIFIC: 'SCIENTIFIC',
} as const

export type CalcMode = (typeof CalcMode)[keyof typeof CalcMode]

export interface AISolution {
  answer: string
  steps: string[]
  explanation: string
}

export type Operator = '+' | '-' | '*' | '/' | '%'

export type HistoryEntry = {
  id: string
  expression: string
  result: string
  createdAt: number
}
