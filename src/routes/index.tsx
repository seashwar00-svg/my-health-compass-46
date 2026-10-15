import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import cross from "@/assets/cross.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Medicore — Your Health, One Tap Away" },
      { name: "description", content: "Find trusted doctors, book appointments, call ambulances and track your health in one app." },
      { property: "og:title", content: "Medicore — Your Health, One Tap Away" },
      { property: "og:description", content: "Smart, centralized healthcare on your phone." },
    ],
  }),
  component: Splash,
});

function Splash() {
  return (
    <div className="min-h-screen bg-primary text-primary-foreground">
      <div className="relative mx-auto flex min-h-screen max-w-md flex-col items-center justify-end overflow-hidden px-6 pb-10">
        <div className="absolute left-1/2 top-16 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-primary-foreground/10" />
        <div className="absolute left-1/2 top-28 h-[18rem] w-[18rem] -translate-x-1/2 rounded-full bg-primary-foreground/10" />
        <img src={cross} alt="Medicore" width={816} height={816} className="absolute top-20 w-72 drop-shadow-2xl" />
        <div className="relative text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] opacity-80">Medicore</p>
          <h1 className="text-4xl font-medium leading-tight">Your Health,<br />One Tap Away</h1>
          <p className="mx-auto mt-4 max-w-xs text-sm opacity-85">
            Find trusted doctors and book appointments in seconds — anytime, anywhere.
          </p>
        </div>
        <Link to="/home" className="relative mt-10 flex w-full max-w-xs items-center justify-between rounded-2xl bg-card py-2 pl-14 pr-2 text-foreground">
          <span className="flex-1 text-center font-medium">Get started</span>
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-dock text-primary-foreground"><ArrowRight className="h-5 w-5" /></span>
        </Link>
      </div>
    </div>
  );
}
