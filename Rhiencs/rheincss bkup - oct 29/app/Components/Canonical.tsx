
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Canonical() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;

    // Build the canonical URL automatically
    const canonicalUrl =
      `https://www.rheincs.com${pathname === "/" ? "/" : pathname.replace(/\/+$/, "") + "/"}`;

    // Find the existing canonical tag
    let canonical = document.querySelector(
      "link[rel='canonical']"
    ) as HTMLLinkElement | null;

    // Create the tag if it doesn't exist
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }

    // Update the URL whenever the route changes
    canonical.setAttribute("href", canonicalUrl);
  }, [pathname]);

  return null;
}
