"use client";

import React from "react";
import CommomLayout from "../Components/CommomLayout";
import Link from "next/link";
import {useTranslation} from "../hooks/useTranslation";
import TestimonialandAward from "../Components/TestimonialandAward";
export default function AlMl() {
  const { t, language } = useTranslation();
    return (
        <CommomLayout>
            <>
                {/* Header Start */}
                {/*?php include "navbar.php" ?*/}
                {/* Header End */}
                <div className="main-baner-hight auto-main-paner retail-baner ">
                    <div className="container bg-video-waber-content ">
                        <div className="row section-row1 align-items-center builtsec">
                            <div className="col-lg-5">
                                <div className="pe-main-hadding-waber">
                                    <h2 className="main-hadding-1 text-white" data-cursor="-opaque">
                                        {t("Digital Transformation Solutions for the Automotive Industry")}
                                    </h2>
                                    <p>
                                        {t("RheinBrücke delivers automotive ERP, manufacturing, and supply chain solutions that help automotive manufacturers optimise operations, improve production visibility, ensure end-to-end traceability, and accelerate digital transformation. Managing global supply chains, streamlining inventory management, and adopting data-led decision-making are no longer optional, they are critical to safeguarding margins and remaining competitive.")}
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
                            src="/videos/Automotive.mp4"
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
                                    {t("Challenges in Automotive Manufacturing")}
                                </h2>
                                <div className="d-g24 flex-wrap">
                                    <div className="challenge-point-waber">
                                        <img src="/new/qs-2.svg" alt="" />
                                        <p>
                                            {t("Complex global automotive supply chains facing delays, disruptions, supplier risks, and increasing compliance requirements across multi-tier supplier networks.")}
                                        </p>
                                    </div>
                                    <div className="challenge-point-waber">
                                        <img src="/new/qs-2.svg" alt="" />
                                        <p>
                                            {t("Increasing product complexity and customisation demands with multiple vehicle variants, shorter model cycles, and pressure on legacy automotive systems.")}
                                        </p>
                                    </div>
                                    <div className="challenge-point-waber">
                                        <img src="/new/qs-2.svg" alt="" />
                                        <p>
                                            {t("Growing demand for end-to-end production traceability across serialised and batch manufacturing, from raw materials and components to finished vehicles.")}
                                        </p>
                                    </div>
                                    <div className="challenge-point-waber">
                                        <img src="/new/qs-2.svg" alt="" />
                                        <p>
                                            {t("Motorsport teams under extreme time and performance pressures, requiring instant data-driven decision support")}
                                        </p>
                                    </div>
                                    <div className="challenge-point-waber">
                                        <img src="/new/qs-2.svg" alt="" />
                                        <p>
                                            {t("Disconnected engineering, manufacturing, and quality systems limit real-time visibility, collaboration, and operational agility.")}
                                        </p>
                                    </div>
                                    <div className="challenge-point-waber">
                                        <img src="/new/qs-2.svg" alt="" />
                                        <p>
                                            {t("Stricter automotive regulations around safety, emissions, and sustainability.")}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="retail-chellange-bg-img">
                        <img src="/new/challenges-automotive.webp" alt="" />
                    </div>
                </div>
                {/* Our Testimonial Section Start */}
                {/* <div class="our-testimonial whyequitysec pd30">
    <div class="container">
  <div class="row section-row align-items-center">
      <div class="col-lg-12">
          <div class="section-title text-center headingss">
              <h2 class="text-anime-style-2" data-cursor="-opaque">
                  Why It Matters
              </h2>

          </div>
      </div>
  </div>
  <div class="row align-items-center">
      <div class="col-lg-12">
    
          <div class="testimonial-slider5 equitywhy">
              <div class="swiper">
                  <div class="swiper-wrapper">

                      <div class="swiper-slide">
                          <div class="matters-content-waber">

                          </div>
                      </div>
                     

                 
                      <div class="swiper-slide">
                          <div class="matters-content-waber">

                          </div>
                      </div>
              
                      <div class="swiper-slide">
                          <div class="matters-content-waber">

                          </div>
                      </div>
                   
                      <div class="swiper-slide">
                          <div class="matters-content-waber">

                          </div>
                      </div>
                 
                      <div class="swiper-slide">
                          <div class="matters-content-waber">

                          </div>
                      </div>
                    
                  
                      <div class="swiper-slide">
                          <div class="matters-content-waber">
                              <img src="/new/met-6.svg" alt="">
                              <p>
                                  Ineffective resource planning results in material waste, increased operational
                                  costs, and reduced profitability.
                              </p>
                          </div>
                      </div>
                
                  </div>

              </div>
          </div>
      
      </div>


  </div>
    </div>
</div> */}
                {/* Our Testimonial Section End */}
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
                            <img src="/new/mat-1.svg" alt="Tracking components failure in automotive industry icon" />
                            <p>
                                {t("Limited component and process traceability increases the risk of product recalls, compliance penalties, quality issues, and reputational damage")}
                            </p>
                        </div>
                        <div className="pe-matters-content">
                            <img src="/new/met-2.svg" alt="Manual process increasing product costs in automotive industry icon" />
                            <p>
                                {t("Manual and inefficient manufacturing processes increase production costs, longer lead times and reduced productivity.")}
                            </p>
                        </div>
                        <div className="pe-matters-content">
                            <img src="/new/met-3.svg" alt="Disconencted data in automotive industry icon" />
                            <p>
                                {t("Disconnected data limits the ability to deliver predictive maintenance, downtime reduction, and operational insights")}
                            </p>
                        </div>
                        <div className="pe-matters-content">
                            <img src="/new/met-4.svg" alt="Motorsport performance analytics icon" />
                            <p>
                                {t("Motorsport teams unable to act on real-time data fall behind both on the track and in the factory")}
                            </p>
                        </div>
                        <div className="pe-matters-content">
                            <img src="/new/met-5.svg" alt="Automotive legacy systems constrain icon" />
                            <p>
                                {t("Legacy platforms constrain supplier collaboration, production efficiency, system integration, and continuous innovation.")}
                            </p>
                        </div>
                    </div>
                    </div>
                </div>
                <section className="py-100  pe-help-waber auto-help ">
                    <div className="container">
                        <h2 className="main-hadding-1 text-white  mb-40" data-cursor="-opaque">
                                {t("How We Help")}
                        </h2>
                        <div className="pe-help-content-waber">
                            <div className="pe-help-content">
                                <img src="/new/Headset.svg" alt="" />
                                <p>
                                    {t("Deploy integrated ERP, MES, and supply chain management solutions to support serialised, batch, and variant-based manufacturing.")}
                                </p>
                            </div>
                            <div className="pe-help-content">
                                <img src="/new/Headset.svg" alt="" />
                                <p>
                                    {t("Enable real-time production monitoring, downtime analytics, and plant performance visibility through connected dashboards.")}
                                </p>
                            </div>
                            <div className="pe-help-content">
                                <img src="/new/Headset.svg" alt="" />
                                <p>
                                    {t("Enable multi-level work breakdown structures (WBS) and real-time tracking of project cost, resource allocation, and milestone performance")}
                                </p>
                            </div>
                            <div className="pe-help-content">
                                <img src="/new/Headset.svg" alt="" />
                                <p>
                                    {t("Establish end-to-end material, batch, and product traceability across automotive operations.")}
                                </p>
                            </div>
                            <div className="pe-help-content">
                                <img src="/new/Headset.svg" alt="" />
                                <p>
                                    {t("Automate contract change management, variation order processing, billing, and revenue recognition workflows")}
                                </p>
                            </div>
                            <div className="pe-help-content">
                                <img src="/new/Headset.svg" alt="" />
                                <p>
                                    {t("Integrate simulation, telemetry, and sensor data into central analytics platforms for engineering, maintenance, and motorsport teams")}
                                </p>
                            </div>
                            <div className="pe-help-content">
                                <img src="/new/Headset.svg" alt="" />
                                <p>
                                    {t("Predict equipment failures, optimise inventory levels, and improve demand planning using AI-driven insights and machine learning capabilities.")}
                                </p>
                            </div>
                            <div className="pe-help-content">
                                <img src="/new/Headset.svg" alt="" />
                                <p>
                                    {t("Deliver real-time visibility across orders, inventory, suppliers, and global supply chains.")}
                                </p>
                            </div>
                            <div className="pe-help-content">
                                <img src="/new/Headset.svg" alt="" />
                                <p>
                                    {t("Improve supplier performance through integrated sourcing, supplier collaboration, logistics coordination, and quality management processes.")}
                                </p>
                            </div>
                            <div className="pe-help-content">
                                <img src="/new/Headset.svg" alt="" />
                                <p>
                                    {t("Drive strategic sourcing decisions with spend intelligence, category insights, supplier evaluation, and competitive sourcing strategies that improve cost efficiency and supplier value.")}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="commen-help-bg-img">
                        <video src="/new/gt1.mp4" autoPlay={true} loop={true} muted={true} playsInline={true} />
                    </div>
                </section>
                <div className={`benifites-waber ${language === 'German' ? 'gerautotang' : ''}`}>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="benifet-content-waber">
                                    <div className="benifet-content benifet-content-2 auto-b-h2">
                                        <div>
                                            <h4 className="benifit-title" data-cursor="-opaque">
                                                {t("Tangible Outcomes")}
                                            </h4>
                                            <div className="bf-content">
                                                <img src="/new/lp.svg" alt="" />
                                                <p>
                                                    {t("Reduced sourcing costs, improved supplier value optimisation and stronger risk resilience through optimised strategic sourcing")}
                                                </p>
                                            </div>
                                            <div className="bf-content">
                                                <img src="/new/lp.svg" alt="" />
                                                <p>
                                                    {t("Improved manufacturing efficiency, asset utilisation and reduced downtime through connected production systems, real-time monitoring, and performance insights.")}
                                                </p>
                                            </div>
                                            <div className="bf-content">
                                                <img src="/new/lp.svg" alt="" />
                                                <p>
                                                    {t("Full traceability across materials, components, and finished products safeguarding quality, compliance, and recall readiness")}
                                                </p>
                                            </div>
                                            <div className="bf-content">
                                                <img src="/new/lp.svg" alt="" />
                                                <p>
                                                    {t("Faster, more agile product engineering, manufacturing, and launch cycles via integrated systems and seamless supplier collaboration")}
                                                </p>
                                            </div>
                                            <div className="bf-content">
                                                <img src="/new/lp.svg" alt="" />
                                                <p>
                                                    {t("Enhanced supplier performance and compliance, reduced risks, logistics control through real-time data integration")}
                                                </p>
                                            </div>
                                            <div className="bf-content">
                                                <img src="/new/lp.svg" alt="" />
                                                <p>
                                                    {t("Enhance motorsport performance through live telemetry, predictive analytics, and AI-driven insights for race strategy and vehicle optimisation.")}
                                                </p>
                                            </div>
                                            <div className="bf-content">
                                                <img src="/new/lp.svg" alt="" />
                                                <p>
                                                    {t("Lower operational costs and increased resilience by eliminating silos and leveraging offshore-supported transformation models")}
                                                </p>
                                            </div>
                                        </div>
                                        <img src="/new/pf-6.svg" alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="benifet-content-waber">
                                    <div className="benifet-content benifet-content-2 auto-b-h2">
                                        <div>
                                            <h4 className="benifit-title" data-cursor="-opaque">
                                                {t("Why Choose Us")}
                                            </h4>
                                            <div className="bf-content">
                                                <img src="/new/lp.svg" alt="" />
                                                <p>
                                                    {t("Broad transformation expertise spanning component, vehicle, and motorsport manufacturing operations")}
                                                </p>
                                            </div>
                                            <div className="bf-content">
                                                <img src="/new/lp.svg" alt="" />
                                                <p>
                                                    {t("Proven capability in delivering integrated ERP, MES, strategic sourcing and supply chain platforms tailored to automotive complexities")}
                                                </p>
                                            </div>
                                            <div className="bf-content">
                                                <img src="/new/lp.svg" alt="" />
                                                <p>
                                                    {t("Commercially focused, driven by operational outcomes, productivity gains, and cost reduction")}
                                                </p>
                                            </div>
                                            <div className="bf-content">
                                                <img src="/new/lp.svg" alt="" />
                                                <p>
                                                    {t("Global delivery experience supporting multi-country, multi-brand organisations through scalable implementation and transformation models.")}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <img src="/new/nodr.svg" style={{ width: "70%" }} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <TestimonialandAward />

                
                                <div className="page-faqs bggray pd60">
                  <div className="container">
                    <div className="row">
                      <div className="col-sm-2" />
                      <div className="col-lg-8">
                        <div className="page-faqs-catagery">
                          <div
                            className="our-faq-section page-faq-accordion"
                            id="general_information"
                          >
                            <div className="section-title text-center">
                              <h2 className="text-anime-style-2" data-cursor="-opaque">
                                {t("Wondering Why? We’re Here to Answer")}
                              </h2>
                            </div>
                
                            <div className="faq-accordion" id="accordion">
                
                              {/* FAQ 1 */}
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
                                    {t("How does RheinBrücke specifically serve the automotive sector and its supply chain?")}
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
                                      {t("We drive digital transformation across the entire automotive value chain. Our core service is providing integrated ERP, strategic sourcing, and advanced Quality Management solutions tailored for component manufacturers (Tier 1/2/3) and vehicle assemblers (OEMs). We ensure your back-office and shop floor operations are a single, connected ecosystem.")}
                                    </p>
                                  </div>
                                </div>
                              </div>
                
                              {/* FAQ 2 */}
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
                                    {t("What leading technologies are employed to deliver manufacturing precision?")}
                                  </button>
                                </h2>
                
                                <div
                                  id="collapse2"
                                  className="accordion-collapse collapse"
                                  aria-labelledby="heading2"
                                  data-bs-parent="#accordion"
                                >
                                  <div className="accordion-body">
                                    <p>
                                      {t("We leverage industry-leading platforms and cutting-edge intelligence:")}
                                    </p>
                                    <ul className="ms-4">
                                      <li>
                                        <strong>{t("ERP Core:")}</strong> {t("Implementation and optimization of Epicor Kinetic and SAP solutions for robust manufacturing execution and enterprise control.")}
                                      </li>
                                      <li>
                                        <strong>{t("AI/Analytics:")}</strong> {t("We employ AI-enabled analytics for highly accurate demand forecasting, proactive supplier performance management, and predictive maintenance planning. This moves you from reacting to predicting market shifts and component needs.")}
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                
                              {/* FAQ 3 */}
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
                                    {t("Do your solutions support the rigorous compliance and traceability requirements of the automotive industry?")}
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
                                      {t("Absolutely. Compliance and traceability are non-negotiable in this sector. Our solutions are built to maintain stringent quality standards, including ISO, IATF 16949, and all regional regulatory compliance requirements. Most critically, we provide full, end-to-end part traceability (lot and serial number tracking), which is essential for audit readiness and rapid response to potential safety recalls.")}
                                    </p>
                                  </div>
                                </div>
                              </div>
                
                              {/* FAQ 4 */}
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
                                    {t("What is the measurable value delivered to automotive companies?")}
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
                                      {t("We deliver tangible improvements in three critical performance areas:")}
                                    </p>
                                    <ul className="ms-4">
                                      <li>
                                        <strong>{t("Supply Chain Resiliency:")}</strong> {t("We significantly streamline and optimize the supply chain, enabling highly efficient Just-in-Time (JIT) and Just-in-Sequence (JIS) operations to meet OEM production line demands.")}
                                      </li>
                                      <li>
                                        <strong>{t("Production Efficiency:")}</strong> {t("Our solutions boost Overall Equipment Effectiveness (OEE) and improve production throughput, leading to a direct increase in daily output and a reduction in waste.")}
                                      </li>
                                      <li>
                                        <strong>{t("Market Responsiveness:")}</strong> {t("By leveraging real-time data and AI-driven insights, we dramatically accelerate your market responsiveness—from design changes to delivery—giving you a competitive edge in a fast-evolving industry.")}
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                
                              {/* FAQ 5 */}
                              <div
                                className="accordion-item wow fadeInUp"
                                data-wow-delay="0.8s"
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
                                    {t("How can ERP solutions support Make-to-Order (MTO) and Make-to-Stock (MTS) automotive manufacturing?")}
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
                                      <strong>{t("Answer:")}</strong> {t("Automotive ERP solutions support Make-to-Order (MTO) and Make-to-Stock (MTS) manufacturing by integrating production planning, procurement, inventory, quality, and supply chain processes. This enables real-time visibility, optimises resource utilisation, improves production scheduling, and supports data-driven decision-making across automotive operations.")}
                                    </p>
                                  </div>
                                </div>
                              </div>
                
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Footer Start */}
                <footer className="main-footer pd0">
                    {/* Footer Main Start */}
                    <div className="footer-main">
                        <div className="container">
                            <div className="firstrow">
                                <div className="row">
                                    <div className="col-sm-8">
                                        <h2 data-cursor="-opaque">
                                            {t("Accelerate your automotive transformation with confidence.")}
                                        </h2>
                                        <p>
                                            {t("Discover how RheinBrücke helps automotive manufacturers modernise operations, strengthen supply chains, optimise production, and unlock real-time business intelligence through integrated enterprise solutions.")}
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