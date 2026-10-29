import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MessageCircleQuestion } from "lucide-react";
import { Shell, PageHeader } from "@/components/Shell";
import { labMetrics, classifyLab, type LabStatus } from "@/lib/health-tools";

export const Route = createFileRoute("/lab-reports")({
  head: () => ({
    meta: [
      { title: "Lab Report Translator — Medicore" },
      { name: "description", content: "Understand HbA1c, glucose, blood pressure and cholesterol results in plain English." },
      { property: "og:title", content: "Lab Report Translator — Medicore" },
      { property: "og:description", content: "Plain-English explanations of your lab results." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LabReports,
});

const tone: Record<LabStatus, string> = {
  Normal: "bg-success text-primary-foreground",
  Borderline: "bg-warning text-foreground",
  High: "bg-destructive text-destructive-foreground",
};

function LabReports() {
  const [id, setId] = useState(labMetrics[0].id);
  const [value, setValue] = useState("");
  const metric = labMetrics.find((m) => m.id === id)!;
  const num = parseFloat(value);
  const status = Number.isFinite(num) ? classifyLab(metric, num) : null;

  return (
    <Shell>
      <PageHeader title="Lab report translator" subtitle="Plain-English results" />
      <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1">
        {labMetrics.map((m) => (
          <button key={m.id} onClick={() => { setId(m.id); setValue(""); }} className={`shrink-0 rounded-xl px-3 py-2 text-sm ${id === m.id ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground"}`}>{m.name}</button>
        ))}
      </div>
      <div className="mt-4 rounded-3xl bg-card p-5 shadow-sm">
        <p className="text-sm text-muted-foreground">{metric.about}</p>
        <label className="mt-4 block text-sm font-medium">Your result</label>
        <div className="mt-2 flex items-center gap-2">
          <input inputMode="decimal" value={value} onChange={(e) => setValue(e.target.value)} placeholder={`e.g. ${metric.borderline}`} className="flex-1 rounded-2xl bg-secondary px-4 py-3 text-lg outline-none" />
          <span className="text-sm text-muted-foreground">{metric.unit}</span>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">Normal below {metric.borderline} · Borderline {metric.borderline}–{metric.high} · High {metric.high}+</p>
      </div>
      {status && (
        <div className="mt-4 space-y-3">
          <div className="rounded-3xl bg-card p-5 shadow-sm">
            <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${tone[status]}`}>{status}</span>
            <p className="mt-3 text-base">{metric.explain[status]}</p>
          </div>
          <div className="rounded-3xl bg-card p-5 shadow-sm">
            <p className="flex items-center gap-2 font-medium"><MessageCircleQuestion className="h-5 w-5 text-primary" />Ask your doctor</p>
            <ul className="mt-3 space-y-2 text-sm">
              {metric.questions.map((q) => <li key={q} className="rounded-xl bg-secondary px-3 py-2">{q}</li>)}
            </ul>
          </div>
          <p className="text-center text-xs text-muted-foreground">General information only — not a diagnosis.</p>
        </div>
      )}
    </Shell>
  );
}
