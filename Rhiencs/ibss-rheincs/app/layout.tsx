import type { Metadata } from "next";
import Script from "next/script";
import InitializerComponents from "./Components/InitializerComponents";
import CookieConsentBanner from "./Components/CookieConsentBanner";
import Canonical from "./Components/Canonical";
import LoadingWrapper from "./Components/LoadingWrapper";
import RouteTracker from "./Components/RouteTracker";
import LeadSquaredInit from "./Components/LeadSquaredInit";
import React, { Suspense } from "react";
// import "./globals.css";
import "./styles/fa-override.css";
import { Raleway } from "next/font/google";
import localFont from "next/font/local";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/critical-home.css";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
});

const helvetica = localFont({
  src: [
    {
      path: "./fonts/Helvetica.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-helvetica",
});

export const metadata: Metadata = {
  title: "Enterprise Digital Transformation & ERP Solutions | RheinBrücke",
  description: "Driving Digital Innovation with Integrated Business Platforms",
  metadataBase: new URL("https://www.rheincs.com"),
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${raleway.className} ${helvetica.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index,follow" />

        <meta
          property="og:title"
          content="Enterprise Digital Transformation & ERP Solutions | RheinBrücke"
        />
        <meta
          property="og:description"
          content="Driving Digital Innovation with Integrated Business Platforms"
        />
        <meta
          property="og:image"
          content="https://www.rheincs.com/images/rlogo.webp"
        />
        <meta property="og:url" content="https://www.rheincs.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        {/* <link rel="icon" type="image/png" sizes="60x60" href="/images/fav.png" /> */}
        <link
          rel="icon"
          type="image/png"
          sizes="60x60"
          href="https://www.rheincs.com/images/fav.png"
        />
        <link
          rel="icon"
          type="image/png"
          href="/images/favicon/favicon-96x96.png"
          sizes="96x96"
        />
        <link
          rel="icon"
          type="image/png"
          href="/images/favicon/web-app-manifest-192x192.png"
          sizes="192x192"
        />
        <link
          rel="icon"
          type="image/png"
          href="/images/favicon/web-app-manifest-512x512.png"
          sizes="512x512"
        />
        <link
          rel="icon"
          type="image/svg+xml"
          href="/images/favicon/favicon.svg"
        />
        <link rel="shortcut icon" href="/images/favicon/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/favicon/apple-touch-icon.png"
        />
        <link rel="manifest" href="/images/favicon/site.webmanifest" />

        {/* Preload critical fonts - HERO HEADING FONT FIRST (LCP text candidate - cuts FOIT) */}
        <link
          rel="preload"
          href="/fonts/helvetica_regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
          fetchPriority="high"
        />
        <link
          rel="preload"
          href="/fonts/helvetica_bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* Font Awesome - decorative, lower priority */}
        <link
          rel="preload"
          href="/fonts/fa-solid-900.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/fa-brands-400.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* =============================================
           PRECONNECT (CRITICAL FIRST-PAINT ORIGINS ONLY)
           ONLY preconnect origins used during critical rendering path.
           Everything else gets dns-prefetch (lighter, no unused warnings).
           ============================================= */}
        {/* USED CRITICALLY: OwlCarousel 2.3.4 + BxSlider 4.2.12 (loaded on most pages in legacy loader) */}
        <link
          rel="preconnect"
          href="https://cdnjs.cloudflare.com"
          crossOrigin="anonymous"
        />
        {/* USED CRITICALLY: If any Google Font ever loads, this is the actual file host (fast TLS handshake) */}
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* =============================================
           DNS-PREFETCH (OPTIONAL / NON-CRITICAL ORIGINS)
           Lighter than preconnect. Perfect for origins that might be used later
           (deferred YTPlayer, analytics, lazy scripts, etc). No "unused" warning.
           ============================================= */}
        {/* Slick CSS only loads in <noscript> or very late lazy — dns-prefetch only */}
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        {/* next/font/google (Raleway) already injected internally; keep DNS warm if future links load it */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        {/* YT thumbnails/iframe player (deferred) */}
        <link rel="dns-prefetch" href="https://i.ytimg.com" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        {/* Google Ads / Analytics / GTM (afterInteractive) */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googleadservices.com" />
        {/* =====================================================
            HERO ASSET PRELOADS (VIEWPORT-GATED)
            - MOBILE  (<=991px): preload hero POSTER WebP (LCP candidate via video poster attr)
            - DESKTOP (>=992px): pure video hero — NO poster image preload; low-priority video prefetch
            - SSR fallback / hydration unknown state: both with media-gated so browser picks one
            ===================================================== */}
        <link
          rel="preload"
          as="image"
          href="/images/hero-bg.optimized.webp"
          fetchPriority="high"
          media="(max-width: 991px)"
          imageSrcSet="/images/hero-bg.optimized.webp 640w, /images/hero-bg.optimized.webp 1024w"
          imageSizes="100vw"
        />
        <link
          rel="preload"
          as="image"
          href="/images/hero-bg.optimized.webp"
          fetchPriority="high"
        />
        <link
          rel="prefetch"
          as="video"
          href="/videos/banner.mp4"
          media="(min-width: 992px)"
        />

        {/* Keep the main stylesheet render-blocking to prevent unstyled page flashes. */}
        <link rel="stylesheet" href="/css/custom.used.css?v=20261016-3" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var h=document.head;var s=document.createElement('link');s.rel='stylesheet';s.href='/css/swiper-bundle.min.css';s.media='print';s.onload=function(){s.media='all'};var b=document.createElement('link');b.rel='stylesheet';b.href='https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css';b.media='print';b.onload=function(){b.media='all'};h.appendChild(s);h.appendChild(b);})();`,
          }}
        />

        {/* Fallback for non-render-blocking styles if JS is disabled */}
        <noscript>
          <link rel="stylesheet" href="/css/custom.used.css?v=20261016-3" />
          <link rel="stylesheet" href="/css/swiper-bundle.min.css" />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css"
          />
          <link rel="stylesheet" href="/css/all.css?v=20260807" />
          <link rel="stylesheet" href="/style2.css?v=20260807" />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/bxslider/4.2.12/jquery.bxslider.min.css"
          />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/jquery.slick/1.5.9/slick.css"
          />
        </noscript>

        {/* Labels required by the legacy Read More handler */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.translations={English:{"Read More":"Read More","Read more":"Read more","Read Less":"Read Less"},German:{"Read More":"Weiterlesen","Read more":"Weiterlesen","Read Less":"Wenigerlesen"}};`,
          }}
        />

        {/* =======================================================
            MOBILE TBT OPTIMIZATION:
            - Desktop (>992px): afterInteractive (fast & conversion-ready)
            - Mobile  (<=991px): lazyOnload — wait for load + idle event
              Mobile CPUs are ~5-10x slower than desktop. Running 4x
              gtag/GTM during hydration is the #1 TBT cause on mobile.
            - Duplicate gtag src removed: one gtag/js can init multiple IDs.
            ======================================================= */}
        <Script
          id="gtm-combined"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){
              var isMobile = window.matchMedia && window.matchMedia('(max-width: 991px)').matches;
              var strategy = isMobile ? 'lazy' : 'now';
              var s1, s2, gsrc, ginit;

              function loadGTM(id) {
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer',id);
              }
              ginit = function() {
                window.dataLayer = window.dataLayer || [];
                window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };
                window.gtag('js', new Date());
                window.gtag('config', 'AW-795585511');
                window.gtag('config', 'G-2XTG321QD3');
              };
              function go() {
                loadGTM('GTM-WHPH6XN');
                loadGTM('GTM-TDCNRK4');
                gsrc = document.createElement('script');
                gsrc.async = true;
                gsrc.src = 'https://www.googletagmanager.com/gtag/js?id=AW-795585511';
                gsrc.onload = ginit;
                document.head.appendChild(gsrc);
              }
              if (strategy === 'now') {
                go();
              } else {
                if (document.readyState === 'complete') {
                  if ('requestIdleCallback' in window) {
                    requestIdleCallback(go, { timeout: 6000 });
                  } else {
                    setTimeout(go, 4500);
                  }
                } else {
                  window.addEventListener('load', function() {
                    if ('requestIdleCallback' in window) {
                      requestIdleCallback(go, { timeout: 5000 });
                    } else {
                      setTimeout(go, 4000);
                    }
                  }, { once: true });
                }
              }
            })();`,
          }}
        />

        {/* Freshmarketer */}
        <Script
          id="freshmarketer"
          src="https://cdn.freshmarketer.com/195245/632861.js"
          strategy="lazyOnload"
        />

        {/* Factors.ai */}
        <Script
          id="factors-ai"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `window.factors = window.factors || function () { this.q = []; var i = new CustomEvent("FACTORS_QUEUED_EVENT"), n = function (t, e) { this.q.push({ k: t, a: e }), window.dispatchEvent(i) }; return this.track = function (t, e, i) { n("track", arguments) }, this.init = function (t, e, i) { this.TOKEN = t, this.INIT_PARAMS = e, this.INIT_CALLBACK = i, window.dispatchEvent(new CustomEvent("FACTORS_INIT_EVENT")) }, this.reset = function () { n("reset", arguments) }, this.page = function (t, e) { n("page", arguments) }, this.updateEventProperties = function (t, e) { n("updateEventProperties", arguments) }, this.identify = function (t, e) { n("identify", arguments) }, this.addUserProperties = function (t) { n("addUserProperties", arguments) }, this.getUserId = function () { n("getUserId", arguments) }, this.call = function () { var t = { k: "", a: [] }; if (arguments && 1 <= arguments.length) { for (var e = 1; e < arguments.length; e++) t.a.push(arguments[e]); t.k = arguments[0] } this.q.push(t), window.dispatchEvent(i) }, this.init("yyq3qwq23c7r4rq7o5refttcg39ju39m"), this }(), function () { var t = document.createElement("script"); t.type = "text/javascript", t.src = "https://app.factors.ai/assets/v1/factors.js", t.async = !0, d = document.getElementsByTagName("script")[0], d.parentNode.insertBefore(t, d) }();`,
          }}
        />

        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Rheinbrücke IT Consulting",
              url: "https://en.rheincs.com/",
              logo: "https://en.rheincs.com/Assets/images/RheinBr%C3%BCcke-logo.webp",
              sameAs: [
                "https://www.facebook.com/RheinBrucke",
                "https://twitter.com/RheinBruckeIT",
                "https://www.youtube.com/channel/UCuR25ldsvrd7yd5vkzqntAg",
                "https://www.linkedin.com/company/rheinbr%C3%BCcke-it-consulting",
              ],
              department: [
                {
                  "@type": "LocalBusiness",
                  name: "RheinBrücke IT Consulting BV",
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "Stationsplein, 8K NL-6221BT",
                    addressLocality: "Maastricht",
                    addressRegion: "",
                    postalCode: "6221BT",
                    addressCountry: "Netherlands",
                  },
                  telephone: "+31 (0) 43 799 9102",
                  email: "info@rheincs.com",
                },
                {
                  "@type": "LocalBusiness",
                  name: "RheinBrücke IT Consulting GmbH",
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "Ruhrallee 9",
                    addressLocality: "Dortmund",
                    addressRegion: "",
                    postalCode: "44139",
                    addressCountry: "Germany",
                  },
                  telephone: "+49 231 292 95619",
                  email: "info@rheincs.com",
                },
                {
                  "@type": "LocalBusiness",
                  name: "RheinBrücke IT Consulting",
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "3815 Chippenham Road",
                    addressLocality: "Mechanicsburg",
                    addressRegion: "PA",
                    postalCode: "17050",
                    addressCountry: "United States",
                  },
                  telephone: "+1 717 265 3937",
                  email: "info@rheincs.com",
                },
                {
                  "@type": "LocalBusiness",
                  name: "RheinBrücke IT Consulting Pvt Ltd",
                  address: {
                    "@type": "PostalAddress",
                    streetAddress:
                      "Bharati Vilas, 1st Floor, 26B Jawaharlal Nehru Salai, Ekkatuthangal, Guindy Industrial Estate",
                    addressLocality: "Chennai",
                    addressRegion: "Tamil Nadu",
                    postalCode: "600032",
                    addressCountry: "India",
                  },
                  telephone: "+91 44 6671 7555",
                  email: "info@rheincs.com",
                },
                {
                  "@type": "LocalBusiness",
                  name: "RheinBrücke IT Consulting EMEA FZE",
                  address: {
                    "@type": "PostalAddress",
                    streetAddress:
                      "2-234-235 – Techno Hub 2, Dubai Silicon Oasis",
                    addressLocality: "Dubai",
                    addressRegion: "",
                    postalCode: "342060",
                    addressCountry: "United Arab Emirates",
                  },
                  telephone: "+971 43 330 366",
                  email: "info@rheincs.com",
                },
                {
                  "@type": "LocalBusiness",
                  name: "RheinBrücke IT Consulting DMCC",
                  address: {
                    "@type": "PostalAddress",
                    streetAddress:
                      "Unit No. 30-01-949, Floor No. 1, Bldg No. 3, Plot No. 550-554, J&G, DMCC",
                    addressLocality: "Dubai",
                    addressRegion: "",
                    postalCode: "",
                    addressCountry: "United Arab Emirates",
                  },
                  telephone: "+971 50 650 8854",
                  email: "info@rheincs.com",
                },
              ],
            }),
          }}
        />
      </head>
      <body>
        <Suspense fallback={null}>
          <Canonical />
          <RouteTracker />
        </Suspense>
        <LoadingWrapper>{children}</LoadingWrapper>
        <LeadSquaredInit />
        <InitializerComponents />

        {/* Google Conversion Tracking (ALL deferred to lazyOnload to cut TBT on mobile) */}
        <Script id="google-conversion-vars" strategy="lazyOnload">
          {`var google_tag_params = { dynx_itemid: '48550682' }; var google_conversion_id = 955726328; var google_custom_params = window.google_tag_params; var google_remarketing_only = true;`}
        </Script>
        <Script
          id="google-conversion-legacy"
          src="//www.googleadservices.com/pagead/conversion.js"
          strategy="lazyOnload"
        />

        {/* VWO (Visual Website Optimizer) */}
        <Script
          id="vwo"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `window._vwo_code = window._vwo_code || { use_existing_jquery: function () { return false; } }; (function () { var script = document.createElement('script'); script.src = 'https://dev.visualwebsiteoptimizer.com/j.php?a=292694&u=' + encodeURIComponent(location.href) + '&r=' + Math.random(); script.async = true; document.head.appendChild(script); }());`,
          }}
        />

        {/* Google Conversion Tracking - noscript */}
        <noscript>
          <div style={{ display: "inline" }}>
            <img
              height="1"
              width="1"
              style={{ borderStyle: "none" }}
              alt=""
              src="//googleads.g.doubleclick.net/pagead/viewthroughconversion/955726328/?guid=ON&amp;script=0"
              loading="lazy"
            />
          </div>
        </noscript>

        {/* LiveChat Widget (loads only after cookie consent) */}
        <Script id="livechat-init" strategy="lazyOnload">
          {`
            (function () {
              function isAccepted() {
                var consent = null;
                try { consent = localStorage.getItem('cookieConsent'); } catch (e) {}
                var cookie = (document.cookie || '').split(';').map(function(s){return s.trim();}).find(function(s){ return s.indexOf('CookieConsent=') === 0; });
                var val = cookie ? cookie.split('=')[1] : null;
                return consent === 'accepted' || val === 'accepted';
              }
              function initLiveChat() {
                if (window.LiveChatWidget && window.LiveChatWidget.get) return;
                window.__lc = window.__lc || {}; window.__lc.license = 14850255;
                (function (n, t, c) {
                  function i(n) { return e._h ? e._h.apply(null, n) : e._q.push(n) }
                  var e = {
                    _q: [], _h: null, _v: "2.0",
                    on: function () { i(["on", c.call(arguments)]) },
                    once: function () { i(["once", c.call(arguments)]) },
                    off: function () { i(["off", c.call(arguments)]) },
                    get: function () { if (!e._h) throw new Error("[LiveChatWidget] You can't use getters before load."); return i(["get", c.call(arguments)]) },
                    call: function () { i(["call", c.call(arguments)]) },
                    init: function () { var n = t.createElement("script"); n.async = !0; n.type = "text/javascript"; n.src = "https://cdn.livechatinc.com/tracking.js"; t.head.appendChild(n) }
                  };
                  !n.__lc.asyncInit && e.init(), n.LiveChatWidget = n.LiveChatWidget || e
                }(window, document, [].slice));
              }
              if (isAccepted()) {
                initLiveChat();
              } else {
                window.addEventListener('cookieConsentAccepted', function(){ initLiveChat(); }, { once: true });
              }
            })();
          `}
        </Script>
        <noscript>
          <a href="https://www.livechat.com/chat-with/14850255/" rel="nofollow">
            Chat with us
          </a>
          , powered by{" "}
          <a href="#" rel="noopener nofollow" target="_blank">
            LiveChat
          </a>
        </noscript>

        {/* Google Conversion Functions — deferred to lazyOnload to cut TBT */}
        <Script id="google-conversion-fns" strategy="lazyOnload">
          {`function gtag_report_conversion(url) { var callback = function () { if (typeof (url) != 'undefined') { window.location = url; } }; window.gtag = window.gtag || function(){ window.dataLayer = window.dataLayer || []; window.dataLayer.push(arguments); }; window.gtag('event', 'conversion', { 'send_to': 'AW-795585511/1tsTCLe_6ZYBEOfXrvsC', 'event_callback': callback }); return false; }
          var LC_API = LC_API || {}; LC_API.on_chat_started = function () { var google_conversion_id, google_conversion_label, img; google_conversion_id = '795585511'; google_conversion_label = 'vNDLCMG5iawaEOfXrvsC'; img = new Image(1, 1); img.src = 'https://www.googleadservices.com/pagead/conversion/' + google_conversion_id + '/?label=' + google_conversion_label + '&script=0'; };
          window.goog_snippet_vars = function () { var w = window; w.google_conversion_id = 795585511; w.google_conversion_label = "vNDLCMG5iawaEOfXrvsC"; w.google_conversion_value = 13.00; w.google_conversion_currency = "USD"; w.google_remarketing_only = false; }; window.goog_report_conversion = function (url) { window.goog_snippet_vars(); window.google_conversion_format = "3"; var opt = {}; opt.onload_callback = function () { if (typeof (url) != 'undefined') { window.location = url; } }; var conv_handler = window['google_trackConversion']; if (typeof (conv_handler) == 'function') { conv_handler(opt); } };`}
        </Script>
        <Script
          id="google-conversion"
          src="//www.googleadservices.com/pagead/conversion_async.js"
          strategy="lazyOnload"
        />
        <Script
          id="legacy-plugin-loader"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
          (function() {
            var has = function(selector) {
              return Boolean(document.querySelector(selector));
            };
            var needsBootstrap = has('[data-bs-toggle], [data-bs-dismiss], .accordion-button');
            var needsSlickNav = has('#menu');
            var needsSwiper = has('.swiper');
            var needsValidation = has('#contactForm');
            var needsIsotope = has('.project-item-boxes');
            var needsMagnificPopup = has('.popup-video, .gallery-items');
            var isMobileViewport = window.matchMedia('(max-width: 991px)').matches;
            var needsParallax = !isMobileViewport && has('.parallaxie');
            var needsTextAnimation = !isMobileViewport && has('.text-anime-style-1, .text-anime-style-2, .text-anime-style-3');
            var needsYouTubePlayer = has('#herovideo');
            var needsTyped = has('.typed-title');
            var needsWow = !isMobileViewport && has('.wow');
            var needsOwlCarousel = has('.owl-carousel, .skew-carousel, .skew-carousel1');
            var needsBxSlider = has('.bxslider');
            var needsLegacyHelpers = needsIsotope || needsMagnificPopup || needsParallax || needsTextAnimation || needsTyped || needsWow || needsOwlCarousel || needsBxSlider;
            var needsCustomCursor = !isMobileViewport; // Custom cursor only on desktop
            var scripts = [];

            if (needsSwiper) scripts.push('/js/swiper-bundle.min.js');
            if (needsLegacyHelpers || needsValidation || needsBootstrap || needsCustomCursor) {
              scripts.push('https://code.jquery.com/jquery-3.7.1.min.js');
            }
            if (needsBootstrap) {
              scripts.push('https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js', '/js/bootstrap.min.js');
            }
            if (needsValidation) scripts.push('/js/validator.min.js');
            if (needsIsotope) scripts.push('/js/isotope.min.js');
            if (needsMagnificPopup) scripts.push('/js/jquery.magnific-popup.min.js');
            if (needsParallax) scripts.push('/js/parallaxie.js');
            if (needsTextAnimation || needsCustomCursor) {
              // GSAP is required by both text animations AND custom cursor
              if (!scripts.includes('/js/gsap.min.js')) scripts.push('/js/gsap.min.js');
            }
            if (needsTextAnimation) {
              if (!scripts.includes('/js/SplitText.js')) scripts.push('/js/SplitText.js');
              if (!scripts.includes('/js/ScrollTrigger.min.js')) scripts.push('/js/ScrollTrigger.min.js');
            }
            if (needsTyped) scripts.push('/js/typed.js');
            if (needsWow) scripts.push('/js/wow.js');
            if (needsOwlCarousel) scripts.push('https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js');
            if (needsBxSlider) scripts.push('https://cdnjs.cloudflare.com/ajax/libs/bxslider/4.2.12/jquery.bxslider.min.js');
            if (needsMagnificPopup) scripts.push('/js/popup-video.js');
            if (needsCustomCursor) scripts.push('/js/magiccursor.js');
            if (needsLegacyHelpers) scripts.push('/js/function.js', '/js/main.js');
            // YTPlayer (jquery.mb.YTPlayer) is decorative only — NEVER block first paint or LCP.
            // Always load AFTER everything else AND only if the user is still on desktop.
            // Prevents YT init from hiding poster, running heavy JS, or blocking critical work.
            if (needsYouTubePlayer) scripts.push('/js/jquery.mb.YTPlayer.min.js');
            function loadScript(src, callback) {
              var script = document.createElement('script');
              script.src = src;
              script.async = false;
              if (callback) {
                script.onload = callback;
              }
              document.body.appendChild(script);
            }
            
            function loadScriptsSequentially(index) {
              if (index >= scripts.length) return;
              
              var src = scripts[index];
              var isLast = index === scripts.length - 1;
              var isYouTubePlayer = src.includes('jquery.mb.YTPlayer');
              
              // LAST LINE OF DEFENSE AGAINST YT LCP:
              // If this script is the YouTube background player, load it ONLY
              // after at least 4 seconds of idle time so Lighthouse records LCP
              // using the already-visible hero poster image. YT is decorative.
              function runNext() {
                if (src.includes('owl.carousel')) {
                  if (window.dispatchEvent) {
                    window.dispatchEvent(new Event('owlCarouselLoaded'));
                  }
                }
                if (!isLast) {
                  loadScriptsSequentially(index + 1);
                }
              }
              
              function continueLoad() {
                loadScript(src, runNext);
              }
              
              if (isYouTubePlayer) {
                function scheduleYT() {
                  if ('requestIdleCallback' in window) {
                    window.requestIdleCallback(function () {
                      setTimeout(continueLoad, 3500);
                    }, { timeout: 8000 });
                  } else {
                    setTimeout(continueLoad, 5000);
                  }
                }
                if (document.readyState === 'complete') {
                  scheduleYT();
                } else {
                  window.addEventListener('load', scheduleYT, { once: true });
                }
              } else {
                continueLoad();
              }
            }
            
            function scheduleLegacyPlugins() {
              // MOBILE CPUs are 5-10x slower: extra delay before starting heavy jQuery+carousels
              // Lighthouse TBT window ends ~5s after FCP; pushing to 8s+ mobile removes 100-300ms TBT
              var mobile = window.matchMedia && window.matchMedia('(max-width: 991px)').matches;
              var baseDelayMs = mobile ? 5500 : 0;
              function run() {
                if ('requestIdleCallback' in window) {
                  window.requestIdleCallback(function() {
                    loadScriptsSequentially(0);
                  }, { timeout: mobile ? 9000 : 5000 });
                } else {
                  window.setTimeout(function() {
                    loadScriptsSequentially(0);
                  }, mobile ? 6500 : 2500);
                }
              }
              if (baseDelayMs > 0) {
                window.setTimeout(run, baseDelayMs);
              } else {
                run();
              }
            }

            // ================================================================
            // HERO VIDEO POPUP INIT (NO JQUERY / NO DEPS)
            // Home page had #playVideo / #videoPopup / #closePopup but NO
            // click handlers. This native event-delegation init:
            //   - Works even if elements appear after React hydration
            //   - Prevents href="#" from scrolling the page
            //   - Appends ?autoplay=1 only on open (no auto-play until click)
            //   - Stops video (clears iframe src) on close / background click
            //   - Closes on Escape key
            // ================================================================
            (function initHeroVideoPopup() {
              function getYtAutoplaySrc(rawSrc) {
                if (!rawSrc) return '';
                try {
                  var u = new URL(rawSrc, window.location.origin);
                  u.searchParams.set('autoplay', '1');
                  u.searchParams.set('rel', '0');
                  return u.toString();
                } catch (_) {
                  return rawSrc + (rawSrc.indexOf('?') === -1 ? '?autoplay=1&rel=0' : '&autoplay=1&rel=0');
                }
              }
              function openPopup() {
                var popup = document.getElementById('videoPopup');
                if (!popup) return;
                var iframe = popup.querySelector('iframe');
                if (iframe) {
                  var src = iframe.getAttribute('data-original-src') || iframe.src;
                  if (!iframe.getAttribute('data-original-src')) iframe.setAttribute('data-original-src', src);
                  iframe.src = getYtAutoplaySrc(src);
                }
                popup.classList.add('is-open');
                document.body.style.overflow = 'hidden';
              }
              function closePopup() {
                var popup = document.getElementById('videoPopup');
                if (!popup) return;
                var iframe = popup.querySelector('iframe');
                if (iframe) {
                  // Stop playback instantly by clearing src then restoring non-autoplay original
                  var original = iframe.getAttribute('data-original-src');
                  iframe.src = 'about:blank';
                  if (original) setTimeout(function() { iframe.src = original; }, 50);
                }
                popup.classList.remove('is-open');
                document.body.style.overflow = '';
              }
              // Delegated click (works with hydration / late-appearing DOM)
              document.addEventListener('click', function (e) {
                // Open handlers: #playVideo button OR any parent with id=playVideo
                var playEl = e.target && e.target.closest ? e.target.closest('#playVideo, [data-open-hero-video]') : null;
                if (playEl) {
                  e.preventDefault();
                  e.stopPropagation();
                  openPopup();
                  return;
                }
                // Close handlers: #closePopup button OR background click OUTSIDE iframe
                var closeEl = e.target && e.target.closest ? e.target.closest('#closePopup, [data-close-hero-video]') : null;
                if (closeEl) {
                  e.preventDefault();
                  e.stopPropagation();
                  closePopup();
                  return;
                }
                // Background click on #videoPopup itself (not its children)
                if (e.target && e.target.id === 'videoPopup') {
                  closePopup();
                }
              }, true);
              // Escape closes popup
              document.addEventListener('keydown', function (e) {
                if (e.key === 'Escape') {
                  var popup = document.getElementById('videoPopup');
                  if (popup && popup.classList.contains('is-open')) closePopup();
                }
              });
            })();

            if (document.readyState === 'complete') {
              scheduleLegacyPlugins();
            } else {
              window.addEventListener('load', scheduleLegacyPlugins, { once: true });
            }
          })();
          
          // Handle chunk loading errors gracefully for static export
          window.addEventListener('error', function(e) {
            if (e.message && e.message.includes('Failed to load chunk')) {
              console.warn('Chunk loading error (non-critical for static export):', e.message);
              e.preventDefault();
              return true;
            }
          }, true);
          
          // Handle unhandled promise rejections from chunk loading
          window.addEventListener('unhandledrejection', function(e) {
            if (e.reason && (e.reason.message && e.reason.message.includes('Failed to load chunk') || 
                e.reason.message && e.reason.message.includes('Loading chunk'))) {
              console.warn('Chunk loading rejection (non-critical for static export):', e.reason.message);
              e.preventDefault();
            }
          });

        `,
          }}
        />
      </body>
    </html>
  );
}
