import { Link } from "@tanstack/react-router";
import { Clock, MessageCircle, Phone, Star, MapPin } from "lucide-react";
import type { Doctor } from "@/lib/data";

export function DoctorCard({ d, showClinic }: { d: Doctor; showClinic?: boolean }) {
  return (
    <div className="flex gap-3 rounded-3xl bg-card p-2.5 shadow-sm">
      <img src={d.photo} alt={d.name} loading="lazy" width={736} height={912} className="h-32 w-24 rounded-2xl object-cover" />
      <div className="flex min-w-0 flex-1 flex-col py-1 pr-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="truncate font-semibold">{d.name}</h3>
          <span className="flex items-center gap-1 text-sm"><Star className="h-4 w-4 fill-warning text-warning" />{d.rating}</span>
        </div>
        <p className="text-sm text-muted-foreground">{d.specialty}</p>
        {showClinic ? (
          <p className="mt-1.5 flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3.5 w-3.5" />{d.clinic} · {d.distance}</p>
        ) : null}
        <p className="mt-1.5 flex items-center gap-1 text-xs"><Clock className="h-3.5 w-3.5" />{d.hours}</p>
        <div className="mt-auto flex gap-2 pt-2">
          <Link to="/book/$doctorId" params={{ doctorId: d.id }} className="flex-1 rounded-xl bg-primary py-2 text-center text-sm font-medium text-primary-foreground">Book now</Link>
          {showClinic ? (
            <a href={`tel:${d.phone}`} aria-label="Call" className="grid h-9 w-9 place-items-center rounded-xl border"><Phone className="h-4 w-4" /></a>
          ) : (
            <Link to="/symptoms" aria-label="Chat" className="grid h-9 w-9 place-items-center rounded-xl border"><MessageCircle className="h-4 w-4" /></Link>
          )}
        </div>
      </div>
    </div>
  );
}
