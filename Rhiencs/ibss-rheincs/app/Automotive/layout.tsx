import type { Metadata } from "next";
export const metadata: Metadata = {
  title:
    "Digital Solutions and ERP for Automotive Manufacturers | RheinBrücke",
  description:
    "Transform automotive manufacturing with integrated ERP, MES, and supply chain solutions that improve production efficiency, quality, and business resilience.",
};
export default function EcommerceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
