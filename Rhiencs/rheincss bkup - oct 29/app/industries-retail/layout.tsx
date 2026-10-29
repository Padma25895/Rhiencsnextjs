import type { Metadata } from "next";
export const metadata: Metadata = {
  title:
    "Retail Technology Solutions for Digital Transformation | RheinBrücke",
  description:
    "Enable retail transformation with connected platforms that unify stores, ecommerce, supply chain, and customer experiences.",
};
export default function EpicorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
