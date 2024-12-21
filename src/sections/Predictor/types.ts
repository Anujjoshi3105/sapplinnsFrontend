export type Unit = {
  value: string;
  label: string;
};

export type UnitType =
  | "nutrients"
  | "temperature"
  | "humidity"
  | "rainfall"
  | "conductivity";

export const units: Record<UnitType, Unit[]> = {
  nutrients: [
    { value: "mg/L", label: "mg/L" },
    { value: "ppm", label: "ppm" },
  ],
  temperature: [
    { value: "C", label: "°C" },
    { value: "F", label: "°F" },
  ],
  humidity: [{ value: "%", label: "%" }],
  rainfall: [
    { value: "mm", label: "mm" },
    { value: "in", label: "in" },
  ],
  conductivity: [
    { value: "S/m", label: "S/m" },
    { value: "mS/cm", label: "mS/cm" },
  ],
};

export type PredictionData = {
  nitrogen: string;
  phosphorus: string;
  potassium: string;
  ph: string;
  temperature: string;
  humidity: string;
  rainfall: string;
};

export type MonitoringData = {
  nitrogen: string;
  phosphorus: string;
  potassium: string;
  ph: string;
  temperature: string;
  humidity: string;
  conductivity: string;
  cropGrown: string;
};

export type UnitData = {
  [K in keyof Omit<
    PredictionData & MonitoringData,
    "ph" | "cropGrown"
  >]: string;
};
export type Results = {
  prediction: string;
  predictionInfo: string;
  cropHealth: string;
};
