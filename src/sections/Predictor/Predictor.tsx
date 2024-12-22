"use client";

import { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sprout,
  Loader,
  PhoneCallIcon,
  Tractor,
  Leaf,
  Microscope,
} from "lucide-react";
import { UnitData, Results } from "./types";
import { PredictionForm } from "./components/PredictionForm";
import { MonitoringForm } from "./components/MonitoringForm";
import axios from "axios";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import Heading from "@/components/Heading";
import { Badge } from "@/components/ui/badge";
import { useSubscribe } from "@/contexts/SubscribeContext";
import SubscribeBtn from "@/components/SubscribeBtn";

const initialFormData = {
  nitrogen: "",
  phosphorus: "",
  potassium: "",
  ph: "",
  temperature: "",
  humidity: "",
  rainfall: "",
  conductivity: "",
  crop: "",
};

const initialUnits: UnitData = {
  nitrogen: "mg/L",
  phosphorus: "mg/L",
  potassium: "mg/L",
  temperature: "C",
  humidity: "%",
  rainfall: "mm",
  conductivity: "S/m",
};

export default function Predictor() {
  const { setShowSubscribe } = useSubscribe();
  const [loading, setLoading] = useState(false);
  const [chances, setChances] = useState<number>(2);
  const [formData, setFormData] = useState(initialFormData);
  const [predictionUnits, setPredictionUnits] =
    useState<UnitData>(initialUnits);
  const [monitoringUnits, setMonitoringUnits] =
    useState<UnitData>(initialUnits);
  const [results, setResults] = useState<Results>({
    prediction: "",
    predictionInfo: "",
    cropHealth: "",
  });

  const API_URL =
    process.env.NODE_ENV === "development"
      ? "http://127.0.0.1:5000"
      : process.env.NEXT_PUBLIC_API_URL;

  const checkChances = useCallback(async () => {
    try {
      const chances = await axios.post("/api/user");
      setChances(chances.data.chances);

      if (chances.data.chances === 0) {
        setShowSubscribe(true);
        return false;
      }

      toast("Number of Trials Remaining", {
        description: chances.data.message,
      });
      return true;
    } catch (error) {
      console.error("Error during chances:", error);
      toast("Chances Error", {
        description: "Failed to connect to the server.",
      });
      return false;
    }
  }, [setShowSubscribe]);

  const handlePredictionSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);

      if (!(await checkChances())) {
        setLoading(false);
        return;
      }

      try {
        const predict = await axios.post(`${API_URL}/predict`, {
          nitrogen: formData.nitrogen,
          phosphorus: formData.phosphorus,
          potassium: formData.potassium,
          ph: formData.ph,
          temperature: formData.temperature,
          humidity: formData.humidity,
          rainfall: formData.rainfall,
          conductivity: formData.conductivity,
        });

        setResults((prev) => ({
          ...prev,
          prediction: predict.data["Predicted Crop"],
        }));

        setFormData((prev) => ({
          ...prev,
          crop: predict.data["Predicted Crop"],
        }));

        toast("Prediction Result", {
          description: `Predicted Crop: ${predict.data["Predicted Crop"]}`,
        });
      } catch (error) {
        console.error("Error during prediction:", error);
        toast("Network Error", {
          description: "Failed to connect to the server.",
        });
      } finally {
        setLoading(false);
      }
    },
    [formData, API_URL, checkChances]
  );

  const handleHealthSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);

      if (!(await checkChances())) {
        setLoading(false);
        return;
      }

      try {
        const health = await axios.post(`${API_URL}/health`, {
          nitrogen: formData.nitrogen,
          phosphorus: formData.phosphorus,
          potassium: formData.potassium,
          temperature: formData.temperature,
          humidity: formData.humidity,
          ph: formData.ph,
          conductivity: formData.conductivity,
          crop: formData.crop,
        });

        setResults((prev) => ({
          ...prev,
          cropHealth: health.data,
        }));

        toast("Health Result", {
          description: "Detailed crop health information is generated",
        });
      } catch (error) {
        console.error("Error during health:", error);
        toast("Network Error", {
          description: "Failed to connect to the server.",
        });
      } finally {
        setLoading(false);
      }
    },
    [formData, API_URL, checkChances]
  );

  const handleGenerateCropInfo = useCallback(async () => {
    if (!(await checkChances())) {
      return;
    }
    if (results.prediction === "") {
      toast("Error", {
        description: "Please predict the crop first!",
      });
      return;
    }
    setLoading(true);
    try {
      const generate = await axios.post(`${API_URL}/generate`, {
        predicted_crop: results.prediction,
      });
      setResults((prev) => ({
        ...prev,
        predictionInfo: generate.data.crop_info,
      }));
    } catch {
      toast("Generation Error", {
        description: "Error occurred while fetching crop details.",
      });
    } finally {
      setLoading(false);
    }
  }, [results.prediction, API_URL, checkChances]);

  const handleFormDataChange = useCallback((key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handlePredictionUnitChange = useCallback(
    (key: keyof UnitData, value: string) => {
      setPredictionUnits((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const handleMonitoringUnitChange = useCallback(
    (key: keyof UnitData, value: string) => {
      setMonitoringUnits((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const MemoizedPredictionForm = useMemo(() => PredictionForm, []);
  const MemoizedMonitoringForm = useMemo(() => MonitoringForm, []);

  return (
    <div className="p-4 space-y-4 max-w-6xl mx-auto relative">
      <Heading
        title="Smart Tools for Thriving Crop Health"
        subtitle="Predict Crop Health"
      />
      <div className="w-full flex flex-col justify-center gap-1 items-center">
        <Badge className="text-lg">
          Chances Remaining: &nbsp;
          {chances !== null && chances !== undefined ? chances : 0}
        </Badge>
        {chances === 0 && (
          <div className="text-destructive">
            Sorry, You have reached your limit
          </div>
        )}
      </div>
      <Tabs defaultValue="predict" className="space-y-4 relative">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            value="predict"
            className="flex md:text-lg items-center gap-2 text-emerald-600">
            <Leaf className="h-6 w-6" />
            Crop Prediction
          </TabsTrigger>
          <TabsTrigger
            value="monitor"
            className="flex md:text-lg items-center gap-2 text-blue-500">
            <Microscope className="h-6 w-6" />
            Monitoring Data
          </TabsTrigger>
        </TabsList>

        <TabsContent value="predict" className="space-y-6">
          <MemoizedPredictionForm
            loading={loading}
            data={formData}
            units={predictionUnits}
            onDataChange={handleFormDataChange}
            onUnitChange={handlePredictionUnitChange}
            onSubmit={handlePredictionSubmit}
          />
          {results.prediction && chances > 0 && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}>
              <div className="bg-green-50 rounded-xl p-4 sm:p-6 md:p-8 lg:p-12">
                <div className="flex gap-4">
                  <div className="inline-flex flex-row items-center justify-between">
                    <Sprout className="h-12 w-12 bg-white rounded-full p-2 text-green-500" />
                    <div className="flex flex-col items-start justify-center ml-4">
                      <h3 className="font-bold text-lg">
                        Predicted Crop:
                        <span className="ml-2 text-green-500">
                          {results.prediction}
                        </span>
                      </h3>
                      <button
                        onClick={handleGenerateCropInfo}
                        disabled={loading}
                        className="text-muted-foreground link mt-0.5">
                        {loading ? (
                          <Loader className="h-4 w-4 animate-spin" />
                        ) : (
                          `Click to view more details`
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                {results.predictionInfo && chances > 0 && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="mt-4 pl-6 sm:pl-8 md:pl-16">
                    <ReactMarkdown className="prose">
                      {results.predictionInfo}
                    </ReactMarkdown>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </TabsContent>

        <TabsContent value="monitor" className="space-y-6">
          <MemoizedMonitoringForm
            data={formData}
            units={monitoringUnits}
            onDataChange={handleFormDataChange}
            onUnitChange={handleMonitoringUnitChange}
            onSubmit={handleHealthSubmit}
            loading={loading}
          />
          {results.cropHealth && chances > 0 && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}>
              <div className="bg-blue-50 rounded-xl p-4 sm:p-6 md:p-8 lg:p-12">
                <div className="flex items-center gap-2">
                  <Tractor className="h-12 w-12 bg-white rounded-full p-2 text-blue-500" />
                  <h3 className="font-bold text-xl text-blue-600">
                    Soil Health Details
                  </h3>
                </div>

                {results.cropHealth && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="py-4 pl-4 sm:pl-6 md:pl-12 lg:pl-16">
                    <ReactMarkdown className="prose">
                      {results.cropHealth}
                    </ReactMarkdown>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </TabsContent>
        <div className="text-center mt-8">
          <SubscribeBtn variant="other">
            <PhoneCallIcon />
            Subscribe for More Features
          </SubscribeBtn>
        </div>
      </Tabs>
    </div>
  );
}
