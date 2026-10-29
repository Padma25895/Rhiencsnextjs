import EbookLandingClient, { type EbookLandingData } from "../LP/[slug]/EbookLandingClient";

const webinarLandingData: EbookLandingData = {
  id: "webinar-e-invoice-default",
  slug: "Webinar-E-Invoice",
  template_type: "webinar",
  title: "UAE E-Invoicing 2026: A Tax Expert’s Practical Guide to Financial Compliance & ERP Readiness",
  headline: "<strong>UAE E-Invoicing 2026:</strong>",
  subheadline: "A Tax Expert’s Practical Guide to Financial Compliance &amp; ERP Readiness",
  additional_paragraph: "<p>▦ &nbsp; Wednesday, <strong>June 10, 2026</strong></p><p>◷ &nbsp; 3:00 PM – 4:00 PM (Dubai Time)</p>",
  extra_content: "<p>Every week without a compliance plan is a risk your business does not need to carry. One session, one hour. Get the answers your finance team needs before the deadline.</p><p><strong>Live Expert Webinar&nbsp; | &nbsp;10 June 2026&nbsp; | &nbsp;3:00 PM – 4:00 PM&nbsp; | &nbsp;Dubai Time&nbsp; | &nbsp;Free to Attend</strong></p>",
  logo_text: "RheinBrücke · compliance.io · AMA Global",
  logo_image_url: null,
  book_image_url: null,
  hero_image_url: null,
  learning_title: "Webinar Registration",
  learning_description: "<p>UAE e-invoicing is here. Every registered business has compliance obligations. This one-hour session with a UAE tax expert and ERP specialists gives finance and IT leaders the clarity to act.</p>",
  benefits_heading: "What This Session Covers",
  benefits: [
    "FTA mandate and compliance scope: Current FTA e-invoicing requirements, your obligations, and what non-compliance costs your business.",
    "CFO checklist and risk exposure: Penalties, reporting obligations, rejection handling, archival requirements, and a readiness checklist you can use next day.",
    "ERP and POS integration for finance and IT: How finance and IT teams align on system integration, audit readiness, and transition gap closure.",
    "Real-world UAE compliance projects: Lessons from live implementations across industries, including sector-specific challenges already resolved in the region.",
    "Finance and tax queries prioritised: Submit questions in advance or ask live. IT integration is covered alongside finance and tax topics.",
  ],
  form_title: "Reserve Your Seat Now",
  form_button_text: "Reserve Your Seat",
  form_fields: [
    { id: "fullName", type: "text", placeholder: "Name *", required: true },
    { id: "email", type: "email", placeholder: "Email *", required: true },
    { id: "companyName", type: "text", placeholder: "Company Name *", required: true },
    { id: "phone", type: "tel", placeholder: "Phone Number", required: false },
  ],
  author_heading: "Meet the Speakers",
  author_name: null,
  author_role: null,
  author_bio: null,
  author_avatar_url: null,
  author_avatar_svg: null,
  speakers: [
    { label: "", name: "Karthik Reddy Mallepalli", role: "Indirect Tax Expert, Compliance.io", avatar_url: "", avatar_svg: "", bio: "", linkedin_url: "" },
    { label: "", name: "Ajay Krishan P S", role: "Associate Director, AMA Global", avatar_url: "", avatar_svg: "", bio: "", linkedin_url: "" },
    { label: "", name: "Sreekanth Ramakrishnan", role: "Director – Sales, RheinBrücke IT Consulting", avatar_url: "", avatar_svg: "", bio: "", linkedin_url: "" },
  ],
  footer_color: "#0b7778",
  pdf_url: null,
};

export default function WebinarEInvoicePage() {
  return <EbookLandingClient initialData={webinarLandingData} slug="webinar-e-invoice" templateVariant="webinar" />;
}
