"use client";

import React from "react";
import CommomLayout from "../Components/CommomLayout";
import Link from "next/link";
import {useTranslation} from "../hooks/useTranslation";
import TestimonialandAward from "../Components/TestimonialandAward";
export default function EnterpriseSolutions() {
  const { t, language } = useTranslation();
    return (
        <CommomLayout>
<>
  {/* Header Start */}
  {/*?php include "navbar.php" ?*/}
  {/* Header End */}
  <div className="main-baner-hight retail-baner ">
    <div className="container bg-video-waber-content ">
      <div className="row section-row1 align-items-center builtsec">
        <div className="col-lg-5">
          <div className="pe-main-hadding-waber">
            <h2 className="main-hadding-1 text-white" data-cursor="-opaque">
              {t("Retail Industry Solutions & Digital Transformation")}
            </h2>
            <p>
              {t("Transform retail operations with connected technology built for multi-brand, multi-format, and franchise-based retailers, bringing together stores, ecommerce, supply chain, and customer experiences. RheinBrücke helps retailers modernise their technology landscape, improve operational efficiency, and build connected omnichannel experiences that keep pace with changing customer expectations.")}
            </p>
            <div className="ser-btn m-0">
              <Link href="/contact-us" className="animated-svg-link">
                {t("Contact Us")}
                <span className="svg-container ">
                  <span className=" right">
                    <svg
                      width={24}
                      height={23}
                      viewBox="0 0 24 23"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        className="dot"
                        opacity="0.5"
                        cx="16.0004"
                        cy="4.79995"
                        r="1.6"
                        fill="#535353"
                      />
                      <circle
                        className="dot"
                        opacity="0.5"
                        cx="12.7992"
                        cy="1.6"
                        r="1.6"
                        fill="#535353"
                      />
                      <circle
                        className="dot"
                        opacity="0.5"
                        cx="22.4008"
                        cy="11.2"
                        r="1.6"
                        fill="#535353"
                      />
                      <circle
                        className="dot"
                        opacity="0.5"
                        cx="1.6"
                        cy="11.2"
                        r="1.6"
                        fill="#535353"
                      />
                      <circle
                        className="dot"
                        opacity="0.5"
                        cx="6.40078"
                        cy="11.2"
                        r="1.6"
                        fill="#535353"
                      />
                      <circle
                        className="dot"
                        opacity="0.5"
                        cx="11.1996"
                        cy="11.2"
                        r="1.6"
                        fill="#535353"
                      />
                      <circle
                        className="dot"
                        opacity="0.5"
                        cx="16.0004"
                        cy="11.2"
                        r="1.6"
                        fill="#535353"
                      />
                      <circle
                        className="dot"
                        opacity="0.5"
                        cx="19.1996"
                        cy="14.4"
                        r="1.6"
                        fill="#535353"
                      />
                      <circle
                        className="dot"
                        opacity="0.5"
                        cx="16.0004"
                        cy="17.6"
                        r="1.6"
                        fill="#535353"
                      />
                      <circle
                        className="dot"
                        opacity="0.5"
                        cx="12.7992"
                        cy="20.8"
                        r="1.6"
                        fill="#535353"
                      />
                      <circle
                        className="dot"
                        opacity="0.5"
                        cx="19.1996"
                        cy="8.00002"
                        r="1.6"
                        fill="#535353"
                      />
                    </svg>
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="">
      <video
        src="/videos/retail.mp4"
        autoPlay={true}
        muted={true}
        loop={true}
        playsInline={true}
      />
    </div>
  </div>
  <div className="py-100 pe-chellange-waber ">
    <div className="container">
      <div className="d-flex justify-content-end">
        <div className="pe-chellange-content-waber f-g32">
          <h2
            className="main-hadding-1 them-dark-text-color"
            data-cursor="-opaque"
          >
            {t("Challenges in Retail")}
          </h2>
          <div className="d-g24 flex-wrap">
            <div className="challenge-point-waber">
              <img src="/new/qs-2.svg" alt="" />
              <p>
                {t("Volatile, promotion-led demand and seasonal peaks making inventory planning and fulfilment increasingly difficult")}
              </p>
            </div>
            <div className="challenge-point-waber">
              <img src="/new/qs-2.svg" alt="" />
              <p>
                {t("Stock imbalances and fulfilment delays across stores, warehouses, and click-and-collect points")}
              </p>
            </div>
            <div className="challenge-point-waber">
              <img src="/new/qs-2.svg" alt="" />
              <p>
                {t("Disconnected retail systems and siloed data slowing decision-making and limiting operational coordination across the business")}
              </p>
            </div>
            <div className="challenge-point-waber">
              <img src="/new/qs-2.svg" alt="" />
              <p>
                {t("Limited real-time visibility across store operations, sales performance, inventory levels, and customer demand")}
              </p>
            </div>
            <div className="challenge-point-waber">
              <img src="/new/qs-2.svg" alt="" />
              <p>
                {t("Complex pricing and promotion models eroding margins and complicating profitability tracking")}
              </p>
            </div>
            <div className="challenge-point-waber">
              <img src="/new/qs-2.svg" alt="" />
              <p>
                {t("Fragmented customer experience, CRM, and loyalty programmes across physical and digital channels weakening retention and customer lifetime value")}
              </p>
            </div>
            <div className="challenge-point-waber">
              <img src="/new/qs-2.svg" alt="" />
              <p>
                {t("Retail analytics and insights are disconnected from inventory, pricing, and everyday store operations, limiting timely execution")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="retail-chellange-bg-img">
      <img src="/new/retail-two.webp" alt="" />
    </div>
  </div>
  <div className="py-100 pe-matters-waber">
    <h2
      className="main-hadding-1 them-dark-text-color text-center mb-40"
      data-cursor="-opaque"
    >
      {t("Why It Matters")}
    </h2>
  <div className="container">
    <div className="pe-matters-content-waber">
      <div className="pe-matters-content">
        <img src="/new/g501.svg" alt="Poor industry retail integration icon" />
        <p>
          {t("Poor omnichannel integration can lead to lost sales and stock availability issues across stores and digital channels.")}
        </p>
      </div>
      <div className="pe-matters-content">
        <img src="/new/ad2.svg" alt="Inefficient store operations icon" />
        <p>
          {t("Inefficient store operations, inventory management, and margin leakage can weaken profitability and competitiveness")}
        </p>
      </div>
      <div className="pe-matters-content">
        <img src="/new/ad3.svg" alt="delayed response in retail industry market icon" />
        <p>
          {t("Delayed responses to market trends weaken brand relevance and customer loyalty")}
        </p>
      </div>
      <div className="pe-matters-content">
        <img src="/new/ad4.svg" alt="disconnected retail industry systems icon" />
        <p>
          {t("Disconnected systems hinder the impact of analytics, pricing, and category strategies")}
        </p>
      </div>
    </div>
  </div>
  </div>
  <section className="py-100  pe-help-waber irp2 ">
    <div className="container">
      <h2 className="main-hadding-1 text-white  mb-40" data-cursor="-opaque">
        {t("How We Help")}
      </h2>
      <div className="pe-help-content-waber">
        <div className="pe-help-content">
          <img src="/new/Headset.svg" alt="" />
          <p>
            {t("Deploy POS, inventory management, and omnichannel retail systems to improve connected commerce")}
          </p>
        </div>
        <div className="pe-help-content">
          <img src="/new/Headset.svg" alt="" />
          <p>
            {t("Integrate ERP, POS, WMS, and ecommerce platforms for seamless, real-time operational data")}
          </p>
        </div>
        <div className="pe-help-content">
          <img src="/new/Headset.svg" alt="" />
          <p>
            {t("Implement centralised inventory and order control management across stores and fulfilment channels to eliminate stock silos and reduce stockouts.")}
          </p>
        </div>
        <div className="pe-help-content">
          <img src="/new/Headset.svg" alt="" />
          <p>
            {t("Enable advanced analytics for pricing, promotions, and category optimisation")}
          </p>
        </div>
        <div className="pe-help-content">
          <img src="/new/Headset.svg" alt="" />
          <p>
            {t("Streamline omnichannel promotions and markdown management")}
          </p>
        </div>
        <div className="pe-help-content">
          <img src="/new/Headset.svg" alt="" />
          <p>
            {t("Connect click-and-collect, ship-from-store, and third-party fulfilment to deliver flexible, efficient order fulfilment")}
          </p>
        </div>
        <div className="pe-help-content">
          <img src="/new/Headset.svg" alt="" />
          <p>
            {t("Deploy connected CRM and loyalty management platforms for consistent customer engagement")}
          </p>
        </div>
        <div className="pe-help-content">
          <img src="/new/Headset.svg" alt="" />
          <p>
            {t("Provide executive dashboards and retail MIS and performance management tools for real-time operational and commercial insights")}
          </p>
        </div>
        <div className="pe-help-content">
          <img src="/new/Headset.svg" alt="" />
          <p>
            {t("Deliver offshore-enabled transformation programmes for scalable, cost-effective execution")}
          </p>
        </div>
      </div>
    </div>
    <div className="retail-help-bg-img">
      <video
        src="/new/darkvid.mp4"
        autoPlay={true}
        loop={true}
        muted={true}
        playsInline={true}
      />
    </div>
  </section>
  <section className="py-100">
  <div className="container">
    <div className="retail-benifit-main-waber1 row">
    <div className="col-sm-6">
      <div className="retail-benifit-design-one">
        <div>
          <h4 className="benifit-title"> {t("Tangible Outcomes")}</h4>
          <div className="benifit-points-waber">
            <div className="bf-content">
              <img src="/new/lp.svg" alt="" />
              <p>
                {t("Improved inventory turnover, stock accuracy, and on-shelf availability")}
              </p>
            </div>
            <div className="bf-content">
              <img src="/new/lp.svg" alt="" />
              <p>
                {t("Increased conversion rates and customer retention via consistent omnichannel experiences")}
              </p>
            </div>
            <div className="bf-content">
              <img src="/new/lp.svg" alt="" />
              <p>
                {" "}
                {t("Dynamic, data-driven pricing and promotions improving margin protection")}
              </p>
            </div>
            <div className="bf-content">
              <img src="/new/lp.svg" alt="" />
              <p> 
                {t("Faster, data-led operational decision-making")}
              </p>
            </div>
            <div className="bf-content">
              <img src="/new/lp.svg" alt="" />
              <p>
                {" "}
                {t("Enhanced customer lifetime value through connected loyalty programmes")}
              </p>
            </div>
          </div>
        </div>
        <img src="/new/re-be-1.webp" alt="" />
      </div>
      </div>
    <div className="col-sm-6">
      <div className="retail-benifit-design-one">
        <div>
          <h4 className="benifit-title"> {t("Global Best Practices We Apply")}</h4>
          <div className="benifit-points-waber">
            <div className="bf-content">
              <img src="/new/lp.svg" alt="" />
              <p>
                {t("AI-driven demand sensing, digital order orchestration, and omnichannel fulfilment models")}
              </p>
            </div>
            <div className="bf-content">
              <img src="/new/lp.svg" alt="" />
              <p>
                {t("Data-first inventory and order management systems standard among leading omnichannel retailers")}
              </p>
            </div>
            <div className="bf-content">
              <img src="/new/lp.svg" alt="" />
              <p>
                {" "}
                {t("Connected customer, sales, and operational data ecosystems for real-time agility")}
              </p>
            </div>
          </div>
        </div>
        <img src="/new/re-be-2.webp" alt="" />
      </div>
      </div>
    <div className="col-sm-12">
      <div className="retail-benifit-design-two">
        <div>
          <h4 className="benifit-title"> {t("Why Choose Us")}</h4>
          <div className="benifit-points-waber">
            <div className="bf-content">
              <img src="/new/lp.svg" alt="" />
              <p>
                {t("Deep expertise in retail and omnichannel transformation programmes")}
              </p>
            </div>
            <div className="bf-content">
              <img src="/new/lp.svg" alt="" />
              <p>
                {t("Proven track record modernising multi-format, multi-country retail businesses")}
              </p>
            </div>
            <div className="bf-content">
              <img src="/new/lp.svg" alt="" />
              <p>
                {" "}
                {t("Focus on operational outcomes and measurable business value")}
              </p>
            </div>
            <div className="bf-content">
              <img src="/new/lp.svg" alt="" />
              <p>
                {" "}
                {t("Offshore delivery model ensuring scalable, high-quality, cost-effective programme execution")}
              </p>
            </div>
          </div>
        </div>
        <div>
          <img src="/new/why-22.svg" alt="" />
        </div>
      </div>
      </div>
    </div>
    </div>
  </section>

  <TestimonialandAward />

  
        {/* Page Faqs Start */}
        <div className="page-faqs bggray pd60">
          <div className="container">
            <div className="row">
              <div className="col-sm-2" />
              <div className="col-lg-8">
                {/* Page FAQs Category Start */}
                <div className="page-faqs-catagery">
                  {/* FAQs section start */}
                  <div
                    className="our-faq-section page-faq-accordion"
                    id="general_information"
                  >
                    <div className="section-title text-center">
                      <h2 className="text-anime-style-2" data-cursor="-opaque">
                        {t("Wondering Why? We’re Here to Answer")}
                      </h2>
                    </div>
                    {/* FAQ Accordion Start */}
                    <div className="faq-accordion" id="accordion">
                      {/* FAQ Item Start */}
                      <div className="accordion-item wow fadeInUp">
                        <h2 className="accordion-header" id="heading1">
                          <button
                            className="accordion-button collapsein"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapse1"
                            aria-expanded="true"
                            aria-controls="collapse1"
                          >
                            {t("What are retail industry solutions?")}
                          </button>
                        </h2>
                        <div
                          id="collapse1"
                          className="accordion-collapse collapse show"
                          aria-labelledby="heading1"
                          data-bs-parent="#accordion"
                        >
                          <div className="accordion-body">
                            <p>
                              {t("Retail industry solutions are technology platforms designed to help retailers optimise operations & manage inventory, connect business processes, and improve customer experiences across stores, ecommerce, supply chain, and digital channels.")} 
                            </p> 
                          </div>
                        </div>
                      </div>
                      {/* FAQ Item End */}
                      {/* FAQ Item Start */}
                      <div
                        className="accordion-item wow fadeInUp"
                        data-wow-delay="0.2s"
                      >
                        <h2 className="accordion-header" id="heading2">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapse2"
                            aria-expanded="false"
                            aria-controls="collapse2"
                          >
                            {t("What is RheinBrücke's core solution focus for the Retail Industry?")} 
                          </button>
                        </h2>
                        <div
                          id="collapse2"
                          className="accordion-collapse collapse "
                          aria-labelledby="heading2"
                          data-bs-parent="#accordion"
                        >
                          <div className="accordion-body">
                            <p>
                              {t("We focus on building a Unified Commerce architecture for multi-store and multi-channel retailers. Our key offerings are comprehensive and integrated:")}
                            </p>
                            <ul style={{ margin: "15px 0 0 20px", listStyleType: "disc" }}>
                              <li>{t("Core Systems: Enterprise Resource Planning (ERP) and Customer Relationship Management (CRM).")}</li>
                              <li>{t("Front-of-Store: Point-of-Sale (POS) integration and modernized store operations.")}</li>
                              <li>{t("Back-of-House: Advanced Inventory Management and Supply Chain Visibility tools.")}</li>
                              <li>{t("Digital Frontage: Robust eCommerce solutions for consistent brand experience.")}</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      {/* FAQ Item End */}
                      {/* FAQ Item Start */}
                      <div
                        className="accordion-item wow fadeInUp"
                        data-wow-delay="0.4s"
                      >
                        <h2 className="accordion-header" id="heading3">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapse3"
                            aria-expanded="false"
                            aria-controls="collapse3"
                          >
                            {t("How do these integrated solutions directly optimize key retail challenges?")} 
                          </button>
                        </h2>
                        <div
                          id="collapse3"
                          className="accordion-collapse collapse"
                          aria-labelledby="heading3"
                          data-bs-parent="#accordion"
                        >
                          <div className="accordion-body">
                            <p>
                              {t("Our solutions break down data silos to deliver data-driven insights that directly improve efficiency and profitability:")}
                            </p>
                            <ul style={{ margin: "15px 0 0 20px", listStyleType: "disc" }}>
                              <li>{t("Supply Chain Resilience: Providing real-time visibility into stock levels and movement, drastically reducing the chances of \"phantom inventory.\"")}</li>
                              <li>{t("Customer Engagement: Creating a 360-degree customer view by unifying CRM data with transaction history, enabling hyper-personalized marketing and service.")}</li>
                              <li>{t("Operational Efficiency: Optimizing store and warehouse workflows to speed up fulfillment and reduce labor costs.")}</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      {/* FAQ Item End */}
                      {/* FAQ Item Start */}
                      <div
                        className="accordion-item wow fadeInUp"
                        data-wow-delay="0.6s"
                      >
                        <h2 className="accordion-header" id="heading4">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapse4"
                            aria-expanded="false"
                            aria-controls="collapse4"
                          >
                           {t("Which Enterprise Resource Planning (ERP) systems are implemented for retail clients?")}
                          </button>
                        </h2>
                        <div
                          id="collapse4"
                          className="accordion-collapse collapse"
                          aria-labelledby="heading4"
                          data-bs-parent="#accordion"
                        >
                          <div className="accordion-body">
                            <p>
                              {t("We implement and integrate industry-leading, scalable ERP platforms chosen to fit the retailer's size and complexity:")}
                            </p>
                            <ul style={{ margin: "15px 0 0 20px", listStyleType: "disc" }}>
                              <li>{t("Tier 1 Systems: Epicor, Microsoft Dynamics, and SAP.")}</li>
                              <li>{t("These ERPs form the financial and operational core, which we integrate with advanced, specialized platforms for commerce (e.g., Fluent Commerce) and analytics (e.g., Power BI) to ensure the system is future-proof and composable.")}</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      {/* FAQ Item End */}
                      {/* FAQ Item Start */}
                      <div
                        className="accordion-item wow fadeInUp"
                        data-wow-delay="0.6s"
                      >
                        <h2 className="accordion-header" id="heading5">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapse5"
                            aria-expanded="false"
                            aria-controls="collapse5"
                          >
                           {t("What level of post-implementation support and ongoing system maintenance is provided?")}
                          </button>
                        </h2>
                        <div
                          id="collapse5"
                          className="accordion-collapse collapse"
                          aria-labelledby="heading5"
                          data-bs-parent="#accordion"
                        >
                          <div className="accordion-body">
                            <p>
                              {t("We guarantee sustained system health and maximum uptime through dedicated post-go-live programs:")}
                            </p>
                            <ul style={{ margin: "15px 0 0 20px", listStyleType: "disc" }}>
                              <li>{t("ERP Customer Excellence: Focused advisory services to ensure your team realizes the long-term value and ROI of the investment.")}</li>
                              <li>{t("Application Management Services (AMS): Our comprehensive AMS programs cover ongoing maintenance, security patching, performance monitoring, and scalability planning. We manage the technology so you can focus on selling products—because nobody enjoys unscheduled downtime during the holiday rush!")}</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      {/* FAQ Item End */}
                    </div>
                    {/* FAQ Accordion End */}
                  </div>
                  {/* FAQs section End */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Page Faq End */}
        
  {/* Footer Start */}
  <footer className="main-footer pd0">
    {/* Footer Main Start */}
    <div className="footer-main">
      <div className="container">
        <div className="firstrow">
          <div className="row">
            <div className="col-sm-8">
              <h2 data-cursor="-opaque"> {t("Modernise Your Retail Operations")}</h2>
              <p>
                {t("Build a more agile retail ecosystem that improves efficiency, strengthens customer experiences, and supports sustainable growth.")}
              </p>
            </div>
            <div className="col-sm-4">
              <div className="ser-btn text-right">
                <Link href="/contact-us" className="animated-svg-link">
                  {t("Contact Us")}
                  <span className="svg-container ">
                    <span className=" right">
                      <svg
                        width={24}
                        height={23}
                        viewBox="0 0 24 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          className="dot"
                          opacity="0.5"
                          cx="16.0004"
                          cy="4.79995"
                          r="1.6"
                          fill="#535353"
                        />
                        <circle
                          className="dot"
                          opacity="0.5"
                          cx="12.7992"
                          cy="1.6"
                          r="1.6"
                          fill="#535353"
                        />
                        <circle
                          className="dot"
                          opacity="0.5"
                          cx="22.4008"
                          cy="11.2"
                          r="1.6"
                          fill="#535353"
                        />
                        <circle
                          className="dot"
                          opacity="0.5"
                          cx="1.6"
                          cy="11.2"
                          r="1.6"
                          fill="#535353"
                        />
                        <circle
                          className="dot"
                          opacity="0.5"
                          cx="6.40078"
                          cy="11.2"
                          r="1.6"
                          fill="#535353"
                        />
                        <circle
                          className="dot"
                          opacity="0.5"
                          cx="11.1996"
                          cy="11.2"
                          r="1.6"
                          fill="#535353"
                        />
                        <circle
                          className="dot"
                          opacity="0.5"
                          cx="16.0004"
                          cy="11.2"
                          r="1.6"
                          fill="#535353"
                        />
                        <circle
                          className="dot"
                          opacity="0.5"
                          cx="19.1996"
                          cy="14.4"
                          r="1.6"
                          fill="#535353"
                        />
                        <circle
                          className="dot"
                          opacity="0.5"
                          cx="16.0004"
                          cy="17.6"
                          r="1.6"
                          fill="#535353"
                        />
                        <circle
                          className="dot"
                          opacity="0.5"
                          cx="12.7992"
                          cy="20.8"
                          r="1.6"
                          fill="#535353"
                        />
                        <circle
                          className="dot"
                          opacity="0.5"
                          cx="19.1996"
                          cy="8.00002"
                          r="1.6"
                          fill="#535353"
                        />
                      </svg>
                    </span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/*?php include "footer.php" ?*/}
      </div>
    </div>
  </footer>
</>


        </CommomLayout>

    )
}