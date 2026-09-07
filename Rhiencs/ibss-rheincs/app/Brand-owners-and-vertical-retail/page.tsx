"use client";

import React from 'react'
import CommomLayout from '../Components/CommomLayout'
import Link from "next/link";
import {useTranslation} from "../hooks/useTranslation";
import TestimonialandAward from '../Components/TestimonialandAward';
const page = () => {
  const { t, language } = useTranslation();
    return (
        <CommomLayout>
           <>
  <div className="main-baner-hight retail-baner ">
    <div className="container bg-video-waber-content ">
      <div className="row section-row1 align-items-center builtsec">
        <div className="col-lg-5 col-11">
          <div className="pe-main-hadding-waber">
            <h2 className="main-hadding-1 text-white" data-cursor="-opaque">
                {t("Vertical Retail Solutions for Omnichannel Growth")}
            </h2>
            <p>
                {t("Vertical retail businesses, brand-led organisations controlling product design, manufacturing, and sales through their own physical, ecommerce, and D2C channels, face intensified market pressures. Accelerating product launches, controlling inventory across multiple channels, and delivering consistent, personalised customer experiences are vital for sustainable growth and competitive positioning.")}
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
      <video src="/new/vr777.mp4" autoPlay={true} muted={true} loop={true} playsInline={true} />
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
            {t("Challenges in Vertical Retail")}
          </h2>
          <div className="d-g24 flex-wrap">
            <div className="challenge-point-waber">
              <img src="/new/qs-2.svg" alt="" />
              <p>
                {t("Rapidly shifting demand driven by promotions, social media trends, and influencer marketing, making demand forecasting more challenging.")}
              </p>
            </div>
            <div className="challenge-point-waber">
              <img src="/new/qs-2.svg" alt="" />
              <p>
                {t("Complex promotions and markdowns putting pressure on margins and profitability")}
              </p>
            </div>
            <div className="challenge-point-waber">
              <img src="/new/qs-2.svg" alt="" />
              <p>
                {t("Inventory and fulfilment imbalances across retail stores, D2C channels, and online marketplaces")}
              </p>
            </div>
            <div className="challenge-point-waber">
              <img src="/new/qs-2.svg" alt="" />
              <p>
                {t("Fragmented customer engagement and loyalty programmes weakening brand affinity and hinder long-term relationships.")}
              </p>
            </div>
            <div className="challenge-point-waber">
              <img src="/new/qs-2.svg" alt="" />
              <p>
                {t("Disconnected brand, retail, and D2C systems slowing operational decision-making")}
              </p>
            </div>
            <div className="challenge-point-waber">
              <img src="/new/qs-2.svg" alt="" />
              <p>
                {t("Lengthy product development cycles and limited design-to-shelf agility delay response to emerging trends.")}
              </p>
            </div>
            <div className="challenge-point-waber">
              <img src="/new/qs-2.svg" alt="" />
              <p>
                {t("Limited real-time visibility into sales and inventory for brand managers and planners")}
              </p>
            </div>
            <div className="challenge-point-waber">
              <img src="/new/qs-2.svg" alt="" />
              <p>
                {t("Insights without operational execution leaving valuable product and customer data unused")}
              </p>
            </div>
            <div className="challenge-point-waber">
              <img src="/new/qs-2.svg" alt="" />
              <p>
                {t("Static category, merchandising, and pricing decisions disconnected from live sales trends")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="retail-chellange-bg-img">
      <img src="/new/vr777.webp" alt="" />
    </div>
  </div>
  <div className="py-100 pe-matters-waber">
    <div className="container">
      <h2
        className="main-hadding-1 them-dark-text-color text-center mb-40"
        data-cursor="-opaque"
      >
        {t("Why It Matters")}
      </h2>
      <div className="pe-matters-content-waber">
        <div className="pe-matters-content">
          <img src="/new/mat-1.svg" alt="Poor vertical retail integration icon" />
          <p>
            {t("Poor retail channels & D2C integration result in lost sales, inconsistent experiences, and lower customer satisfaction.")}
          </p>
        </div>
        <div className="pe-matters-content">
          <img src="/new/met-2.svg" alt="Operational inefficiencies in vertical retail icon" />
          <p>
            {t("Operational inefficiencies across sourcing, inventory, and fulfilment add pressure retail margins")}
          </p>
        </div>
        <div className="pe-matters-content">
          <img src="/new/met-3.svg" alt="Vertical retail irregular response icon" />
          <p>
            {t("Delayed response to market trends weakens brand relevance and retention")}
          </p>
        </div>
        <div className="pe-matters-content">
          <img src="/new/met-4.svg" alt="Disconnected retail systems icon" />
          <p>
            {t("Disconnected systems limit the use of real-time data for pricing, promotions, merchandising, and category decisions.")}
          </p>
        </div>
        <div className="pe-matters-content">
          <img src="/new/met-5.svg" alt="" />
          <p>
            {t("Underutilised customer data limits opportunities to deliver personalised customer experiences.")}
          </p>
        </div>
      </div>
    </div>
  </div>
  <section className="mds-section pq-dark-waber pd50">
    <div className="container">
      <div className="content text-left">
        <div className="section-title ">
          <div className="hero-video-content1 wow fadeInUp mt-4">
            <h2 className="text-anime-style-2" data-cursor="-opaque">
              {t("How We Help")}
            </h2>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-3">
          <div className="help-waber">
            <img src="/new/Headset.svg" alt="" />
            <p>
              {t("Implement modern retail, D2C, and brand management systems for operational efficiency")}
            </p>
          </div>
          <div className="help-waber">
            <img src="/new/Headset.svg" alt="" />
            <p>
              {t("Integrate ERP, POS, ecommerce, WMS, PLM, and omnichannel fulfilment for unified, real-time visibility across operations")}
            </p>
          </div>
          <div className="help-waber">
            <img src="/new/Headset.svg" alt="" />
            <p>
              {t("Deploy centralised order and inventory management to synchronise stock across retail, D2C, and marketplaces")}
            </p>
          </div>
          <div className="help-waber">
            <img src="/new/Headset.svg" alt="" />
            <p>
              {t("Enable advanced analytics for demand forecasting, pricing, promotions, and product lifecycle management")}
            </p>
          </div>
          <div className="help-waber">
            <img src="/new/Headset.svg" alt="" />
            <p>
              {t("Deliver scalable transformation programmes with offshore-enabled delivery models that support long-term growth")}
            </p>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="help-waber">
            <img src="/new/Headset.svg" alt="" />
            <p>
              {t("Optimise D2C fulfilment, real-time order tracking, and marketplace operations")}
            </p>
          </div>
          <div className="help-waber">
            <img src="/new/Headset.svg" alt="" />
            <p>
              {t("Accelerate product launches with integrated digital PLM and connected omnichannel launch management")}
            </p>
          </div>
          <div className="help-waber">
            <img src="/new/Headset.svg" alt="" />
            <p>
              {t("Personalise customer engagement through connected CRM, loyalty, and marketing automation platforms")}
            </p>
          </div>
          <div className="help-waber">
            <img src="/new/Headset.svg" alt="" />
            <p>
              {t("Enable leadership teams with executive dashboards and retail brand performance management tools")}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className="pq-video">
      <video src="/new/vr778.mp4" autoPlay={true} loop={true} muted={true} playsInline={true} />
    </div>
  </section>
  <div className={`benifites-waber ${language === 'German' ? 'gerbenef' : ''}`}>
    <div className="container">
      <div className="row">
        <div className="col-sm-6">
          <div className="benifet-content-waber">
            <div className="benifet-content benifet-content-2 vr-b-h1">
              <div className="benifithght">
                <h4 className="benifit-title"> {t("Tangible Outcomes")}</h4>
                <div className="bf-content">
                  <img src="/new/lp.svg" alt="" />
                  <p>
                    {t("Improved stock accuracy, inventory turnover, and sell-through across all channels")}
                  </p>
                </div>
                <div className="bf-content">
                  <img src="/new/lp.svg" alt="" />
                  <p>
                    {t("Faster time-to-market for new products and collections")}
                  </p>
                </div>
                <div className="bf-content">
                  <img src="/new/lp.svg" alt="" />
                  <p>
                    {" "}
                    {t("Greater pricing and promotion agility protecting margins")}
                  </p>
                </div>
                <div className="bf-content">
                  <img src="/new/lp.svg" alt="" />
                  <p>
                    {" "}
                    {t("Increased conversion and customer retention through connected omnichannel experiences")}
                  </p>
                </div>
                <div className="bf-content">
                  <img src="/new/lp.svg" alt="" />
                  <p>
                    {" "}
                    {t("Enhanced decision-making through unified product, inventory, and customer insights")}
                  </p>
                </div>
                <div className="bf-content">
                  <img src="/new/lp.svg" alt="" />
                  <p>
                    {" "}
                    {t("Stronger customer lifetime value through personalised, data-driven engagement")}
                  </p>
                </div>
              </div>
              <div className="text-center">
              <img src="/new/pf-6.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="benifet-content-waber">
            <div className="benifet-content benifet-content-2 vr-b-h1 global">
              <div className="benifithght">
                <h4 className="benifit-title">
                  {t("Global Best Practices We Apply")}
                </h4>
                <div className="bf-content">
                  <img src="/new/lp.svg" alt="" />
                  <p>
                    {t("AI-driven demand sensing, digital PLM, and omnichannel order orchestration")}
                  </p>
                </div>
                <div className="bf-content">
                  <img src="/new/lp.svg" alt="" />
                  <p>
                    {t("Data-led product lifecycle management for rapid design-to-shelf agility")}
                  </p>
                </div>
                <div className="bf-content">
                  <img src="/new/lp.svg" alt="" />
                  <p>
                    {" "}
                    {t("Connected customer, product, and operational data ecosystems for brand-led decision-making")}
                  </p>
                </div>
              </div>
              <div className="text-center">
                <img src="/new/nodr.svg" style={{ width: "70%" }} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-12">
          <div className="benifet-content-waber">
            <div className="benifet-content pm-flex">
              <div>
                <h4 className="benifit-title">
                  {t("Why Choose Us")}
                </h4>
                <div className="bf-content">
                  <img src="/new/lp.svg" alt="" />
                  <p>
                    {t("Extensive experience modernising vertically integrated, brand-led retail operations")}
                  </p>
                </div>
                <div className="bf-content">
                  <img src="/new/lp.svg" alt="" />
                  <p>
                    {t("Proven capability delivering omnichannel, D2C, and brand management transformations")}
                  </p>
                </div>
                <div className="bf-content">
                  <img src="/new/lp.svg" alt="" />
                  <p>
                    {" "}
                    {t("Commercial focus on operational outcomes and measurable business value")}
                  </p>
                </div>
                <div className="bf-content">
                  <img src="/new/lp.svg" alt="" />
                  <p>
                    {" "}
                    {t("Offshore delivery model for scalable, high-quality, cost-effective programme execution")}
                  </p>
                </div>
              </div>
              <img src="/new/why-22.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

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
                            {t("What are vertical retail solutions?")}
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
                              {t("Vertical retail solutions are industry-specific technology platforms designed for brand-led retailers managing product development, inventory, sales, and customer engagement across their own retail channels.")} 
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
                            {t("How does RheinBrücke provide comprehensive support for Brand Owners and Vertical Retailers?")} 
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
                              {t("We provide an end-to-end digital commerce solution, unifying the entire value chain from manufacturing/sourcing through final sale. Our solutions connect and synchronize:")}
                            </p>
                            <ul style={{ margin: "15px 0 0 20px", listStyleType: "disc" }}>
                              <li>{t("Supply Chain/Production: Optimizing sourcing, manufacturing, and inventory management via ERP.")}</li>
                              <li>{t("Retail & Digital Sales: Integrating eCommerce (B2C/B2B) and physical stores.")}</li>
                              <li>{t("Intelligent Insights: Using advanced analytics to drive profitable decisions across all operational layers.")}</li>
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
                            {t("What specific platforms are deployed to build this unified retail ecosystem?")} 
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
                              {t("We deploy a composable commerce architecture leveraging best-of-breed enterprise platforms tailored for flexibility and scale:")}
                            </p>
                            <ul style={{ margin: "15px 0 0 20px", listStyleType: "disc" }}>
                              <li>{t("Core ERP: Epicor ERP and Microsoft Dynamics for foundational finance, production, and supply chain control.")}</li>
                              <li>{t("Modern Commerce: Headless eCommerce platforms like commercetools for flexible frontend experiences.")}</li>
                              <li>{t("Order Orchestration: Fluent Commerce for Distributed Order Management (DOM) and real-time inventory visibility.")}</li>
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
                           {t("How is the transition to a true Omnichannel Fulfillment model achieved?")}
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
                              {t("We integrate your physical stores and digital channels into a single commerce engine. This process involves:")}
                            </p>
                            <ul style={{ margin: "15px 0 0 20px", listStyleType: "disc" }}>
                              <li>{t("Real-time Inventory Orchestration: Fluent Commerce provides a unified view of inventory across all locations (stores, DCs, suppliers).")}</li>
                              <li>{t("Unified Order Management (UOM): Enabling flexible and profitable fulfillment options like Click & Collect (BOPIS), Ship from Store, and easy returns.")}</li>
                              <li>{t("Seamless Customer Experience: Ensuring consistent service, pricing, and communication regardless of the channel the customer uses.")}</li>
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
                           {t("What measurable business outcomes can Brand Owners expect from this transformation?")}
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
                              {t("Our integrated approach delivers significant ROI and competitive advantage:")}
                            </p>
                            <ul style={{ margin: "15px 0 0 20px", listStyleType: "disc" }}>
                              <li>{t("Enhanced Operational Efficiency: Streamlining workflows from order capture to fulfillment, leading to lower labor costs.")}</li>
                              <li>{t("Reduced Lost Sales: Minimizing stock-outs and maximizing inventory utilization across the network.")}</li>
                              <li>{t("Accelerated Time to Market: Speeding up new product introduction and market responsiveness.")}</li>
                              <li>{t("Improved Customer Lifetime Value (CLV): Driving higher customer satisfaction through fast, accurate, and flexible delivery options.")}</li>
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
              <h2 data-cursor="-opaque">
                {" "}
                {t("Accelerate Your Brand-Led Retail Growth")}
              </h2>
              <p>
                {" "}
                {t("Discover how we help brand-led businesses modernise operations, streamline D2C and retail channels, and deliver consistent, omnichannel customer experiences.")}
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

export default page