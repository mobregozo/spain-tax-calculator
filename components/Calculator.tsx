"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { InfoIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ResultsChart } from "@/components/ResultsChart";
import { DeductionEditor } from "@/components/DeductionEditor";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { calculateEmployeeTax, calculateSelfEmployedTax } from "@/lib/taxCalculations";
import { DeductionItem } from "@/lib/types";

const defaultEmployeeDeductions: DeductionItem[] = [
  { id: "1", name: "IRPF", amount: 19, type: "percentage" },
  { id: "2", name: "Social Security", amount: 6.35, type: "percentage" },
];

const defaultSelfEmployedDeductions: DeductionItem[] = [
  { id: "3", name: "IRPF", amount: 19, type: "percentage" },
  { id: "4", name: "Social Security", amount: 294, type: "fixed" },
  { id: "5", name: "VAT", amount: 21, type: "percentage" },
];

export function Calculator() {
  const [grossSalary, setGrossSalary] = useState<string>("");
  const [employeeResults, setEmployeeResults] = useState<any>(null);
  const [selfEmployedResults, setSelfEmployedResults] = useState<any>(null);
  const [employeeDeductions, setEmployeeDeductions] = useState<DeductionItem[]>(defaultEmployeeDeductions);
  const [selfEmployedDeductions, setSelfEmployedDeductions] = useState<DeductionItem[]>(defaultSelfEmployedDeductions);

  const calculateResults = () => {
    const salary = parseFloat(grossSalary);
    if (!isNaN(salary)) {
      setEmployeeResults(calculateEmployeeTax(salary, employeeDeductions));
      setSelfEmployedResults(calculateSelfEmployedTax(salary, selfEmployedDeductions));
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Enter Your Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="grossSalary">
                Gross Annual Salary (€)
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="w-4 h-4 ml-1 inline-block" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Enter your expected annual gross income before taxes</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Input
                id="grossSalary"
                type="number"
                value={grossSalary}
                onChange={(e) => setGrossSalary(e.target.value)}
                placeholder="e.g. 40000"
              />
            </div>
            <Button onClick={calculateResults}>Calculate</Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="employee" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="employee">Full-Time Employee</TabsTrigger>
          <TabsTrigger value="self-employed">Self-Employed</TabsTrigger>
        </TabsList>

        <TabsContent value="employee">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Employee Deductions</CardTitle>
              </CardHeader>
              <CardContent>
                <DeductionEditor
                  deductions={employeeDeductions}
                  onUpdate={setEmployeeDeductions}
                />
              </CardContent>
            </Card>
            {employeeResults && (
              <ResultsDisplay results={employeeResults} type="employee" />
            )}
          </div>
        </TabsContent>

        <TabsContent value="self-employed">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Self-Employed Deductions</CardTitle>
              </CardHeader>
              <CardContent>
                <DeductionEditor
                  deductions={selfEmployedDeductions}
                  onUpdate={setSelfEmployedDeductions}
                />
              </CardContent>
            </Card>
            {selfEmployedResults && (
              <ResultsDisplay results={selfEmployedResults} type="self-employed" />
            )}
          </div>
        </TabsContent>
      </Tabs>

      {employeeResults && selfEmployedResults && (
        <ResultsChart
          employeeData={employeeResults}
          selfEmployedData={selfEmployedResults}
        />
      )}
    </div>
  );
}