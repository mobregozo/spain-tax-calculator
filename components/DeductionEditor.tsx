"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DeductionItem } from "@/lib/types";
import { X, Plus } from "lucide-react";

interface DeductionEditorProps {
  deductions: DeductionItem[];
  onUpdate: (deductions: DeductionItem[]) => void;
}

export function DeductionEditor({ deductions, onUpdate }: DeductionEditorProps) {
  const [newDeduction, setNewDeduction] = useState({
    name: "",
    amount: "",
    type: "fixed" as "fixed" | "percentage",
  });

  const handleAdd = () => {
    if (newDeduction.name && newDeduction.amount) {
      const newItem: DeductionItem = {
        id: crypto.randomUUID(),
        name: newDeduction.name,
        amount: Number(newDeduction.amount),
        type: newDeduction.type,
        isCustom: true,
      };
      onUpdate([...deductions, newItem]);
      setNewDeduction({ name: "", amount: "", type: "fixed" });
    }
  };

  const handleRemove = (id: string) => {
    onUpdate(deductions.filter((d) => d.id !== id));
  };

  const handleUpdate = (id: string, field: string, value: string | number) => {
    onUpdate(
      deductions.map((d) =>
        d.id === id ? { ...d, [field]: field === "amount" ? Number(value) : value } : d
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        {deductions.map((deduction) => (
          <div key={deduction.id} className="flex items-center gap-2">
            <Input
              value={deduction.name}
              onChange={(e) => handleUpdate(deduction.id, "name", e.target.value)}
              placeholder="Name"
              className="flex-1"
            />
            <Input
              type="number"
              value={deduction.amount}
              onChange={(e) => handleUpdate(deduction.id, "amount", e.target.value)}
              placeholder="Amount"
              className="w-32"
            />
            <Select
              value={deduction.type}
              onValueChange={(value) => handleUpdate(deduction.id, "type", value)}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fixed">Fixed (€)</SelectItem>
                <SelectItem value="percentage">Percentage (%)</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleRemove(deduction.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="flex items-end gap-2">
        <div className="grid flex-1 gap-2">
          <Label>New Deduction</Label>
          <Input
            value={newDeduction.name}
            onChange={(e) =>
              setNewDeduction({ ...newDeduction, name: e.target.value })
            }
            placeholder="Name"
          />
        </div>
        <div className="grid gap-2">
          <Label>Amount</Label>
          <Input
            type="number"
            value={newDeduction.amount}
            onChange={(e) =>
              setNewDeduction({ ...newDeduction, amount: e.target.value })
            }
            placeholder="Amount"
            className="w-32"
          />
        </div>
        <div className="grid gap-2">
          <Label>Type</Label>
          <Select
            value={newDeduction.type}
            onValueChange={(value) =>
              setNewDeduction({ ...newDeduction, type: value as "fixed" | "percentage" })
            }
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fixed">Fixed (€)</SelectItem>
              <SelectItem value="percentage">Percentage (%)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Add
        </Button>
      </div>
    </div>
  );
}