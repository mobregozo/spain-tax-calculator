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

export interface TaxCalculationResult {
  grossIncome: number;
  netIncome: number;
  deductions: Record<string, number>;
  monthlyNet: number;
  customDeductions: DeductionItem[];
}