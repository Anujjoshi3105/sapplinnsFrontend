import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Unit, UnitType, units } from "../types";

type InputWithUnitProps = {
  name: string;
  label: string;
  unitType: UnitType;
  value: string;
  unit: string;
  onChange: (value: string) => void;
  onUnitChange: (value: string) => void;
  loading: boolean;
};

export const InputWithUnit: React.FC<InputWithUnitProps> = ({
  name,
  label,
  unitType,
  value,
  unit,
  onChange,
  onUnitChange,
  loading,
}) => (
  <div className="space-y-2">
    <Label htmlFor={name}>{label}</Label>
    <div className="flex gap-2">
      <Input
        id={name}
        value={value}
        type="number"
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 "
        disabled={loading}
        required
      />
      <Select value={unit} onValueChange={onUnitChange}>
        <SelectTrigger className="w-[100px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {units[unitType].map((unit: Unit) => (
            <SelectItem key={unit.value} value={unit.value}>
              {unit.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  </div>
);
