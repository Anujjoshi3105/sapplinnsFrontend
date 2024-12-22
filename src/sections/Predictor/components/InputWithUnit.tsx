import React, { useCallback } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Unit, UnitCategory, units, convertValue } from "../types";

type InputWithUnitProps = {
  name: string;
  label: string;
  UnitCategory: UnitCategory;
  value: string;
  unit: string;
  onChange: (value: string) => void;
  onUnitChange: (value: string) => void;
  loading: boolean;
};

export const InputWithUnit: React.FC<InputWithUnitProps> = React.memo(
  ({
    name,
    label,
    UnitCategory,
    value,
    unit,
    onChange,
    onUnitChange,
    loading,
  }) => {
    const handleUnitChange = useCallback(
      (newUnit: string) => {
        const numericValue = Number(value);
        if (!isNaN(numericValue)) {
          const convertedValue = convertValue(
            UnitCategory,
            numericValue,
            unit,
            newUnit
          ).toString();
          onChange(convertedValue);
        }
        onUnitChange(newUnit);
      },
      [value, unit, UnitCategory, onChange, onUnitChange]
    );

    return (
      <div className="space-y-2">
        <Label htmlFor={name}>{label}</Label>
        <div className="flex gap-2">
          <Input
            id={name}
            name={name}
            type="number"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1"
            disabled={loading}
            required
          />
          <Select
            value={unit}
            onValueChange={handleUnitChange}
            disabled={loading}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Unit" />
            </SelectTrigger>
            <SelectContent>
              {units[UnitCategory].map((unitOption: Unit) => (
                <SelectItem key={unitOption.value} value={unitOption.value}>
                  {unitOption.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  }
);

InputWithUnit.displayName = "InputWithUnit";
