import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { HeartPulse, Droplet, Thermometer, Scale, Gauge } from "lucide-react";
import { Shell, PageHeader } from "@/components/Shell";
import { useLocal } from "@/lib/use-local";

export const Route = createFileRoute("/vitals")({
  head: () => ({
    meta: [
      { title: "Vitals Monitoring — Medicore" },
      { name: "description", content: "Record and track blood pressure, sugar, heart rate, temperature and weight." },
      { property: "og:title", content: "Vitals Monitoring — Medicore" },
      { property: "og:description", content: "Track your vitals over time." },
    ],
  }),
  component: Vitals,
});

const metrics = [
  { key: "hr", label: "Heart rate", unit: "bpm", icon: HeartPulse, seed: [72, 75, 70, 78, 74, 71, 73] },
  { key: "bp", label: "Systolic BP", unit: "mmHg", icon: Gauge, seed: [118, 122, 120, 125, 119, 121, 117] },
  { key: "sugar", label: "Blood sugar", unit: "mg/dL", icon: Droplet, seed: [96, 102, 99, 110, 98, 94, 101] },
  { key: "temp", label: "Temperature", unit: "°F", icon: Thermometer, seed: [98.4, 98.6, 98.2, 98.7, 98.5, 98.6, 98.4] },
  { key: "weight", label: "Weight", unit: "kg", icon: Scale, seed: [62.4, 62.2, 62.3, 62.0, 61.9, 62.1, 61.8] },
] as const;
type Key = (typeof metrics)[number]["key"];

function Spark({ data }: { data: number[] }) {
  const min = Math.min(...data), max = Math.max(...data), r = max - min || 1;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * 100},${36 - ((v - min) / r) * 32}`).join(" ");
  return <svg viewBox="0 0 100 40" className="h-10 w-24"><polyline points={pts} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function Vitals() {
  const [data, setData] = useLocal<Record<Key, number[]>>("medicore-vitals", Object.fromEntries(metrics.map((m) => [m.key, [...m.seed]])) as Record<Key, number[]>);
  const [sel, setSel] = useState<Key>("hr");
  const [val, setVal] = useState("");
  const m = metrics.find((x) => x.key === sel)!;

  return (
    <Shell>
      <PageHeader title="Vitals" subtitle="Last 7 readings" />
      <div className="space-y-2">
        {metrics.map(({ key, label, unit, icon: Icon }) => {
          const series = data[key] ?? [];
          const last = series[series.length - 1];
          return (
            <button key={key} onClick={() => setSel(key)} className={`flex w-full items-center gap-3 rounded-2xl bg-card p-4 text-left shadow-sm ${sel === key ? "ring-2 ring-primary" : ""}`}>
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-secondary text-primary"><Icon className="h-5 w-5" /></span>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">{label}</p>
                <p className="text-xl font-semibold">{last} <span className="text-xs font-normal text-muted-foreground">{unit}</span></p>
              </div>
              <span className="text-primary"><Spark data={series.slice(-7)} /></span>
            </button>
          );
        })}
      </div>
      <form
        onSubmit={(e) => { e.preventDefault(); const n = parseFloat(val); if (isNaN(n)) return; setData({ ...data, [sel]: [...(data[sel] ?? []), n].slice(-30) }); setVal(""); }}
        className="mt-5 rounded-3xl bg-card p-4 shadow-sm"
      >
        <p className="mb-2 text-sm font-medium">Log new {m.label.toLowerCase()}</p>
        <div className="flex gap-2">
          <input inputMode="decimal" value={val} onChange={(e) => setVal(e.target.value)} placeholder={`Value in ${m.unit}`} className="flex-1 rounded-xl bg-muted px-4 py-3 text-sm outline-none" />
          <button className="rounded-xl bg-primary px-5 text-sm font-medium text-primary-foreground">Save</button>
        </div>
      </form>
    </Shell>
  );
}
