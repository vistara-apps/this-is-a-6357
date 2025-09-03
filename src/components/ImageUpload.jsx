import React, { useState, useRef } from 'react'
import { Upload, X, Plus, FileImage } from 'lucide-react'

function ImageUpload({ onUpload, onClose }) {
  const [photos, setPhotos] = useState([])
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileSelect = (files) => {
    const newPhotos = Array.from(files).map(file => {
      const url = URL.createObjectURL(file)
      return {
        file,
        url,
        caption: ''
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

  const handleUpload = () => {
    if (photos.length === 0) {
      alert('Please select at least one photo')
      return
    }
    onUpload(photos)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-text-primary">Upload Photos</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Drop zone */}
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

          {/* Selected photos */}
          {photos.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-text-primary">
                Selected Photos ({photos.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {photos.map((photo, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                          <img
                            src={photo.url}
                            alt="Upload preview"
                            className="w-full h-full object-cover"
                          />
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
                          <button
                            onClick={() => removePhoto(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <input
                          type="text"
                          placeholder="Add a caption (optional)"
                          value={photo.caption}
                          onChange={(e) => updateCaption(index, e.target.value)}
                          className="w-full px-3 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent"
                        />
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
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              disabled={photos.length === 0}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Upload Photos
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageUpload