import { describe, it, expect } from "vitest";
import { labMetrics, classifyLab, findInteractions } from "@/lib/health-tools";

const m = (id: string) => labMetrics.find((x) => x.id === id)!;

describe("lab classification", () => {
  it("HbA1c thresholds", () => {
    expect(classifyLab(m("hba1c"), 5.4)).toBe("Normal");
    expect(classifyLab(m("hba1c"), 5.7)).toBe("Borderline");
    expect(classifyLab(m("hba1c"), 6.5)).toBe("High");
  });
  it("glucose thresholds", () => {
    expect(classifyLab(m("glucose"), 110)).toBe("Borderline");
    expect(classifyLab(m("glucose"), 130)).toBe("High");
  });
});

describe("interactions", () => {
  it("flags metformin in a task", () => {
    expect(findInteractions("Take Metformin 500mg").map((r) => r.name)).toEqual(["Metformin"]);
  });
});
