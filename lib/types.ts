export interface TaxBracket {
  threshold: number;
  rate: number;
}

export interface DeductionItem {
  id: string;
  name: string;
  amount: number;
  type: 'fixed' | 'percentage';
  isCustom?: boolean;
}

export interface CalculationResults {
  grossIncome: number;
  netIncome: number;
  deductions: Record<string, number>;
  customDeductions?: DeductionItem[];
}

export interface CustomDeduction {
  name: string;
  amount: number;
  type: 'fixed' | 'percentage';
}