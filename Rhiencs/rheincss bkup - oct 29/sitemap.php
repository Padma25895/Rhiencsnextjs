<?php

header("Content-Type: application/xml; charset=UTF-8");

// ==============================
// CONFIGURATION
// ==============================

$SUPABASE_URL = "https://fltdymhjpiwnwltazqse.supabase.co";
$SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsdGR5bWhqcGl3bndsdGF6cXNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyNzAzNTAsImV4cCI6MjA4MDg0NjM1MH0.yRyqYQFSJd07ESp-izlRBMr4Z3CNLonQpErib1ZRbLE";

$BASE_URL = "https://www.rheincs.com";

// ==============================
// STATIC PAGES
// ==============================

$staticPages = [
    "",
    "about-us/",
    "about-us/overview/",
    "about-us/leadership/",
    "about-us/customer-speak/",
    "about-us/success-stories/",
    "AI-ML/",
    "AM-S/",
    "Architecture/",
    "Automotive/",
    "blogs/",
    "Brand-owners-and-vertical-retail/",
    "Cable-manufacturing/",
    "Casestudy/",
    "Commercetools/",
    "contact-us/",
    "corporate-videos/",
    "careers/",
    "collaterals/",
    "digital-services/",
    "digital-solutions/",
    "discrete-manufacturing/",
    "supply-chain/",
    "ERP-customer-excellence/",
    "Ecommerce/",
    "Engineering-Procurement-Construction/",
    "Epicor-companion/",
    "Epicor-epicpay/",
    "Epicor-iscala/",
    "Epicor-kinetic/",
    "events/",
    "Faq/",
    "fluent-commerce/",
    "impressum/",
    "industries-retail/",
    "interior-design/",
    "ms-technology/",
    "news-events/",
    "our-solution/",
    "privacy/",
    "solutions/",
    "terms/",
    "thanks/",
    "user-exprience/",
    "webinars/",

    // Newly added pages
    "establishing-our-saudi-presence-and-launch-of-aims-partnership/",
    "grand-opening-of-india-development-centre/",
    "MeRLIN-strategic-sourcing-software/",
    "Private-Equity-Funding-Backed-Ventures/",
    "process-manufacturing/",
    "rheinbrucke-a-microsoft-partner/",
    "solutions/CorusHR/",
    "solutions/digital-services-and-solutions/",
    "solutions/erp-enterprise-solutions-and-services/",
    "solutions/erp-enterprise-solutions-and-services/erp/",
    "solutions/erp-enterprise-solutions-and-services/epicor/",
    "solutions/erp-enterprise-solutions-and-services/ms-dynamics/",
    "solutions/erp-enterprise-solutions-and-services/sap/",
    "solutions/erp-enterprise-solutions-and-services/sap/sap-analytics/",
    "solutions/erp-enterprise-solutions-and-services/sap/sap-application-management-services/",
    "solutions/erp-enterprise-solutions-and-services/sap/sap-btp/",
    "solutions/erp-enterprise-solutions-and-services/sap/sap-cloud-applications/",
    "solutions/erp-enterprise-solutions-and-services/sap/sap-s4hana-transformation/",
    "solutions/erp-enterprise-solutions-and-services/sugar-crm/",
    "aerospace-defence-manufacturing/",
    "business-intelligence/",
    "data-engineering-warehousing/",
    "deftech-bharat-2026/",
];

// ==============================
// SUPABASE REQUEST
// ==============================

function supabaseRequest($table, $select, $filter = "")
{
    global $SUPABASE_URL, $SUPABASE_ANON_KEY;

    $url = $SUPABASE_URL . "/rest/v1/" . $table . "?select=" . urlencode($select);

    if ($filter != "") {
        $url .= "&" . $filter;
    }

    $ch = curl_init($url);

    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => [
            "apikey: ".$SUPABASE_ANON_KEY,
            "Authorization: Bearer ".$SUPABASE_ANON_KEY
        ]
    ]);

    $response = curl_exec($ch);
    curl_close($ch);

    return json_decode($response, true);
}

// ==============================
// GET DATA
// ==============================

$blogs = supabaseRequest(
    "blogs",
    "slug,updated_at,created_at",
    "published=eq.true"
);

$caseStudies = supabaseRequest(
    "case_studies",
    "slug,updated_at,created_at",
    "published=eq.true"
);

$ebooks = supabaseRequest(
    "ebook_landing_pages",
    "slug,updated_at,created_at"
);

// ==============================
// XML START
// ==============================

echo '<?xml version="1.0" encoding="UTF-8"?>';
?>

<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

<?php

// Static Pages

foreach($staticPages as $page)
{
?>
<url>
    <loc><?= htmlspecialchars($BASE_URL.'/'.$page) ?></loc>
    <changefreq>monthly</changefreq>
    <priority><?= $page=="" ? "1.0" : "0.8" ?></priority>
</url>
<?php
}

// Blogs

if(is_array($blogs))
{
    foreach($blogs as $blog)
    {
?>
<url>
    <loc><?= htmlspecialchars($BASE_URL."/blogs/".$blog['slug']."/") ?></loc>
    <lastmod><?= substr($blog['updated_at'] ?: $blog['created_at'],0,10) ?></lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
</url>
<?php
    }
}

// Case Studies

if(is_array($caseStudies))
{
    foreach($caseStudies as $item)
    {
?>
<url>
    <loc><?= htmlspecialchars($BASE_URL."/Casestudy/".$item['slug']."/") ?></loc>
    <lastmod><?= substr($item['updated_at'] ?: $item['created_at'],0,10) ?></lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
</url>
<?php
    }
}

// Ebooks

if(is_array($ebooks))
{
    foreach($ebooks as $item)
    {
?>
<url>
    <loc><?= htmlspecialchars($BASE_URL."/LP/".$item['slug']."/") ?></loc>
    <lastmod><?= substr($item['updated_at'] ?: $item['created_at'],0,10) ?></lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
</url>
<?php
    }
}

?>

</urlset>