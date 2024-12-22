"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Download, Twitter } from "lucide-react";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import { useRef } from "react";

interface ResultsDisplayProps {
  results: any;
  type: string;
}

export function ResultsDisplay({ results, type }: ResultsDisplayProps) {
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!resultsRef.current) return;
    
    const canvas = await toPng(resultsRef.current);
    const pdf = new jsPDF();
    
    pdf.addImage(canvas, 'PNG', 15, 15, 180, 160);
    pdf.save(`spain-tax-calculator-${type}.pdf`);
  };

  const handleShare = async () => {
    const text = `My ${type} calculation in Spain:
Annual Gross: €${results.grossIncome.toFixed(2)}
Annual Net: €${results.netIncome.toFixed(2)}
Monthly Net: €${(results.netIncome / 12).toFixed(2)}
Calculate yours at: [Your App URL]`;

    if (navigator.share) {
      await navigator.share({
        text,
        title: 'Spain Tax Calculator Results',
      });
    } else {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`);
    }
  };

  if (!results) return null;

  const monthlyNet = results.netIncome / 12;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>
          {type === "employee" ? "Full-Time Employee" : "Self-Employed"} Breakdown
        </CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={handleShare}>
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleDownloadPDF}>
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div ref={resultsRef} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Annual Gross Income</p>
              <p className="text-2xl font-bold">€{results.grossIncome.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Annual Net Income</p>
              <p className="text-2xl font-bold text-green-600">
                €{results.netIncome.toFixed(2)}
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Monthly Net Income</p>
            <p className="text-2xl font-bold text-green-600">
              €{monthlyNet.toFixed(2)}
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Deductions</h4>
            <div className="space-y-1">
              {Object.entries(results.deductions).map(([key, value]: [string, any]) => (
                <div key={key} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")}
                  </span>
                  <span>€{value.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}