'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase-browser'

export interface QuillImageUploadConfig {
  storageBucket: string
  folderPath: string
  fileNamePrefix: string
  maxFileSizeMB?: number
}

export interface QuillImageUploadHandlers {
  AltTextModal: React.FC
  handleToolbarImageClick: () => void
  setupEditorListeners: (editorSelector?: string) => () => void
}

let QUIILL_ALT_PATCHED = false

async function ensureQuillImageAltPatch(): Promise<void> {
  if (QUIILL_ALT_PATCHED) return
  try {
    const QuillMod = await import('quill')
    const Quill = QuillMod.default || (QuillMod as any)
    const globalQuill = (typeof window !== 'undefined' && (window as any).Quill) || null
    const QuillToPatch = Quill || globalQuill
    
    if (!QuillToPatch) {
      QUIILL_ALT_PATCHED = true
      return
    }
    
    const imagePaths = [
      'formats/image',
      'blots/image',
      'formats/picture',
      'blots/picture'
    ]
    
    let ImageBlot: any = null
    for (const path of imagePaths) {
      try {
        ImageBlot = QuillToPatch.import?.(path)
        if (ImageBlot) break
      } catch (e) {
        // continue trying other paths
      }
    }
    
    if (!ImageBlot) {
      QUIILL_ALT_PATCHED = true
      return
    }

    if (ImageBlot && !ImageBlot.__altPatchedRheincs) {
      const OrigCreate = ImageBlot.create
      ImageBlot.create = function(value: any) {
        let src: string = value
        let alt: string | null = null
        if (typeof value === 'object' && value !== null) {
          src = value.src || ''
          alt = value.alt || null
        }
        const node = OrigCreate ? OrigCreate.call(this, src) : document.createElement('img')
        if (src) node.setAttribute('src', src)
        if (alt) node.setAttribute('alt', alt)
        return node
      }
      const OrigFormats = ImageBlot.formats
      ImageBlot.formats = function(domNode: HTMLElement) {
        const existing = typeof OrigFormats === 'function' ? OrigFormats(domNode) : undefined
        const formatsObj = (existing && typeof existing === 'object' ? { ...existing } : {})
        if (domNode.hasAttribute('alt')) {
          formatsObj.alt = domNode.getAttribute('alt')
        }
        return Object.keys(formatsObj).length > 0 ? formatsObj : undefined
      }
      const OrigFormatProto = ImageBlot.prototype?.format
      if (OrigFormatProto || ImageBlot.prototype) {
        ImageBlot.prototype.format = function(name: string, value: any) {
          if (name === 'alt') {
            if (value == null || value === false || value === '') {
              this.domNode?.removeAttribute?.('alt')
            } else {
              this.domNode?.setAttribute?.('alt', String(value))
            }
            return
          }
          return OrigFormatProto?.call?.(this, name, value)
        }
      }
      const OrigValue = ImageBlot.value
      ImageBlot.value = function(domNode: HTMLElement) {
        const baseVal = OrigValue?.call?.(this, domNode) ?? domNode.getAttribute('src') ?? ''
        return baseVal
      }
      ImageBlot.__altPatchedRheincs = true
      
      try {
        QuillToPatch.register?.(ImageBlot, true)
      } catch (e) {
        // Registration may not be needed in all Quill versions
      }
      console.log('[QuillAltText] Image blot patched to support alt attribute')
    }
    QUIILL_ALT_PATCHED = true
  } catch (err) {
    console.warn('[QuillAltText] Failed to patch Image blot, alt still applied via DOM post-process', err)
    QUIILL_ALT_PATCHED = true
  }
}

