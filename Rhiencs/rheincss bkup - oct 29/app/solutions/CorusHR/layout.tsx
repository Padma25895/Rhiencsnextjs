import type { Metadata } from "next";
export const metadata: Metadata = {
  title:
    "HRMS Software for Global Workforce Management | CorusHR ",
  description:
    "CorusHR is a global Human Resource Management Solution for managing employee lifecycles, HR workflows, self-service, reporting, multisite operations, and ERP integration.",
};
export default function EpicorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
