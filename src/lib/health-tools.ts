export type LabStatus = "Normal" | "Borderline" | "High";

export type LabMetric = {
  id: string;
  name: string;
  unit: string;
  borderline: number; // value at or above which it's borderline
  high: number; // value at or above which it's high
  about: string;
  explain: Record<LabStatus, string>;
  questions: string[];
};

export const labMetrics: LabMetric[] = [
  {
    id: "hba1c", name: "HbA1c", unit: "%", borderline: 5.7, high: 6.5,
    about: "Your average blood sugar over the last 2–3 months.",
    explain: {
      Normal: "Your long-term blood sugar is in a healthy range.",
      Borderline: "This is the prediabetes range. Diet, activity and weight changes can often bring it back down.",
      High: "This is in the diabetes range. Your doctor will likely want to confirm it and discuss a treatment plan.",
    },
    questions: ["Should I repeat this test, and when?", "What diet changes would help me most?", "Do I need medication?"],
  },
  {
    id: "glucose", name: "Fasting Blood Glucose", unit: "mg/dL", borderline: 100, high: 126,
    about: "The sugar in your blood after not eating for 8+ hours.",
    explain: {
      Normal: "Your fasting sugar is healthy.",
      Borderline: "Slightly raised — this can be an early sign of prediabetes.",
      High: "Raised enough to suggest diabetes if repeated on another day.",
    },
    questions: ["Should I check my HbA1c too?", "How often should I test at home?", "Could any of my medicines affect this?"],
  },
  {
    id: "bp", name: "Blood Pressure (systolic)", unit: "mmHg", borderline: 120, high: 130,
    about: "The top number — pressure in your arteries when your heart beats.",
    explain: {
      Normal: "Your blood pressure is in a healthy range.",
      Borderline: "Elevated. Less salt, more activity and less stress can help.",
      High: "This is high blood pressure, which raises heart and stroke risk over time.",
    },
    questions: ["Should I monitor it at home?", "How much should I cut salt?", "Do I need blood pressure medicine?"],
  },
  {
    id: "chol", name: "Total Cholesterol", unit: "mg/dL", borderline: 200, high: 240,
    about: "The total fat-like substance in your blood.",
    explain: {
      Normal: "Your cholesterol is in a desirable range.",
      Borderline: "Borderline high. Eating less saturated fat and more fibre can help.",
      High: "High cholesterol increases heart disease risk over time.",
    },
    questions: ["What are my LDL and HDL numbers?", "Do I need a statin?", "What foods should I limit?"],
  },
];

export function classifyLab(metric: LabMetric, value: number): LabStatus {
  if (value >= metric.high) return "High";
  if (value >= metric.borderline) return "Borderline";
  return "Normal";
}

export type Interaction = { level: "warn" | "info"; text: string };

export const medicineRules: { match: string; name: string; advice: Interaction[] }[] = [
  { match: "metformin", name: "Metformin", advice: [
    { level: "info", text: "Take with meals to reduce stomach upset." },
    { level: "warn", text: "Avoid alcohol — it raises the risk of low blood sugar." },
  ] },
  { match: "levothyroxine", name: "Levothyroxine", advice: [
    { level: "info", text: "Take on an empty stomach, 30–60 min before breakfast." },
    { level: "warn", text: "Avoid dairy, calcium, iron and coffee within 4 hours." },
  ] },
  { match: "warfarin", name: "Warfarin", advice: [
    { level: "warn", text: "Keep leafy greens (vitamin K) consistent — sudden changes affect the dose." },
    { level: "warn", text: "Avoid cranberry juice and alcohol." },
  ] },
  { match: "atorvastatin", name: "Atorvastatin", advice: [
    { level: "warn", text: "Avoid large amounts of grapefruit or grapefruit juice." },
    { level: "info", text: "Can be taken with or without food, ideally the same time daily." },
  ] },
  { match: "ciprofloxacin", name: "Ciprofloxacin", advice: [
    { level: "warn", text: "Avoid dairy and calcium-fortified drinks within 2 hours." },
    { level: "warn", text: "Limit caffeine — this medicine can make its effects stronger." },
  ] },
  { match: "vitamin d", name: "Vitamin D", advice: [
    { level: "info", text: "Take with a meal that contains some fat for better absorption." },
  ] },
  { match: "ibuprofen", name: "Ibuprofen", advice: [
    { level: "info", text: "Take with food or milk to protect your stomach." },
    { level: "warn", text: "Avoid alcohol." },
  ] },
];

export function findInteractions(text: string) {
  const t = text.toLowerCase();
  return medicineRules.filter((r) => t.includes(r.match));
}
