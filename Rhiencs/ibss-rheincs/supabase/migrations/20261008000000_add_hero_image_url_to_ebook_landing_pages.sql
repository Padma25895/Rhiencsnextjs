ALTER TABLE public.ebook_landing_pages
  ADD COLUMN IF NOT EXISTS hero_image_url TEXT NULL;