export function useQuillImageUpload(config: QuillImageUploadConfig): QuillImageUploadHandlers {
  const {
    storageBucket,
    folderPath,
    fileNamePrefix,
    maxFileSizeMB = 5
  } = config

  const supabase = createClient()
  const [modalOpen, setModalOpen] = useState(false)
  const [pendingImageUrl, setPendingImageUrl] = useState<string | null>(null)
  const [pendingInsertIndex, setPendingInsertIndex] = useState<number | null>(null)
  const [altText, setAltText] = useState('')
  const [uploading, setUploading] = useState(false)
  const cleanupListenersRef = useRef<(() => void) | null>(null)
  const quillInstanceRef = useRef<any>(null)
  const lastFocusedQuillRef = useRef<any>(null)
  const pendingEditorSelectorRef = useRef<string | undefined>(undefined)
  const altTextAreaRef = useRef<HTMLTextAreaElement | null>(null)
  const modalOpenRef = useRef(modalOpen)
  const pendingImageUrlRef = useRef<string | null>(pendingImageUrl)
  const pendingInsertIndexRef = useRef<number | null>(pendingInsertIndex)
  const altTextRef = useRef(altText)
  const uploadingRef = useRef(uploading)

  modalOpenRef.current = modalOpen
  pendingImageUrlRef.current = pendingImageUrl
  pendingInsertIndexRef.current = pendingInsertIndex
  altTextRef.current = altText
  uploadingRef.current = uploading

  useEffect(() => {
    ensureQuillImageAltPatch()
  }, [])

  // Focus alt text textarea when modal opens and set caret to end
  useEffect(() => {
    if (modalOpen && altTextAreaRef.current) {
      // Use setTimeout to ensure DOM is ready after modal render
      const timer = setTimeout(() => {
        const textarea = altTextAreaRef.current
        if (textarea) {
          textarea.focus()
          // Place caret at end of text
          const length = textarea.value.length
          try {
            textarea.setSelectionRange(length, length)
          } catch (e) {
            // Fallback for older browsers
            textarea.value = textarea.value
          }
        }
      }, 50)
      return () => clearTimeout(timer)
    }
  }, [modalOpen])

  const getQuillInstance = useCallback((editorSelector?: string) => {
    const useSelector = editorSelector || pendingEditorSelectorRef.current
    if (useSelector) {
      const editorElement = document.querySelector(useSelector) as any
      if (editorElement?.__quill) {
        lastFocusedQuillRef.current = editorElement.__quill
        return editorElement.__quill
      }
      if (typeof window !== 'undefined' && (window as any).Quill?.find) {
        try {
          const found = (window as any).Quill.find(editorElement)
          if (found) {
            lastFocusedQuillRef.current = found
            return found
          }
        } catch {}
      }
      // Also check parent containers for react-quill-new structure
      if (editorElement?.parentElement?.parentElement?.parentElement?.quill) {
        lastFocusedQuillRef.current = editorElement.parentElement.parentElement.parentElement.quill
        return lastFocusedQuillRef.current
      }
    }
    if (lastFocusedQuillRef.current) {
      try {
        if (lastFocusedQuillRef.current?.root?.isConnected) {
          return lastFocusedQuillRef.current
        }
      } catch {}
      lastFocusedQuillRef.current = null
    }
    const allEditors = document.querySelectorAll('.ql-editor')
    for (let i = 0; i < allEditors.length; i++) {
      const ed = allEditors[i] as any
      if (ed.__quill) {
        lastFocusedQuillRef.current = ed.__quill
        return ed.__quill
      }
      // Check parent chain for react-quill-new structure
      let parent: any = ed.parentElement
      while (parent && parent !== document.body) {
        if (parent.quill) {
          lastFocusedQuillRef.current = parent.quill
          return parent.quill
        }
        parent = parent.parentElement
      }
    }
    return null
  }, [])

  const uploadFile = useCallback(async (file: File): Promise<{ publicUrl: string } | null> => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return null
    }
    if (file.size > maxFileSizeMB * 1024 * 1024) {
      alert(`Image size should be less than ${maxFileSizeMB}MB`)
      return null
    }
    try {
      setUploading(true)
      const fileExt = file.name.split('.').pop() || 'png'
      const fileName = `${fileNamePrefix}-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `${folderPath.replace(/\/$/, '')}/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from(storageBucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) throw uploadError

      const { data } = supabase.storage
        .from(storageBucket)
        .getPublicUrl(filePath)

      return { publicUrl: data.publicUrl }
    } catch (error: any) {
      console.error('Upload error:', error)
      alert('Error uploading image: ' + error.message)
      return null
    } finally {
      setUploading(false)
    }
  }, [storageBucket, folderPath, fileNamePrefix, maxFileSizeMB, supabase])

  const insertImageWithAlt = useCallback((imageUrl: string, alt: string, insertIndex?: number) => {
    try {
      const quill = getQuillInstance()
      if (!quill) {
        console.warn('Quill editor instance not found, falling back to DOM insertion')

        const editorRoot = document.querySelector('.ql-editor') as HTMLElement | null
        if (editorRoot) {
          const img = document.createElement('img')
          img.src = imageUrl
          if (alt) img.alt = alt
          img.style.maxWidth = '100%'
          img.style.height = 'auto'
          img.style.display = 'block'
          editorRoot.appendChild(img)
          return
        }

        const sel = window.getSelection()
        if (sel && sel.rangeCount > 0) {
          const range = sel.getRangeAt(0)
          const img = document.createElement('img')
          img.src = imageUrl
          if (alt) img.alt = alt
          img.style.maxWidth = '100%'
          img.style.height = 'auto'
          img.style.display = 'block'
          range.deleteContents()
          range.insertNode(img)
          range.setStartAfter(img)
          range.setEndAfter(img)
          sel.removeAllRanges()
          sel.addRange(range)
        }
        return
      }

      const range = quill.getSelection(true)
      const index = typeof insertIndex === 'number' ? insertIndex : (range?.index ?? quill.getLength())
      const safeIndex = Math.max(0, Math.min(index, quill.getLength()))

      if (typeof quill.focus === 'function') {
        quill.focus()
      }
      quill.setSelection(safeIndex, 0, 'silent')
      quill.insertEmbed(safeIndex, 'image', imageUrl, 'user')
      quill.setSelection(safeIndex + 1, 0, 'silent')

      setTimeout(() => {
        try {
          const imgs = quill.root.querySelectorAll('img')
          for (let i = imgs.length - 1; i >= 0; i--) {
            const img = imgs[i]
            if (img.getAttribute('src') === imageUrl) {
              if (alt) img.setAttribute('alt', alt)
              break
            }
          }
        } catch (e) {
          console.error('[QuillAltText] Failed to set image alt:', e)
        }
      }, 0)
    } catch (err: any) {
      console.error('[QuillAltText] Failed to insert image:', err)
      alert('Failed to insert image into editor: ' + (err?.message || 'Unknown error'))
    }
  }, [getQuillInstance])

  const handleFile = useCallback(async (file: File) => {
    try {
      const quill = getQuillInstance()
      const insertIndex = quill?.getSelection?.()?.index ?? null
      if (typeof insertIndex === 'number') {
        setPendingInsertIndex(insertIndex)
      } else {
        setPendingInsertIndex(null)
      }

      // Validate file before upload
      if (!file || !file.type.startsWith('image/')) {
        alert('Please select a valid image file')
        return
      }
      if (file.size > (maxFileSizeMB || 5) * 1024 * 1024) {
        alert(`Image size should be less than ${maxFileSizeMB || 5}MB`)
        return
      }

      const result = await uploadFile(file)
      if (result && result.publicUrl) {
        setPendingImageUrl(result.publicUrl)
        setAltText('')
        setModalOpen(true)
      } else {
        console.warn('[QuillAltText] Upload returned no result')
      }
    } catch (err: any) {
      console.error('[QuillAltText] Error processing file:', err)
      alert('Failed to process image: ' + (err?.message || 'Unknown error'))
    }
  }, [uploadFile, getQuillInstance, maxFileSizeMB])

  const handleToolbarImageClick = useCallback(() => {
    try {
      const input = document.createElement('input')
      input.setAttribute('type', 'file')
      input.setAttribute('accept', 'image/*')
      input.click()
      input.onchange = () => {
        const file = input.files?.[0]
        if (file) handleFile(file)
      }
      input.onerror = () => {
        console.error('[QuillAltText] File picker error')
        alert('Failed to open file picker')
      }
    } catch (err: any) {
      console.error('[QuillAltText] Toolbar image click error:', err)
      alert('Failed to open image picker: ' + (err?.message || 'Unknown error'))
    }
  }, [handleFile])

  const saveAltText = useCallback(() => {
    const imageUrl = pendingImageUrlRef.current
    const insertIndex = pendingInsertIndexRef.current ?? undefined
    const alt = altTextRef.current.trim()
    if (imageUrl) {
      insertImageWithAlt(imageUrl, alt, insertIndex)
    }
    setModalOpen(false)
    setPendingImageUrl(null)
    setPendingInsertIndex(null)
    setAltText('')
  }, [insertImageWithAlt])

  const cancelAltText = useCallback(() => {
    setModalOpen(false)
    setPendingImageUrl(null)
    setPendingInsertIndex(null)
    setAltText('')
  }, [])

  const skipAltText = useCallback(() => {
    const imageUrl = pendingImageUrlRef.current
    const insertIndex = pendingInsertIndexRef.current ?? undefined
    if (imageUrl) {
      insertImageWithAlt(imageUrl, '', insertIndex)
    }
    setModalOpen(false)
    setPendingImageUrl(null)
    setPendingInsertIndex(null)
    setAltText('')
  }, [insertImageWithAlt])

  const setupEditorListeners = useCallback((editorSelector?: string) => {
    const attachListeners = () => {
      const quill = getQuillInstance(editorSelector)
      if (!quill || !quill.root) return null

      const handlePaste = (e: ClipboardEvent) => {
        try {
          const items = e.clipboardData?.items
          if (!items) return
          for (let i = 0; i < items.length; i++) {
            const item = items[i]
            if (item.type.startsWith('image/')) {
              e.preventDefault()
              e.stopPropagation()
              const file = item.getAsFile()
              if (file) handleFile(file)
              break
            }
          }
        } catch (err: any) {
          console.error('[QuillAltText] Paste handler error:', err)
        }
      }

      const handleDrop = (e: DragEvent) => {
        try {
          const files = e.dataTransfer?.files
          if (!files || files.length === 0) return
          const imageFile = Array.from(files).find(f => f.type.startsWith('image/'))
          if (imageFile) {
            e.preventDefault()
            e.stopPropagation()
            handleFile(imageFile)
          }
        } catch (err: any) {
          console.error('[QuillAltText] Drop handler error:', err)
        }
      }

      const handleDragOver = (e: DragEvent) => {
        try {
          const dt = e.dataTransfer
          const types = dt ? Array.from(dt.types || []) : []
          const hasImage = types.includes('Files')
          if (hasImage && dt) {
            e.preventDefault()
            dt.dropEffect = 'copy'
          }
        } catch (err: any) {
          // Silently fail
        }
      }

      quill.root.addEventListener('paste', handlePaste as any, true)
      quill.root.addEventListener('drop', handleDrop as any, true)
      quill.root.addEventListener('dragover', handleDragOver as any, true)

      return () => {
        quill.root.removeEventListener('paste', handlePaste as any, true)
        quill.root.removeEventListener('drop', handleDrop as any, true)
        quill.root.removeEventListener('dragover', handleDragOver as any, true)
      }
    }

    let retryCount = 0
    const maxRetries = 30
    let cleanup: (() => void) | null = null
    let intervalId: ReturnType<typeof setInterval> | null = null

    const tryAttach = () => {
      const res = attachListeners()
      cleanup = res ?? null
      if (cleanup || retryCount >= maxRetries) {
        if (intervalId) clearInterval(intervalId)
        return !!cleanup
      }
      retryCount++
      return false
    }

    if (!tryAttach()) {
      intervalId = setInterval(() => {
        if (tryAttach() && intervalId) {
          clearInterval(intervalId)
        }
      }, 150)
    }

    const fullCleanup = () => {
      if (intervalId) clearInterval(intervalId)
      if (cleanup) cleanup()
      quillInstanceRef.current = null
    }
    cleanupListenersRef.current = fullCleanup
    return fullCleanup
  }, [getQuillInstance, handleFile])

  useEffect(() => {
    return () => {
      if (cleanupListenersRef.current) {
        cleanupListenersRef.current()
      }
    }
  }, [])

  const AltTextModal: React.FC = useCallback(() => {
    if (!modalOpenRef.current) return null
    const currentAltText = altTextRef.current
    const currentPendingImageUrl = pendingImageUrlRef.current
    const currentUploading = uploadingRef.current

    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999999,
          padding: '20px'
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) cancelAltText()
        }}
      >
        <div
          style={{
            background: '#fff',
            borderRadius: '12px',
            padding: '28px',
            width: '100%',
            maxWidth: '520px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            animation: 'quillAltFadeIn 0.15s ease-out'
          }}
        >
          <h3
            style={{
              margin: '0 0 16px 0',
              fontSize: '20px',
              fontWeight: '700',
              color: '#1f2937',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <span style={{ fontSize: '22px' }}>&#128444;&#65039;</span>
            Add Image Alt Text
            <span
              style={{
                marginLeft: 'auto',
                fontSize: '11px',
                fontWeight: '500',
                color: '#10b981',
                background: '#d1fae5',
                padding: '4px 10px',
                borderRadius: '20px'
              }}
            >
              SEO Friendly
            </span>
          </h3>

          {currentPendingImageUrl && (
            <div
              style={{
                marginBottom: '18px',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '2px solid #e5e7eb',
                background: '#f9fafb'
              }}
            >
              <img
                src={currentPendingImageUrl}
                alt="Preview"
                style={{
                  width: '100%',
                  maxHeight: '220px',
                  objectFit: 'contain',
                  display: 'block',
                  background: '#fff'
                }}
              />
            </div>
          )}

          <div style={{ marginBottom: '18px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '7px',
                fontWeight: '600',
                color: '#374151',
                fontSize: '14px'
              }}
              htmlFor="quill-alt-input"
            >
              Alt Text <span style={{ color: '#6b7280', fontWeight: '400' }}>(Describe the image for accessibility &amp; SEO)</span>
            </label>
            <textarea
              id="quill-alt-input"
              ref={altTextAreaRef}
              value={currentAltText}
              onChange={(e) => {
                const newValue = e.target.value
                altTextRef.current = newValue
                setAltText(newValue)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  saveAltText()
                } else if (e.key === 'Escape') {
                  e.preventDefault()
                  cancelAltText()
                }
              }}
              rows={2}
              placeholder="e.g. Dashboard showing quarterly sales metrics with blue chart"
              style={{
                width: '100%',
                padding: '11px 14px',
                border: '2px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                color: '#111827',
                resize: 'vertical',
                outline: 'none',
                transition: 'border-color 0.15s',
                fontFamily: 'inherit',
                lineHeight: '1.5'
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#667eea')}
              onBlur={(e) => (e.currentTarget.style.borderColor = '#d1d5db')}
            />
            <div
              style={{
                marginTop: '8px',
                fontSize: '12px',
                color: '#6b7280',
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <span>Tip: Be descriptive but under ~125 chars</span>
              <span style={{ color: currentAltText.length > 125 ? '#ef4444' : '#9ca3af' }}>
                {currentAltText.length} chars
              </span>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'flex-end'
            }}
          >
            <button
              type="button"
              onClick={skipAltText}
              style={{
                padding: '10px 22px',
                background: '#f3f4f6',
                color: '#4b5563',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background 0.15s'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#e5e7eb')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#f3f4f6')}
            >
              Insert without Alt Text
            </button>
            <button
              type="button"
              onClick={saveAltText}
              disabled={currentUploading}
              style={{
                padding: '10px 26px',
                background: currentUploading ? '#a5b4fc' : '#667eea',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: currentUploading ? 'not-allowed' : 'pointer',
                transition: 'background 0.15s',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => {
                if (!currentUploading) e.currentTarget.style.background = '#5568d3'
              }}
              onMouseLeave={(e) => {
                if (!currentUploading) e.currentTarget.style.background = '#667eea'
              }}
            >
              {currentUploading ? 'Uploading...' : 'Insert Image'}
            </button>
          </div>
        </div>
        <style>{`
          @keyframes quillAltFadeIn {
            from { opacity: 0; transform: scale(0.96) translateY(6px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
        `}</style>
      </div>
    )
  }, [cancelAltText, saveAltText, skipAltText])

  return {
    AltTextModal,
    handleToolbarImageClick,
    setupEditorListeners
  }
}
