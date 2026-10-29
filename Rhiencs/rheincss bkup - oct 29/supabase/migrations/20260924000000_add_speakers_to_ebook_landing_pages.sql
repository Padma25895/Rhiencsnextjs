ALTER TABLE public.ebook_landing_pages
  ADD COLUMN IF NOT EXISTS speakers JSONB NOT NULL DEFAULT '[]'::jsonb;

UPDATE public.ebook_landing_pages
SET speakers = jsonb_build_array(
  jsonb_build_object(
    'label', 'Speaker',
    'name', COALESCE(author_name, ''),
    'role', COALESCE(author_role, ''),
    'avatar_url', COALESCE(author_avatar_url, ''),
    'avatar_svg', COALESCE(author_avatar_svg, ''),
    'bio', COALESCE(author_bio, ''),
    'linkedin_url', ''
  )
)
WHERE (speakers IS NULL OR speakers = '[]'::jsonb)
  AND (
    NULLIF(author_name, '') IS NOT NULL
    OR NULLIF(author_role, '') IS NOT NULL
    OR NULLIF(author_avatar_url, '') IS NOT NULL
    OR NULLIF(author_avatar_svg, '') IS NOT NULL
    OR NULLIF(author_bio, '') IS NOT NULL
  );
