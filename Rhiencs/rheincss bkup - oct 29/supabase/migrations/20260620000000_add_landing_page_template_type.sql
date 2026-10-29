ALTER TABLE public.ebook_landing_pages
  ADD COLUMN IF NOT EXISTS template_type TEXT NOT NULL DEFAULT 'ebook';
