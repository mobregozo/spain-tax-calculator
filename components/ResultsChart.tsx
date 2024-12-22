"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ResultsChart({ employeeData, selfEmployedData }: any) {
  const data = [
    {
      name: "Gross Income",
      Employee: employeeData.grossIncome,
      "Self-Employed": selfEmployedData.grossIncome,
    },
    {
      name: "Net Income",
      Employee: employeeData.netIncome,
      "Self-Employed": selfEmployedData.netIncome,
    },
    {
      name: "Total Deductions",
      Employee: Object.values(employeeData.deductions).reduce((a: number, b: number) => a + b, 0),
      "Self-Employed": Object.values(selfEmployedData.deductions).reduce(
        (a: number, b: number) => a + b,
        0
      ),
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Comparison Chart</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `€${value.toFixed(2)}`} />
              <Legend />
              <Bar dataKey="Employee" fill="hsl(var(--chart-1))" />
              <Bar dataKey="Self-Employed" fill="hsl(var(--chart-2))" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}