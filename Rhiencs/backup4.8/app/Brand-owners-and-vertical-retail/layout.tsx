import type { Metadata } from "next";
export const metadata: Metadata = {
  title:
    "Vertical Retail Solutions for Connected Operations, Inventory & Customer Experience | RheinBrücke",
  description:
    "Built for vertical retailers managing design, production, inventory, and direct-to-customer sales.",
};
export default function EcommerceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
