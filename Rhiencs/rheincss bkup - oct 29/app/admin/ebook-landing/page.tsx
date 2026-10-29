'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { createClient } from '@/lib/supabase-browser'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import 'quill/dist/quill.snow.css'
import { useQuillImageUpload } from '@/app/Components/QuillImageAltUploader'

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })

// Quill modules configuration (exact like blog page)
const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    // [{ 'font': [] }],
    [{ 'size': ['normal', 'small', 'large', 'huge'] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'indent': '-1'}, { 'indent': '+1' }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'align': [] }],
    ['link', 'image', 'video'],
    ['clean']
  ]
}

// Quill formats (exact like blog page)
const formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'indent',
  'color', 'background',
  'align',
  'link', 'image', 'video'
]

interface FormField {
  id: string
  type: 'text' | 'email' | 'tel' | 'number' | 'textarea' | 'select'
  label?: string
  placeholder?: string
  required?: boolean
  options?: string[]
}

interface EbookSpeaker {
  label: string
  name: string
  role: string
  avatar_url: string
  avatar_svg: string
  bio: string
  linkedin_url: string
}

interface EbookLandingPage {
  id: string
  slug: string
  template_type?: 'ebook' | 'webinar'
  title: string
  headline: string | null
  subheadline: string | null
  additional_paragraph: string | null
  extra_content: string | null
  logo_text: string | null
  logo_image_url: string | null
  book_image_url: string | null
  hero_image_url: string | null
  learning_title: string | null
  learning_description: string | null
  benefits_heading: string | null
  benefits: string[]
  form_title: string | null
  form_button_text: string | null
  form_fields: FormField[]
  author_heading: string | null
  author_name: string | null
  author_role: string | null
  author_bio: string | null
  author_avatar_url: string | null
  author_avatar_svg: string | null
  speakers?: EbookSpeaker[] | null
  footer_color: string | null
  pdf_url: string | null
  created_at: string
  updated_at: string
}

