"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const CONSENT_KEY = "cookieConsent";
const CONSENT_COOKIE = "CookieConsent";

function hasConsent() {
  try {
    if (["accepted", "declined"].includes(localStorage.getItem(CONSENT_KEY) ?? "")) {
      return true;
    }
  } catch {}

  return document.cookie
    .split(";")
    .map((value) => value.trim())
    .some((value) => ["accepted", "declined"].includes(value.split("=")[1] ?? "") && value.startsWith(`${CONSENT_COOKIE}=`));
}

export default function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(!hasConsent());
  }, []);

  const saveConsent = (value: "accepted" | "declined") => {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch {}

    document.cookie = `${CONSENT_COOKIE}=${value}; max-age=31536000; path=/; samesite=lax`;

    if (value === "accepted") {
      window.dispatchEvent(new Event("cookieConsentAccepted"));
    }

    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-consent-title"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2147483647,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        style={{
          width: "min(600px, 100%)",
          background: "#fff",
          color: "#333",
          borderRadius: "12px",
          padding: "24px 28px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
        }}
      >
        <h2 id="cookie-consent-title" style={{ margin: "0 0 16px", fontSize: "20px", color: "#1a1a1a" }}>
          How we use cookies and your consent
        </h2>
        <p style={{ margin: "0 0 24px", fontSize: "14px", lineHeight: 1.6 }}>
          We use cookies to improve website performance and your experience. You can manage your preferences at any time.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "flex-end", alignItems: "center" }}>
          <Link href="/privacy" style={{ color: "#082326", fontWeight: 600, padding: "8px 4px" }}>
            Privacy Policy
          </Link>
          <button type="button" onClick={() => saveConsent("declined")} style={buttonStyle}>
            Reject all
          </button>
          <button type="button" onClick={() => saveConsent("accepted")} style={buttonStyle}>
            Accept cookies
          </button>
        </div>
      </div>
    </div>
  );
}

const buttonStyle = {
  background: "#082326",
  color: "#fff",
  border: 0,
  borderRadius: "6px",
  padding: "8px 14px",
  fontWeight: 600,
  cursor: "pointer",
};
