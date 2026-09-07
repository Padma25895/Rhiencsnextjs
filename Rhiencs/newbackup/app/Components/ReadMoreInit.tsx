"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

type TranslationLabels = Record<string, Record<string, string>>;

const getLabel = (key: "Read More" | "Read Less") => {
  const translations = (window as typeof window & {
    translations?: TranslationLabels;
  }).translations;
  const language = localStorage.getItem("preferredLanguage") || "English";

  return translations?.[language]?.[key] || key;
};

const initializeReadMoreToggles = () => {
  const buttons = Array.from(
    document.querySelectorAll<HTMLElement>("#toggleReadMore"),
  );
  const content = Array.from(document.querySelectorAll<HTMLElement>("#more"));

  buttons.forEach((button, index) => {
    const moreContent = content[index];
    const label = button.querySelector<HTMLElement>(".label");
    const icon = button.querySelector<HTMLElement>(".svg-container");

    if (!moreContent || !label) return;

    const updateButton = () => {
      const isHidden = moreContent.classList.contains("hidden");
      label.textContent = getLabel(isHidden ? "Read More" : "Read Less");
      icon?.classList.toggle("rotate-up", !isHidden);
      button.setAttribute("aria-expanded", String(!isHidden));
    };

    if (button.dataset.readmoreInitialized === "true") {
      updateButton();
      return;
    }

    const toggle = (event: Event) => {
      event.preventDefault();
      moreContent.classList.toggle("hidden");
      updateButton();
    };

    button.dataset.readmoreInitialized = "true";
    button.setAttribute("role", "button");
    button.setAttribute("tabindex", "0");
    button.setAttribute("aria-controls", moreContent.id || `more-${index}`);
    button.addEventListener("click", toggle);
    button.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") toggle(event);
    });
    updateButton();
  });
};

export default function ReadMoreInit() {
  const pathname = usePathname();

  useEffect(() => {
    initializeReadMoreToggles();

    const updateLabels = () => initializeReadMoreToggles();
    window.addEventListener("preferredLanguageChange", updateLabels);

    return () => {
      window.removeEventListener("preferredLanguageChange", updateLabels);
    };
  }, [pathname]);

  return null;
}
