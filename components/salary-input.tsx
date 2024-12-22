"use client";

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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SalaryInputProps {
  value: string;
  onChange: (value: string) => void;
  onCalculate: () => void;
}

export function SalaryInput({ value, onChange, onCalculate }: SalaryInputProps) {
  return (
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
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="e.g. 40000"
            />
          </div>
          <Button onClick={onCalculate}>Calculate</Button>
        </div>
      </CardContent>
    </Card>
  );
}