import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Microscope, Gauge, Loader } from "lucide-react";
import { InputWithUnit } from "./InputWithUnit";
import { MonitoringData, UnitData } from "../types";

type MonitoringFormProps = {
  data: MonitoringData;
  units: UnitData;
  onDataChange: (key: keyof MonitoringData, value: string) => void;
  onUnitChange: (key: keyof UnitData, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
};

export const MonitoringForm: React.FC<MonitoringFormProps> = ({
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
          <Microscope className="h-5 w-5 text-purple-500" />
          Soil Analysis
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
        />
        <InputWithUnit
          name="phosphorus"
          label="Phosphorus"
          unitType="nutrients"
          value={data.phosphorus}
          unit={units.phosphorus}
          onChange={(value) => onDataChange("phosphorus", value)}
          onUnitChange={(value) => onUnitChange("phosphorus", value)}
        />
        <InputWithUnit
          name="potassium"
          label="Potassium"
          unitType="nutrients"
          value={data.potassium}
          unit={units.potassium}
          onChange={(value) => onDataChange("potassium", value)}
          onUnitChange={(value) => onUnitChange("potassium", value)}
        />
        <div className="space-y-2">
          <Label htmlFor="ph">pH Value</Label>
          <Input
            id="ph"
            value={data.ph}
            type="number"
            onChange={(e) => onDataChange("ph", e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 md:text-xl">
          <Gauge className="h-5 w-5 text-blue-500" />
          Additional Metrics
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
        />
        <InputWithUnit
          name="humidity"
          label="Humidity"
          unitType="humidity"
          value={data.humidity}
          unit={units.humidity}
          onChange={(value) => onDataChange("humidity", value)}
          onUnitChange={(value) => onUnitChange("humidity", value)}
        />
        <InputWithUnit
          name="conductivity"
          label="Conductivity"
          unitType="conductivity"
          value={data.conductivity}
          unit={units.conductivity}
          onChange={(value) => onDataChange("conductivity", value)}
          onUnitChange={(value) => onUnitChange("conductivity", value)}
        />
        <div className="space-y-2">
          <Label htmlFor="cropGrown">Current Crop</Label>
          <Input
            id="cropGrown"
            value={data.cropGrown}
            onChange={(e) => onDataChange("cropGrown", e.target.value)}
          />
        </div>
        <Button type="submit" disabled={loading} className="w-full mt-4">
          {loading ? (
            <>
              <Loader className="mr-2 animate-spin" />
              Analysing...
            </>
          ) : (
            "Analyze Soil"
          )}
        </Button>
      </CardContent>
    </Card>
  </form>
);
