"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";
import LeadSquaredInit from "../../Components/LeadSquaredInit";
import ScriptReinit from "../../Components/ScriptReinit";
import Footer1 from "../../Components/Footer1";
import TestimonialandAward from "../../Components/TestimonialandAward";
import Awards from "../../Components/Awards";
import Link from "next/link";

interface FormField {
  id: string;
  type: "text" | "email" | "tel" | "number" | "textarea" | "select";
  label?: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
}

interface EbookSpeaker {
  label: string;
  name: string;
  role: string;
  avatar_url: string;
  avatar_svg: string;
  bio: string;
  linkedin_url: string;
}

export interface EbookLandingData {
  id: string;
  slug: string;
  template_type?: "ebook" | "webinar";
  title: string;
  headline: string | null;
  subheadline: string | null;
  additional_paragraph: string | null;
  extra_content: string | null;
  logo_text: string | null;
  logo_image_url: string | null;
  book_image_url: string | null;
  hero_image_url: string | null;
  learning_title: string | null;
  learning_description: string | null;
  benefits_heading: string | null;
  benefits: string[];
  form_title: string | null;
  form_button_text: string | null;
  form_fields: FormField[];
  author_heading: string | null;
  author_name: string | null;
  author_role: string | null;
  author_bio: string | null;
  author_avatar_url: string | null;
  author_avatar_svg: string | null;
  speakers?: EbookSpeaker[] | null;
  footer_color: string | null;
  pdf_url: string | null;
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const STORAGE_BUCKET = "case-study-images";

function resolveImageUrl(value: string | null | undefined): string | null {
  if (!value) return null;
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  return `${SUPABASE_URL}/storage/v1/object/public/${STORAGE_BUCKET}/${value}`;
}

const downloadPdf = async (rawPdfValue: string | null, title: string) => {
  if (!rawPdfValue) return;

  const safeTitle = String(title || "ebook")
    .trim()
    .replace(/[/\\?%*:|"<>]/g, "-")
    .replace(/\s+/g, " ")
    .trim();
  const filename = `${safeTitle || "ebook"}.pdf`;

  const pdfPublicUrl = resolveImageUrl(rawPdfValue);
  if (!pdfPublicUrl) return;

  try {
    const response = await fetch(pdfPublicUrl);
    if (!response.ok) throw new Error("Failed to fetch PDF");
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => URL.revokeObjectURL(blobUrl), 5000);
  } catch (err) {
    console.error("Failed to download via blob, opening directly:", err);
    window.open(pdfPublicUrl, "_blank");
  }
};

export default function EbookLandingClient({
  initialData,
  slug: propSlug,
  templateVariant,
}: {
  initialData?: EbookLandingData | null;
  slug?: string;
  templateVariant?: "ebook" | "webinar";
}) {
  const router = useRouter();
  const params = useParams();
  const slug = propSlug || (params?.slug as string);
  const supabase = createClient();

  // Keep original fixed form fields for backward compatibility (and email)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");

  const [formData, setFormData] = useState<Record<string, string>>({});
  const [pageData, setPageData] = useState<EbookLandingData | null>(
    initialData || null,
  );
  const [loading, setLoading] = useState(
    !initialData || slug === "placeholder",
  );
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaults: EbookLandingData = {
    id: "",
    slug: "default",
    title: "E-Book",
    headline: "Headline of your E-Book goes here",
    subheadline: "The supporting subheadline goes here",
    additional_paragraph: null,
    extra_content: null,
    logo_text: "Logo",
    logo_image_url: null,
    book_image_url: "/images/book.webp",
    hero_image_url: null,
    learning_title: "What will you learn from this E-Book?",
    learning_description: "Learning description goes here",
    benefits_heading: "What you'll get",
    benefits: ["Benefit One", "Benefit Two", "Benefit Three"],
    form_title: "Download the E-Book Now",
    form_button_text: "Download Now",
    form_fields: [],
    author_heading: null,
    author_name: null,
    author_role: null,
    author_bio: null,
    author_avatar_url: null,
    author_avatar_svg: null,
    speakers: null,
    footer_color: "#3aaee0",
    pdf_url: null,
  };

  const data = pageData || defaults;
  const accentColor = data.footer_color || "#3aaee0";
  const isWebinarTemplate =
    templateVariant === "webinar" ||
    (!templateVariant && data.template_type === "webinar");
  const webinarSpeakers: EbookSpeaker[] = (Array.isArray(data.speakers)
    ? data.speakers
    : []
  ).filter((speaker) => speaker && (speaker.name || speaker.role || speaker.avatar_url || speaker.avatar_svg));

  if (
    isWebinarTemplate &&
    webinarSpeakers.length === 0 &&
    (data.author_name || data.author_role || data.author_avatar_url || data.author_avatar_svg)
  ) {
    webinarSpeakers.push({
      label: "Speaker",
      name: data.author_name || "",
      role: data.author_role || "",
      avatar_url: data.author_avatar_url || "",
      avatar_svg: data.author_avatar_svg || "",
      bio: data.author_bio || "",
      linkedin_url: "",
    });
  }

  // Helper to check if a field has actual content (not just empty HTML)
  const hasContent = (value: any) => {
    if (typeof value === "string") {
      const stripped = value.replace(/<[^>]*>/g, "").trim();
      return stripped !== "";
    }
    return !!value;
  };

  const stripWrapperTags = (html: string) => {
    let s = html;
    const trimOuter = /^\s*<(p|div)[^>]*>([\s\S]*?)<\/\1>\s*$/i;
    let guard = 10;
    while (guard-- > 0) {
      const before = s;
      s = s.replace(trimOuter, (_, _tag, inner) => inner);
      if (s === before) break;
    }
    return s;
  };

  const normalizeHeadingHtml = (value: string | null | undefined) => {
    if (!value) return "";
    const cleaned = stripWrapperTags(
      value.replace(/&nbsp;/g, " ").replace(/\u00A0/g, " ")
    );
    return cleaned;
  };

  const normalizeRichHtml = (value: string | null | undefined) => {
    if (!value) return "";
    return value.replace(/&nbsp;/g, " ").replace(/\u00A0/g, " ");
  };

  useEffect(() => {
    if (slug === "placeholder") {
      // Do nothing - the redirects will handle it, or just wait for client-side fetch
      return;
    }

    if (slug && (!initialData || initialData.slug !== slug)) {
      fetchPageData();
    }
  }, [slug, initialData]);

  const fetchPageData = async () => {
    try {
      setLoading(true);
      setFetchError(null);
      let { data, error } = await supabase
        .from("ebook_landing_pages")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (error) {
        setFetchError(error.message);
        return;
      }

      if (!data && slug) {
        const res = await supabase
          .from("ebook_landing_pages")
          .select("*")
          .ilike("slug", slug)
          .limit(1);
        if (!res.error && Array.isArray(res.data) && res.data.length > 0) {
          data = res.data[0];
        }
      }

      if (data) {
        // Helper to convert empty strings (and empty HTML) to null
        const emptyToNull = (value: any) => {
          if (typeof value === "string") {
            // Strip HTML tags first
            const stripped = value.replace(/<[^>]*>/g, "").trim();
            if (stripped === "") {
              return null;
            }
          }
          return value;
        };

        const resolvedSpeakers = (
          Array.isArray(data.speakers) ? data.speakers : []
        ).map((s: any) => ({
          label: s?.label ?? "",
          name: emptyToNull(s?.name) ?? "",
          role: emptyToNull(s?.role) ?? "",
          avatar_url: resolveImageUrl(s?.avatar_url),
          avatar_svg: emptyToNull(s?.avatar_svg) ?? "",
          bio: emptyToNull(s?.bio) ?? "",
          linkedin_url: emptyToNull(s?.linkedin_url) ?? "",
        }));

        const resolvedData: EbookLandingData = {
          ...data,
          logo_image_url: resolveImageUrl(data.logo_image_url),
          book_image_url: resolveImageUrl(data.book_image_url),
          hero_image_url: resolveImageUrl((data as any).hero_image_url),
          author_heading: emptyToNull(data.author_heading),
          author_name: emptyToNull(data.author_name),
          author_role: emptyToNull(data.author_role),
          author_bio: emptyToNull(data.author_bio),
          author_avatar_url: resolveImageUrl(data.author_avatar_url),
          author_avatar_svg: emptyToNull(data.author_avatar_svg),
          speakers: resolvedSpeakers.length > 0 ? resolvedSpeakers : null,
          form_fields: data.form_fields || [],
        };
        setPageData(resolvedData);
      }
    } catch (err: any) {
      console.error("Fetch Error:", err);
      setFetchError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const getLatestDownloadData = async () => {
    if (!slug || slug === "placeholder") {
      return null;
    }

    try {
      const { data, error } = await supabase
        .from("ebook_landing_pages")
        .select("title, pdf_url")
        .eq("slug", slug)
        .single();

      if (error) {
        console.error("Latest PDF fetch error:", error);
        return null;
      }

      return data;
    } catch (err) {
      console.error("Latest PDF fetch exception:", err);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // EXTRACT VALUES FROM formData FIRST for 100% reliability!
    let submitName = name;
    let submitEmail = email;
    let submitPhone = phone;
    let submitCompanyName = companyName;

    //     let submitName = '';
    // let submitEmail = '';
    // let submitCompanyName = '';

    Object.keys(formData).forEach((key) => {
      const label = key.toLowerCase().trim();

      if (label === "full name") {
        submitName = formData[key];
      }

      if (label === "email") {
        submitEmail = formData[key];
      }

      if (label === "company name") {
        submitCompanyName = formData[key];
      }
    });

    if (data.form_fields && data.form_fields.length > 0) {
      console.log("ALL formData:", formData);
      data.form_fields.forEach((field) => {
        const fieldIdLower = field.id.toLowerCase();
        // EXACT MATCH ONLY for name/email/phone/companyName!
        if (fieldIdLower === "name" || fieldIdLower === "fullname") {
          submitName = formData[field.id] || "";
          console.log("Set NAME to:", submitName);
        }
        if (fieldIdLower === "email") {
          submitEmail = formData[field.id] || "";
          console.log("Set EMAIL to:", submitEmail);
        }
        if (fieldIdLower === "phone") {
          submitPhone = formData[field.id] || "";
          console.log("Set PHONE to:", submitPhone);
        }
        if (fieldIdLower === "company" || fieldIdLower === "companyname") {
          submitCompanyName = formData[field.id] || "";
          console.log("Set COMPANY to:", submitCompanyName);
        }
      });
    }

    try {
      const { error: dbError } = await supabase.from("contacts").insert([
        {
          full_name: submitName,
          email: submitEmail,
          phone: submitPhone,
          company_name: submitCompanyName,
          country_code: "+91",
          selection: `${pageData?.title || "E-Book"}`,
          // message: "Requested E-book download from landing page",
        },
      ]);

      if (dbError) throw dbError;

      // Send Email - EXACTLY like contact-us page!
      const trimmedPhone = String(submitPhone ?? "").trim();
      const phoneForEmail = trimmedPhone ? trimmedPhone : "N/A";
      const countryCodeForEmail = trimmedPhone ? "+91" : "";
      console.log(
        "Sending email with: name=" +
          submitName +
          ", email=" +
          submitEmail +
          ", phone=" +
          phoneForEmail +
          ", countryCode=" +
          countryCodeForEmail +
          ", companyName=" +
          submitCompanyName,
      );
      try {
        const { data: emailData, error: emailError } =
          await supabase.functions.invoke("send-contact-email", {
            body: {
              channel: "contact",
              fullName: submitName,
              email: submitEmail,
              phone: phoneForEmail,
              countryCode: countryCodeForEmail,
              companyName: submitCompanyName,
              selection: `${pageData?.title || "E-Book"}`,
              // message: "Requested E-book download from landing page",
            },
          });

        console.log("Email Response:", emailData);

        if (emailError) {
          console.error("Email Error:", emailError);
        }
      } catch (emailErr) {
        console.error("Email Exception:", emailErr);
      }

      // Always fetch the latest PDF URL before download so admin updates reflect immediately.
      const latestDownloadData = await getLatestDownloadData();
      const pdfUrlToDownload =
        latestDownloadData?.pdf_url || pageData?.pdf_url || null;
      const pdfTitle = latestDownloadData?.title || pageData?.title || "E-Book";

      if (latestDownloadData) {
        setPageData((prev) =>
          prev
            ? {
                ...prev,
                title: latestDownloadData.title ?? prev.title,
                pdf_url: latestDownloadData.pdf_url ?? prev.pdf_url,
              }
            : prev,
        );
      }

      if (pdfUrlToDownload) {
        await downloadPdf(pdfUrlToDownload, pdfTitle);
      }

      // Reset form
      setName("");
      setEmail("");
      setPhone("");
      setCompanyName("");

      router.push("/thanks");
    } catch (err: any) {
      console.error("Submit Error:", err);
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f2f2f2",
        }}
      >
        <p>Loading...</p>
      </div>
    );
  }

  if (!pageData && fetchError) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <h1>No Landing Page Found</h1>
        {fetchError && <p>{fetchError}</p>}
      </div>
    );
  }

  return (
    <>
      <LeadSquaredInit />

      {!isWebinarTemplate && (
        <div className="topheader defhead1 lp-mobile-safe">
          <div className="container">
            <div className="row align-items-center lp-header-row">
              <div className="col-auto">
                <Link href="/">
                  <img src="/images/rlogo.webp" alt="RheinBrücke" height={52} />
                </Link>
              </div>

              <div className="col" />

              <div className="col-auto">
                <div className="lp-header-contact">
                  <span aria-hidden="true" style={{ color: "white" }}>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M17 9L13.87 11.5C12.84 12.32 11.15 12.32 10.12 11.5L7 9"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <Link href="mailto:info@rheincs.com">info@rheincs.com</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isWebinarTemplate ? (
        <main id="webinar-landing-root" className="lp-mobile-safe">
          <section className="webinar-hero">
            {data.book_image_url && (
              <img
                className="webinar-banner-image"
                src={data.book_image_url}
                alt={data.title || "Webinar banner"}
              />
            )}
          </section>

          <section className="webinar-main" id="webinar-registration">
            <div className="webinar-copy">
              {data.learning_title && (
                <h2
                  className="webinar-reg-heading"
                  dangerouslySetInnerHTML={{
                    __html: normalizeRichHtml(data.learning_title),
                  }}
                />
              )}
              {data.learning_description && (
                <div
                  className="lp-rich-text webinar-intro"
                  dangerouslySetInnerHTML={{
                    __html: normalizeRichHtml(data.learning_description),
                  }}
                />
              )}
              {data.benefits_heading && (
                <h3
                  dangerouslySetInnerHTML={{
                    __html: normalizeRichHtml(data.benefits_heading),
                  }}
                />
              )}
              {!!data.benefits?.length && (
                <ul className="webinar-benefits">
                  {data.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              )}
              {data.extra_content && (
                <div
                  className="lp-rich-text webinar-extra"
                  dangerouslySetInnerHTML={{
                    __html: normalizeRichHtml(data.extra_content),
                  }}
                />
              )}
            </div>

            <aside className="webinar-form-card">
              <h2 dangerouslySetInnerHTML={{ __html: normalizeRichHtml(data.form_title || "Reserve Your Seat Now") }} />
              <form onSubmit={handleSubmit}>
                {(data.form_fields?.length
                  ? data.form_fields
                  : [
                      {
                        id: "fullName",
                        type: "text" as const,
                        placeholder: "Name *",
                        required: true,
                      },
                      {
                        id: "email",
                        type: "email" as const,
                        placeholder: "Email *",
                        required: true,
                      },
                      {
                        id: "companyName",
                        type: "text" as const,
                        placeholder: "Company Name *",
                        required: true,
                      },
                      {
                        id: "phone",
                        type: "tel" as const,
                        placeholder: "Phone Number",
                        required: false,
                      },
                    ]
                ).map((field) => {
                  const onChange = (
                    event: React.ChangeEvent<
                      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
                    >,
                  ) => {
                    setFormData((previous) => ({
                      ...previous,
                      [field.id]: event.target.value,
                    }));
                  };
                  const placeholder =
                    field.placeholder || field.label || field.id;
                  return (
                    <div className="webinar-form-field" key={field.id}>
                      {field.type === "textarea" ? (
                        <textarea
                          placeholder={placeholder}
                          value={formData[field.id] || ""}
                          onChange={onChange}
                          required={field.required}
                        />
                      ) : field.type === "select" ? (
                        <select
                          value={formData[field.id] || ""}
                          onChange={onChange}
                          required={field.required}
                        >
                          <option value="">{placeholder}</option>
                          {(field.options || []).map((option) => (
                            <option key={option}>{option}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={field.type}
                          placeholder={placeholder}
                          value={formData[field.id] || ""}
                          onChange={onChange}
                          required={field.required}
                        />
                      )}
                    </div>
                  );
                })}
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting
                    ? "Submitting…"
                    : data.form_button_text || "Reserve Your Seat"}
                </button>
              </form>
            </aside>
          </section>

          {!!webinarSpeakers.length && (
            <section className="webinar-speakers">
              {data.author_heading ? (
                <h2
                  dangerouslySetInnerHTML={{
                    __html: normalizeHeadingHtml(data.author_heading),
                  }}
                />
              ) : (
                <h2>Meet the Speakers</h2>
              )}
              <div className="webinar-speaker-grid">
                {webinarSpeakers.map((speaker, index) => (
                    <article
                      className="webinar-speaker"
                      key={`${speaker.name}-${index}`}
                    >
                      <div className="webinar-speaker-avatar">
                        {hasContent(speaker.avatar_svg) ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: speaker.avatar_svg,
                            }}
                          />
                        ) : hasContent(speaker.avatar_url) ? (
                          <img src={speaker.avatar_url} alt={speaker.name} />
                        ) : (
                          <span>
                            {speaker.name
                              .split(" ")
                              .map((part) => part[0])
                              .filter(Boolean)
                              .slice(0, 2)
                              .join("")
                              .toUpperCase() ||
                              speaker.label?.slice(0, 2).toUpperCase() ||
                              "SP"}
                          </span>
                        )}
                      </div>
                      {speaker.name && <h3>{speaker.name}</h3>}
                      {speaker.role && <p>{speaker.role}</p>}
                      {hasContent(speaker.linkedin_url) && (
                        <a
                          href={speaker.linkedin_url}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${speaker.name} on LinkedIn`}
                        >
                          in
                        </a>
                      )}
                    </article>
                  ))}
              </div>
            </section>
          )}
          <section className="webinar-bottom-cta">
            <h2
              dangerouslySetInnerHTML={{
                __html: normalizeHeadingHtml(data.headline),
              }}
            />
            {data.subheadline && (
              <p
                dangerouslySetInnerHTML={{
                  __html: normalizeHeadingHtml(data.subheadline),
                }}
              />
            )}
            <a href="#webinar-registration">
              {data.form_button_text || "Book Your Slot"}
            </a>
          </section>
        </main>
      ) : (
        <div id="ebook-landing-root" className="lp-mobile-safe">
          <section
            className="topheadsize lp-top-section"
            style={{
              textAlign: "center",
              padding: "30px 20px 0px",
              background: "#fff",
            }}
          >
            <div
              className="lp-logo-wrap"
              style={{
                width: "200px",
                height: "auto",
                margin: "0 auto 20px",
                borderRadius: "0%",
                overflow: "hidden",
                background: "transparent",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#fff",
                fontWeight: "bold",
                maxWidth: "100%",
              }}
            >
              {data.logo_image_url ? (
                <img
                  src={data.logo_image_url}
                  alt="Logo"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              ) : (
                data.logo_text
              )}
            </div>
            {/* {data.title && <div dangerouslySetInnerHTML={{ __html: data.title }} />} */}
            {data.headline && (
              <h1
                style={{
                  width: "80%",
                  margin: "0 auto 10px",
                  whiteSpace: "normal",
                  wordBreak: "normal",
                  overflowWrap: "normal",
                }}
                dangerouslySetInnerHTML={{
                  __html: normalizeHeadingHtml(data.headline),
                }}
              />
            )}
            {data.subheadline && (
              <h5
                style={{
                  width: "80%",
                  margin: "0 auto",
                  whiteSpace: "normal",
                  wordBreak: "normal",
                  overflowWrap: "normal",
                }}
                dangerouslySetInnerHTML={{
                  __html: normalizeHeadingHtml(data.subheadline),
                }}
              />
            )}
            {data.additional_paragraph && (
              <div
                className="lp-rich-text"
                style={{
                  marginTop: "15px",
                  fontSize: "14px",
                  color: "#000",
                  textAlign: "left",
                }}
                dangerouslySetInnerHTML={{
                  __html: normalizeRichHtml(data.additional_paragraph),
                }}
              />
            )}
          </section>

          <section
            className="lp-main-grid"
            style={{
              maxWidth: "1100px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "40px",
              padding: "40px 20px",
              width: "100%",
            }}
          >
            <div>
              <img
                src={data.book_image_url || "/images/book.webp"}
                alt="Book"
                style={{ width: "100%", maxWidth: "100%", height: "auto" }}
              />
            </div>
            <div>
              {data.learning_title && (
                <h2
                  className="lp-side-heading"
                  dangerouslySetInnerHTML={{
                    __html: normalizeRichHtml(data.learning_title),
                  }}
                />
              )}
              {data.learning_description && (
                <div
                  className="lp-rich-text"
                  style={{ marginTop: "15px" }}
                  dangerouslySetInnerHTML={{
                    __html: normalizeRichHtml(data.learning_description),
                  }}
                />
              )}
              {data.benefits_heading && (
                <h3
                  className="lp-side-heading"
                  style={{ marginTop: "20px" }}
                  dangerouslySetInnerHTML={{
                    __html: normalizeRichHtml(data.benefits_heading),
                  }}
                />
              )}
              <ul style={{ marginTop: "20px" }}>
                {data.benefits?.map((benefit, index) => (
                  <li key={index} style={{ marginBottom: "10px" }}>
                    {benefit}
                  </li>
                ))}
              </ul>
              <form onSubmit={handleSubmit} style={{ marginTop: "30px" }}>
                {data.form_title && (
                  <h3
                    className="lp-form-heading"
                    dangerouslySetInnerHTML={{
                      __html: normalizeRichHtml(data.form_title),
                    }}
                  />
                )}
                {data.form_fields && data.form_fields.length > 0 ? (
                  data.form_fields.map((field) => {
                    const defaultPlaceholder =
                      field.id.charAt(0).toUpperCase() + field.id.slice(1);

                    const handleChange = (e: any) => {
                      const value = e.target.value;

                      setFormData((prev) => ({ ...prev, [field.id]: value }));

                      // Update original state variables for email submission
                      if (
                        field.id.toLowerCase() === "name" ||
                        field.id.toLowerCase() === "fullname" ||
                        field.id.toLowerCase().includes("name")
                      ) {
                        setName(value);
                      }
                      if (
                        field.id.toLowerCase() === "email" ||
                        field.id.toLowerCase().includes("email")
                      ) {
                        setEmail(value);
                      }
                      if (
                        field.id.toLowerCase() === "phone" ||
                        field.id.toLowerCase().includes("phone")
                      ) {
                        setPhone(value);
                      }
                      if (
                        field.id.toLowerCase() === "company" ||
                        field.id.toLowerCase() === "companyname" ||
                        field.id.toLowerCase().includes("company")
                      ) {
                        setCompanyName(value);
                      }

                      console.log(
                        "Field change: id=" +
                          field.id +
                          ", value=" +
                          value +
                          ", name=" +
                          name +
                          ", email=" +
                          email,
                      );
                    };

                    return (
                      <div key={field.id} style={{ marginBottom: "12px" }}>
                        {field.label && (
                          <label
                            style={{
                              display: "block",
                              marginBottom: "4px",
                              fontWeight: 500,
                            }}
                          >
                            {field.label}
                          </label>
                        )}

                        {field.type === "textarea" ? (
                          <textarea
                            placeholder={
                              field.placeholder || defaultPlaceholder
                            }
                            value={formData[field.id] || ""}
                            onChange={handleChange}
                            required={field.required}
                            style={{ ...inputStyle, minHeight: "80px" }}
                          />
                        ) : field.type === "select" ? (
                          <select
                            value={formData[field.id] || ""}
                            onChange={handleChange}
                            required={field.required}
                            style={inputStyle}
                          >
                            <option value="">{defaultPlaceholder}...</option>
                            {(field.options || []).map((option, idx) => (
                              <option key={idx} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type={field.type}
                            placeholder={
                              field.placeholder || defaultPlaceholder
                            }
                            value={formData[field.id] || ""}
                            onChange={handleChange}
                            required={field.required}
                            style={inputStyle}
                          />
                        )}
                      </div>
                    );
                  })
                ) : (
                  // Fallback to original fields if no fields added
                  <>
                    <input
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      style={inputStyle}
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      style={inputStyle}
                    />
                    <input
                      type="text"
                      placeholder="Phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      style={inputStyle}
                    />
                    <input
                      type="text"
                      placeholder="Company Name"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      required
                      style={inputStyle}
                    />
                  </>
                )}

                <div className="text-center">
                  <button
                    className="lp-submit-btn"
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      margin: "15px auto",
                      padding: "12px 30px",
                      background: "#082326",
                      border: "none",
                      color: "#fff",
                      cursor: "pointer",
                      borderRadius: "5px",
                      maxWidth: "100%",
                    }}
                  >
                    {isSubmitting
                      ? "Submitting..."
                      : data.form_button_text || "Download Now"}
                  </button>
                </div>
              </form>
            </div>
            {data.extra_content && (
              <div
                className="contentbox lp-rich-text col-12"
                style={{ color: "#000", gridColumn: "1 / -1", width: "100%" }}
                dangerouslySetInnerHTML={{
                  __html: normalizeRichHtml(data.extra_content),
                }}
              />
            )}
          </section>

          {(() => {
            const speakersList: EbookSpeaker[] = [];

            if (Array.isArray(data.speakers) && data.speakers.length > 0) {
              data.speakers.forEach((s) => {
                if (s && (s.name || s.avatar_url || s.avatar_svg || s.role)) {
                  speakersList.push(s);
                }
              });
            }

            if (speakersList.length === 0) {
              if (
                hasContent(data.author_name) ||
                hasContent(data.author_avatar_url) ||
                hasContent(data.author_avatar_svg) ||
                hasContent(data.author_role)
              ) {
                speakersList.push({
                  label: "Author",
                  name: data.author_name || "",
                  role: data.author_role || "",
                  avatar_url: data.author_avatar_url || "",
                  avatar_svg: data.author_avatar_svg || "",
                  bio: data.author_bio || "",
                  linkedin_url: "",
                });
              }
            }

            const showHeading =
              hasContent(data.author_heading) && speakersList.length > 0;
            const showSection = speakersList.length > 0 || showHeading;

            if (!showSection) return null;

            return (
              <section
                style={{
                  background: "#f5f5f5",
                  padding: "50px 20px",
                  borderTop: "4px solid #082326",
                  borderBottom: "4px solid #082326",
                }}
              >
                <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
                  {showHeading && (
                    <h2
                      style={{
                        textAlign: "center",
                        marginBottom: "30px",
                        color: "#000",
                      }}
                      dangerouslySetInnerHTML={{
                        __html: normalizeHeadingHtml(data.author_heading),
                      }}
                    />
                  )}

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: `repeat(2, minmax(0, 1fr))`,
                      gap: "40px",
                      width: "100%",
                    }}
                    className="lp-speakers-grid"
                  >
                    {speakersList.map((speaker, idx) => {
                      const nameShown = speaker.name || "";
                      const roleShown = speaker.role || "";
                      const hasAvatarSvg = hasContent(speaker.avatar_svg);
                      const hasAvatarUrl = hasContent(speaker.avatar_url);
                      const avatarUrl = hasAvatarSvg ? "" : hasAvatarUrl ? speaker.avatar_url! : "";

                      return (
                        <div
                          key={idx}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            textAlign: "center",
                          }}
                        >
                          {speaker.label && (
                            <h2
                              style={{
                                fontSize: "clamp(28px, 4vw, 44px)",
                                fontWeight: 700,
                                color: "#666",
                                margin: "0 0 20px 0",
                                letterSpacing: "0.5px",
                              }}
                            >
                              {speaker.label}
                            </h2>
                          )}

                          <div
                            style={{
                              width: "180px",
                              height: "180px",
                              borderRadius: "50%",
                              border: "4px solid #082326",
                              overflow: "hidden",
                              background: "#fff",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              marginBottom: "16px",
                              flexShrink: 0,
                            }}
                          >
                            {hasAvatarSvg ? (
                              <div
                                style={{ width: "100%", height: "100%" }}
                                dangerouslySetInnerHTML={{
                                  __html: speaker.avatar_svg!,
                                }}
                              />
                            ) : avatarUrl ? (
                              <img
                                src={avatarUrl}
                                alt={nameShown || `speaker-${idx}`}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            ) : (
                              <span style={{ color: "#999", fontSize: "12px" }}>
                                {nameShown
                                  ? nameShown
                                      .split(" ")
                                      .map((n) => n[0])
                                      .filter(Boolean)
                                      .slice(0, 2)
                                      .join("")
                                      .toUpperCase()
                                  : "?"}
                              </span>
                            )}
                          </div>

                          {hasContent(speaker.linkedin_url) ? (
                            <a
                              href={speaker.linkedin_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "34px",
                                height: "34px",
                                background: "#0a66c2",
                                borderRadius: "2px",
                                marginBottom: "14px",
                                textDecoration: "none",
                                color: "#fff",
                                fontWeight: 800,
                                fontSize: "18px",
                                lineHeight: 1,
                                fontFamily: "Arial, Helvetica, sans-serif",
                              }}
                              aria-label={
                                nameShown ? `${nameShown} LinkedIn` : "LinkedIn"
                              }
                            >
                              in
                            </a>
                          ) : (
                            <div
                              style={{
                                width: "34px",
                                height: "34px",
                                marginBottom: "14px",
                              }}
                            />
                          )}

                          {nameShown && (
                            <h3
                              style={{
                                fontSize: "clamp(18px, 2vw, 22px)",
                                fontWeight: 700,
                                color: "#082326",
                                margin: "0 0 6px 0",
                              }}
                            >
                              {nameShown}
                            </h3>
                          )}

                          {roleShown && (
                            <p
                              style={{
                                fontSize: "clamp(13px, 1.6vw, 16px)",
                                color: "#333",
                                margin: "0",
                                padding: "0 10px",
                                lineHeight: 1.5,
                              }}
                            >
                              {roleShown}
                            </p>
                          )}

                          {speaker.bio && hasContent(speaker.bio) && (
                            <div
                              className="lp-rich-text"
                              style={{
                                marginTop: "12px",
                                fontSize: "13px",
                                color: "#555",
                                maxWidth: "400px",
                                width: "100%",
                                padding: "0 10px",
                              }}
                              dangerouslySetInnerHTML={{
                                __html: normalizeRichHtml(speaker.bio),
                              }}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            );
          })()}

          <div style={{ height: "10px", background: accentColor }} />
        </div>
      )}

      <>
        <TestimonialandAward />
        <Awards />
        <Footer1 />
      </>
      <ScriptReinit />

      <style jsx global>{`
        #webinar-landing-root {
          color: #183038;
          background: #f5f7f7;
        }
        .webinar-hero {
          min-height: 0;
          background: #073638;
          text-align: center;
        }
        .webinar-banner-image {
          display: block;
          width: 100%;
          max-width: 100%;
          height: auto;
          margin: 0 auto;
        }

        .webinar-main {
          display: grid;
          grid-template-columns: minmax(0, 1.7fr) minmax(300px, 0.85fr);
          gap: 36px;
          max-width: 1170px;
          margin: 0 auto;
          padding: 44px 22px 58px;
          align-items: start;
        }
        .webinar-copy h2.webinar-reg-heading,
        .webinar-copy .webinar-reg-heading {
          font-size: 28px;
          margin: 0 0 14px;
          color: #087d82;
          font-weight: 700;
          line-height: 1.25;
        }
        .webinar-copy h2 {
          font-size: 28px;
          margin: 0 0 14px;
        }
        .webinar-copy h3 {
          font-size: 18px;
          margin: 22px 0 8px;
        }
        .webinar-intro {
          line-height: 1.65;
        }
        .webinar-benefits {
          padding-left: 22px;
          line-height: 1.55;
        }
        .webinar-benefits li {
          margin: 0 0 8px;
        }
        .webinar-extra {
          margin-top: 18px;
          line-height: 1.6;
        }
        .webinar-form-card {
          border: 1px solid #23a7b5;
          background: #fff;
          box-shadow: 0 14px 36px #07353816;
        }
        .webinar-form-card h2 {
          margin: 0;
          padding: 17px 14px;
          background: #07585a;
          color: #fff;
          text-align: center;
          font-size: 22px;
        }
        .webinar-form-card h2 p { margin: 0; }
        .webinar-form-card form {
          display: grid;
          gap: 11px;
          padding: 18px;
        }
        .webinar-form-field input,
        .webinar-form-field textarea,
        .webinar-form-field select {
          width: 100%;
          min-height: 45px;
          border: 1px solid #d6dddd;
          border-radius: 0;
          padding: 10px 12px;
          background: #fff;
          color: #183038;
          font: inherit;
        }
        .webinar-form-field textarea {
          min-height: 90px;
        }
        .webinar-form-card button,
        .webinar-bottom-cta a {
          display: inline-block;
          border: 0;
          border-radius: 7px;
          background: #07585a;
          color: #fff;
          padding: 13px 24px;
          font-size: 18px;
          font-weight: 700;
          text-align: center;
          text-decoration: none;
          cursor: pointer;
        }
        .webinar-form-card button:disabled {
          opacity: 0.65;
          cursor: wait;
        }
        .webinar-speakers {
          background: #fff;
          padding: 52px 22px 60px;
        }
        .webinar-speakers > h2 {
          margin: 0 0 34px;
          text-align: center;
          font-size: 32px;
        }
        .webinar-speaker-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 30px;
          max-width: 1170px;
          margin: auto;
        }
        .webinar-speaker {
          text-align: center;
          padding: 12px;
        }
        .webinar-speaker-avatar {
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          width: 132px;
          height: 132px;
          margin: 0 auto 14px;
          border: 1px solid #38bac0;
          border-radius: 50%;
          background: #e8f3f3;
          color: #07585a;
          font-size: 32px;
          font-weight: 700;
        }
        .webinar-speaker-avatar img,
        .webinar-speaker-avatar > div,
        .webinar-speaker-avatar svg {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .webinar-speaker h3 {
          margin: 0 0 5px;
          font-size: 19px;
        }
        .webinar-speaker p {
          margin: 0;
          font-style: italic;
          color: #58686c;
        }
        .webinar-speaker > a {
          display: inline-flex;
          margin-top: 12px;
          padding: 4px 9px;
          background: #0a66c2;
          color: white;
          font-weight: 700;
          text-decoration: none;
        }
        .webinar-bottom-cta {
          padding: 50px 22px;
          text-align: center;
        }
        .webinar-bottom-cta h2 {
          max-width: 1000px;
          margin: 0 auto 18px;
          font-size: clamp(24px, 3vw, 34px);
        }
        .webinar-bottom-cta p {
          margin: 0 auto 28px;
          font-size: 18px;
        }
        @media (max-width: 760px) {
          .webinar-main {
            grid-template-columns: 1fr;
            gap: 24px;
            padding: 32px 18px 42px;
          }
          .webinar-form-card {
            grid-row: 1;
          }
          .webinar-speaker-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .webinar-speakers {
            padding: 38px 18px;
          }
          .webinar-speakers > h2 {
            font-size: 27px;
          }
        }

        .lp-rich-text,
        .lp-rich-text p,
        .lp-rich-text span,
        .lp-rich-text li,
        .lp-rich-text div {
          word-break: normal !important;
          overflow-wrap: break-word !important;
          white-space: normal !important;
          hyphens: none !important;
        }

        .lp-top-section h1,
        .lp-top-section h5,
        .lp-top-section h1 p,
        .lp-top-section h5 p,
        .lp-top-section h1 span,
        .lp-top-section h5 span {
          word-break: normal !important;
          overflow-wrap: normal !important;
          white-space: normal !important;
          hyphens: none !important;
        }

        .lp-side-heading,
        .lp-side-heading p,
        .lp-side-heading span,
        .lp-form-heading,
        .lp-form-heading p,
        .lp-form-heading span {
          max-width: 100%;
          word-break: normal !important;
          overflow-wrap: break-word !important;
          white-space: normal !important;
          hyphens: none !important;
        }

        @media (max-width: 768px) {
          .lp-top-section h1,
          .lp-top-section h5 {
            width: 100% !important;
          }

          .lp-side-heading,
          .lp-side-heading p,
          .lp-side-heading span,
          .lp-form-heading,
          .lp-form-heading p,
          .lp-form-heading span {
            font-size: 24px !important;
            line-height: 1.3 !important;
          }

          .lp-speakers-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }

        /* Apply Quill sizes in preview */
        .contentbox span.ql-size-10px,
        .contentbox p.ql-size-10px,
        .contentbox div.ql-size-10px,
        .contentbox .ql-size-10px,
        span.ql-size-10px,
        p.ql-size-10px,
        div.ql-size-10px,
        .ql-size-10px {
          font-size: 10px !important;
          line-height: 1.4 !important;
        }
        .contentbox span.ql-size-12px,
        .contentbox p.ql-size-12px,
        .contentbox div.ql-size-12px,
        .contentbox .ql-size-12px,
        span.ql-size-12px,
        p.ql-size-12px,
        div.ql-size-12px,
        .ql-size-12px {
          font-size: 12px !important;
          line-height: 1.4 !important;
        }
        .contentbox span.ql-size-14px,
        .contentbox p.ql-size-14px,
        .contentbox div.ql-size-14px,
        .contentbox .ql-size-14px,
        span.ql-size-14px,
        p.ql-size-14px,
        div.ql-size-14px,
        .ql-size-14px {
          font-size: 14px !important;
          line-height: 1.4 !important;
        }
        .contentbox span.ql-size-16px,
        .contentbox p.ql-size-16px,
        .contentbox div.ql-size-16px,
        .contentbox .ql-size-16px,
        span.ql-size-16px,
        p.ql-size-16px,
        div.ql-size-16px,
        .ql-size-16px {
          font-size: 16px !important;
          line-height: 1.4 !important;
        }
        .contentbox span.ql-size-18px,
        .contentbox p.ql-size-18px,
        .contentbox div.ql-size-18px,
        .contentbox .ql-size-18px,
        span.ql-size-18px,
        p.ql-size-18px,
        div.ql-size-18px,
        .ql-size-18px {
          font-size: 18px !important;
          line-height: 1.4 !important;
        }
        .contentbox span.ql-size-20px,
        .contentbox p.ql-size-20px,
        .contentbox div.ql-size-20px,
        .contentbox .ql-size-20px,
        span.ql-size-20px,
        p.ql-size-20px,
        div.ql-size-20px,
        .ql-size-20px {
          font-size: 20px !important;
          line-height: 1.4 !important;
        }
        .contentbox span.ql-size-24px,
        .contentbox p.ql-size-24px,
        .contentbox div.ql-size-24px,
        .contentbox .ql-size-24px,
        span.ql-size-24px,
        p.ql-size-24px,
        div.ql-size-24px,
        .ql-size-24px {
          font-size: 24px !important;
          line-height: 1.4 !important;
        }
        .contentbox span.ql-size-28px,
        .contentbox p.ql-size-28px,
        .contentbox div.ql-size-28px,
        .contentbox .ql-size-28px,
        span.ql-size-28px,
        p.ql-size-28px,
        div.ql-size-28px,
        .ql-size-28px {
          font-size: 28px !important;
          line-height: 1.4 !important;
        }
        .contentbox span.ql-size-32px,
        .contentbox p.ql-size-32px,
        .contentbox div.ql-size-32px,
        .contentbox .ql-size-32px,
        span.ql-size-32px,
        p.ql-size-32px,
        div.ql-size-32px,
        .ql-size-32px {
          font-size: 32px !important;
          line-height: 1.4 !important;
        }
        .contentbox span.ql-size-36px,
        .contentbox p.ql-size-36px,
        .contentbox div.ql-size-36px,
        .contentbox .ql-size-36px,
        span.ql-size-36px,
        p.ql-size-36px,
        div.ql-size-36px,
        .ql-size-36px {
          font-size: 36px !important;
          line-height: 1.4 !important;
        }
        .contentbox span.ql-size-40px,
        .contentbox p.ql-size-40px,
        .contentbox div.ql-size-40px,
        .contentbox .ql-size-40px,
        span.ql-size-40px,
        p.ql-size-40px,
        div.ql-size-40px,
        .ql-size-40px {
          font-size: 40px !important;
          line-height: 1.4 !important;
        }
        .contentbox span.ql-size-48px,
        .contentbox p.ql-size-48px,
        .contentbox div.ql-size-48px,
        .contentbox .ql-size-48px,
        span.ql-size-48px,
        p.ql-size-48px,
        div.ql-size-48px,
        .ql-size-48px {
          font-size: 48px !important;
          line-height: 1.4 !important;
        }
        .contentbox span.ql-size-56px,
        .contentbox p.ql-size-56px,
        .contentbox div.ql-size-56px,
        .contentbox .ql-size-56px,
        span.ql-size-56px,
        p.ql-size-56px,
        div.ql-size-56px,
        .ql-size-56px {
          font-size: 56px !important;
          line-height: 1.4 !important;
        }
        .contentbox span.ql-size-64px,
        .contentbox p.ql-size-64px,
        .contentbox div.ql-size-64px,
        .contentbox .ql-size-64px,
        span.ql-size-64px,
        p.ql-size-64px,
        div.ql-size-64px,
        .ql-size-64px {
          font-size: 64px !important;
          line-height: 1.4 !important;
        }
        .contentbox span.ql-size-72px,
        .contentbox p.ql-size-72px,
        .contentbox div.ql-size-72px,
        .contentbox .ql-size-72px,
        span.ql-size-72px,
        p.ql-size-72px,
        div.ql-size-72px,
        .ql-size-72px {
          font-size: 72px !important;
          line-height: 1.4 !important;
        }
      `}</style>
    </>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px",
  marginTop: "0px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  boxSizing: "border-box",
};
