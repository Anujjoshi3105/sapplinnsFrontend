"use client";

import { useState, useCallback, useMemo, memo } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sprout, Loader, PhoneCallIcon, Tractor } from "lucide-react";
import { UnitData, Results } from "./types";
import { PredictionForm } from "./components/PredictionForm";
import { MonitoringForm } from "./components/MonitoringForm";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Heading from "@/components/Heading";
import Message from "./Message";

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
  temperature: "C",
  humidity: "%",
  rainfall: "mm",
  conductivity: "S/m",
};

export default function Predictor() {
  const { toast } = useToast();
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

  const checkChances = async () => {
    try {
      const chances = await axios.post("/api/customer");
      setChances(chances.data.chances);
      toast({
        variant: "default",
        title: "Number of Trials Remaining",
        description: chances.data.message,
      });
      return true;
    } catch (error) {
      console.error("Error during chances:", error);
      toast({
        variant: "destructive",
        title: "Chances Error",
        description: "Failed to connect to the server.",
      });
      return false;
    }
  };

  const handlePredictionSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);

      if ((await checkChances()) === false) {
        setLoading(false);
        return;
      }

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

        setResults((prev) => ({
          ...prev,
          prediction: predict.data["Predicted Crop"],
        }));

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

      if ((await checkChances()) === false) {
        setLoading(false);
        return;
      }

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
    if ((await checkChances()) === false) {
      setLoading(false);
      return;
    }

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

  const MemoizedPredictionForm = useMemo(() => memo(PredictionForm), []);
  const MemoizedMonitoringForm = useMemo(() => memo(MonitoringForm), []);
  return (
    <div className="p-4 space-y-4 max-w-6xl mx-auto">
      <Heading
        title="Smart Tools for Thriving Crop Health"
        subtitle="Predict Crop Health"
      />
      <h3 className="text-muted-foreground text-lg text-center">
        Chances Remaining:{" "}
        {chances !== null && chances !== undefined ? chances : 0}
      </h3>
      <Tabs defaultValue="predict" className="space-y-4 relative">
        {chances <= 0 && <Message />}
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="predict" className="md:text-lg">
            Predict Crop
          </TabsTrigger>
          <TabsTrigger value="monitor" className="md:text-lg">
            Health Monitoring
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
                {results.predictionInfo && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="mt-4 pl-6 sm:pl-8 md:pl-16">
                    <ReactMarkdown className="prose">
                      {results.predictionInfo}
                    </ReactMarkdown>
                    <Button
                      effect="expandIcon"
                      icon={PhoneCallIcon}
                      iconPlacement="right"
                      variant="other"
                      className="mt-4"
                      asChild>
                      <Link href="/contact">Contact now </Link>
                    </Button>
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
                <p className="flex items-center gap-2">
                  <Tractor className="h-12 w-12 bg-white rounded-full p-2 text-blue-500" />
                  <h3 className="font-bold text-xl text-blue-600">
                    Soil Health Details
                  </h3>
                </p>

                {results.cropHealth && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="py-4 pl-4 sm:pl-6 md:pl-12 lg:pl-16">
                    <ReactMarkdown className="prose">
                      {results.cropHealth}
                    </ReactMarkdown>
                    <Button
                      effect="expandIcon"
                      icon={PhoneCallIcon}
                      iconPlacement="right"
                      variant="other"
                      className="mt-4"
                      asChild>
                      <Link href="/contact">Contact now </Link>
                    </Button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
