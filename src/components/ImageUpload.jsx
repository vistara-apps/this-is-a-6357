import React, { useState, useRef, useCallback } from 'react'
import { Upload, X, Plus, FileImage, Loader, Check } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'

// Cloudinary upload preset - would normally be in an environment variable
const CLOUDINARY_UPLOAD_PRESET = 'critter_cards_preset'
const CLOUDINARY_CLOUD_NAME = 'demo'
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`

function ImageUpload({ onUpload, onClose }) {
  const [photos, setPhotos] = useState([])
  const [dragOver, setDragOver] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState({})
  const fileInputRef = useRef(null)

  const handleFileSelect = (files) => {
    const newPhotos = Array.from(files).map(file => {
      const photoId = uuidv4()
      const url = URL.createObjectURL(file)
      return {
        photoId,
        file,
        url,
        caption: '',
        status: 'pending' // pending, uploading, success, error
      }
    })
    setPhotos(prev => [...prev, ...newPhotos])
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/')
    )
    handleFileSelect(files)
  }

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files).filter(file => 
      file.type.startsWith('image/')
    )
    handleFileSelect(files)
  }

  const removePhoto = (index) => {
    setPhotos(prev => {
      const newPhotos = [...prev]
      URL.revokeObjectURL(newPhotos[index].url)
      newPhotos.splice(index, 1)
      return newPhotos
    })
  }

  const updateCaption = (index, caption) => {
    setPhotos(prev => prev.map((photo, i) => 
      i === index ? { ...photo, caption } : photo
    ))
  }

  const uploadToCloudinary = useCallback(async (photo) => {
    const formData = new FormData()
    formData.append('file', photo.file)
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
    
    try {
      // Update status to uploading
      setPhotos(prev => prev.map(p => 
        p.photoId === photo.photoId ? { ...p, status: 'uploading' } : p
      ))
      
      const response = await fetch(CLOUDINARY_UPLOAD_URL, {
        method: 'POST',
        body: formData
      })
      
      if (!response.ok) {
        throw new Error('Upload failed')
      }
      
      const data = await response.json()
      
      // Update photo with cloudinary URL
      setPhotos(prev => prev.map(p => 
        p.photoId === photo.photoId 
          ? { 
              ...p, 
              status: 'success',
              cloudinaryId: data.public_id,
              url: data.secure_url 
            } 
          : p
      ))
      
      return {
        ...photo,
        status: 'success',
        cloudinaryId: data.public_id,
        url: data.secure_url
      }
    } catch (error) {
      console.error('Upload error:', error)
      
      // Update status to error
      setPhotos(prev => prev.map(p => 
        p.photoId === photo.photoId ? { ...p, status: 'error' } : p
      ))
      
      return { ...photo, status: 'error' }
    }
  }, [])

  const handleUpload = async () => {
    if (photos.length === 0) {
      alert('Please select at least one photo')
      return
    }
    
    setUploading(true)
    
    try {
      // Upload all photos to Cloudinary
      const uploadPromises = photos.map(photo => uploadToCloudinary(photo))
      const uploadedPhotos = await Promise.all(uploadPromises)
      
      // Filter out any failed uploads
      const successfulUploads = uploadedPhotos.filter(photo => photo.status === 'success')
      
      if (successfulUploads.length === 0) {
        alert('All uploads failed. Please try again.')
        setUploading(false)
        return
      }
      
      // Pass the successful uploads to the parent component
      onUpload(successfulUploads)
    } catch (error) {
      console.error('Upload error:', error)
      alert('An error occurred during upload. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-text-primary">Upload Photos</h2>
          <button
            onClick={onClose}
            disabled={uploading}
            className="text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Drop zone */}
          {!uploading && (
            <div
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              className={`
                border-2 border-dashed rounded-lg p-8 text-center mb-6 transition-colors
                ${dragOver ? 'border-purple-500 bg-purple-50' : 'border-gray-300'}
              `}
            >
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-text-primary mb-2">
                Drop your photos here
              </h3>
              <p className="text-text-secondary mb-4">
                or click to browse your device
              </p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="btn-primary"
              >
                <Plus className="w-4 h-4 mr-2" />
                Select Photos
              </button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
              />
            </div>
          )}

          {/* Upload progress */}
          {uploading && (
            <div className="bg-purple-50 rounded-lg p-6 mb-6 text-center">
              <Loader className="w-12 h-12 text-purple-500 mx-auto mb-4 animate-spin" />
              <h3 className="text-lg font-medium text-text-primary mb-2">
                Uploading photos...
              </h3>
              <p className="text-text-secondary">
                Please wait while your photos are being uploaded
              </p>
            </div>
          )}

          {/* Selected photos */}
          {photos.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-text-primary">
                Selected Photos ({photos.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {photos.map((photo, index) => (
                  <div 
                    key={photo.photoId} 
                    className={`border rounded-lg p-4 ${
                      photo.status === 'error' ? 'border-red-300 bg-red-50' : 
                      photo.status === 'success' ? 'border-green-300 bg-green-50' : 
                      photo.status === 'uploading' ? 'border-blue-300 bg-blue-50' : 
                      'border-gray-300'
                    }`}
                  >
                    <div className="flex space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden relative">
                          <img
                            src={photo.url}
                            alt="Upload preview"
                            className="w-full h-full object-cover"
                          />
                          {photo.status === 'uploading' && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                              <Loader className="w-8 h-8 text-white animate-spin" />
                            </div>
                          )}
                          {photo.status === 'success' && (
                            <div className="absolute top-1 right-1 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                              <Check className="w-3 h-3" />
                            </div>
                          )}
                          {photo.status === 'error' && (
                            <div className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                              <X className="w-3 h-3" />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <FileImage className="w-4 h-4 text-gray-400" />
                            <span className="text-sm font-medium text-text-primary truncate">
                              {photo.file.name}
                            </span>
                          </div>
                          {!uploading && (
                            <button
                              onClick={() => removePhoto(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                        <input
                          type="text"
                          placeholder="Add a caption (optional)"
                          value={photo.caption}
                          onChange={(e) => updateCaption(index, e.target.value)}
                          disabled={uploading}
                          className="w-full px-3 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
                        />
                        {photo.status === 'error' && (
                          <p className="text-xs text-red-600 mt-1">
                            Upload failed. The photo will be skipped.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t bg-gray-50">
          <p className="text-sm text-text-secondary">
            {photos.length} photo{photos.length !== 1 ? 's' : ''} selected
          </p>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              disabled={uploading}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              disabled={photos.length === 0 || uploading}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? (
                <span className="flex items-center">
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                  Uploading...
                </span>
              ) : (
                'Upload Photos'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageUpload
