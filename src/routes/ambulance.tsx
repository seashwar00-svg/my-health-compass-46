import { createFileRoute } from "@tanstack/react-router";
import { Ambulance, MapPin, Phone, Timer } from "lucide-react";
import { Shell, PageHeader } from "@/components/Shell";
import { ambulances } from "@/lib/data";

export const Route = createFileRoute("/ambulance")({
  head: () => ({
    meta: [
      { title: "Nearby Ambulances — Medicore" },
      { name: "description", content: "See nearby ambulances with location, ETA and one-tap calling." },
      { property: "og:title", content: "Nearby Ambulances — Medicore" },
      { property: "og:description", content: "Call the closest ambulance fast." },
    ],
  }),
  component: AmbulancePage,
});

function AmbulancePage() {
  return (
    <Shell>
      <PageHeader title="Nearby ambulances" subtitle="Live availability" />
      <a href="tel:911" className="mb-4 flex items-center justify-center gap-2 rounded-2xl bg-destructive py-4 font-semibold text-destructive-foreground">
        <Phone className="h-5 w-5" /> Call emergency 911
      </a>
      <div className="space-y-3">
        {ambulances.map((a) => (
          <div key={a.id} className="rounded-3xl bg-card p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-secondary text-primary"><Ambulance className="h-6 w-6" /></span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{a.name}</h3>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${a.available ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"}`}>{a.available ? "Available" : "Busy"}</span>
                </div>
                <p className="text-sm text-muted-foreground">{a.unit}</p>
                <p className="mt-2 flex items-center gap-1 text-sm"><MapPin className="h-4 w-4 text-primary" />{a.location} · {a.distance}</p>
                <p className="mt-1 flex items-center gap-1 text-sm"><Timer className="h-4 w-4 text-primary" />ETA {a.eta}</p>
              </div>
            </div>
            <a href={`tel:${a.phone}`} className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-medium text-primary-foreground"><Phone className="h-4 w-4" />Call {a.phone}</a>
          </div>
        ))}
      </div>
    </Shell>
  );
}
