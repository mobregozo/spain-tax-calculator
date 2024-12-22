"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeProvider } from "@/components/theme-provider";
import { SalaryInput } from "@/components/salary-input";
import { ResultsDisplay } from "@/components/results-display";
import { ComparisonChart } from "@/components/comparison-chart";
import { DeductionEditor } from "@/components/deduction-editor";
import { calculateEmployeeTax, calculateSelfEmployedTax } from "@/lib/utils/tax-calculations";
import type { TaxCalculationResult, DeductionItem } from "@/lib/types/tax";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const [grossSalary, setGrossSalary] = useState<string>("");
  const [employeeResults, setEmployeeResults] = useState<TaxCalculationResult | null>(null);
  const [selfEmployedResults, setSelfEmployedResults] = useState<TaxCalculationResult | null>(null);
  const [employeeDeductions, setEmployeeDeductions] = useState<DeductionItem[]>([]);
  const [selfEmployedDeductions, setSelfEmployedDeductions] = useState<DeductionItem[]>([]);

  const handleCalculate = () => {
    const salary = parseFloat(grossSalary);
    if (!isNaN(salary)) {
      setEmployeeResults(calculateEmployeeTax(salary, employeeDeductions));
      setSelfEmployedResults(calculateSelfEmployedTax(salary, selfEmployedDeductions));
    }
  };

  const handleEmployeeDeductionsUpdate = (deductions: DeductionItem[]) => {
    setEmployeeDeductions(deductions);
    if (employeeResults) {
      const salary = parseFloat(grossSalary);
      if (!isNaN(salary)) {
        setEmployeeResults(calculateEmployeeTax(salary, deductions));
      }
    }
  };

  const handleSelfEmployedDeductionsUpdate = (deductions: DeductionItem[]) => {
    setSelfEmployedDeductions(deductions);
    if (selfEmployedResults) {
      const salary = parseFloat(grossSalary);
      if (!isNaN(salary)) {
        setSelfEmployedResults(calculateSelfEmployedTax(salary, deductions));
      }
    }
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">Spanish Income Calculator</h1>
            <p className="text-lg text-muted-foreground">
              Compare income and deductions between self-employed and full-time employment in Spain
            </p>
          </div>
          
          <SalaryInput
            value={grossSalary}
            onChange={setGrossSalary}
            onCalculate={handleCalculate}
          />

          {(employeeResults || selfEmployedResults) && (
            <Tabs defaultValue="employee" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="employee">Full-Time Employee</TabsTrigger>
                <TabsTrigger value="self-employed">Self-Employed</TabsTrigger>
              </TabsList>

              <TabsContent value="employee" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Employee Deductions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <DeductionEditor
                      deductions={employeeDeductions}
                      onUpdate={handleEmployeeDeductionsUpdate}
                    />
                  </CardContent>
                </Card>
                {employeeResults && (
                  <ResultsDisplay results={employeeResults} type="employee" />
                )}
              </TabsContent>

              <TabsContent value="self-employed" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Self-Employed Deductions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <DeductionEditor
                      deductions={selfEmployedDeductions}
                      onUpdate={handleSelfEmployedDeductionsUpdate}
                    />
                  </CardContent>
                </Card>
                {selfEmployedResults && (
                  <ResultsDisplay results={selfEmployedResults} type="self-employed" />
                )}
              </TabsContent>
            </Tabs>
          )}

          {employeeResults && selfEmployedResults && (
            <ComparisonChart
              employeeData={employeeResults}
              selfEmployedData={selfEmployedResults}
            />
          )}
        </div>
      </main>
    </ThemeProvider>
  );
}