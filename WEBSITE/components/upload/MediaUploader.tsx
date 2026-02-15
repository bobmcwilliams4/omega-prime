'use client'

import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { storage, db } from '@/lib/firebase/config'
import { cn } from '@/lib/utils'

interface UploadedFile {
  id: string
  name: string
  url: string
  type: 'image' | 'video'
  size: number
  uploadedAt: Date
}

interface MediaUploaderProps {
  onUploadComplete?: (files: UploadedFile[]) => void
  maxFiles?: number
  acceptedTypes?: string[]
}

export default function MediaUploader({
  onUploadComplete,
  maxFiles = 10,
  acceptedTypes = ['image/*', 'video/*'],
}: MediaUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({})
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const validateFile = (file: File): boolean => {
    const maxSize = 100 * 1024 * 1024 // 100MB
    if (file.size > maxSize) {
      setError(`File ${file.name} exceeds 100MB limit`)
      return false
    }
    const isImage = file.type.startsWith('image/')
    const isVideo = file.type.startsWith('video/')
    if (!isImage && !isVideo) {
      setError(`File ${file.name} is not a supported format`)
      return false
    }
    return true
  }

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      setError(null)

      const droppedFiles = Array.from(e.dataTransfer.files)
      const validFiles = droppedFiles.filter(validateFile)

      if (files.length + validFiles.length > maxFiles) {
        setError(`Maximum ${maxFiles} files allowed`)
        return
      }

      setFiles((prev) => [...prev, ...validFiles])
    },
    [files.length, maxFiles]
  )

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null)
    const selectedFiles = Array.from(e.target.files || [])
    const validFiles = selectedFiles.filter(validateFile)

    if (files.length + validFiles.length > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed`)
      return
    }

    setFiles((prev) => [...prev, ...validFiles])
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const uploadFiles = async () => {
    if (files.length === 0) return
    setIsUploading(true)
    setError(null)

    const uploaded: UploadedFile[] = []

    for (const file of files) {
      try {
        const fileType = file.type.startsWith('image/') ? 'images' : 'videos'
        const timestamp = Date.now()
        const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
        const storagePath = `production-studio/${fileType}/${timestamp}_${safeName}`
        const storageRef = ref(storage, storagePath)

        const uploadTask = uploadBytesResumable(storageRef, file)

        await new Promise<void>((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              setUploadProgress((prev) => ({ ...prev, [file.name]: progress }))
            },
            (error) => reject(error),
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)

              // Save metadata to Firestore
              const docRef = await addDoc(collection(db, 'production-studio-uploads'), {
                name: file.name,
                url: downloadURL,
                type: file.type.startsWith('image/') ? 'image' : 'video',
                size: file.size,
                storagePath,
                uploadedAt: serverTimestamp(),
              })

              uploaded.push({
                id: docRef.id,
                name: file.name,
                url: downloadURL,
                type: file.type.startsWith('image/') ? 'image' : 'video',
                size: file.size,
                uploadedAt: new Date(),
              })

              resolve()
            }
          )
        })
      } catch (err) {
        console.error('Upload error:', err)
        setError(`Failed to upload ${file.name}`)
      }
    }

    setUploadedFiles((prev) => [...prev, ...uploaded])
    setFiles([])
    setUploadProgress({})
    setIsUploading(false)
    onUploadComplete?.(uploaded)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <div className="w-full">
      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          'relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300',
          isDragging
            ? 'border-cyan bg-cyan/10 scale-[1.02]'
            : 'border-primary/40 hover:border-primary/70 bg-background-card/40',
          isUploading && 'pointer-events-none opacity-50'
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedTypes.join(',')}
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>
          <div>
            <p className="text-lg font-semibold text-white">
              Drop your files here, or <span className="text-cyan">browse</span>
            </p>
            <p className="text-sm text-text-secondary mt-1">
              Supports images and videos up to 100MB
            </p>
          </div>
        </div>

        {isDragging && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 rounded-2xl bg-cyan/5 flex items-center justify-center"
          >
            <p className="text-cyan font-semibold text-xl">Release to upload</p>
          </motion.div>
        )}
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 p-4 bg-red-500/20 border border-red-500/40 rounded-xl text-red-400"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selected Files */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4">
              Selected Files ({files.length})
            </h3>
            <div className="grid gap-3">
              {files.map((file, index) => (
                <motion.div
                  key={`${file.name}-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center gap-4 p-4 bg-background-card/60 rounded-xl border border-primary/20"
                >
                  {/* Preview */}
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-background-card flex-shrink-0">
                    {file.type.startsWith('image/') ? (
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <video
                        src={URL.createObjectURL(file)}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  {/* File Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">{file.name}</p>
                    <p className="text-text-secondary text-sm">
                      {formatFileSize(file.size)} &bull;{' '}
                      {file.type.startsWith('image/') ? 'Image' : 'Video'}
                    </p>
                    {uploadProgress[file.name] !== undefined && (
                      <div className="mt-2">
                        <div className="h-2 bg-background-card rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-cyan transition-all duration-300"
                            style={{ width: `${uploadProgress[file.name]}%` }}
                          />
                        </div>
                        <p className="text-xs text-text-secondary mt-1">
                          {uploadProgress[file.name].toFixed(0)}% uploaded
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Remove Button */}
                  {!isUploading && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        removeFile(index)
                      }}
                      className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                    >
                      <svg
                        className="w-5 h-5 text-red-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Upload Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={uploadFiles}
              disabled={isUploading}
              className={cn(
                'mt-6 w-full py-4 rounded-xl font-semibold transition-all duration-300',
                isUploading
                  ? 'bg-primary/50 cursor-not-allowed'
                  : 'btn-primary'
              )}
            >
              {isUploading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Uploading...
                </span>
              ) : (
                `Upload ${files.length} File${files.length > 1 ? 's' : ''}`
              )}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Uploaded Files Gallery */}
      <AnimatePresence>
        {uploadedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8"
          >
            <h3 className="text-lg font-semibold text-white mb-4">
              Uploaded Media ({uploadedFiles.length})
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {uploadedFiles.map((file) => (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative group aspect-square rounded-xl overflow-hidden bg-background-card border border-primary/20"
                >
                  {file.type === 'image' ? (
                    <img
                      src={file.url}
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video
                      src={file.url}
                      className="w-full h-full object-cover"
                      controls
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-white text-sm font-medium truncate">
                        {file.name}
                      </p>
                      <p className="text-text-secondary text-xs">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2">
                    <span
                      className={cn(
                        'px-2 py-1 rounded-full text-xs font-medium',
                        file.type === 'image'
                          ? 'bg-cyan/20 text-cyan'
                          : 'bg-primary/20 text-primary'
                      )}
                    >
                      {file.type}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
