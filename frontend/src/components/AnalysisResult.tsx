import {
  AlertTriangle,
  Pill,
  Stethoscope,
  ShieldAlert,
  FileDown,
  ClipboardCheck,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import jsPDF from "jspdf";

interface Condition {
  name: string;
  probability: string;
  description: string;
}

interface Medicine {
  name: string;
  type: string;
  dosage: string;
  notes: string;
}

export interface AnalysisData {
  possibleConditions: Condition[];
  suggestedMedicines: Medicine[];
  severity: string;
  recommendations: string[];
  whenToSeeDoctor: string;
  disclaimer: string;
}

export default function AnalysisResult({
  data,
  symptoms,
}: {
  data: AnalysisData;
  symptoms: string;
}) {
  const downloadPDF = () => {
    const doc = new jsPDF();
    let y = 20;

    doc.setFontSize(18);
    doc.text("AI Symptom Analysis Report", 20, y);
    y += 10;

    doc.setFontSize(11);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, y);
    y += 10;

    doc.text("Symptoms:", 20, y);
    y += 6;

    const symptomLines = doc.splitTextToSize(symptoms, 170);
    doc.text(symptomLines, 20, y);
    y += symptomLines.length * 6 + 6;

    doc.text(`Severity: ${data.severity}`, 20, y);
    y += 10;

    doc.text("Possible Conditions:", 20, y);
    y += 6;

    data.possibleConditions.forEach((c, i) => {
      doc.text(`${i + 1}. ${c.name} (${c.probability})`, 25, y);
      y += 6;

      const desc = doc.splitTextToSize(c.description, 160);
      doc.text(desc, 30, y);
      y += desc.length * 6 + 4;
    });

    y += 4;
    doc.text("Suggested Medicines:", 20, y);
    y += 6;

    data.suggestedMedicines.forEach((m, i) => {
      doc.text(`${i + 1}. ${m.name} (${m.type})`, 25, y);
      y += 6;

      doc.text(`Dosage: ${m.dosage}`, 30, y);
      y += 6;

      if (m.notes) {
        const notes = doc.splitTextToSize(`Note: ${m.notes}`, 160);
        doc.text(notes, 30, y);
        y += notes.length * 6;
      }

      y += 4;
    });

    y += 4;
    doc.text("Recommendations:", 20, y);
    y += 6;

    data.recommendations.forEach((r, i) => {
      const rec = doc.splitTextToSize(`${i + 1}. ${r}`, 160);
      doc.text(rec, 25, y);
      y += rec.length * 6 + 2;
    });

    y += 6;
    doc.text("When to See a Doctor:", 20, y);
    y += 6;

    const doctorText = doc.splitTextToSize(data.whenToSeeDoctor, 170);
    doc.text(doctorText, 20, y);
    y += doctorText.length * 6 + 6;

    doc.setFontSize(9);
    const disclaimer = doc.splitTextToSize(data.disclaimer, 170);
    doc.text(disclaimer, 20, y);

    doc.save("symptom-analysis-report.pdf");
  };

  return (
    <div className="space-y-6">
      {/* Severity */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldAlert className="h-5 w-5 text-gray-500" />
          <span className="font-semibold">Severity:</span>
          <Badge>{data.severity}</Badge>
        </div>

        <Button onClick={downloadPDF} variant="outline">
          <FileDown className="h-4 w-4 mr-2" />
          Download PDF
        </Button>
      </div>

      {/* Conditions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5" />
            Possible Conditions
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          {data.possibleConditions.map((c, i) => (
            <div key={i} className="border rounded-lg p-4">
              <div className="flex justify-between">
                <h4 className="font-semibold">{c.name}</h4>
                <Badge variant="secondary">{c.probability}</Badge>
              </div>

              <p className="text-sm text-gray-600 mt-1">
                {c.description}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Medicines */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Pill className="h-5 w-5" />
            Suggested Medicines
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          {data.suggestedMedicines.map((m, i) => (
            <div key={i} className="border rounded-lg p-4">
              <div className="flex justify-between">
                <h4 className="font-semibold">{m.name}</h4>
                <Badge variant="secondary">{m.type}</Badge>
              </div>

              <p className="text-sm mt-1">
                <strong>Dosage:</strong> {m.dosage}
              </p>

              {m.notes && (
                <p className="text-sm">
                  <strong>Note:</strong> {m.notes}
                </p>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5" />
            Recommendations
          </CardTitle>
        </CardHeader>

        <CardContent>
          <ul className="list-disc pl-6 space-y-1">
            {data.recommendations.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Doctor Advice */}
      <Card className="border-yellow-400 bg-yellow-50">
        <CardContent className="pt-6 flex gap-3">
          <AlertTriangle className="h-5 w-5 text-yellow-600" />
          <div>
            <h4 className="font-semibold">When to See a Doctor</h4>
            <p className="text-sm mt-1">{data.whenToSeeDoctor}</p>
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <p className="text-xs text-gray-500 border rounded-lg p-4">
        ⚠️ {data.disclaimer}
      </p>
    </div>
  );
}