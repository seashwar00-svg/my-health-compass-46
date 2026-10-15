import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Plus, Trash2 } from "lucide-react";
import { Shell, PageHeader } from "@/components/Shell";
import { useLocal } from "@/lib/use-local";

export const Route = createFileRoute("/checklist")({
  head: () => ({
    meta: [
      { title: "Daily Health Checklist — Medicore" },
      { name: "description", content: "Track medicines, health checks and daily care tasks." },
      { property: "og:title", content: "Daily Health Checklist — Medicore" },
      { property: "og:description", content: "Your daily health routine." },
    ],
  }),
  component: Checklist,
});

type Task = { id: string; text: string; time: string; done: boolean };
const defaults: Task[] = [
  { id: "1", text: "Take Metformin 500mg", time: "08:00 am", done: false },
  { id: "2", text: "Check blood pressure", time: "09:00 am", done: false },
  { id: "3", text: "Drink 8 glasses of water", time: "All day", done: false },
  { id: "4", text: "30 min walk", time: "06:00 pm", done: false },
  { id: "5", text: "Take Vitamin D", time: "09:00 pm", done: false },
];

function Checklist() {
  const [tasks, setTasks] = useLocal<Task[]>("medicore-tasks", defaults);
  const [text, setText] = useState("");
  const done = tasks.filter((t) => t.done).length;
  const pct = tasks.length ? Math.round((done / tasks.length) * 100) : 0;

  return (
    <Shell>
      <PageHeader title="Daily checklist" subtitle={new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })} />
      <div className="rounded-3xl bg-primary p-5 text-primary-foreground">
        <p className="text-sm opacity-85">Today's progress</p>
        <p className="mt-1 text-3xl font-semibold">{done}/{tasks.length} done</p>
        <div className="mt-3 h-2 rounded-full bg-primary-foreground/25"><div className="h-2 rounded-full bg-primary-foreground transition-all" style={{ width: `${pct}%` }} /></div>
      </div>
      <form
        onSubmit={(e) => { e.preventDefault(); if (!text.trim()) return; setTasks([...tasks, { id: crypto.randomUUID(), text: text.trim(), time: "Today", done: false }]); setText(""); }}
        className="mt-4 flex gap-2"
      >
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Add a health task" className="flex-1 rounded-2xl bg-card px-4 py-3 text-sm shadow-sm outline-none" />
        <button aria-label="Add" className="grid w-12 place-items-center rounded-2xl bg-primary text-primary-foreground"><Plus className="h-5 w-5" /></button>
      </form>
      <div className="mt-4 space-y-2">
        {tasks.map((t) => (
          <div key={t.id} className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-sm">
            <button aria-label="Toggle" onClick={() => setTasks(tasks.map((x) => (x.id === t.id ? { ...x, done: !x.done } : x)))} className={`grid h-7 w-7 place-items-center rounded-lg border-2 ${t.done ? "border-success bg-success text-primary-foreground" : "border-border"}`}>
              {t.done && <Check className="h-4 w-4" />}
            </button>
            <div className="flex-1">
              <p className={`text-sm font-medium ${t.done ? "text-muted-foreground line-through" : ""}`}>{t.text}</p>
              <p className="text-xs text-muted-foreground">{t.time}</p>
            </div>
            <button aria-label="Delete" onClick={() => setTasks(tasks.filter((x) => x.id !== t.id))} className="text-muted-foreground"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
      </div>
    </Shell>
  );
}
