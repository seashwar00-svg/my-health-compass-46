import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { Shell, PageHeader } from "@/components/Shell";
import { DoctorCard } from "@/components/DoctorCard";
import { doctors } from "@/lib/data";

export const Route = createFileRoute("/doctors")({
  head: () => ({
    meta: [
      { title: "Local Doctors — Medicore" },
      { name: "description", content: "Directory of trusted local doctors near you." },
      { property: "og:title", content: "Local Doctors — Medicore" },
      { property: "og:description", content: "Find and book local doctors." },
    ],
  }),
  component: Doctors,
});

function Doctors() {
  const [q, setQ] = useState("");
  const list = doctors.filter((d) => `${d.name} ${d.specialty} ${d.clinic}`.toLowerCase().includes(q.toLowerCase()));
  return (
    <Shell>
      <PageHeader title="Local doctors" subtitle="Near you" />
      <label className="mb-4 flex items-center gap-2 rounded-2xl bg-card px-4 py-3 shadow-sm">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, specialty, clinic" className="flex-1 bg-transparent text-sm outline-none" />
      </label>
      <div className="space-y-3">
        {list.map((d) => <DoctorCard key={d.id} d={d} showClinic />)}
        {!list.length && <p className="py-10 text-center text-sm text-muted-foreground">No doctors match your search.</p>}
      </div>
    </Shell>
  );
}
