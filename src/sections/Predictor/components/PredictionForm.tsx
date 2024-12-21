import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Leaf, Loader, ThermometerSun } from "lucide-react";
import { InputWithUnit } from "./InputWithUnit";
import { PredictionData, UnitData } from "../types";

type PredictionFormProps = {
  data: PredictionData;
  units: UnitData;
  onDataChange: (key: keyof PredictionData, value: string) => void;
  onUnitChange: (key: keyof UnitData, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
};

export const PredictionForm: React.FC<PredictionFormProps> = ({
  data,
  units,
  onDataChange,
  onUnitChange,
  onSubmit,
  loading,
}) => (
  <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-6">
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 md:text-xl">
          <Leaf className="h-5 w-5 text-green-500" />
          Soil Nutrients
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <InputWithUnit
          name="nitrogen"
          label="Nitrogen"
          unitType="nutrients"
          value={data.nitrogen}
          unit={units.nitrogen}
          onChange={(value) => onDataChange("nitrogen", value)}
          onUnitChange={(value) => onUnitChange("nitrogen", value)}
          loading={loading}
        />
        <InputWithUnit
          name="phosphorus"
          label="Phosphorus"
          unitType="nutrients"
          value={data.phosphorus}
          unit={units.phosphorus}
          onChange={(value) => onDataChange("phosphorus", value)}
          onUnitChange={(value) => onUnitChange("phosphorus", value)}
          loading={loading}
        />
        <InputWithUnit
          name="potassium"
          label="Potassium"
          unitType="nutrients"
          value={data.potassium}
          unit={units.potassium}
          onChange={(value) => onDataChange("potassium", value)}
          onUnitChange={(value) => onUnitChange("potassium", value)}
          loading={loading}
        />
        <div className="space-y-2">
          <Label htmlFor="ph">pH Value</Label>
          <Input
            id="ph"
            value={data.ph}
            type="number"
            onChange={(e) => onDataChange("ph", e.target.value)}
            disabled={loading}
          />
        </div>
      </CardContent>
    </Card>
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 md:text-xl">
          <ThermometerSun className="h-5 w-5 text-orange-500" />
          Environmental Conditions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <InputWithUnit
          name="temperature"
          label="Temperature"
          unitType="temperature"
          value={data.temperature}
          unit={units.temperature}
          onChange={(value) => onDataChange("temperature", value)}
          onUnitChange={(value) => onUnitChange("temperature", value)}
          loading={loading}
        />
        <InputWithUnit
          name="humidity"
          label="Humidity"
          unitType="humidity"
          value={data.humidity}
          unit={units.humidity}
          onChange={(value) => onDataChange("humidity", value)}
          onUnitChange={(value) => onUnitChange("humidity", value)}
          loading={loading}
        />
        <InputWithUnit
          name="rainfall"
          label="Rainfall"
          unitType="rainfall"
          value={data.rainfall}
          unit={units.rainfall}
          onChange={(value) => onDataChange("rainfall", value)}
          onUnitChange={(value) => onUnitChange("rainfall", value)}
          loading={loading}
        />
        <Button type="submit" disabled={loading} className="w-full mt-6">
          {loading ? (
            <>
              <Loader className="mr-2 animate-spin" />
              Predicting...
            </>
          ) : (
            "Predict Crop"
          )}
        </Button>
      </CardContent>
    </Card>
  </form>
);
