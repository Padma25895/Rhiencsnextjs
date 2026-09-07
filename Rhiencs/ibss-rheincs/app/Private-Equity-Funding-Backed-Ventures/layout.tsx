import type { Metadata } from "next";
export const metadata: Metadata = {
  title:
    "ERP Solutions for Private Equity Portfolio Companies | RheinBrücke",
  description:
    "Drive value creation across portfolio companies with private equity solutions for operational transformation, integrations, carve-outs, governance, and exit readiness.",
};
export default function EpicorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
