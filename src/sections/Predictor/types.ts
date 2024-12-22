export type UnitCategory =
  | "nutrients"
  | "temperature"
  | "humidity"
  | "rainfall"
  | "conductivity";

export type Unit = {
  value: string;
  label: string;
};

export type ConversionFunction = (
  value: number,
  from: string,
  to: string
) => number;

export const units: Record<UnitCategory, Unit[]> = {
  nutrients: [
    { value: "mg/L", label: "mg/L" },
    { value: "ppm", label: "ppm" },
    { value: "μg/L", label: "μg/L" },
    { value: "mol/L", label: "mol/L" },
    { value: "meq/L", label: "meq/L" },
  ],
  temperature: [
    { value: "C", label: "°C" },
    { value: "F", label: "°F" },
    { value: "K", label: "K" },
  ],
  humidity: [{ value: "%", label: "%" }],
  rainfall: [
    { value: "mm", label: "mm" },
    { value: "in", label: "in" },
  ],
  conductivity: [
    { value: "S/m", label: "S/m" },
    { value: "mS/cm", label: "mS/cm" },
    { value: "μS/cm", label: "μS/cm" },
  ],
};

export const conversions: Record<UnitCategory, ConversionFunction> = {
  nutrients: (value, from, to) => {
    if (from === to) return value;

    const conversionTable: Record<string, Record<string, number>> = {
      "mg/L": { ppm: 1, "μg/L": 1000, "mol/L": 1 / 18.015, "meq/L": 1 / 50 },
      ppm: { "mg/L": 1, "μg/L": 1000, "mol/L": 1 / 18.015, "meq/L": 1 / 50 },
      "μg/L": {
        "mg/L": 1 / 1000,
        ppm: 1 / 1000,
        "mol/L": 1 / (18.015 * 1000),
        "meq/L": 1 / (50 * 1000),
      },
      "mol/L": {
        "mg/L": 18.015,
        ppm: 18.015,
        "μg/L": 18.015 * 1000,
        "meq/L": 50,
      },
      "meq/L": { "mg/L": 50, ppm: 50, "μg/L": 50 * 1000, "mol/L": 1 / 50 },
    };

    return value * (conversionTable[from]?.[to] ?? 1);
  },

  temperature: (value, from, to) => {
    if (from === to) return value;

    if (from === "C" && to === "F") return (value * 9) / 5 + 32;
    if (from === "F" && to === "C") return ((value - 32) * 5) / 9;
    if (from === "C" && to === "K") return value + 273.15;
    if (from === "K" && to === "C") return value - 273.15;
    if (from === "F" && to === "K") return ((value - 32) * 5) / 9 + 273.15;
    if (from === "K" && to === "F") return ((value - 273.15) * 9) / 5 + 32;

    return value;
  },

  humidity: (value, from, to) => {
    if (from === to) return value;
    return value;
  },

  rainfall: (value, from, to) => {
    if (from === to) return value;

    const conversionTable: Record<string, Record<string, number>> = {
      mm: { in: 1 / 25.4 },
      in: { mm: 25.4 },
    };

    return value * (conversionTable[from]?.[to] ?? 1);
  },

  conductivity: (value, from, to) => {
    if (from === to) return value;

    const conversionTable: Record<string, Record<string, number>> = {
      "S/m": { "mS/cm": 1 / 10, "μS/cm": 1 / 0.00001 },
      "mS/cm": { "S/m": 10, "μS/cm": 1000 },
      "μS/cm": { "S/m": 0.00001, "mS/cm": 1 / 1000 },
    };

    return value * (conversionTable[from]?.[to] ?? 1);
  },
};

export const convertValue = (
  category: UnitCategory,
  value: number,
  from: string,
  to: string
): number => {
  const conversionFunction = conversions[category];
  return conversionFunction(value, from, to);
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
  crop: string;
};

export type UnitData = {
  [K in keyof Omit<PredictionData & MonitoringData, "ph" | "crop">]: string;
};
export type Results = {
  prediction: string;
  predictionInfo: string;
  cropHealth: string;
};
