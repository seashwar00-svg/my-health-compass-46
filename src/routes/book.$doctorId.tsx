import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { MoreVertical, Star, CheckCircle2 } from "lucide-react";
import { Shell, PageHeader } from "@/components/Shell";
import { doctors } from "@/lib/data";
import { useLocal } from "@/lib/use-local";

export const Route = createFileRoute("/book/$doctorId")({
  loader: ({ params }) => {
    const d = doctors.find((x) => x.id === params.doctorId);
    if (!d) throw notFound();
    return { doctorId: d.id };
  },
  head: () => ({
    meta: [
      { title: "Book Appointment — Medicore" },
      { name: "description", content: "Pick a date, time slot and reason for your doctor's visit." },
      { property: "og:title", content: "Book Appointment — Medicore" },
      { property: "og:description", content: "Book a doctor appointment in seconds." },
    ],
  }),
  component: Book,
});

const slots = ["09:00 am", "10:00 am", "12:00 pm", "02:00 pm", "03:00 pm", "05:00 pm"];

function Book() {
  const { doctorId } = Route.useLoaderData();
  const d = doctors.find((x) => x.id === doctorId)!;
  const days = useMemo(() => {
    const t = new Date();
    return Array.from({ length: 10 }, (_, i) => new Date(t.getFullYear(), t.getMonth(), t.getDate() + i));
  }, []);
  const [day, setDay] = useState(0);
  const [slot, setSlot] = useState("12:00 pm");
  const [reason, setReason] = useState("");
  const [done, setDone] = useState(false);
  const [, setAppts] = useLocal<{ doctor: string; date: string; slot: string; reason: string }[]>("medicore-appts", []);
  const today = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  if (done) {
    return (
      <Shell nav={false}>
        <div className="flex min-h-[80vh] flex-col items-center justify-center text-center">
          <CheckCircle2 className="h-20 w-20 text-success" />
          <h1 className="mt-4 text-2xl font-semibold">Appointment booked</h1>
          <p className="mt-2 text-muted-foreground">{d.name} · {days[day]!.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })} at {slot}</p>
          <Link to="/home" className="mt-8 w-full rounded-2xl bg-primary py-4 font-medium text-primary-foreground">Back to home</Link>
        </div>
      </Shell>
    );
  }

  return (
    <Shell nav={false}>
      <PageHeader title="Appointment" subtitle={`Today\n${today}`} right={<button aria-label="More" className="grid h-11 w-11 place-items-center rounded-full bg-card shadow-sm"><MoreVertical className="h-5 w-5" /></button>} />
      <div className="flex items-center gap-3 rounded-3xl bg-card p-2.5 shadow-sm">
        <img src={d.photo} alt={d.name} width={736} height={912} className="h-20 w-20 rounded-2xl object-cover" />
        <div className="flex-1">
          <div className="flex justify-between"><h3 className="font-semibold">{d.name}</h3><span className="flex items-center gap-1 pr-2 text-sm"><Star className="h-4 w-4 fill-warning text-warning" />{d.rating}</span></div>
          <p className="text-sm text-muted-foreground">{d.specialty}</p>
        </div>
      </div>

      <h2 className="mb-3 mt-6 font-medium">Appointment slot</h2>
      <div className="-mx-5 flex gap-1 overflow-x-auto px-5">
        {days.map((dt, i) => {
          const sunday = dt.getDay() === 0;
          return (
            <button key={i} disabled={sunday} onClick={() => setDay(i)} className={`flex w-12 shrink-0 flex-col items-center rounded-xl py-2 text-sm ${day === i ? "bg-primary text-primary-foreground" : sunday ? "text-muted-foreground/50" : ""}`}>
              <span className="text-xs opacity-80">{dt.toLocaleDateString("en-US", { weekday: "short" })}</span>
              <span className="font-semibold">{dt.getDate()}</span>
            </button>
          );
        })}
      </div>
      <div className="-mx-5 mt-4 flex gap-2 overflow-x-auto px-5">
        {slots.map((s) => (
          <button key={s} onClick={() => setSlot(s)} className={`shrink-0 rounded-xl px-4 py-3 text-sm ${slot === s ? "bg-primary text-primary-foreground" : "bg-card"}`}>{s}</button>
        ))}
      </div>

      <h2 className="mb-3 mt-6 font-medium">Reason for doctor's visit</h2>
      <textarea value={reason} onChange={(e) => setReason(e.target.value)} rows={4} placeholder="Describe your symptoms & complaints" className="w-full resize-none rounded-2xl bg-card p-4 text-sm outline-none focus:ring-2 focus:ring-ring" />
      <button
        onClick={() => {
          setAppts((a) => [...a, { doctor: d.name, date: days[day]!.toISOString(), slot, reason }]);
          setDone(true);
        }}
        className="mt-6 w-full rounded-2xl bg-primary py-4 font-medium text-primary-foreground"
      >
        Book now
      </button>
    </Shell>
  );
}
