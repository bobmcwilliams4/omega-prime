import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ['image/', 'video/']
    const isValidType = allowedTypes.some((type) => file.type.startsWith(type))
    if (!isValidType) {
      return NextResponse.json(
        { error: 'Invalid file type. Only images and videos are allowed.' },
        { status: 400 }
      )
    }

    // Validate file size (100MB max)
    const maxSize = 100 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 100MB.' },
        { status: 400 }
      )
    }

    // Generate unique filename
    const timestamp = Date.now()
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const fileType = file.type.startsWith('image/') ? 'images' : 'videos'
    const storagePath = `production-studio/${fileType}/${timestamp}_${safeName}`

    // For Edge Runtime, we'll return the file info and let client handle Firebase upload
    // This endpoint primarily validates and prepares the upload metadata

    const arrayBuffer = await file.arrayBuffer()
    const base64 = Buffer.from(arrayBuffer).toString('base64')

    return NextResponse.json({
      success: true,
      file: {
        name: file.name,
        type: file.type,
        size: file.size,
        storagePath,
        contentType: file.type,
        base64Preview: file.type.startsWith('image/')
          ? `data:${file.type};base64,${base64.substring(0, 1000)}...`
          : null,
      },
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Production Studio Upload API',
    endpoints: {
      POST: {
        description: 'Upload a file',
        contentType: 'multipart/form-data',
        maxSize: '100MB',
        allowedTypes: ['image/*', 'video/*'],
      },
    },
  })
}
