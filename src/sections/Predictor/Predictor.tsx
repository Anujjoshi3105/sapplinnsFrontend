"use client";

import { useState, useCallback, useMemo, memo } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sprout, PiIcon as PH, Loader, PhoneCallIcon } from "lucide-react";
import { UnitData, Results } from "./types";
import { PredictionForm } from "./components/PredictionForm";
import { MonitoringForm } from "./components/MonitoringForm";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const initialFormData = {
  nitrogen: "",
  phosphorus: "",
  potassium: "",
  ph: "",
  temperature: "",
  humidity: "",
  rainfall: "",
  conductivity: "",
  cropGrown: "",
};

const initialUnits: UnitData = {
  nitrogen: "mg/L",
  phosphorus: "mg/L",
  potassium: "mg/L",
  temperature: "°C",
  humidity: "%",
  rainfall: "mm",
  conductivity: "S/m",
};

export default function Predictor() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

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

  // Handle the form submission for crop prediction
  const handlePredictionSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);

      // Ensure all fields are filled before submitting
      if (
        !formData.nitrogen ||
        !formData.phosphorus ||
        !formData.potassium ||
        !formData.ph ||
        !formData.temperature ||
        !formData.humidity ||
        !formData.rainfall
      ) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please provide all values for crop prediction.",
        });
        setLoading(false);
        return;
      }
      try {
        const predict = await axios.post(`${API_URL}/predict`, {
          nitrogen: formData.nitrogen,
          phosphorus: formData.phosphorus,
          potassium: formData.potassium,
          ph: formData.ph,
          humidity: formData.humidity,
          temperature: formData.temperature,
        });

        console.log("API predict:", predict.data);

        setResults((prev) => ({
          ...prev,
          prediction: predict.data["Predicted Crop"],
        }));

        // Set cropGrown to the predicted crop
        setFormData((prev) => ({
          ...prev,
          cropGrown: predict.data["Predicted Crop"],
        }));

        toast({
          variant: "default",
          title: "Prediction Result",
          description: predict.data["Predicted Crop"],
        });
      } catch (error) {
        console.error("Error during prediction:", error);
        toast({
          variant: "destructive",
          title: "Network Error",
          description: "Failed to connect to the server.",
        });
      } finally {
        setLoading(false);
      }
    },
    [formData, results.prediction]
  );

  const handleHealthSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);

      if (
        !formData.nitrogen ||
        !formData.phosphorus ||
        !formData.potassium ||
        !formData.ph ||
        !formData.temperature ||
        !formData.conductivity ||
        !formData.humidity ||
        !formData.cropGrown
      ) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please provide all values for health monitoring.",
        });
        setLoading(false);
        return;
      }
      try {
        const health = await axios.post(`${API_URL}/health`, {
          nitrogen: formData.nitrogen,
          phosphorus: formData.phosphorus,
          potassium: formData.potassium,
          ph: formData.ph,
          temperature: formData.temperature,
          conductivity: formData.conductivity,
          humidity: formData.humidity,
          crop: formData.cropGrown,
        });

        console.log("API health:", health.data);

        setResults((prev) => ({
          ...prev,
          cropHealth: health.data,
        }));

        toast({
          variant: "default",
          title: "Health Result",
          description: "Detailed crop health information is generated",
        });
      } catch (error) {
        console.error("Error during health:", error);
        toast({
          variant: "destructive",
          title: "Network Error",
          description: "Failed to connect to the server.",
        });
      } finally {
        setLoading(false);
      }
    },
    [formData, API_URL, toast]
  );
  const handleGenerateCropInfo = useCallback(async () => {
    if (results.prediction === "") {
      toast({
        variant: "destructive",
        title: "Error",
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
      toast({
        variant: "destructive",
        title: "Generation Error",
        description: "Error occurred while fetching crop details.",
      });
    } finally {
      setLoading(false);
    }
  }, [results.prediction, API_URL, toast]);

  // Update prediction data based on user input
  const handleFormDataChange = useCallback((key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }, []);

  // Update prediction units based on user selection
  const handlePredictionUnitChange = useCallback(
    (key: keyof UnitData, value: string) => {
      setPredictionUnits((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  // Update monitoring units based on user selection
  const handleMonitoringUnitChange = useCallback(
    (key: keyof UnitData, value: string) => {
      setMonitoringUnits((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const MemoizedPredictionForm = useMemo(() => memo(PredictionForm), []);
  const MemoizedMonitoringForm = useMemo(() => memo(MonitoringForm), []);
  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="text-center mb-16 space-y-2">
        <div className="flex items-center w-full justify-center gap-2 text-emerald-600">
          <Sprout className="h-5 w-5" />
          <span className="text-lg font-medium tracking-wide">
            FEATURE WE OFFER
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Smart Tools for Thriving Crop Health
        </h1>
      </div>
      <Tabs defaultValue="predict" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="predict" className="md:text-lg">
            Predict Crop
          </TabsTrigger>
          <TabsTrigger value="monitor" className="md:text-lg">
            Health Monitoring
          </TabsTrigger>
        </TabsList>

        <TabsContent value="predict">
          <div className="space-y-6">
            <MemoizedPredictionForm
              loading={loading}
              data={formData}
              units={predictionUnits}
              onDataChange={handleFormDataChange}
              onUnitChange={handlePredictionUnitChange}
              onSubmit={handlePredictionSubmit}
            />
          </div>
          {results.prediction && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="order-2 md:order-none md:w-full">
              <Card className="bg-green-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="">
                      <div className="flex gap-4">
                        <div className="inline-flex flex-row items-center justify-between">
                          {/* Logo on the left */}
                          <Sprout className="h-10 w-10 bg-white rounded-full p-2 text-green-500" />
                          {/* Text and Button on the right */}
                          <div className="flex flex-col items-start justify-center ml-4">
                            <h3 className="font-semibold flex items-center gap-2">
                              Predicted Crop:&nbsp;
                              <span className="font-bold text-green-500">
                                {results.prediction}
                              </span>
                            </h3>

                            {/* Button below the text */}
                            <button
                              onClick={handleGenerateCropInfo}
                              disabled={loading}
                              className="text-sm text-muted-foreground link mt-2">
                              {loading ? (
                                <Loader className="h-4 w-4 animate-spin" />
                              ) : (
                                "Click to view more details"
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                      {results.predictionInfo && (
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          className="mt-4">
                          <ReactMarkdown className="prose">
                            {results.predictionInfo}
                          </ReactMarkdown>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </TabsContent>

        <TabsContent value="monitor">
          <div className="space-y-6">
            <MemoizedMonitoringForm
              data={formData}
              units={monitoringUnits}
              onDataChange={handleFormDataChange}
              onUnitChange={handleMonitoringUnitChange}
              onSubmit={handleHealthSubmit}
              loading={loading}
            />
            {results.cropHealth && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="order-2 md:order-none">
                <div className="bg-blue-50 p-4 sm:p-8">
                  <div className="mt-2">
                    <p className="flex items-center gap-2">
                      <PH className="h-10 w-10 bg-white rounded-full p-2 text-blue-500" />

                      <strong>Soil Health Details:</strong>
                    </p>
                    <div>
                      {results.cropHealth && (
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          className="mt-4">
                          <ReactMarkdown className="prose">
                            {results.cropHealth}
                          </ReactMarkdown>
                        </motion.div>
                      )}
                    </div>
                  </div>
                  <Button
                    effect="expandIcon"
                    icon={PhoneCallIcon}
                    iconPlacement="right"
                    size="sm"
                    variant="other"
                    className="mt-4"
                    asChild>
                    <Link href="/contact">Contact now </Link>
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
