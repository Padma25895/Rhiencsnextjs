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
  <div className="main-baner-hight epc-baner retail-baner ">
    <div className="container bg-video-waber-content ">
      <div className="row section-row1 align-items-center builtsec">
        <div className="col-lg-5">
          <div className="pe-main-hadding-waber">
            <h2 className="main-hadding-1 text-white" data-cursor="-opaque">
              {t("ERP Solutions for EPC (Engineering, Procurement & Construction)")}
            </h2>
            <p>
              {t("EPC solutions for engineering, procurement, and construction companies managing complex projects, demanding schedules, evolving scopes, and tight margins. Connect project management, engineering, procurement, contract management, project controls, cost management, and risk across the project lifecycle to improve visibility, strengthen governance, and keep EPC projects on schedule and within budget.")}
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
      <video src="/new/epc-02.mov" autoPlay={true} muted={true} loop={true} playsInline={true} />
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
            {t("Challenges in EPC Operations")}
          </h2>
          <div className="d-g24 flex-wrap">
            <div className="challenge-point-waber">
              <img src="/new/qs-2.svg" alt="" />
              <p>
                {t("Complex, multi-phase projects with shifting scopes, dependencies, and contractual penalties")}
              </p>
            </div>
            <div className="challenge-point-waber">
              <img src="/new/qs-2.svg" alt="" />
              <p>
                {t("Managing subcontractors, suppliers, vendors, equipment, and project assets across multiple locations")}
              </p>
            </div>
            <div className="challenge-point-waber">
              <img src="/new/qs-2.svg" alt="" />
              <p>
                {t("Engineering, procurement, finance, site operations, and project management teams often work across systems that do not share timely, reliable information.")}
              </p>
            </div>
            <div className="challenge-point-waber">
              <img src="/new/qs-2.svg" alt="" />
              <p>
                {t("Delayed identification of risks, cost overruns, schedule delays, and site issues limits timely intervention.")}
              </p>
            </div>
            <div className="challenge-point-waber">
              <img src="/new/qs-2.svg" alt="" />
              <p>
                {t("EPC firms lack a consolidated view of project progress, budgets, resource utilisation, procurement status, and risks across sites.")}
              </p>
            </div>
            <div className="challenge-point-waber">
              <img src="/new/qs-2.svg" alt="" />
              <p>
                {t("Inconsistent cost tracking, forecasting, revenue recognition, and billing make it harder to protect margins")}
              </p>
            </div>
            <div className="challenge-point-waber">
              <img src="/new/qs-2.svg" alt="" />
              <p>
                {t("Paper-based and disconnected workflows slow down approvals, procurement, change orders, timesheets, invoicing, and payment cycles.")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="retail-chellange-bg-img">
      <img src="/new/epc-01.webp" alt="" />
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
        <img src="/new/mat-1.svg" alt="EPC budget and schedule risks icon" />
        <p>
          {t("Lack of integrated control leads to budget overruns, missed milestones, and margin leakage")}
        </p>
      </div>
      <div className="pe-matters-content">
        <img src="/new/met-2.svg" alt="Delayed project approvals in EPC icon" />
        <p>
          {t("Approval delays cause project disruption, slowing procurement, change orders, contractor payments, and critical site decisions increases risks.")}
        </p>
      </div>
      <div className="pe-matters-content">
        <img src="/new/met-3.svg" alt="Poor risk visibility in EPC icon" />
        <p>
          {t("Inadequate risk visibility restricts proactive issue management and opportunity capture")}
        </p>
      </div>
      <div className="pe-matters-content">
        <img src="/new/met-4.svg" alt="Material supply disruptions in EPC icon" />
        <p>
          {t("Inefficient asset, material, and subcontractor coordination increases downtime and delivery disruption")}
        </p>
      </div>
      <div className="pe-matters-content">
        <img src="/new/met-5.svg" alt="EPC cash flow challenges icon" />
        <p>
          {t("Poor financial governance results in inaccurate revenue recognition and cash flow gaps to billing disputes and contractual claims.")}
        </p>
      </div>
    </div>
    </div>
  </div>
  <section className="py-100  pe-help-waber epc-help ">
    <div className="container">
      <h2 className="main-hadding-1 text-white  mb-40" data-cursor="-opaque">
        {t("How We Help")}
      </h2>
      <div className="pe-help-content-waber">
        <div className="pe-help-content">
          <img src="/new/Headset.svg" alt="" />
          <p>
            {t("Connect cost, schedules, procurement, engineering, and site operations through a unified project control environment.")}
          </p>
        </div>
        <div className="pe-help-content">
          <img src="/new/Headset.svg" alt="" />
          <p>
            {t("Coordinate materials, equipment, assets, and site resources to improve utilisation and reduce operational downtime.")}
          </p>
        </div>
        <div className="pe-help-content">
          <img src="/new/Headset.svg" alt="" />
          <p>
            {t("Track projects with multi-level WBS and monitor costs, resources, milestones, and progress in real time.")}
          </p>
        </div>
        <div className="pe-help-content">
          <img src="/new/Headset.svg" alt="" />
          <p>
            {t("Combine risk registers, early-warning indicators, and predictive analytics to identify issues before they affect project milestones.")}
          </p>
        </div>
        <div className="pe-help-content">
          <img src="/new/Headset.svg" alt="" />
          <p>
            {t("Streamline contract change management, variation orders, billing, and revenue recognition to reduce delays and financial leakage.")}
          </p>
        </div>
        <div className="pe-help-content">
          <img src="/new/Headset.svg" alt="" />
          <p>
            {t("Support bid and tender management, project pipeline tracking, and margin risk analysis for improved project selection and financial control")}
          </p>
        </div>
        <div className="pe-help-content">
          <img src="/new/Headset.svg" alt="" />
          <p>
            {t("Digitise procurement, subcontractor, and vendor management processes for improved compliance and supply reliability")}
          </p>
        </div>
        <div className="pe-help-content">
          <img src="/new/Headset.svg" alt="" />
          <p>
            {t("Build flexible digital capabilities that support multi-project, multi-country EPC operations without unnecessary complexity.")}
          </p>
        </div>
      </div>
    </div>
    <div className="commen-help-bg-img">
      <video src="/new/epc-01.mov" autoPlay={true} loop={true} muted={true} playsInline={true} />
    </div>
  </section>
  <div className={`benifites-waber tangilewaber ${language === 'German' ? 'gerbenefits' : ''}`}>
    <div className="container">
      <div className="row">
        <div className="col-sm-6">
          <div className="benifet-content-waber">
            <div className="benifet-content benifet-content-2  epc-b-h tangile">
              <div>
                <h4 className="benifit-title"> {t("Tangible Outcomes")}</h4>
                <div className="bf-content">
                  <img src="/new/lp.svg" alt="" />
                  <p>
                    {t("Improved cost control, schedule adherence, and cash flow management through integrated operational data visibility")}
                  </p>
                </div>
                <div className="bf-content">
                  <img src="/new/lp.svg" alt="" />
                  <p>
                    {t("Faster, more accurate procurement, subcontractor, and billing processes reducing cycle times and disputes")}
                  </p>
                </div>
                <div className="bf-content">
                  <img src="/new/lp.svg" alt="" />
                  <p>
                    {t("Enhanced subcontractor, vendor, and resource management increasing operational efficiency and delivery reliability")}
                  </p>
                </div>
                <div className="bf-content">
                  <img src="/new/lp.svg" alt="" />
                  <p>
                    {t("Better risk mitigation through proactive issue identification, structured escalation, and early intervention")}
                  </p>
                </div>
                <div className="bf-content">
                  <img src="/new/lp.svg" alt="" />
                  <p>
                    {t("Accurate, audit-ready project financial governance with real-time cost-to-complete, earned value, and revenue recognition insights")}
                  </p>
                </div>
                <div className="bf-content">
                  <img src="/new/lp.svg" alt="" />
                  <p>
                    {t("Reduced operational overheads and increased delivery resilience through connected, scalable digital infrastructure")}
                  </p>
                </div>
              </div>
              <div className="tangileimg">
              <img src="/new/pf-6.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="benifet-content-waber">
            <div className="benifet-content benifet-content-2 epc-b-h">
              <div>
                <h4 className="benifit-title"> {t("Why Choose Us")}</h4>
                <div className="bf-content">
                  <img src="/new/lp.svg" alt="" />
                  <p>
                    {t("EPC and capital project expertise grounded in the operational, commercial, and delivery challenges of complex engineering and construction projects.")}
                  </p>
                </div>
                <div className="bf-content">
                  <img src="/new/lp.svg" alt="" />
                  <p>
                    {t("Proven capability implementing project, cost, asset, and risk control frameworks for complex, multi-year, multi-location projects")}
                  </p>
                </div>
                <div className="bf-content">
                  <img src="/new/lp.svg" alt="" />
                  <p>
                    {t("Commercially focused approach, driven by operational outcomes, profitability protection, and governance enhancement")}
                  </p>
                </div>
                <div className="bf-content">
                  <img src="/new/lp.svg" alt="" />
                  <p>
                    {t("Offshore-enabled delivery model ensuring scalable, cost-efficient, high-quality project execution without global consultancy overhead")}
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
                {t("Frequently Asked Questions")}
              </h2>
            </div>

            {/* FAQ Accordion Start */}
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
                    {t("What is EPC?")}
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
                      {t(
                        "EPC stands for Engineering, Procurement and Construction. It is a project delivery model where a single contractor manages the engineering and design, procurement of materials and equipment, construction, commissioning, and handover of a project against agreed cost, schedule, and performance requirements."
                      )}
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
                    {t(
                      "How does RheinBrücke support EPC companies with digital transformation?"
                    )}
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
                      {t(
                        "We implement Enterprise Resource Planning (ERP) systems that unify core EPC processes: project management, sophisticated procurement, real-time cost control, and financial billing. This integration drives process efficiency for complex construction projects and infrastructure development."
                      )}
                    </p>
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
                    {t(
                      "Which industry-leading ERP platforms are customized for EPC project management?"
                    )}
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
                      {t(
                        "We strategically deploy and customize Epicor Kinetic and SAP S/4HANA solutions. These are enhanced with project-based modules, including Work Breakdown Structure (WBS) management, to provide robust, real-time reporting and granular control over project financials."
                      )}
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
                    {t(
                      "Can these ERP solutions handle complex, multi-location EPC projects?"
                    )}
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
                      {t(
                        "Absolutely. Our solutions provide centralized project control and financial governance for multi-site and international projects. They deliver precise site-level visibility into resource utilization, equipment tracking, and budget adherence across all project locations."
                      )}
                    </p>
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
                    {t(
                      "What measurable business results can EPC firms expect from these ERP solutions?"
                    )}
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
                      {t(
                        "EPC clients gain three critical outcomes: Improved Project Profitability via early cost overrun detection; Optimized Material Utilization through better inventory and logistics management; and Enhanced Stakeholder Transparency via real-time financial and progress dashboards."
                      )}
                    </p>
                  </div>
                </div>
              </div>

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
                {t("Strengthen EPC Project Delivery")}
              </h2>
              <p>
                {t("Improve project visibility, control costs, streamline execution, enhance site-level profitability and protect margins with connected systems and digital processes built around the realities of EPC operations.")}
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