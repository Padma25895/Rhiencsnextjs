import type { Metadata } from "next";
export const metadata: Metadata = {
  title:
    "ERP for Process Manufacturing Solutions | RheinBrücke",
  description:
    "Optimize Process manufacturing for food, pharma, chemicals, oil and gas, and other manufacturers. Improve production, traceability, compliance, quality, and cost control.",
};
export default function EpicorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
