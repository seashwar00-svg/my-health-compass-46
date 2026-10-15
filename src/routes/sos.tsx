import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Phone, Ambulance, Users } from "lucide-react";
import { Shell, PageHeader } from "@/components/Shell";

export const Route = createFileRoute("/sos")({
  head: () => ({
    meta: [
      { title: "SOS Emergency — Medicore" },
      { name: "description", content: "Send an emergency alert with your live location to trusted contacts." },
      { property: "og:title", content: "SOS Emergency — Medicore" },
      { property: "og:description", content: "One-tap emergency help." },
    ],
  }),
  component: Sos,
});

const contacts = [
  { name: "Mark F. (Husband)", phone: "+15550201" },
  { name: "Dr. Helena Mcneil", phone: "+15550101" },
];

function Sos() {
  const [state, setState] = useState<"idle" | "locating" | "sent">("idle");
  const [loc, setLoc] = useState<string | null>(null);

  const trigger = () => {
    setState("locating");
    const finish = (text: string) => { setLoc(text); setState("sent"); };
    if (!navigator.geolocation) return finish("Location unavailable");
    navigator.geolocation.getCurrentPosition(
      (p) => finish(`${p.coords.latitude.toFixed(5)}, ${p.coords.longitude.toFixed(5)}`),
      () => finish("Location permission denied"),
      { timeout: 8000 },
    );
  };

  return (
    <Shell>
      <PageHeader title="SOS Emergency" subtitle="Help is one tap away" />
      <div className="flex flex-col items-center py-6">
        <button onClick={trigger} className="relative grid h-56 w-56 place-items-center rounded-full bg-destructive/15">
          <span className="absolute inset-4 animate-ping rounded-full bg-destructive/20" />
          <span className="relative grid h-40 w-40 place-items-center rounded-full bg-destructive text-3xl font-bold text-destructive-foreground shadow-2xl">SOS</span>
        </button>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          {state === "idle" && "Tap to alert your emergency contacts with your live location."}
          {state === "locating" && "Getting your location…"}
          {state === "sent" && "Alert sent to your emergency contacts."}
        </p>
        {loc && <p className="mt-2 flex items-center gap-1 text-sm font-medium"><MapPin className="h-4 w-4 text-destructive" />{loc}</p>}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <a href="tel:911" className="flex items-center justify-center gap-2 rounded-2xl bg-card py-4 font-medium shadow-sm"><Phone className="h-5 w-5 text-destructive" />Call 911</a>
        <Link to="/ambulance" className="flex items-center justify-center gap-2 rounded-2xl bg-card py-4 font-medium shadow-sm"><Ambulance className="h-5 w-5 text-primary" />Ambulances</Link>
      </div>
      <h2 className="mb-3 mt-6 flex items-center gap-2 font-medium"><Users className="h-4 w-4" />Emergency contacts</h2>
      <div className="space-y-2">
        {contacts.map((c) => (
          <div key={c.phone} className="flex items-center justify-between rounded-2xl bg-card p-4 shadow-sm">
            <span className="text-sm font-medium">{c.name}</span>
            <a href={`tel:${c.phone}`} aria-label={`Call ${c.name}`} className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground"><Phone className="h-4 w-4" /></a>
          </div>
        ))}
      </div>
    </Shell>
  );
}
