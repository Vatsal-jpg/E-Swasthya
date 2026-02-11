import { useState } from "react";
import {
  AlertTriangle,
  User,
  ArrowRight,
} from "lucide-react";

import PatientLayout from "@/components/layouts/PatientLayout";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import StatusBadge from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { symptoms } from "@/data/mockData";
import { cn } from "@/lib/utils";

const AIPrediction = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [showResult, setShowResult] = useState(false);

  const toggleSymptom = (symptomId: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptomId)
        ? prev.filter((s) => s !== symptomId)
        : [...prev, symptomId]
    );
  };

  const handleSubmit = () => {
    if (selectedSymptoms.length > 0 && age && gender) {
      setShowResult(true);
    }
  };

  const mockPrediction = {
    disease: "Common Cold / Viral Fever",
    severity: "medium" as const,

    medications: [
      "Paracetamol (500mg)",
      "Antihistamine (if prescribed)",
    ],

    diet: [
      "Warm fluids (soups, herbal tea)",
      "Vitamin C rich fruits",
      "Light home-cooked meals",
    ],

    precautions: [
      "Avoid cold exposure",
      "Wear a mask if coughing",
      "Maintain hand hygiene",
    ],

    exercises: [
      "Light stretching",
      "Breathing exercises",
      "Short walks (if no fever)",
    ],
  };

  const InfoSection = ({
    title,
    items,
  }: {
    title: string;
    items: string[];
  }) => (
    <div className="p-4 bg-muted/50 rounded-xl">
      <h3 className="font-semibold text-secondary mb-3">{title}</h3>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2">
            <span className="font-medium">•</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <PatientLayout>
      <div className="bg-primary/30 m-6 p-8 rounded-[2.5rem]">
        <Breadcrumbs />

        {!showResult ? (
          <div className="bg-card rounded-2xl p-8 space-y-6">
            <Label className="text-lg font-semibold">
              Select Symptoms
            </Label>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {symptoms.map((symptom) => (
                <button
                  key={symptom.id}
                  onClick={() => toggleSymptom(symptom.id)}
                  className={cn(
                    "p-3 rounded-xl border text-sm font-medium transition-all",
                    selectedSymptoms.includes(symptom.id)
                      ? "border-secondary bg-secondary text-secondary-foreground"
                      : "border-border bg-muted/30 hover:border-secondary/50"
                  )}
                >
                  {symptom.name}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Input
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />

              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger>
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!age || !gender || selectedSymptoms.length === 0}
              className="w-full"
            >
              Analyze Symptoms
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-card rounded-2xl shadow-card border p-6 md:p-8 space-y-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Possible Condition
                  </p>
                  <h2 className="text-2xl font-bold text-secondary">
                    {mockPrediction.disease}
                  </h2>
                </div>
                <StatusBadge status={mockPrediction.severity} />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <InfoSection title="Medications" items={mockPrediction.medications} />
                <InfoSection title="Diet" items={mockPrediction.diet} />
                <InfoSection title="Precautions" items={mockPrediction.precautions} />
                <InfoSection title="Exercises" items={mockPrediction.exercises} />
              </div>

              <div className="flex gap-4">
                <Button className="flex-1">
                  <User className="h-4 w-4 mr-2" />
                  Consult Doctor
                </Button>

                <Button
                  variant="outline"
                  onClick={() => setShowResult(false)}
                >
                  Check Again
                </Button>
              </div>
            </div>

            <div className="flex gap-4 p-4 bg-warning/10 border border-warning/20 rounded-xl">
              <AlertTriangle className="text-warning" />
              <p className="text-sm text-muted-foreground">
                This is not a medical diagnosis. Consult a healthcare professional.
              </p>
            </div>
          </div>
        )}
      </div>
    </PatientLayout>
  );
};

export default AIPrediction;