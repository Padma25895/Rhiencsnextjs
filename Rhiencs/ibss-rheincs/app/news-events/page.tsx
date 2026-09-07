"use client";

import React, { useState, useEffect } from "react";
import CommomLayout from "../Components/CommomLayout";
import Link from "next/link";
import TestimonialandAward from "../Components/TestimonialandAward";
import Awards from "../Components/Awards";
import { createClient } from "@/lib/supabase-browser";
import { slugToUrl } from "@/lib/slug";
import {useTranslation} from "../hooks/useTranslation";

interface NewsEvent {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  type: 'news' | 'event';
  event_date: string | null;
  location: string | null;
  featured_image: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export default function EnterpriseSolutions() {
  const { t, language } = useTranslation();
  
  const [items, setItems] = useState<NewsEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchItems();
    
    // Refetch items when window gains focus (user returns to tab)
    const handleFocus = () => {
      fetchItems();
    };
    
    // Refetch items periodically (every 30 seconds) to catch new records
    const intervalId = setInterval(() => {
      fetchItems();
    }, 30000);
    
    window.addEventListener('focus', handleFocus);
    
    return () => {
      window.removeEventListener('focus', handleFocus);
      clearInterval(intervalId);
    };
  }, []);

  const fetchItems = async () => {
    try {
      // Add cache-busting to ensure fresh data
      const { data, error } = await supabase
        .from('news_events')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Only update if data has actually changed (prevent unnecessary re-renders)
      setItems(prevItems => {
        const prevIds = new Set(prevItems.map(item => item.id));
        const newIds = new Set((data || []).map((item: NewsEvent) => item.id));
        const idsChanged = prevItems.length !== (data || []).length || 
          ![...prevIds].every(id => newIds.has(id)) ||
          ![...newIds].every(id => prevIds.has(id));
        
        // If data changed, update state
        if (idsChanged || JSON.stringify(prevItems) !== JSON.stringify(data)) {
          return data || [];
        }
        return prevItems;
      });
    } catch (err: any) {
      console.error('Error fetching news/events:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  const getIcon = (type: string) =>
    type === "event" ? (
      <svg aria-hidden="true" width="22" height="22" viewBox="0 0 16 16" fill="currentColor">
        <path d="M3.5 0A.5.5 0 0 1 4 .5V1h8V.5a.5.5 0 0 1 1 0V1h.5A2.5 2.5 0 0 1 16 3.5v10a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 0 13.5v-10A2.5 2.5 0 0 1 2.5 1H3V.5a.5.5 0 0 1 .5-.5M15 6H1v7.5c0 .828.672 1.5 1.5 1.5h11c.828 0 1.5-.672 1.5-1.5z" />
        <path d="M2 8h2v2H2zm3 0h2v2H5zm3 0h2v2H8zm3 0h2v2h-2zM2 11h2v2H2zm3 0h2v2H5zm3 0h2v2H8zm3 0h2v2h-2z" />
      </svg>
    ) : (
      <svg aria-hidden="true" width="22" height="22" viewBox="0 0 16 16" fill="currentColor">
        <path d="M0 2.5A1.5 1.5 0 0 1 1.5 1h13A1.5 1.5 0 0 1 16 2.5v11a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5zM1.5 2a.5.5 0 0 0-.5.5V4h14V2.5a.5.5 0 0 0-.5-.5zM1 5v8.5a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5V5z" />
        <path d="M3 6.5h3v3H3zm4 0h6v1H7zm0 2h6v1H7zm-4 2h10v1H3zm0 2h10v1H3z" />
      </svg>
    );

  /** Strip HTML tags and decode entities so excerpt displays as plain text. */
  const plainExcerpt = (html: string) => {
    if (!html || typeof html !== 'string') return '';
    const decoded = html
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;|&apos;/g, "'");
    return decoded.replace(/<[^>]*>/g, '').trim();
  };

  return (
    <CommomLayout>
      <>
        {/* Header Start */}
        {/*?php include "navbar.php" ?*/}
        {/* Header End */}
        <div className="bg-video-waber2 newsmobile py-100">
          <div className="parent2 retailparent2 mobilevideo">
            <video
              src="/new/histery.mp4"
              autoPlay={true}
              muted={true}
              loop={true}
              playsInline={true}
              className="bg-image1"
            />
          </div>
          <div className="container bg-video-waber-content2 ">
            <div className="row section-row1 align-items-center builtsec">
              <div className="col-sm-6">
                <div className="section-title">
                  <h2
                    className="text-anime-style-21"
                    style={{ color: "#082326" }}
                    data-cursor="-opaque"
                  >
                    {t('Our History')}
                  </h2>
                  <p className="text-dark">
                    {" "}
                    {t('The latest in news and events from RheinBrücke, giving you insights on the recent developments in our organization.')}
                  </p>
                </div>
              </div>
              <div className="col-sm-6 pd0">
                <div className="parent2 retailparent2 mobileview">
                  <video
                    src="/new/histery.mp4"
                    autoPlay={true}
                    muted={true}
                    loop={true}
                    playsInline={true}
                    className="bg-image1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* START OF THE TIMELINE SECTION */}
        <div className="time-99">
          <div className="container">
            <div className="row section-row1 align-items-center">
              <div className="col-sm-12">
                {/* The new, attractive timeline starts here */}
                <div className="timeline">
                  {loading ? (
                    <div style={{ padding: '40px', textAlign: 'center' }}>
                      <p>Loading news and events...</p>
                    </div>
                  ) : items.length === 0 ? (
                    <div style={{ padding: '40px', textAlign: 'center' }}>
                      <p>No news or events available at the moment.</p>
                    </div>
                  ) : (
                    items.map((item, index) => (
                      <div key={item.id} className="timeline-item is-visible">
                        <div className="timeline-marker">
                          {getIcon(item.type)}
                        </div>
                        <div className="timeline-content card">
                          <div className="card-body p-4">
                            <p className="text-primary mb-1">
                              {item.event_date ? formatDate(item.event_date) : formatDate(item.created_at)}
                            </p>
                            <h5 className="card-title fw-bold">
                              {item.title}
                            </h5>
                            {item.featured_image && (
                              <img
                                src={item.featured_image}
                                alt={item.title}
                                className="timeline-image"
                              />
                            )}
                            {item.excerpt && (
                              <p className="mt-3">{plainExcerpt(item.excerpt)}</p>
                            )}
                            
                              <Link href={`/news-events/${slugToUrl(item.slug) || item.id}`} className="animated-svg-link hr-link">
                                Read More
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
                    ))
                  )}
                </div>{" "}
                {/* End of .timeline */}
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <p className="lines" />
        </div>
        <TestimonialandAward />

        <Awards />
        {/* Footer Start */}
        <footer className="main-footer pd0">
          {/* Footer Main Start */}
          <div className="footer-main">
            <div className="container">
              <div className="firstrow">
                <div className="row">
                  <div className="col-sm-8">
                    <h2>{t("Ready to accelerate value creation across your portfolio?")}</h2>
                    <p>
                      {t("Contact us today to learn how we can help modernise operations, de-risk integrations, and improve commercial outcomes.")}
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
