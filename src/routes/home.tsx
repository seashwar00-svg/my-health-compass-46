import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Bell, Search, BadgeCheck, Smile, HeartPulse, Ambulance, Siren, ListChecks, Activity, Bot } from "lucide-react";
import { Shell } from "@/components/Shell";
import { DoctorCard } from "@/components/DoctorCard";
import { doctors } from "@/lib/data";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Home — Medicore" },
      { name: "description", content: "Your Medicore dashboard: categories, doctors and health tools." },
      { property: "og:title", content: "Home — Medicore" },
      { property: "og:description", content: "Your Medicore dashboard." },
    ],
  }),
  component: HomePage,
});

const categories = [
  { label: "Check-up", icon: BadgeCheck, filter: "General Practitioners" },
  { label: "Dental", icon: Smile, filter: "Dental" },
  { label: "Cardiology", icon: HeartPulse, filter: "Cardiology" },
];
const tools = [
  { to: "/sos", label: "SOS", icon: Siren, tone: "bg-destructive text-destructive-foreground" },
  { to: "/ambulance", label: "Ambulance", icon: Ambulance, tone: "bg-card" },
  { to: "/checklist", label: "Checklist", icon: ListChecks, tone: "bg-card" },
  { to: "/vitals", label: "Vitals", icon: Activity, tone: "bg-card" },
] as const;
const filters = ["All doctors", "General Practitioners", "Dental", "Cardiology"];

function HomePage() {
  const [filter, setFilter] = useState("All doctors");
  const list = filter === "All doctors" ? doctors : doctors.filter((d) => d.category === filter);
  return (
    <Shell>
      <div className="flex items-start justify-between">
        <h1 className="text-4xl font-semibold leading-tight tracking-tight">Hello,<br />Chloe F.</h1>
        <div className="flex gap-2">
          <button aria-label="Notifications" className="grid h-11 w-11 place-items-center rounded-full bg-card shadow-sm"><Bell className="h-5 w-5" /></button>
          <Link to="/doctors" aria-label="Search" className="grid h-11 w-11 place-items-center rounded-full bg-card shadow-sm"><Search className="h-5 w-5" /></Link>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-4 gap-2">
        {tools.map(({ to, label, icon: Icon, tone }) => (
          <Link key={to} to={to} className={`flex flex-col items-center gap-1.5 rounded-2xl py-3 text-xs font-medium shadow-sm ${tone}`}>
            <Icon className="h-5 w-5" />{label}
          </Link>
        ))}
      </div>

      <Link to="/symptoms" className="mt-3 flex items-center gap-3 rounded-2xl bg-primary p-4 text-primary-foreground">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-foreground/20"><Bot className="h-5 w-5" /></span>
        <span><span className="block font-semibold">AI Symptom Checker</span><span className="text-xs opacity-85">Describe how you feel and get guidance</span></span>
      </Link>

      <Section title="Categories" />
      <div className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-1">
        {categories.map(({ label, icon: Icon, filter: f }) => (
          <button key={label} onClick={() => setFilter(f)} className="flex w-24 shrink-0 flex-col items-center gap-2 rounded-2xl bg-card py-4 shadow-sm">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-secondary text-primary"><Icon className="h-6 w-6" /></span>
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </div>

      <Section title="Our doctors" />
      <div className="-mx-5 mb-3 flex gap-2 overflow-x-auto px-5">
        {filters.map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`shrink-0 rounded-xl px-3 py-2 text-sm ${filter === f ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground"}`}>{f}</button>
        ))}
      </div>
      <div className="space-y-3">{list.map((d) => <DoctorCard key={d.id} d={d} />)}</div>
    </Shell>
  );
}

function Section({ title }: { title: string }) {
  return (
    <div className="mb-3 mt-6 flex items-center justify-between">
      <h2 className="text-lg font-medium">{title}</h2>
      <Link to="/doctors" className="text-sm font-medium text-primary">View All</Link>
    </div>
  );
}
