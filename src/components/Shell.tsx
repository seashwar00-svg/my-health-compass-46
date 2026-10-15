import { Link, useRouter } from "@tanstack/react-router";
import { ArrowLeft, Home, CalendarDays, Bot, Siren } from "lucide-react";
import type { ReactNode } from "react";

export function Shell({ children, nav = true }: { children: ReactNode; nav?: boolean }) {
  return (
    <div className="min-h-screen bg-background">
      <div className={`relative mx-auto min-h-screen max-w-md px-5 pt-6 ${nav ? "pb-28" : "pb-8"}`}>
        {children}
        {nav && <BottomNav />}
      </div>
    </div>
  );
}

export function PageHeader({ title, subtitle, right }: { title: string; subtitle?: string; right?: ReactNode }) {
  const router = useRouter();
  return (
    <div className="mb-5">
      <div className="flex items-center justify-between">
        <button aria-label="Back" onClick={() => router.history.back()} className="grid h-11 w-11 place-items-center rounded-full bg-card shadow-sm">
          <ArrowLeft className="h-5 w-5" />
        </button>
        {subtitle && <div className="text-center text-xs text-muted-foreground">{subtitle}</div>}
        <div className="h-11 w-11">{right}</div>
      </div>
      <h1 className="mt-5 text-3xl font-semibold tracking-tight">{title}</h1>
    </div>
  );
}

const items = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/doctors", label: "Doctors", icon: CalendarDays },
  { to: "/symptoms", label: "AI Check", icon: Bot },
  { to: "/sos", label: "SOS", icon: Siren },
] as const;

function BottomNav() {
  return (
    <nav className="fixed bottom-4 left-1/2 z-40 flex w-[calc(100%-2.5rem)] max-w-[24rem] -translate-x-1/2 items-center justify-between rounded-3xl bg-dock p-2 shadow-xl">
      {items.map(({ to, label, icon: Icon }) => (
        <Link
          key={to}
          to={to}
          className="group flex h-11 items-center justify-center gap-1.5 rounded-2xl px-4 text-dock-foreground data-[status=active]:bg-card data-[status=active]:text-foreground"
        >
          <Icon className="h-5 w-5" />
          <span className="hidden text-sm font-medium group-data-[status=active]:inline">{label}</span>
        </Link>
      ))}
    </nav>
  );
}