export default function AdminEbookLandingPage() {
  const [isClient, setIsClient] = useState(false);
  const [pages, setPages] = useState<EbookLandingPage[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingPage, setEditingPage] = useState<EbookLandingPage | null>(null)

  const emptySpeaker = (label = 'Speaker'): EbookSpeaker => ({
    label,
    name: '',
    role: '',
    avatar_url: '',
    avatar_svg: '',
    bio: '',
    linkedin_url: '',
  })

  const [formData, setFormData] = useState({
    slug: 'default',
    template_type: 'ebook' as 'ebook' | 'webinar',
    title: '',
    headline: '',
    subheadline: '',
    additional_paragraph: '',
    extra_content: '',
    logo_text: 'Logo',
    logo_image_url: '',
    book_image_url: '',
    hero_image_url: '',
    learning_title: '',
    learning_description: '',
    benefits_heading: '',
    benefits: [] as string[],
    form_title: '',
    form_button_text: '',
    form_fields: [] as FormField[],
    author_heading: '',
    author_name: '',
    author_role: '',
    author_bio: '',
    author_avatar_url: '',
    author_avatar_svg: '',
    speakers: [emptySpeaker('Speaker'), emptySpeaker('Moderator')] as EbookSpeaker[],
    footer_color: '#3aaee0',
    pdf_url: '',
  })
  const [newBenefit, setNewBenefit] = useState('')
  const [newFormField, setNewFormField] = useState<FormField>({
    id: '',
    type: 'text',
    label: '',
    placeholder: '',
    required: true,
    options: [],
  })
  const supabase = createClient()

  const {
    AltTextModal: EbookAltTextModal,
    handleToolbarImageClick,
    setupEditorListeners
  } = useQuillImageUpload({
    storageBucket: 'case-study-images',
    folderPath: 'ebook-landing-content',
    fileNamePrefix: 'ebook-content-img',
    maxFileSizeMB: 5
  })

  const ebookQuillCleanupRef = useRef<(() => void) | null>(null)

  // Component-level Quill modules with custom Alt Text popup image handler
  const quillModules = useMemo(() => ({
    toolbar: {
      container: modules.toolbar,
      handlers: {
        image: handleToolbarImageClick
      }
    },
    clipboard: {
      matchVisual: false
    }
  }), [handleToolbarImageClick])

  // Set up paste + drag-drop listeners for ALL Quill editors on page
  useEffect(() => {
    if (showForm) {
      const attachTimer = setTimeout(() => {
        if (ebookQuillCleanupRef.current) ebookQuillCleanupRef.current()
        const cleanups: Array<() => void> = []
        document.querySelectorAll('.ql-editor').forEach((edEl, idx) => {
          const editorId = `el-quill-${idx}-${Date.now()}`
          edEl.setAttribute('data-el-quill', editorId)
          cleanups.push(setupEditorListeners(`[data-el-quill="${editorId}"]`))
        })
        ebookQuillCleanupRef.current = () => cleanups.forEach(c => c())
      }, 800)
      return () => {
        clearTimeout(attachTimer)
        if (ebookQuillCleanupRef.current) {
          ebookQuillCleanupRef.current()
          ebookQuillCleanupRef.current = null
        }
      }
    }
  }, [showForm, setupEditorListeners])

  // Set isClient and register custom Quill sizes
  useEffect(() => {
    setIsClient(true);
    
    // Register custom pixel sizes with Quill
    const registerQuillSizes = async () => {
      try {
        const Quill = (await import('quill')).default;
        const SizeAttributor = Quill.import('attributors/style/size');
        
        // // Set our custom size whitelist
        // SizeAttributor.whitelist = sizeOptions;
        
        // // Register the updated size attributor
        // Quill.register(SizeAttributor, true);
        console.log('Custom Quill sizes registered!');
      } catch (err) {
        console.error('Error registering Quill sizes:', err);
      }
    };
    
    registerQuillSizes();
  }, []);

  useEffect(() => {
    fetchPages()
  }, [])

  const fetchPages = async () => {
    try {
      setLoading(true)
      console.log("Admin: fetchPages() called!")
      const { data, error } = await supabase
        .from('ebook_landing_pages')
        .select('*')
        .order('created_at', { ascending: false })

      console.log("Admin: fetched pages data:", data)
      if (error) throw error
      setPages(data || [])
    } catch (error: any) {
      console.error('Error fetching pages:', error.message)
    } finally {
      setLoading(false)
    }
  }

  const extractPlainTextFromHtml = (html: string): string => {
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = html
    return tempDiv.textContent || tempDiv.innerText || ''
  }

  const generateSlugFromText = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const updatedData = { [name]: value }
    
    // Auto-generate slug from title when title changes and not editing
    if (name === 'title' && !editingPage) {
      updatedData.slug = generateSlugFromText(value)
    }
    
    setFormData(prev => ({ ...prev, ...updatedData }))
  }

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
    speakerIndex?: number,
  ) => {
    const file = e.target.files?.[0]
    if (!file) return

    const isPdf = fieldName === 'pdf_url'
    if (isPdf) {
      if (file.type !== 'application/pdf') {
        alert('Please select a PDF file')
        return
      }
    } else if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size should be less than 5MB')
      return
    }

    setUploading(true)

    try {
      const fileExt = file.name.split('.').pop()
      const prefix = typeof speakerIndex === 'number' ? `speaker-${speakerIndex}-${fieldName}` : fieldName
      const fileName = `${prefix}-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `ebook-landing/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('case-study-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('case-study-images')
        .getPublicUrl(filePath)

      if (typeof speakerIndex === 'number') {
        setFormData(prev => ({
          ...prev,
          speakers: prev.speakers.map((s, i) =>
            i === speakerIndex ? { ...s, [fieldName]: publicUrl } : s
          ),
        }))
      } else {
        setFormData(prev => ({ ...prev, [fieldName]: publicUrl }))
      }
      alert(isPdf ? 'PDF uploaded successfully!' : 'Image uploaded successfully!')
    } catch (error: any) {
      console.error('Upload error:', error)
      alert('Error uploading image: ' + error.message)
    } finally {
      setUploading(false)
    }
  }

  const handleAddSpeaker = () => {
    setFormData(prev => {
      const safeSpeakers = Array.isArray(prev.speakers) ? prev.speakers : []
      const cloned = safeSpeakers.map(s => ({ ...emptySpeaker(s.label || `Speaker`), ...s }))
      const nextIndex = cloned.length + 1
      return {
        ...prev,
        speakers: [...cloned, emptySpeaker(`Speaker ${nextIndex}`)],
      }
    })
  }

  const handleRemoveSpeaker = (index: number) => {
    setFormData(prev => {
      const safeSpeakers = Array.isArray(prev.speakers) ? prev.speakers : []
      return {
        ...prev,
        speakers: safeSpeakers.filter((_, i) => i !== index),
      }
    })
  }

  const handleSpeakerChange = (
    index: number,
    field: keyof EbookSpeaker,
    value: string,
  ) => {
    setFormData(prev => {
      const safeSpeakers = Array.isArray(prev.speakers) ? prev.speakers : []
      return {
        ...prev,
        speakers: safeSpeakers.map((s, i) =>
          i === index ? { ...s, [field]: value } : s
        ),
      }
    })
  }

  const handleAddBenefit = () => {
    if (newBenefit.trim()) {
      setFormData(prev => ({
        ...prev,
        benefits: [...prev.benefits, newBenefit.trim()]
      }))
      setNewBenefit('')
    }
  }

  const handleRemoveBenefit = (index: number) => {
    setFormData(prev => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index)
    }))
  }

  const handleAddFormField = () => {
    if (newFormField.id.trim()) {
      setFormData(prev => ({
        ...prev,
        form_fields: [...prev.form_fields, { ...newFormField }]
      }))
      setNewFormField({
        id: '',
        type: 'text',
        label: '',
        placeholder: '',
        required: true,
        options: [],
      })
    }
  }

  const handleRemoveFormField = (index: number) => {
    setFormData(prev => ({
      ...prev,
      form_fields: prev.form_fields.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      const expectedPdfUrl = formData.pdf_url || null

      const safeSpeakers: EbookSpeaker[] = (() => {
        const existing = Array.isArray(formData.speakers) ? formData.speakers : []
        const upgraded: EbookSpeaker[] = existing.map(s => ({
          ...emptySpeaker(s?.label || 'Speaker'),
          label: s?.label ?? 'Speaker',
          name: s?.name ?? '',
          role: s?.role ?? '',
          avatar_url: s?.avatar_url ?? '',
          avatar_svg: s?.avatar_svg ?? '',
          bio: s?.bio ?? '',
          linkedin_url: s?.linkedin_url ?? '',
        }))
        return upgraded
      })()

      // Sync: first speaker's details always feed the legacy author_* fields so old
      // single-author pages keep working in both directions.
      const syncedAuthor = safeSpeakers[0] || null
      const finalAuthorName = syncedAuthor?.name || formData.author_name || null
      const finalAuthorRole = syncedAuthor?.role || formData.author_role || null
      const finalAuthorBio = syncedAuthor?.bio || formData.author_bio || null
      const finalAuthorAvatarUrl = syncedAuthor?.avatar_url || formData.author_avatar_url || null
      const finalAuthorAvatarSvg = syncedAuthor?.avatar_svg || formData.author_avatar_svg || null

      const safeFormFields = Array.isArray(formData.form_fields) ? formData.form_fields : []

      const payload: any = {
        slug: formData.slug,
        template_type: formData.template_type,
        title: formData.title,
        headline: formData.headline || null,
        subheadline: formData.subheadline || null,
        additional_paragraph: formData.additional_paragraph || null,
        extra_content: formData.extra_content || null,
        logo_text: formData.logo_text || null,
        logo_image_url: formData.logo_image_url || null,
        book_image_url: formData.book_image_url || null,
        hero_image_url: formData.hero_image_url || null,
        learning_title: formData.learning_title || null,
        learning_description: formData.learning_description || null,
        benefits_heading: formData.benefits_heading || null,
        benefits: Array.isArray(formData.benefits) ? formData.benefits : [],
        form_title: formData.form_title || null,
        form_button_text: formData.form_button_text || null,
        form_fields: safeFormFields,
        author_heading: formData.author_heading || null,
        author_name: finalAuthorName,
        author_role: finalAuthorRole,
        author_bio: finalAuthorBio,
        author_avatar_url: finalAuthorAvatarUrl,
        author_avatar_svg: finalAuthorAvatarSvg,
        speakers: safeSpeakers.length > 0 ? safeSpeakers : null,
        footer_color: formData.footer_color || null,
        pdf_url: formData.pdf_url || null,
        updated_at: new Date().toISOString(),
      }

      console.log("Admin handleSubmit - payload being sent:", payload);

      const fieldsThatMustSurvive = ['template_type', 'speakers', 'form_fields', 'additional_paragraph', 'extra_content', 'form_button_text', 'pdf_url', 'hero_image_url']

      if (editingPage) {
        try {
          const { error } = await supabase
            .from('ebook_landing_pages')
            .update(payload)
            .eq('id', editingPage.id)

          if (error) throw error
        } catch (updateErr: any) {
          const msg: string = (updateErr && typeof updateErr.message === 'string') ? updateErr.message : ''
          const droppedCol = fieldsThatMustSurvive.find(col => msg.includes(col))
          if (droppedCol) {
            if (droppedCol === 'template_type') {
              throw new Error('The template_type column is missing from your Supabase table. Run the landing page template migration before saving webinar pages.')
            }
            console.warn(`Retrying update without missing columns (${droppedCol}): `, msg)
            const fallbackPayload = { ...payload }
            delete fallbackPayload[droppedCol]
            const { error: retryErr } = await supabase
              .from('ebook_landing_pages')
              .update(fallbackPayload)
              .eq('id', editingPage.id)
            if (retryErr) throw retryErr
            alert(
              `⚠ Saved, but the column "${droppedCol}" is missing from your Supabase table, so the new ${droppedCol} data was NOT saved.\n` +
              `Please run the latest ebook_landing_pages migration (ALTER TABLE ebook_landing_pages ADD COLUMN IF NOT EXISTS ${droppedCol} ...) in Supabase SQL Editor and re-save this page.`
            )
          } else {
            throw updateErr
          }
        }
        if (expectedPdfUrl !== (editingPage.pdf_url || null)) {
          const { data: savedPage, error: verifyError } = await supabase
            .from('ebook_landing_pages')
            .select('pdf_url, speakers')
            .eq('id', editingPage.id)
            .single()

          if (verifyError) {
            throw verifyError
          }

          if ((savedPage?.pdf_url || null) !== expectedPdfUrl) {
            throw new Error('PDF update did not save in database. Please run the latest ebook_landing_pages migration on live.')
          }

          const expectedSpeakersCount = payload.speakers?.length ?? 0
          const actualSpeakersCount = Array.isArray((savedPage as any)?.speakers) ? (savedPage as any).speakers.length : 0
          if (expectedSpeakersCount > 0 && actualSpeakersCount !== expectedSpeakersCount) {
            alert(
              `⚠ Speakers column missing!\n` +
              `Expected ${expectedSpeakersCount} speakers, but the table returned ${actualSpeakersCount}.\n` +
              `Please run: ALTER TABLE ebook_landing_pages ADD COLUMN IF NOT EXISTS speakers JSONB NULL;`
            )
          }
        }

        alert('Page updated successfully!')
      } else {
        try {
          const { error } = await supabase
            .from('ebook_landing_pages')
            .insert([payload])

          if (error) throw error
        } catch (insertErr: any) {
          const msg: string = (insertErr && typeof insertErr.message === 'string') ? insertErr.message : ''
          const droppedCol = fieldsThatMustSurvive.find(col => msg.includes(col))
          if (droppedCol) {
            if (droppedCol === 'template_type') {
              throw new Error('The template_type column is missing from your Supabase table. Run the landing page template migration before creating webinar pages.')
            }
            console.warn(`Retrying insert without missing columns (${droppedCol}): `, msg)
            const fallbackPayload = { ...payload }
            delete fallbackPayload[droppedCol]
            const { error: retryErr } = await supabase
              .from('ebook_landing_pages')
              .insert([fallbackPayload])
            if (retryErr) throw retryErr
            alert(
              `⚠ Created, but the column "${droppedCol}" is missing from your Supabase table, so the new ${droppedCol} data was NOT saved.\n` +
              `Please run the latest ebook_landing_pages migration (ALTER TABLE ebook_landing_pages ADD COLUMN IF NOT EXISTS ${droppedCol} ...) in Supabase SQL Editor.`
            )
          } else {
            throw insertErr
          }
        }
        if (expectedPdfUrl) {
          const { data: savedPage, error: verifyError } = await supabase
            .from('ebook_landing_pages')
            .select('pdf_url, speakers')
            .eq('slug', formData.slug)
            .single()

          if (verifyError) {
            throw verifyError
          }

          if ((savedPage?.pdf_url || null) !== expectedPdfUrl) {
            throw new Error('PDF save did not persist in database. Please run the latest ebook_landing_pages migration on live.')
          }

          const expectedSpeakersCount = payload.speakers?.length ?? 0
          const actualSpeakersCount = Array.isArray((savedPage as any)?.speakers) ? (savedPage as any).speakers.length : 0
          if (expectedSpeakersCount > 0 && actualSpeakersCount !== expectedSpeakersCount) {
            alert(
              `⚠ Speakers column missing!\n` +
              `Expected ${expectedSpeakersCount} speakers, but the table returned ${actualSpeakersCount}.\n` +
              `Please run: ALTER TABLE ebook_landing_pages ADD COLUMN IF NOT EXISTS speakers JSONB NULL;`
            )
          }
        }

        alert('Page created successfully!')
      }
      setShowForm(false)
      setEditingPage(null)
      fetchPages()
    } catch (error: any) {
      console.error('Error saving page:', error)
      let msg = error.message
      
      if (error.code === '23505') {
        msg = `The slug "${formData.slug}" is already in use. Please use a unique slug or edit the existing page.`
      } else if (error.message === 'Failed to fetch') {
        msg = 'Network Error: Failed to fetch. Please ensure you have run the database migration in Supabase SQL Editor.'
      }
      
      alert('Error saving page: ' + msg)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (page: EbookLandingPage) => {
    setEditingPage(page)
    const legacySpeakers: EbookSpeaker[] = (() => {
      if (Array.isArray(page.speakers) && page.speakers.length > 0) {
        return page.speakers.map(raw => ({
          ...emptySpeaker(raw?.label || 'Speaker'),
          label: raw?.label ?? 'Speaker',
          name: raw?.name ?? '',
          role: raw?.role ?? '',
          avatar_url: raw?.avatar_url ?? '',
          avatar_svg: raw?.avatar_svg ?? '',
          bio: raw?.bio ?? '',
          linkedin_url: raw?.linkedin_url ?? '',
        }))
      }
      if (page.author_name || page.author_avatar_url || page.author_role) {
        return [{
          ...emptySpeaker('Author'),
          label: 'Author',
          name: page.author_name || '',
          role: page.author_role || '',
          avatar_url: page.author_avatar_url || '',
          avatar_svg: page.author_avatar_svg || '',
          bio: page.author_bio || '',
          linkedin_url: '',
        }]
      }
      return [emptySpeaker('Speaker'), emptySpeaker('Moderator')]
    })()
    setFormData({
      slug: page.slug,
      template_type: page.template_type || 'ebook',
      title: page.title,
      headline: page.headline || '',
      subheadline: page.subheadline || '',
      additional_paragraph: page.additional_paragraph || '',
      extra_content: page.extra_content || '',
      logo_text: page.logo_text || '',
      logo_image_url: page.logo_image_url || '',
      book_image_url: page.book_image_url || '',
      hero_image_url: (page as any).hero_image_url || '',
      learning_title: page.learning_title || '',
      learning_description: page.learning_description || '',
      benefits_heading: page.benefits_heading || '',
      benefits: page.benefits || [],
      form_title: page.form_title || '',
      form_button_text: page.form_button_text || '',
      form_fields: page.form_fields || [],
      author_heading: page.author_heading || '',
      author_name: page.author_name || '',
      author_role: page.author_role || '',
      author_bio: page.author_bio || '',
      author_avatar_url: page.author_avatar_url || '',
      author_avatar_svg: page.author_avatar_svg || '',
      speakers: legacySpeakers,
      footer_color: page.footer_color || '',
      pdf_url: page.pdf_url || '',
    })
    setShowForm(true)
  }

  const handleCreateWebinarPage = () => {
    setEditingPage(null)
    setFormData({
      slug: '',
      template_type: 'webinar',
      title: '',
      headline: '',
      subheadline: '',
      additional_paragraph: '',
      extra_content: '',
      logo_text: '',
      logo_image_url: '',
      book_image_url: '',
      hero_image_url: '',
      learning_title: '',
      learning_description: '',
      benefits_heading: '',
      benefits: [],
      form_title: '',
      form_button_text: '',
      form_fields: [
        { id: 'name', type: 'text', placeholder: 'Name *', required: true },
        { id: 'email', type: 'email', placeholder: 'Email *', required: true },
      ],
      author_heading: '',
      author_name: '',
      author_role: '',
      author_bio: '',
      author_avatar_url: '',
      author_avatar_svg: '',
      speakers: [emptySpeaker('Speaker'), emptySpeaker('Moderator')],
      footer_color: '#0b7778',
      pdf_url: '',
    })
    setShowForm(true)
  }

  const getPreviewPath = (page: EbookLandingPage) => page.template_type === 'webinar'
    ? `/webinar/${page.slug}`
    : `/LP/${page.slug}`

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this page?')) {
      try {
        setLoading(true)
        const { error } = await supabase
          .from('ebook_landing_pages')
          .delete()
          .eq('id', id)

        if (error) throw error
        fetchPages()
      } catch (error: any) {
        alert('Error deleting page: ' + error.message)
      } finally {
        setLoading(false)
      }
    }
  }

  if (loading && pages.length === 0) {
    return <div className="admin-ebook-loading">Loading...</div>
  }

  return (
    <div className="admin-ebook-root">
      <style>{`
        /* Custom Quill font styles */
        .ql-editor { 
          font-family: 'helvetica-neue-lt-pro', sans-serif !important;
        }
        .ql-snow .ql-picker.ql-font .ql-picker-label[data-value='helvetica-neue-lt-pro']::before,
        .ql-snow .ql-picker.ql-font .ql-picker-item[data-value='helvetica-neue-lt-pro']::before {
          content: 'Helvetica Neue LT Pro';
        }
        .ql-snow .ql-picker.ql-font .ql-picker-label[data-value='sans-serif']::before,
        .ql-snow .ql-picker.ql-font .ql-picker-item[data-value='sans-serif']::before {
          content: 'Sans Serif';
        }

        .ql-editor .ql-font-helvetica-neue-lt-pro { font-family: 'helvetica-neue-lt-pro', sans-serif !important; }
        .ql-editor .ql-font-sans-serif { font-family: sans-serif !important; }

        /* Custom size picker labels */
        .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='10px']::before,
        .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='10px']::before { content: '10px'; }
        .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='12px']::before,
        .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='12px']::before { content: '12px'; }
        .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='14px']::before,
        .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='14px']::before { content: '14px'; }
        .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='16px']::before,
        .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='16px']::before { content: '16px'; }
        .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='18px']::before,
        .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='18px']::before { content: '18px'; }
        .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='20px']::before,
        .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='20px']::before { content: '20px'; }
        .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='24px']::before,
        .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='24px']::before { content: '24px'; }
        .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='28px']::before,
        .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='28px']::before { content: '28px'; }
        .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='32px']::before,
        .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='32px']::before { content: '32px'; }
        .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='36px']::before,
        .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='36px']::before { content: '36px'; }
        .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='40px']::before,
        .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='40px']::before { content: '40px'; }
        .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='48px']::before,
        .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='48px']::before { content: '48px'; }
        .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='56px']::before,
        .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='56px']::before { content: '56px'; }
        .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='64px']::before,
        .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='64px']::before { content: '64px'; }
        .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='72px']::before,
        .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='72px']::before { content: '72px'; }



        .admin-ebook-root {
          padding: 30px;
          max-width: 1400px;
          margin: 0 auto;
          background: #f5f5f5;
          min-height: 100vh;
        }

        .admin-ebook-loading {
          padding: 40px;
          text-align: center;
          color: #666;
          font-size: 16px;
        }

        .admin-ebook-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid #e0e0e0;
        }

        .admin-ebook-title {
          font-size: 28px;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0;
        }

        .admin-ebook-btn {
          padding: 12px 24px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
          text-decoration: none;
        }

        .admin-ebook-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
        }

        .admin-ebook-form-card {
          background: #fff;
          padding: 32px;
          border-radius: 16px;
          margin-bottom: 30px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
          border: 1px solid #e8e8e8;
        }

        .admin-ebook-form-card p {
          color: #000;
        }

        .admin-ebook-form-title {
          font-size: 20px;
          font-weight: 600;
          color: #1a1a2e;
          margin-bottom: 24px;
          padding-bottom: 12px;
          border-bottom: 1px solid #eee;
        }

        .admin-ebook-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .admin-ebook-grid-full {
          grid-column: span 2;
        }

        .admin-ebook-field {
          margin-bottom: 16px;
        }

        .admin-ebook-label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: #444;
          margin-bottom: 6px;
        }

        .admin-ebook-input {
          width: 100%;
          padding: 10px 14px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 14px;
          transition: all 0.2s ease;
          background: #fafafa;
        }

        .admin-ebook-input:focus {
          outline: none;
          border-color: #667eea;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .admin-ebook-input::placeholder {
          color: #aaa;
        }

        .admin-ebook-textarea {
          width: 100%;
          padding: 10px 14px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 14px;
          resize: vertical;
          min-height: 80px;
          font-family: inherit;
          transition: all 0.2s ease;
          background: #fafafa;
        }

        .admin-ebook-textarea:focus {
          outline: none;
          border-color: #667eea;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .admin-ebook-section-title {
          font-size: 16px;
          font-weight: 600;
          color: #1a1a2e;
          margin: 24px 0 16px;
          padding-top: 20px;
          border-top: 2px solid #eee;
        }

        .admin-ebook-benefits-box {
          background: #f8f9ff;
          border: 2px dashed #d0d7ff;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 16px;
        }

        .admin-ebook-benefits-header {
          display: flex;
          gap: 12px;
          margin-bottom: 12px;
        }

        .admin-ebook-benefits-input {
          flex: 1;
          padding: 10px 14px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 14px;
          background: #fff;
        }

        .admin-ebook-benefits-input:focus {
          outline: none;
          border-color: #667eea;
        }

        .admin-ebook-btn-add {
          padding: 10px 20px;
          background: #22c55e;
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .admin-ebook-btn-add:hover {
          background: #16a34a;
        }

        .admin-ebook-benefits-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .admin-ebook-benefits-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 14px;
          background: #fff;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          margin-bottom: 8px;
        }

        .admin-ebook-benefits-text {
          font-size: 14px;
          color: #333;
        }

        .admin-ebook-btn-remove {
          padding: 6px 12px;
          background: #fee;
          color: #dc2626;
          border: none;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .admin-ebook-btn-remove:hover {
          background: #fdd;
        }

        .admin-ebook-form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 28px;
          padding-top: 20px;
          border-top: 1px solid #eee;
        }

        .admin-ebook-btn-cancel {
          padding: 12px 24px;
          background: #f5f5f5;
          color: #666;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .admin-ebook-btn-cancel:hover {
          background: #eee;
        }

        .admin-ebook-btn-submit {
          padding: 12px 28px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }

        .admin-ebook-btn-submit:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
        }

        .admin-ebook-btn-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .admin-ebook-table-card {
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
          border: 1px solid #e8e8e8;
        }

        .admin-ebook-table {
          width: 100%;
          border-collapse: collapse;
        }

        .admin-ebook-table thead {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .admin-ebook-table th {
          padding: 16px 20px;
          text-align: left;
          font-size: 13px;
          font-weight: 600;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .admin-ebook-table td {
          padding: 16px 20px;
          border-bottom: 1px solid #f0f0f0;
          font-size: 14px;
          color:#000;
        }

        .admin-ebook-table tbody tr {
          transition: background 0.2s ease;
        }

        .admin-ebook-table tbody tr:hover {
          background: #f8f9ff;
        }

        .admin-ebook-table tbody tr:last-child td {
          border-bottom: none;
        }

        .admin-ebook-slug {
          color: #000;
        }

        .admin-ebook-title-cell {
          color: #333;
          font-weight: 500;
        }

        .admin-ebook-title-cell a {
          color: #667eea;
          text-decoration: none;
        }

        .admin-ebook-title-cell a:hover {
          text-decoration: underline;
        }

        .admin-ebook-author-cell {
          color: #666;
        }

        .admin-ebook-actions {
          display: flex;
          justify-content: flex-end;
          gap: 8px;
        }

        .admin-ebook-btn-edit {
          padding: 8px 16px;
          background: #e8f0ff;
          color: #667eea;
          border: none;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .admin-ebook-btn-edit:hover {
          background: #d0e0ff;
        }

        .admin-ebook-btn-delete {
          padding: 8px 16px;
          background: #fee;
          color: #dc2626;
          border: none;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .admin-ebook-btn-delete:hover {
          background: #fdd;
        }

        .admin-ebook-btn-preview {
          padding: 8px 16px;
          background: #3aaee0;
          color: #fff;
          border: none;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .admin-ebook-btn-preview:hover {
          background: #2d8fbf;
        }

        .admin-ebook-empty {
          text-align: center;
          padding: 60px 20px;
          color: #888;
          font-style: italic;
          font-size: 15px;
        }

        .admin-ebook-color-preview {
          display: inline-block;
          width: 20px;
          height: 20px;
          border-radius: 4px;
          vertical-align: middle;
          margin-left: 8px;
          border: 1px solid #ddd;
        }

        .admin-ebook-form-fields-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .admin-ebook-form-field-item {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 16px;
          background: #fff;
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          margin-bottom: 12px;
        }

        .admin-ebook-form-field-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .admin-ebook-form-field-type {
          font-size: 12px;
          font-weight: 400;
          background: #f0f0f0;
          padding: 2px 8px;
          border-radius: 6px;
          color: #555;
        }

        @media (max-width: 768px) {
          .admin-ebook-grid {
            grid-template-columns: 1fr;
          }

          .admin-ebook-grid-full {
            grid-column: span 1;
          }

          .admin-speakers-grid {
            grid-template-columns: 1fr !important;
          }

          .admin-speaker-card {
            grid-template-columns: 1fr !important;
          }

          .admin-speaker-card > div[style*="grid-template-columns: 140px"] {
            grid-template-columns: 1fr !important;
          }

          .admin-ebook-header {
            flex-direction: column;
            gap: 16px;
            align-items: flex-start;
          }

          .admin-ebook-form-card {
            padding: 20px;
          }
        }
      `}</style>

      <div className="admin-ebook-header">
        <h1 className="admin-ebook-title">📄 Landing Pages</h1>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link href="/admin/ebook-enquiries" className="admin-ebook-btn" style={{ background: '#48bb78', boxShadow: '0 4px 15px rgba(72, 187, 120, 0.4)' }}>
            📊 View Enquiries
          </Link>
          <button className="admin-ebook-btn" onClick={() => {
            setEditingPage(null)
            setFormData({
              slug: '',
              template_type: 'ebook',
              title: '',
              headline: '',
              subheadline: '',
              additional_paragraph: '',
              extra_content: '',
              logo_text: 'Logo',
              logo_image_url: '',
              book_image_url: '',
              hero_image_url: '',
              learning_title: '',
              learning_description: '',
              benefits_heading: '',
              benefits: [],
              form_title: '',
              form_button_text: '',
              form_fields: [
                { id: 'name', type: 'text', label: '', placeholder: 'Name', required: true }
              ],
              author_heading: '',
              author_name: '',
              author_role: '',
              author_bio: '',
              author_avatar_url: '',
              author_avatar_svg: '',
              speakers: [emptySpeaker('Speaker'), emptySpeaker('Moderator')],
              footer_color: '#3aaee0',
              pdf_url: '',
            })
            setShowForm(true)
          }}>
            ➕ Create E-Book Page
          </button>
          <button className="admin-ebook-btn" style={{ background: '#087d82' }} onClick={handleCreateWebinarPage}>
            🎥 Create Webinar Page
          </button>
        </div>
      </div>

      {showForm && (
        <div className="admin-ebook-form-card">
          <h2 className="admin-ebook-form-title">{editingPage ? 'Edit Page' : 'Create New Page'}</h2>
          {!editingPage && (
            <p style={{ color: '#666', fontSize: '13px', marginBottom: '15px', background: '#fff9c4', padding: '10px', borderRadius: '6px', border: '1px solid #fbc02d' }}>
              <strong>Note:</strong> To update the existing default page, please click the <strong>Edit</strong> button in the table below instead of "Add New Page".
            </p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="admin-ebook-grid">
              <div className="admin-ebook-field">
                <label className="admin-ebook-label">Landing Page Template</label>
                <select
                  name="template_type"
                  value={formData.template_type}
                  onChange={(event) => setFormData((previous) => ({ ...previous, template_type: event.target.value as 'ebook' | 'webinar' }))}
                  className="admin-ebook-input"
                >
                  <option value="ebook">E-Book</option>
                  <option value="webinar">Webinar</option>
                </select>
                <small style={{ color: '#667', display: 'block', marginTop: '5px' }}>
                  Webinar pages use the event hero, registration form, and speaker layout.
                </small>
              </div>
              <div className="admin-ebook-field">
                <label className="admin-ebook-label">Slug (Unique ID)</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  className="admin-ebook-input"
                  required
                />
              </div>
              <div className="admin-ebook-field">
                <label className="admin-ebook-label">Page Title</label>
                <input
                  type="text"
                  name="title"
                  value={extractPlainTextFromHtml(formData.title)}
                  onChange={(e) => {
                    const updatedData: any = { title: e.target.value }
                    // Auto-generate slug from title when title changes and not editing
                    if (!editingPage) {
                      updatedData.slug = generateSlugFromText(e.target.value)
                    }
                    setFormData(prev => ({ ...prev, ...updatedData }))
                  }}
                  className="admin-ebook-input"
                  placeholder="Page title"
                  required
                />
              </div>
              <div className="admin-ebook-field admin-ebook-grid-full">
                <label className="admin-ebook-label">Headline</label>
                {isClient && (
                  <ReactQuill
                    key={`headline-${editingPage?.id || 'new'}`}
                    theme="snow"
                    value={formData.headline}
                    onChange={(content) => setFormData(prev => ({ ...prev, headline: content }))}
                    modules={quillModules}
                    formats={formats}
                    placeholder="Main headline for the hero section"
                  />
                )}
              </div>
              <div className="admin-ebook-field admin-ebook-grid-full">
                <label className="admin-ebook-label">Sub-headline</label>
                {isClient && (
                  <ReactQuill
                    key={`subheadline-${editingPage?.id || 'new'}`}
                    theme="snow"
                    value={formData.subheadline}
                    onChange={(content) => setFormData(prev => ({ ...prev, subheadline: content }))}
                    modules={quillModules}
                    formats={formats}
                    placeholder="Supporting text below headline"
                  />
                )}
              </div>
              <div className="admin-ebook-field admin-ebook-grid-full">
                <label className="admin-ebook-label">Additional Paragraph (Optional)</label>
                {isClient && (
                  <ReactQuill
                    key={`additional-${editingPage?.id || 'new'}`}
                    theme="snow"
                    value={formData.additional_paragraph}
                    onChange={(content) => setFormData(prev => ({ ...prev, additional_paragraph: content }))}
                    modules={quillModules}
                    formats={formats}
                    placeholder="Extra paragraph to display below sub-headline"
                  />
                )}
              </div>
              <div className="admin-ebook-field">
                <label className="admin-ebook-label">{formData.template_type === 'webinar' ? 'Partner Names / Logos Text (separate with ·)' : 'Logo Text'}</label>
                <input
                  type="text"
                  name="logo_text"
                  value={formData.logo_text}
                  onChange={handleInputChange}
                  className="admin-ebook-input"
                  placeholder={formData.template_type === 'webinar' ? 'RheinBrücke · compliance.io · AMA Global' : 'Text inside logo circle'}
                />
              </div>
              <div className="admin-ebook-field">
                <label className="admin-ebook-label">{formData.template_type === 'webinar' ? 'Partner Logos Image (Optional - combined logos strip)' : 'Logo Image (Optional - overrides text)'}</label>
                <input
                  type="text"
                  name="logo_image_url"
                  value={formData.logo_image_url}
                  onChange={handleInputChange}
                  className="admin-ebook-input"
                  placeholder={formData.template_type === 'webinar' ? 'Upload combined partner logos strip image' : 'https://.../logo.webp'}
                />
                {formData.logo_image_url && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', gap: '8px' }}>
                    <p className="text-xs text-green-600">Current: {formData.logo_image_url.split('/').pop()}</p>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                     
                      <button
                        type="button"
                        style={{
                          padding: '4px 8px',
                          background: '#fee',
                          color: '#dc2626',
                          border: 'none',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                        onClick={() => setFormData(prev => ({ ...prev, logo_image_url: '' }))}
                      >
                        X
                      </button>
                    </div>
                  </div>
                )}
                {!formData.logo_image_url && (
                  <div style={{ marginTop: '8px' }}>
                    <input
                      type="file"
                      onChange={(e) => handleFileUpload(e, 'logo_image_url')}
                      className="admin-ebook-input"
                      accept="image/*"
                    />
                  </div>
                )}
              </div>
              <div className="admin-ebook-field">
                <label className="admin-ebook-label">{formData.template_type === 'webinar' ? 'Webinar Hero Banner Image' : 'Book Image'}</label>
                {formData.template_type === 'webinar' && <small style={{ display: 'block', marginBottom: '8px', color: '#667' }}>Upload the complete hero banner image (logos + headline + illustration combined in one image).</small>}
                <input
                  type="text"
                  name="book_image_url"
                  value={formData.book_image_url}
                  onChange={handleInputChange}
                  className="admin-ebook-input"
                  placeholder={formData.template_type === 'webinar' ? 'Upload or paste the complete banner image URL' : '/images/book.webp'}
                />
                {formData.book_image_url && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', gap: '8px' }}>
                    <p className="text-xs text-green-600">Current: {formData.book_image_url.split('/').pop()}</p>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      {formData.book_image_url.startsWith('http') && (
                        <img
                          src={formData.book_image_url}
                          alt="Banner preview"
                          style={{ maxWidth: '180px', maxHeight: '100px', border: '1px solid #ddd', borderRadius: '4px', objectFit: 'cover' }}
                        />
                      )}
                      <button
                        type="button"
                        style={{
                          padding: '4px 8px',
                          background: '#fee',
                          color: '#dc2626',
                          border: 'none',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                        onClick={() => setFormData(prev => ({ ...prev, book_image_url: '' }))}
                      >
                        X
                      </button>
                    </div>
                  </div>
                )}
                {!formData.book_image_url && (
                  <div style={{ marginTop: '8px' }}>
                    <input
                      type="file"
                      onChange={(e) => handleFileUpload(e, 'book_image_url')}
                      className="admin-ebook-input"
                      accept="image/*"
                    />
                  </div>
                )}
              </div>
              {formData.template_type === 'ebook' && <div className="admin-ebook-field">
                <label className="admin-ebook-label">E-Book PDF</label>
                <input
                  type="text"
                  name="pdf_url"
                  value={formData.pdf_url}
                  onChange={handleInputChange}
                  className="admin-ebook-input"
                  placeholder="https://.../ebook.pdf"
                />
                {formData.pdf_url && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', gap: '8px' }}>
                    <p className="text-xs text-green-600">Current: {formData.pdf_url.split('/').pop()}</p>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      {/* <label
                        style={{
                          padding: '4px 8px',
                          background: '#e0f2fe',
                          color: '#0369a1',
                          border: 'none',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        Upload New
                        <input
                          type="file"
                          style={{ display: 'none' }}
                          onChange={(e) => handleFileUpload(e, 'pdf_url')}
                          accept=".pdf"
                        />
                      </label> */}
                      <button
                        type="button"
                        style={{
                          padding: '4px 8px',
                          background: '#fee',
                          color: '#dc2626',
                          border: 'none',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                        onClick={() => setFormData(prev => ({ ...prev, pdf_url: '' }))}
                      >
                        X
                      </button>
                    </div>
                  </div>
                )}
                {!formData.pdf_url && (
                  <div style={{ marginTop: '8px' }}>
                    <input
                      type="file"
                      onChange={(e) => handleFileUpload(e, 'pdf_url')}
                      className="admin-ebook-input"
                      accept=".pdf"
                    />
                  </div>
                )}
              </div>}
              <div className="admin-ebook-field admin-ebook-grid-full">
                <label className="admin-ebook-label">{formData.template_type === 'webinar' ? 'Session Intro Heading' : 'Learning Title'}</label>
                {isClient && (
                  <ReactQuill
                    key={`learning-title-${editingPage?.id || 'new'}`}
                    theme="snow"
                    value={formData.learning_title}
                    onChange={(content) => setFormData(prev => ({ ...prev, learning_title: content }))}
                    modules={quillModules}
                    formats={formats}
                    placeholder={formData.template_type === 'webinar' ? 'e.g. Webinar Registration' : "Title for what they'll learn section"}
                  />
                )}
              </div>
              <div className="admin-ebook-field admin-ebook-grid-full">
                <label className="admin-ebook-label">{formData.template_type === 'webinar' ? 'Session Introduction' : 'Learning Description'}</label>
                {isClient && (
                  <ReactQuill
                    key={`learning-desc-${editingPage?.id || 'new'}`}
                    theme="snow"
                    value={formData.learning_description}
                    onChange={(content) => setFormData(prev => ({ ...prev, learning_description: content }))}
                    modules={quillModules}
                    formats={formats}
                    placeholder="Description text for the learning section"
                  />
                )}
              </div>
              <div className="admin-ebook-field admin-ebook-grid-full">
                <label className="admin-ebook-label">Benefits Heading</label>
                {isClient && (
                  <ReactQuill
                    key={`benefits-heading-${editingPage?.id || 'new'}`}
                    theme="snow"
                    value={formData.benefits_heading}
                    onChange={(content) => setFormData(prev => ({ ...prev, benefits_heading: content }))}
                    modules={quillModules}
                    formats={formats}
                    placeholder="Heading for the benefits list"
                  />
                )}
              </div>
            </div>

            <h3 className="admin-ebook-section-title">{formData.template_type === 'webinar' ? 'Session Topics' : 'Benefits List'}</h3>
            <div className="admin-ebook-benefits-box">
              <div className="admin-ebook-benefits-header">
                <input
                  type="text"
                  value={newBenefit}
                  onChange={(e) => setNewBenefit(e.target.value)}
                  className="admin-ebook-benefits-input"
                  placeholder={formData.template_type === 'webinar' ? 'Add a session topic or key takeaway...' : 'Enter a benefit item...'}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleAddBenefit()
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddBenefit}
                  className="admin-ebook-btn-add"
                >
                  Add
                </button>
              </div>
              <ul className="admin-ebook-benefits-list">
                {formData.benefits.map((benefit, index) => (
                  <li key={index} className="admin-ebook-benefits-item">
                    <span className="admin-ebook-benefits-text">{benefit}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveBenefit(index)}
                      className="admin-ebook-btn-remove"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="admin-ebook-grid">
              <div className="admin-ebook-field admin-ebook-grid-full">
                <label className="admin-ebook-label">Form Title</label>
                {isClient && (
                  <ReactQuill
                    key={`form-title-${editingPage?.id || 'new'}`}
                    theme="snow"
                    value={formData.form_title}
                    onChange={(content) => setFormData(prev => ({ ...prev, form_title: content }))}
                    modules={quillModules}
                    formats={formats}
                    placeholder="Title above the download form"
                  />
                )}
              </div>
              <div className="admin-ebook-field">
                <label className="admin-ebook-label">Form Button Text</label>
                <input
                  type="text"
                  name="form_button_text"
                  value={formData.form_button_text}
                  onChange={handleInputChange}
                  className="admin-ebook-input"
                  placeholder="Download Now"
                />
              </div>
              {/* <div className="admin-ebook-field">
                <label className="admin-ebook-label">
                  Footer Color (Hex)
                  <span className="admin-ebook-color-preview" style={{ backgroundColor: formData.footer_color }}></span>
                </label>
                <input
                  type="text"
                  name="footer_color"
                  value={formData.footer_color}
                  onChange={handleInputChange}
                  className="admin-ebook-input"
                  placeholder="#3aaee0"
                />
              </div> */}
            </div>

            <h3 className="admin-ebook-section-title">{formData.template_type === 'webinar' ? 'Registration Fields (Dynamic)' : 'Form Fields (Dynamic)'}</h3>
            <div className="admin-ebook-benefits-box">
              <div className="admin-ebook-benefits-header">
                <input
                  type="text"
                  value={newFormField.id}
                  onChange={(e) => setNewFormField(prev => ({ ...prev, id: e.target.value }))}
                  className="admin-ebook-benefits-input"
                  placeholder="Field ID (e.g., 'name')"
                  style={{ flex: '0.5' }}
                />
                <select
                  value={newFormField.type}
                  onChange={(e) => setNewFormField(prev => ({
                    ...prev,
                    type: e.target.value as any
                  }))}
                  className="admin-ebook-input"
                  style={{ flex: '0.3' }}
                >
                  <option value="text">Text</option>
                  <option value="email">Email</option>
                  <option value="tel">Phone</option>
                  <option value="number">Number</option>
                  <option value="textarea">Textarea</option>
                  <option value="select">Dropdown</option>
                </select>
                <button
                  type="button"
                  onClick={handleAddFormField}
                  className="admin-ebook-btn-add"
                >
                  Add
                </button>
              </div>
              <ul className="admin-ebook-form-fields-list">
                {formData.form_fields.map((field, index) => (
                  <li key={index} className="admin-ebook-form-field-item">
                    <div className="admin-ebook-form-field-header">
                      <div>
                        <span style={{ color: '#666' }}> {field.id} </span>
                        <span className="admin-ebook-form-field-type"> {field.type}</span>
                        {field.required && <span style={{ color: '#dc2626', fontSize: '12px', marginLeft: '8px' }}>* Required</span>}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveFormField(index)}
                        className="admin-ebook-btn-remove"
                      >
                        Remove
                      </button>
                    </div>
                    {field.label && <div><span style={{ color: '#6666' }}>Label:</span> {field.label}</div>}
                    {field.placeholder && <div><span style={{ color: '#666' }}>Placeholder : </span> <span style={{ color: '#666' }}>{field.placeholder}</span></div>}
                    {field.options && field.options.length > 0 && (
                      <div><span style={{ color: '#666' }}>Options:</span> {field.options.join(', ')}</div>
                    )}
                  </li>
                ))}
              </ul>
            </div>


              <div className="admin-ebook-field admin-ebook-grid-full">
                <label className="admin-ebook-label">Extra Content (Optional)</label>
                {isClient && (
                  <ReactQuill
                    key={`extra-content-${editingPage?.id || 'new'}`}
                    theme="snow"
                    value={formData.extra_content}
                    onChange={(content) => setFormData(prev => ({ ...prev, extra_content: content }))}
                    modules={quillModules}
                    formats={formats}
                    placeholder="Extra rich content to display on the page"
                  />
                )}
              </div>
              
            <h3 className="admin-ebook-section-title">{formData.template_type === 'webinar' ? 'Speaker Information' : 'Speaker / Author Information'}</h3>
            <div className="admin-ebook-grid">
              <div className="admin-ebook-field admin-ebook-grid-full">
                <label className="admin-ebook-label">Section Heading (shows above the 2-column speaker list)</label>
                {isClient && (
                  <ReactQuill
                    key={`author-heading-${editingPage?.id || 'new'}`}
                    theme="snow"
                    value={formData.author_heading}
                    onChange={(content) => setFormData(prev => ({ ...prev, author_heading: content }))}
                    modules={quillModules}
                    formats={formats}
                    placeholder={formData.template_type === 'webinar' ? 'e.g., Meet the Speakers' : 'e.g., Speaker / About the Authors'}
                  />
                )}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px', marginBottom: '12px' }}>
              <button
                type="button"
                onClick={handleAddSpeaker}
                className="admin-ebook-btn-add"
                style={{ padding: '10px 18px', fontSize: '13px' }}
              >
                ➕ Add Speaker / Author
              </button>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                gap: '20px',
                marginTop: '8px',
                marginBottom: '16px',
              }}
              className="admin-speakers-grid"
            >
              {(formData.speakers ?? []).map((speaker, idx) => (
                <div
                  key={idx}
                  style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: '10px',
                    padding: '18px',
                    background: '#fafafa',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                  className="admin-speaker-card"
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                    <input
                      type="text"
                      value={speaker.label}
                      onChange={(e) => handleSpeakerChange(idx, 'label', e.target.value)}
                      className="admin-ebook-input"
                      placeholder="Label (e.g., Speaker, Moderator, Author)"
                      style={{ fontSize: '14px', fontWeight: 600 }}
                    />
                    {(formData.speakers?.length ?? 0) > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveSpeaker(idx)}
                        className="admin-ebook-btn-remove"
                        title={`Remove ${speaker.label || 'speaker'}`}
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: '16px', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: '128px',
                          height: '128px',
                          borderRadius: '50%',
                          border: '3px solid #2d3e50',
                          overflow: 'hidden',
                          background: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#9ca3af',
                          fontSize: '11px',
                          textAlign: 'center',
                          padding: '6px',
                        }}
                      >
                        {speaker.avatar_svg ? (
                          <div
                            style={{ width: '100%', height: '100%' }}
                            dangerouslySetInnerHTML={{ __html: speaker.avatar_svg }}
                          />
                        ) : speaker.avatar_url ? (
                          <img
                            src={speaker.avatar_url}
                            alt={speaker.name || `speaker-${idx}`}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        ) : (
                          <span>No avatar<br />uploaded</span>
                        )}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
                        <input
                          type="file"
                          onChange={(e) => handleFileUpload(e, 'avatar_url', idx)}
                          className="admin-ebook-input"
                          accept="image/*"
                          style={{ fontSize: '11px', padding: '4px' }}
                        />
                        {speaker.avatar_url && (
                          <p style={{ fontSize: '10px', color: '#059669', wordBreak: 'break-all' }}>
                            ✓ {speaker.avatar_url.split('/').pop()}
                          </p>
                        )}
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div className="admin-ebook-field" style={{ margin: 0 }}>
                        <label className="admin-ebook-label" style={{ fontSize: '12px' }}>Full Name</label>
                        <input
                          type="text"
                          value={speaker.name}
                          onChange={(e) => handleSpeakerChange(idx, 'name', e.target.value)}
                          className="admin-ebook-input"
                          placeholder="Hari Krishnan"
                        />
                      </div>
                      <div className="admin-ebook-field" style={{ margin: 0 }}>
                        <label className="admin-ebook-label" style={{ fontSize: '12px' }}>Role / Title</label>
                        <input
                          type="text"
                          value={speaker.role}
                          onChange={(e) => handleSpeakerChange(idx, 'role', e.target.value)}
                          className="admin-ebook-input"
                          placeholder="Co-Founder & CEO, Company"
                        />
                      </div>
                      <div className="admin-ebook-field" style={{ margin: 0 }}>
                        <label className="admin-ebook-label" style={{ fontSize: '12px' }}>LinkedIn Profile URL</label>
                        <input
                          type="text"
                          value={speaker.linkedin_url}
                          onChange={(e) => handleSpeakerChange(idx, 'linkedin_url', e.target.value)}
                          className="admin-ebook-input"
                          placeholder="https://www.linkedin.com/in/..."
                        />
                      </div>
                      <div className="admin-ebook-field" style={{ margin: 0 }}>
                        <label className="admin-ebook-label" style={{ fontSize: '12px' }}>Avatar URL (overrides upload)</label>
                        <input
                          type="text"
                          value={speaker.avatar_url}
                          onChange={(e) => handleSpeakerChange(idx, 'avatar_url', e.target.value)}
                          className="admin-ebook-input"
                          placeholder="https://..."
                        />
                      </div>
                    </div>
                  </div>

                  <div className="admin-ebook-field" style={{ margin: 0 }}>
                    <label className="admin-ebook-label" style={{ fontSize: '12px' }}>Short Bio</label>
                    {isClient && (
                      <ReactQuill
                        key={`speaker-${editingPage?.id || 'new'}-bio-${idx}`}
                        theme="snow"
                        value={speaker.bio}
                        onChange={(content) => handleSpeakerChange(idx, 'bio', content)}
                        modules={quillModules}
                        formats={formats}
                        placeholder="1-2 line biography of the speaker/author"
                      />
                    )}
                  </div>

                  <div className="admin-ebook-field" style={{ margin: 0 }}>
                    <label className="admin-ebook-label" style={{ fontSize: '12px' }}>Avatar SVG (optional, overrides URL/upload)</label>
                    <textarea
                      value={speaker.avatar_svg}
                      onChange={(e) => handleSpeakerChange(idx, 'avatar_svg', e.target.value)}
                      className="admin-ebook-textarea"
                      rows={3}
                      placeholder="<svg viewBox=...>...</svg>"
                      style={{ fontFamily: 'helvetica-neue-lt-pro', fontSize: '11px' }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="admin-ebook-form-actions">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false)
                  setEditingPage(null)
                }}
                className="admin-ebook-btn-cancel"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="admin-ebook-btn-submit"
              >
                {loading ? 'Saving...' : (editingPage ? 'Update Page' : 'Create Page')}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="admin-ebook-table-card">
        <table className="admin-ebook-table">
          <thead>
            <tr>
              <th>Template</th>
              <th>Slug</th>
              <th>Title</th>
              <th>Speakers / Author</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pages.map((page) => (
              <tr key={page.id}>
                <td>{page.template_type === 'webinar' ? 'Webinar' : 'E-Book'}</td>
                <td className="admin-ebook-slug">{page.slug}</td>
                <td className="admin-ebook-title-cell">
                  <Link href={getPreviewPath(page)} target="_blank">
                    {extractPlainTextFromHtml(page.title)}
                  </Link>
                </td>
                <td className="admin-ebook-author-cell">
                  {(Array.isArray(page.speakers) && page.speakers.length > 0)
                    ? page.speakers.filter(s => s && s.name).map(s => s.name).join(' · ') || '—'
                    : page.author_name || '—'}
                </td>
                <td>
                  <div className="admin-ebook-actions">
                    <Link
                      href={getPreviewPath(page)}
                      target="_blank"
                      className="admin-ebook-btn-preview"
                      style={{ textDecoration: 'none' }}
                    >
                      Preview
                    </Link>
                    <button
                      onClick={() => handleEdit(page)}
                      className="admin-ebook-btn-edit"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(page.id)}
                      className="admin-ebook-btn-delete"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {pages.length === 0 && (
              <tr>
                <td colSpan={5} className="admin-ebook-empty">
                  No landing pages found. Create your first eBook or webinar page above!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Alt Text Modal for Quill Image Uploads */}
      <EbookAltTextModal />
    </div>
  )
}
