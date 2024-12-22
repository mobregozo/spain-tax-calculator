import { TAX_RATES } from '../constants/tax-rates';
import type { TaxCalculationResult, DeductionItem } from '../types/tax';

function calculateProgressiveIncomeTax(income: number): number {
  let remainingIncome = income;
  let totalTax = 0;
  let previousThreshold = 0;

  for (const bracket of TAX_RATES.INCOME_TAX_BRACKETS) {
    const taxableInThisBracket = Math.min(
      remainingIncome,
      bracket.threshold - previousThreshold
    );
    
    if (taxableInThisBracket > 0) {
      totalTax += taxableInThisBracket * bracket.rate;
      remainingIncome -= taxableInThisBracket;
    }

    if (remainingIncome <= 0) break;
    previousThreshold = bracket.threshold;
  }

  return totalTax;
}

function calculateDeductions(grossIncome: number, items: DeductionItem[]): Record<string, number> {
  const deductions: Record<string, number> = {};
  
  items.forEach((item) => {
    if (item.type === 'percentage') {
      deductions[item.name] = (grossIncome * item.amount) / 100;
    } else {
      deductions[item.name] = item.type === 'fixed' ? item.amount : item.amount * 12;
    }
  });

  return deductions;
}

export function calculateEmployeeTax(
  grossIncome: number, 
  customDeductions: DeductionItem[] = []
): TaxCalculationResult {
  const baseDeductions: DeductionItem[] = [
    { id: '1', name: 'Social Security', amount: TAX_RATES.SOCIAL_SECURITY.EMPLOYEE_RATE * 100, type: 'percentage' },
    { id: '2', name: 'Income Tax', amount: calculateProgressiveIncomeTax(grossIncome), type: 'fixed' },
  ];

  const deductions = calculateDeductions(grossIncome, [...baseDeductions, ...customDeductions]);
  const totalDeductions = Object.values(deductions).reduce((a, b) => a + b, 0);
  const netIncome = grossIncome - totalDeductions;

  return {
    grossIncome,
    netIncome,
    deductions,
    monthlyNet: netIncome / 12,
    customDeductions,
  };
}

export function calculateSelfEmployedTax(
  grossIncome: number,
  customDeductions: DeductionItem[] = []
): TaxCalculationResult {
  const baseDeductions: DeductionItem[] = [
    { id: '3', name: 'Social Security', amount: TAX_RATES.SOCIAL_SECURITY.SELF_EMPLOYED_BASE, type: 'fixed' },
    { id: '4', name: 'Income Tax', amount: calculateProgressiveIncomeTax(grossIncome), type: 'fixed' },
    { id: '5', name: 'VAT', amount: TAX_RATES.VAT_RATE * 100, type: 'percentage' },
  ];

  const deductions = calculateDeductions(grossIncome, [...baseDeductions, ...customDeductions]);
  const totalDeductions = Object.values(deductions).reduce((a, b) => a + b, 0);
  const netIncome = grossIncome - totalDeductions;

  return {
    grossIncome,
    netIncome,
    deductions,
    monthlyNet: netIncome / 12,
    customDeductions,
  };
}