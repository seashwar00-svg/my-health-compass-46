import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState } from "react";
import { ArrowUp, Stethoscope } from "lucide-react";
import { Shell, PageHeader } from "@/components/Shell";
import { checkSymptoms } from "@/lib/symptoms.functions";

export const Route = createFileRoute("/symptoms")({
  head: () => ({
    meta: [
      { title: "AI Symptom Checker — Medicore" },
      { name: "description", content: "Describe your symptoms and get general health guidance from AI." },
      { property: "og:title", content: "AI Symptom Checker — Medicore" },
      { property: "og:description", content: "Get instant symptom guidance." },
    ],
  }),
  component: Symptoms,
});

type Msg = { role: "user" | "assistant"; content: string };
const suggestions = ["Headache and mild fever for 2 days", "Tooth pain when drinking cold water", "Chest tightness after climbing stairs"];

function Symptoms() {
  const ask = useServerFn(checkSymptoms);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => {
    end.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, loading]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    const next = [...msgs, { role: "user" as const, content: text.trim() }];
    setMsgs(next); setInput(""); setLoading(true);
    try {
      const r = await ask({ data: { messages: next } });
      setMsgs([...next, { role: "assistant", content: "reply" in r && r.reply ? r.reply : ("error" in r && r.error) || "Something went wrong." }]);
    } catch {
      setMsgs([...next, { role: "assistant", content: "Something went wrong. Please try again." }]);
    } finally { setLoading(false); }
  };

  return (
    <Shell>
      <PageHeader title="Symptom checker" subtitle="AI guidance" />
      <p className="mb-4 rounded-2xl bg-secondary p-3 text-xs text-secondary-foreground">General guidance only — not a medical diagnosis. In an emergency, use SOS or call 911.</p>
      <div className="space-y-3 pb-24">
        {!msgs.length && (
          <div className="space-y-2">
            {suggestions.map((s) => (
              <button key={s} onClick={() => send(s)} className="block w-full rounded-2xl bg-card p-3 text-left text-sm shadow-sm">{s}</button>
            ))}
          </div>
        )}
        {msgs.map((m, i) =>
          m.role === "user" ? (
            <div key={i} className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-primary px-4 py-3 text-sm text-primary-foreground">{m.content}</div>
          ) : (
            <div key={i} className="flex gap-2">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-secondary text-primary"><Stethoscope className="h-4 w-4" /></span>
              <div className="whitespace-pre-wrap text-sm leading-relaxed">{m.content}</div>
            </div>
          ),
        )}
        {loading && <div className="flex items-center gap-2 text-sm text-muted-foreground"><Stethoscope className="h-4 w-4 animate-pulse text-primary" />Analyzing your symptoms…</div>}
        <div ref={end} />
      </div>
      <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="fixed bottom-24 left-1/2 flex w-[calc(100%-2.5rem)] max-w-[24rem] -translate-x-1/2 gap-2 rounded-2xl bg-card p-2 shadow-lg">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Describe how you feel…" className="flex-1 bg-transparent px-2 text-sm outline-none" />
        <button aria-label="Send" disabled={loading} className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground disabled:opacity-50"><ArrowUp className="h-5 w-5" /></button>
      </form>
    </Shell>
  );
}
