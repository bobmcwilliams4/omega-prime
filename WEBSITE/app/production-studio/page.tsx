'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import MediaUploader from '@/components/upload/MediaUploader'
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'

interface MediaItem {
  id: string
  name: string
  url: string
  type: 'image' | 'video'
  size: number
  uploadedAt: Date
}

export default function ProductionStudioPage() {
  const [recentMedia, setRecentMedia] = useState<MediaItem[]>([])
  const [activeTab, setActiveTab] = useState<'upload' | 'gallery' | 'generate'>('upload')
  const [stats, setStats] = useState({ images: 0, videos: 0, totalSize: 0 })

  useEffect(() => {
    // Subscribe to recent uploads
    const q = query(
      collection(db, 'production-studio-uploads'),
      orderBy('uploadedAt', 'desc'),
      limit(20)
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const media: MediaItem[] = []
      let images = 0
      let videos = 0
      let totalSize = 0

      snapshot.forEach((doc) => {
        const data = doc.data()
        media.push({
          id: doc.id,
          name: data.name,
          url: data.url,
          type: data.type,
          size: data.size,
          uploadedAt: data.uploadedAt?.toDate() || new Date(),
        })
        if (data.type === 'image') images++
        else videos++
        totalSize += data.size || 0
      })

      setRecentMedia(media)
      setStats({ images, videos, totalSize })
    })

    return () => unsubscribe()
  }, [])

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`
  }

  const tabs = [
    { id: 'upload', label: 'Upload Media', icon: '📤' },
    { id: 'gallery', label: 'Media Gallery', icon: '🖼️' },
    { id: 'generate', label: 'AI Generate', icon: '✨' },
  ]

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="badge-primary">Production Studio</span>
            <h1 className="mt-6 text-5xl md:text-6xl font-heading font-bold text-gradient">
              Content Production Hub
            </h1>
            <p className="mt-4 text-xl text-text-secondary max-w-2xl mx-auto">
              Upload, manage, and generate media content with ECHO OMEGA PRIME&apos;s
              advanced AI-powered production tools.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12 grid grid-cols-3 gap-6 max-w-2xl mx-auto"
          >
            <div className="text-center p-4 glass-card rounded-xl">
              <p className="text-3xl font-bold text-primary">{stats.images}</p>
              <p className="text-text-secondary text-sm">Images</p>
            </div>
            <div className="text-center p-4 glass-card rounded-xl">
              <p className="text-3xl font-bold text-cyan">{stats.videos}</p>
              <p className="text-text-secondary text-sm">Videos</p>
            </div>
            <div className="text-center p-4 glass-card rounded-xl">
              <p className="text-3xl font-bold text-gold">{formatBytes(stats.totalSize)}</p>
              <p className="text-text-secondary text-sm">Total Storage</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`
                px-6 py-3 rounded-xl font-semibold transition-all duration-300
                ${
                  activeTab === tab.id
                    ? 'bg-primary text-white shadow-[0_4px_20px_rgba(153,0,255,0.4)]'
                    : 'bg-background-card/60 text-text-secondary hover:bg-background-card hover:text-white'
                }
              `}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'upload' && (
            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle>Upload Media Files</CardTitle>
                <CardDescription>
                  Drag and drop or browse to upload images and videos to your production library.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MediaUploader
                  maxFiles={10}
                  onUploadComplete={(files) => {
                    console.log('Uploaded:', files)
                  }}
                />
              </CardContent>
            </Card>
          )}

          {activeTab === 'gallery' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-heading font-bold text-white">
                  Media Gallery
                </h2>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-background-card/60 rounded-lg text-text-secondary hover:text-white transition-colors">
                    All
                  </button>
                  <button className="px-4 py-2 bg-background-card/60 rounded-lg text-text-secondary hover:text-white transition-colors">
                    Images
                  </button>
                  <button className="px-4 py-2 bg-background-card/60 rounded-lg text-text-secondary hover:text-white transition-colors">
                    Videos
                  </button>
                </div>
              </div>

              {recentMedia.length === 0 ? (
                <Card className="text-center py-16">
                  <div className="text-6xl mb-4">📁</div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    No media uploaded yet
                  </h3>
                  <p className="text-text-secondary mb-6">
                    Upload your first images or videos to get started.
                  </p>
                  <button
                    onClick={() => setActiveTab('upload')}
                    className="btn-primary inline-block"
                  >
                    Upload Media
                  </button>
                </Card>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {recentMedia.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="group relative aspect-square rounded-xl overflow-hidden bg-background-card border border-primary/20 hover:border-primary/50 transition-all duration-300"
                    >
                      {item.type === 'image' ? (
                        <img
                          src={item.url}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <video
                          src={item.url}
                          className="w-full h-full object-cover"
                          controls
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <p className="text-white font-medium truncate">{item.name}</p>
                          <p className="text-text-secondary text-sm">
                            {formatBytes(item.size)}
                          </p>
                        </div>
                      </div>
                      <div className="absolute top-3 right-3">
                        <span
                          className={`
                            px-2 py-1 rounded-full text-xs font-medium
                            ${
                              item.type === 'image'
                                ? 'bg-cyan/20 text-cyan'
                                : 'bg-primary/20 text-primary'
                            }
                          `}
                        >
                          {item.type}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'generate' && (
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card className="text-center py-8">
                <div className="text-5xl mb-4">🎨</div>
                <CardTitle>Image Generation</CardTitle>
                <CardDescription className="mt-2">
                  Generate stunning images with AI using prompts or reference images.
                </CardDescription>
                <button className="btn-primary mt-6">Coming Soon</button>
              </Card>
              <Card className="text-center py-8">
                <div className="text-5xl mb-4">🎬</div>
                <CardTitle>Video Generation</CardTitle>
                <CardDescription className="mt-2">
                  Create AI-powered videos from text descriptions or images.
                </CardDescription>
                <button className="btn-primary mt-6">Coming Soon</button>
              </Card>
              <Card className="text-center py-8">
                <div className="text-5xl mb-4">🎵</div>
                <CardTitle>Audio Generation</CardTitle>
                <CardDescription className="mt-2">
                  Generate music, sound effects, and voice content with AI.
                </CardDescription>
                <button className="btn-primary mt-6">Coming Soon</button>
              </Card>
              <Card className="text-center py-8">
                <div className="text-5xl mb-4">✏️</div>
                <CardTitle>Image Editing</CardTitle>
                <CardDescription className="mt-2">
                  Edit and enhance uploaded images with AI-powered tools.
                </CardDescription>
                <button className="btn-primary mt-6">Coming Soon</button>
              </Card>
            </div>
          )}
        </motion.div>
      </section>
    </div>
  )
}
