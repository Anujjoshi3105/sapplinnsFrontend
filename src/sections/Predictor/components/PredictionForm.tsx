import React, { useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";
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

export const PredictionForm: React.FC<PredictionFormProps> = React.memo(
  ({ data, units, onDataChange, onUnitChange, onSubmit, loading }) => {
    const handleInputChange = useCallback(
      (key: keyof PredictionData, value: string) => {
        onDataChange(key, value);
      },
      [onDataChange]
    );

    return (
      <form onSubmit={onSubmit}>
        <Card className="w-full pt-4">
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-2">
              <InputWithUnit
                name="nitrogen"
                label="Nitrogen"
                UnitCategory="nutrients"
                value={data.nitrogen}
                unit={units.nitrogen}
                onChange={(value) => handleInputChange("nitrogen", value)}
                onUnitChange={(value) => onUnitChange("nitrogen", value)}
                loading={loading}
              />
              <InputWithUnit
                name="phosphorus"
                label="Phosphorus"
                UnitCategory="nutrients"
                value={data.phosphorus}
                unit={units.phosphorus}
                onChange={(value) => handleInputChange("phosphorus", value)}
                onUnitChange={(value) => onUnitChange("phosphorus", value)}
                loading={loading}
              />
              <InputWithUnit
                name="potassium"
                label="Potassium"
                UnitCategory="nutrients"
                value={data.potassium}
                unit={units.potassium}
                onChange={(value) => handleInputChange("potassium", value)}
                onUnitChange={(value) => onUnitChange("potassium", value)}
                loading={loading}
              />
              <InputWithUnit
                name="temperature"
                label="Temperature"
                UnitCategory="temperature"
                value={data.temperature}
                unit={units.temperature}
                onChange={(value) => handleInputChange("temperature", value)}
                onUnitChange={(value) => onUnitChange("temperature", value)}
                loading={loading}
              />
              <div className="space-y-2">
                <Label htmlFor="humidity">Humidity (%)</Label>
                <Input
                  name="humidity"
                  value={data.humidity}
                  onChange={(e) => onDataChange("humidity", e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ph">pH</Label>
                <Input
                  id="ph"
                  type="number"
                  value={data.ph}
                  onChange={(e) => onDataChange("ph", e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
            </div>
            <InputWithUnit
              name="rainfall"
              label="Rainfall"
              UnitCategory="rainfall"
              value={data.rainfall}
              unit={units.rainfall}
              onChange={(value) => handleInputChange("rainfall", value)}
              onUnitChange={(value) => onUnitChange("rainfall", value)}
              loading={loading}
            />
            <Button type="submit" className="mt-6 w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
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
  }
);

PredictionForm.displayName = "PredictionForm";
