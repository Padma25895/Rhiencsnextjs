import type { Metadata } from "next";
export const metadata: Metadata = {
  title:
    "ERP Customer Excellence (CX) Services | ERP Optimisation & Support | RheinBrücke",
  description:
    "Drive ERP performance through expert support, continuous optimisation, and data-driven decision-making.",
};
export default function EpicorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
