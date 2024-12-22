import { DeductionItem } from "./types";

export function calculateEmployeeTax(grossIncome: number, deductions: DeductionItem[]) {
  const calculatedDeductions: Record<string, number> = {};
  
  deductions.forEach((deduction) => {
    if (deduction.type === "percentage") {
      calculatedDeductions[deduction.name] = (grossIncome * deduction.amount) / 100;
    } else {
      calculatedDeductions[deduction.name] = deduction.amount;
    }
  });

  const totalDeductions = Object.values(calculatedDeductions).reduce((a, b) => a + b, 0);
  const netIncome = grossIncome - totalDeductions;

  return {
    grossIncome,
    netIncome,
    deductions: calculatedDeductions,
  };
}

export function calculateSelfEmployedTax(grossIncome: number, deductions: DeductionItem[]) {
  const calculatedDeductions: Record<string, number> = {};
  
  deductions.forEach((deduction) => {
    if (deduction.type === "percentage") {
      calculatedDeductions[deduction.name] = (grossIncome * deduction.amount) / 100;
    } else {
      calculatedDeductions[deduction.name] = deduction.amount * 12; // Convert monthly fixed amounts to annual
    }
  });

  const totalDeductions = Object.values(calculatedDeductions).reduce((a, b) => a + b, 0);
  const netIncome = grossIncome - totalDeductions;

  return {
    grossIncome,
    netIncome,
    deductions: calculatedDeductions,
  };
}